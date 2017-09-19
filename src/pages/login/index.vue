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
                    <div class="weui-cells__title">请输入密码</div>
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input v-model="patPassword" class="weui-input" type="password" placeholder="请输入"/>
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
                patMobile:'13522365145',
                patPassword:'',
                current:''
            }
        },
        mounted(){

        },
        methods:{
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
                this.$set(this.$data,'current','1')
                var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
                api('smarthos.user.pat.login',{
                    "patMobile":this.patMobile,
                    "patPassword":passWord
                }).then(res=>{
                    console.log(res,2222);
                    if(res.succ){
                        localStorage.setItem('token',res.token)
                        localStorage.setItem('patAvatar',res.obj.pat.patAvatar)
                        localStorage.setItem('commpat',JSON.stringify(res.obj.commpat))
                        console.log(JSON.stringify(res.obj.commpat))
                        this.$router.push({
                            name:'home'
                        })
                    }else {
                        this.$weui.alert(res.msg)
                    }

                })


//          this.$router.push({
//            name:'eyeIllness'
//          })
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
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
