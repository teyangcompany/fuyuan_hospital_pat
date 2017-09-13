<template>
    <div>
        <!--<top>-->
            <!--<div class="middle big">完善个人信息</div>-->
        <!--</top>-->
        <top class="noflex" title="完善个人信息" ref="header">
            <i slot="back"></i>
            <div slot="right" class="right absolute"></div>
        </top>
      <div>
        <div class="weui-cells__title">请输入真实姓名</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input @blur="$v.patName.$touch()" v-model="patName" class="weui-input" type="text"  placeholder="请输入"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-if="!$v.patName.minLength&&showNameError">姓名至少2位</span>
        <span class="form-group__message" v-if="!$v.patName.maxLength&&showNameError">姓名至多15位</span>
        <div class="weui-cells__title">请输入身份证号码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input  @input="$v.patIdcard.$touch()" v-model="patIdcard" class="weui-input" type="number" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>
        <!--<div class="weui-cells__title">性别</div>-->
        <!--<div class="weui-cells">-->
          <!--<div class="weui-cell">-->
            <!--<div class="weui-cell__bd">-->
              <!--<input class="weui-input" type="text" placeholder="请输入"/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="weui-cells__title">年龄</div>-->
        <!--<div class="weui-cells">-->
          <!--<div class="weui-cell">-->
            <!--<div class="weui-cell__bd">-->
              <!--<input class="weui-input" type="text" placeholder="请输入"/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

      </div>
      <div class="mfc  text">
        您的个人信息一经确认将无法修改，提交前请仔细核对，如提交错误，请联系客服，谢谢！
      </div>
      <div class="btn" @click="register">
        <a style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">确定</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    import cd from '../../lib/regex'
    export default{
        components: {
            top
        },
        mixins:['mainHeightMixin'],
        data(){
            return {
              patName:'',
              patPassword:'',
              showNameError:false,
              showCd:false,
              patIdcard:'',
              cid:'',
              captcha:''
            }
        },
      validations: {
       patName: {
          required,
          minLength:minLength(2),
          maxLength:maxLength(15)
        },patIdcard:{
          required,
          cd:cd(15,18)
        }
      },
        mounted(){
            console.log(localStorage.getItem('password'));
          this.$set(this.$data,'patPassword',localStorage.getItem('password'))
          this.$set(this.$data,'cid',localStorage.getItem('cid'))
          this.$set(this.$data,'captcha',localStorage.getItem('captcha'))
        },
      methods:{
        register(){
          if(this.$v.patName.$invalid){
            this.$set(this.$data,'showNameError',true)
          }else if(this.$v.patIdcard.$invalid){
            this.$set(this.$data,'showCd',true)
          }else {
            var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
             api("smarthos.user.pat.register",{
               "patName": this.patName,
               "patPassword": passWord,
               "patIdcard": this.patIdcard,
               "captcha": this.captcha,
               "cid": this.cid
             }).then(res=>{
               console.log(res,66666)
               if(res.succ){
                 localStorage.setItem('token',res.token);
                 this.$router.push({
                   name:"succeed",
                   params:{
                     msg:'注册成功'
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
.text{
  box-sizing: border-box;
  margin-top: 30px;
  padding: 10px 20px;
}
    .btn{
      width: 100%;
      box-sizing: border-box;
      padding: 80px 30px 40px 30px;
    }
    .form-group__message{
      color: red;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 12px;
    }
</style>
