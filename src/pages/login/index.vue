<template>
    <div>
        <top class="noflex" title="登录" ref="header">
           <div slot="right" class="right absolute">测试</div>
        </top>
        <div class="wrapper" ref="main">
            <div>
                <div>
                    <div class="weui-cells__title">请输入手机号</div>
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input v-model="patMobile" class="weui-input" type="number" placeholder="请输入"/>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cells__title">请输入验证码  <span @click="getCode()" style="color: #3d9bff;">获取验证码</span> </div>
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input v-model="codeValue" class="weui-input" type="password" placeholder="请输入验证码"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn" @click="login" >
                    <a :class="{active:current==1}" style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">登录</a>
                </div>
                <div class="bottom">
                    <div class="register" @click="register">注册</div>
                    <div class="forget" @click="forgetPassword">忘记密码</div>
                </div>
            </div>
        </div>
    </div>
    <!--<div class="box1">-->
        <!--<div class="box2">212121</div>-->
        <!--<div class="box3" ref="bottom" contenteditable="true"-->
             <!--@focus="inputText"-->
             <!--@blur = 'inputText1'-->
             <!--@input="changeText" style="-webkit-user-select: auto;"></div>-->
    <!--</div>-->
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    export default{
        components: {
            top
        },
        mixins:['mainHeightMixin'],
        data(){
            return {
                patMobile:'',
                codeValue:"",
                cid:"",
                patPassword:'',
                current:''
            }
        },
        mounted(){

        },
        methods:{

//            inputText(){
//                window.setInterval(()=>{
//                    this.$refs.bottom.scrollIntoView(true)
//                }, 2);
//            },
            getCode(){
                  api("smarthos.captcha.pat.wechat.bind",{
                    mobile:this.patMobile
                  }).then((data)=>{
                    if(data.code == 0){
                       this.cid = data.obj.cid
                    }else{
                        weui.alert(data.msg)
                    }
                    console.log(data)
                  })
            },
            forgetPassword(){
                this.$router.push({
                    name:'forgetPassword',
                    params:{
                        msg:'忘记密码'
                    }
                })
            },
            register(){
                this.$router.push({
                    name:'register'
                })
            },
            login(){
                api("smarthos.user.pat.wechat.bind",{
                  openid:"oDrfHwrOF-p6DYrFhoeBiOKwKBlw",
                  captcha:this.codeValue,
                  cid:this.cid
                }).then((data)=>{
                  console.log(this.codeValue)
                  console.log(this.cid)
                  if(data.code == 0){
                      this.$router.push({
                        name:'home'
                      })
                    }else{
                        weui.alert(data.msg)
                         this.$router.push({
                            name:'home'
                        })
                    }
                })




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
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    /*.box1{*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*height: 100%;*/
    /*}*/
    /*.box2{*/
        /*flex: 1;*/
    /*}*/
    /*.box3{*/
        /*width: 100%;*/
        /*background: goldenrod;*/
        /*height: 60px;*/
    /*}*/
    .active{
        background: gainsboro !important;
    }
    .btn{
        width: 100%;
        box-sizing: border-box;
        padding: 80px 30px 40px 30px;
    }
    .bottom{
        overflow: hidden;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .register{
        float: left;
        font-size: 32px;
        color: #30cfd0;
    }
    .forget{
        float: right;
        font-size: 32px;
        color: #30cfd0;
    }
</style>
