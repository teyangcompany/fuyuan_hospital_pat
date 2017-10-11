<template>
    <div>
        <!--<top>-->
            <!--<div class="middle big">{{msg}}</div>-->
        <!--</top>-->
        <top class="noflex" :title="msg" ref="header">
            <i slot="back"></i>
            <div slot="right" class="right absolute"></div>
        </top>
      <div>
        <div class="weui-cells__title">请输入手机号</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
        <div class="weui-cells__title">请输入短信验证码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="number" v-model="captcha" placeholder="请输入"/>
            </div>
            <div class="weui-cell__ft">
                <button v-show="!(msgs>0)" class="weui-vcode-btn" @click="getCode">{{msgs}}</button>
                <button v-show="msgs>0" class="weui-vcode-btn" @click="getCode">有效期{{msgs}}s</button>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <a @click="goNext" style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">下一步</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import { required, between, minLength, maxLength,alphaNum} from 'vuelidate/lib/validators'
    import phone from '../../lib/regex'
    export default{
        components: {
            top
        },
        mixins:['mainHeightMixin'],
        data(){
            return {
              mobile:"",
              captcha:'',
              showError:false,
              cid:'',
              msg:'',
                msgs:"获取验证码"
            }
        },
      validations: {
        mobile: {
          required,
          phone:phone(1)
        },
//        patPassword: {
//          required,
//          alphaNum,
//          minLength:minLength(6)
//        }
      },
        mounted(){
            this.$set(this.$data,'msg',this.$route.params.msg)
        },
      methods:{
//        password(){
//          this.$router.push({
//            name:'password'
//          })
//        },
        goNext(){
            if(this.captcha.length!=4){
                alert('请输入正确的验证码')
            }else {
                api("smarthos.captcha.check",{
                    "cid": this.cid,
                    "captcha": this.captcha
                }).then(res=>{
                    if(res.succ){
                        localStorage.setItem('captcha',this.captcha)
                        this.$router.push({
                            name:'password',
                            params:{
                                msg:this.msg
                            }
                        })
                    }else {
                        this.$weui.alert(res.msg)
                    }
                })
            }

        },
        getCode(){
          if(this.$v.mobile.$invalid){
            this.$set(this.$data,'showError',true)
          }else {
              this.msgs = 60;
              var time = setInterval(()=>{
                  this.msgs -=1;
                  if(this.msgs==0){
                      this.msgs='重新获取';
                      clearInterval(time)
                  }
              },1000)
            api("smarthos.captcha.pat.password.reset",{
              mobile:this.mobile
            }).then(res=>{
              console.log(res,11111);
              if(res.succ){
                this.$set(this.$data,'cid',res.obj.cid);
                localStorage.setItem('cid',res.obj.cid)
              }else {
                this.$weui.alert('获取失败');
              }
            })
          }

        },
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .weui-vcode-btn{
      height: auto;
      line-height: 1;
      color: white;
      border: none;
      padding: 5px 3px;
      margin-left: 0;
    }
    .weui-cell__ft{
      background: #30cfd0;
      width: auto;
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
