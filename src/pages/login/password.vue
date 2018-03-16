<template>
    <div>
        <!--<top>-->
            <!--<div class="middle big">{{msg}}</div>-->
        <!--</top>-->
        <top class="noflex" :title="msg" ref="header">
            <i slot="back"></i>
        </top>
      <div>
        <div class="weui-cells__title">请输入新密码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="password" v-model="patPassword" placeholder="请输入8-20位密码"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-show="showPatPassWord">密码必须是8-20字母和数字组合</span>
        <div class="weui-cells__title">请输入确认新密码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input @focus="getValue" class="weui-input" v-model="againPatPassword" type="password" placeholder="请输入8-20位密码"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-show="equal">俩次密码不一致</span>
      </div>
      <div class="btn">
        <a @click="editPassword" style="background: #3d9bff" href="javascript:;" class="weui-btn weui-btn_primary">确定</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    export default{
        components: {
            top
        },
        mixins:[mainHeightMixin],
        data(){
            return {
              patPassword:'',
              showPatPassWord:false,
              againPatPassword:'',
              equal:false,
              captcha:'',
              cid:'',
              msg:''
            }
        },
      validations: {
        patPassword: {
          required,
          alphaNum,
          minLength:minLength(6)
        }
      },
      watch:{
        againPatPassword(){
          this.equal = (this.patPassword===this.againPatPassword?false:true)
        }
      },
        mounted(){
          this.$set(this.$data,'msg',this.$route.params.msg)
            this.$set(this.$data,'captcha',localStorage.getItem('captcha'))
            this.$set(this.$data,'cid',localStorage.getItem('cid'))
        },
      methods:{
          getValue(){
              if(!/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?!\W+$)\S{8,20}$/g.test(this.patPassword)){
                  console.log(21212121)
                  this.$set(this.$data,'showPatPassWord',true)
              }else {
                  this.$set(this.$data,'showPatPassWord',false)
              }
          },
        editPassword(){
          if(!/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?!\W+$)\S{8,20}$/g.test(this.patPassword)){
            this.$set(this.$data,'showPatPassWord',true)
          }else {
            var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
            api("smarthos.user.pat.passowrd.reset",{
              "cid": this.cid,
              "captcha": this.captcha,
              "patPassword": passWord
            }).then(res=>{
              console.log(res,999)
              if(res.succ){
                this.$router.push({
                  name:'succeed',
                  params:{
                    msg:'忘记密码'
                  }
                })
              }else {
                this.$weui.alert(res.msg)
              }
            })
          }
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .btn{
      width: 100%;
      box-sizing: border-box;
      padding: 80px 30px 40px 30px;
    }
    .form-group__message{
      color: red;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 24px;
    }
</style>
