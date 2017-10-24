<template>
  <div>
    <top class="noflex" title="復元医院" ref="header">
      <!--<div slot="right" class="right absolute">测试</div>-->
    </top>
    <div class="wrapper" ref="main">
      <div>
        <div>
          <div class="weui-cells__title phoneNumber">请输入手机号</div>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <input v-model="patMobile" class="weui-input phoneNumber" type="number" placeholder="请输入"/>
              </div>

            </div>
          </div>
          <div class="weui-cells__title phoneNumber">请输入验证码</div>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <input v-model="captcha" class="weui-input phoneNumber" readonly placeholder="请输入"/>
              </div>
              <div class="weui-cell__hd sendBtn" @click="sendCode">
                <button class="phoneNumber">发送验证码</button>
                <!--
                <send-code v-model="cid" @error="error" service="smarthos.captcha.pat.wechat.bind"
                           :mobile="patMobile"></send-code>-->
              </div>
            </div>
          </div>
        </div>
        <!--<div class="btn" @click="bind">-->
        <!--&lt;!&ndash;<a :class="{active:current==1}" style="background: #30cfd0" href="javascript:;"&ndash;&gt;-->
        <!--&lt;!&ndash;class="weui-btn weui-btn_primary">绑定</a>&ndash;&gt;-->
        <!--</div>-->
        <div class="bottom">
          <!--<div class="register" @click="register">注册</div>-->
          <!--<div class="forget" @click="forgetPassword">忘记密码</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/app-header.vue'
  import {mainHeightMixin, jssdkMixin} from '../../lib/mixin'
  import config from '../../lib/config'
  import api from '../../lib/http'
  import {openidCache} from "../../lib/cache"
  export default {
    components: {
      top
    },
    mixins: [mainHeightMixin],
    data() {
      return {
        patMobile: '',
        current: '',
        cid: "",
        captcha: ""
      }
    },
    created() {

    },
    mounted() {
      //this.sendCode();
    },
    methods: {
      error(msg) {
        console.log(msg);
      },
      sendCode() {
        api("smarthos.captcha.pat.wechat.bind", {
          mobile: this.patMobile
        }).then((res) => {
          if (res.code == 0) {
            this.cid = res.obj.cid;
            this.captcha = res.obj.value ? res.obj.value : "";
            if (res.obj.nextBiz == 'REGISTER') {
              this.$router.push({
                path: "/register",
                query: {
                  cid: res.obj.cid,
                  captcha: res.obj.value,
                  mobile: this.patMobile
                }
              })
            } else {
              this.bind()
            }
          } else {
            weui.alert(data.msg)
          }
        })
      },

      bind() {
        api("smarthos.user.pat.wechat.bind", {
          openid: openidCache.get(),
          captcha: this.captcha,
          cid: this.cid
        }).then((res) => {
          console.log(res);
          if (res.code != 0) {
            weui.alert(res.msg);
            this.$router.push({
              name: 'home'
            })
          } else {


//            inputText(){
//                window.setInterval(()=>{
//                    this.$refs.bottom.scrollIntoView(true)
//                }, 2);
//            },
//            getCode(){
//                  api("smarthos.captcha.pat.wechat.bind",{
//                    mobile:this.patMobile
//                  }).then((data)=>{
//                    if(data.code == 0){
//                       this.cid = data.obj.cid
//                    }else{
//                        weui.alert(data.msg)
//                    }
//                    console.log(data)
//                  })
//            },
//            forgetPassword(){
//                this.$router.push({
//                    name:'forgetPassword',
//                    params:{
//                        msg:'忘记密码'
//                    }
//                })
//            },
//            register(){
//                this.$router.push({
//                    name:'register'
//                })
//            },
//            login(){
//                api("smarthos.user.pat.wechat.bind",{
//                  openid:"oDrfHwrOF-p6DYrFhoeBiOKwKBlw",
//                  captcha:this.codeValue,
//                  cid:this.cid
//                }).then((data)=>{
//                  console.log(this.codeValue)
//                  console.log(this.cid)
//                  if(data.code == 0){
//                      this.$router.push({
//                        name:'home'
//                      })
//                    }else{
//                        weui.alert(data.msg)
//                         this.$router.push({
//                            name:'home'
//                        })
//                    }
//                })
//
//          }
            this.$router.push({
              name: 'home'
            })
          }
        })
      }
//
//      forgetPassword() {
//        this.$router.push({
//          name: 'forgetPassword',
//          params: {
//            msg: '忘记密码'
//          }
//        })
//      },
//      register() {
//        this.$router.push({
//          name: 'register'
//        })
//      },
//      login() {
//        this.$set(this.$data, 'current', '1')
//        var passWord = sha512(hex_md5(this.patPassword) + this.patPassword);
//        api('smarthos.user.pat.login', {
//          "patMobile": this.patMobile,
//          "patPassword": passWord
//        }).then(res => {
//          console.log(res, 2222);
//          if (res.succ) {
//            localStorage.setItem('token', res.token)
//            localStorage.setItem('patAvatar', res.obj.pat.patAvatar)
//            localStorage.setItem('commpat', JSON.stringify(res.obj.commpat))
//            console.log(JSON.stringify(res.obj.commpat))
//            this.$router.push({
//              name: 'home'
//            })
//          } else {
//            this.$weui.alert(res.msg)
//          }
//
//        })


//                this.$set(this.$data,'current','1')
//                var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
//                api('smarthos.user.pat.login',{
//                    "patMobile":this.patMobile,
//                    "patPassword":passWord
//                }).then(res=>{
//                    console.log(res,2222);
//                    if(res.succ){
//                        localStorage.setItem('token',res.token)
//                        localStorage.setItem('patAvatar',res.obj.pat.patAvatar)
//                        localStorage.setItem('commpat',JSON.stringify(res.obj.commpat))
//                        console.log(JSON.stringify(res.obj.commpat))
//                        this.$router.push({
//                            name:'home'
//                        })
//                    }else {
//                        this.$weui.alert(res.msg)
//                    }
//
//                })


//          this.$router.push({
//            name:'eyeIllness'
//          })
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../common/common.scss';

  .phoneNumber {
    font-size: 32px;
  }

  .active {
    background: gainsboro !important;
  }

  .sendBtn {
    width: 170px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      height: 70px;
      width: 170px;
      border: none;
      outline: medium;
      color: white;
      background-color: #3d9bff;
    }
  }

  .btn {
    width: 100%;
    box-sizing: border-box;
    padding: 80px 30px 40px 30px;
  }

  .bottom {
    overflow: hidden;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .register {
    float: left;
    font-size: 32px;
    color: #30cfd0;
  }

  .forget {
    float: right;
    font-size: 32px;
    color: #30cfd0;
  }
</style>
