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
                                <input v-model="patMobile" class="weui-input phoneNumber" type="number"
                                       placeholder="请输入"/>
                            </div>

                        </div>
                    </div>
                    <div class="weui-cells__title phoneNumber">请输入验证码</div>
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input v-model="captcha" class="weui-input phoneNumber" readonly placeholder="请输入"/>
                            </div>
                            <send-code service="smarthos.captcha.pat.wechat.bind" :mobile="patMobile" @error="onError"
                                       v-model="cid" @result="onResult"></send-code>
                        </div>
                    </div>
                </div>
                <div class="btn" @click="bind">
                <span :class="{active:current==1}" style="background: #30cfd0" href="javascript:;"
                      class="weui-btn weui-btn_primary">绑定</span>
                </div>
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
    import SendCode from "../../business/code.vue"
    import {debug} from "../../lib/util"

    export default {
        components: {
            top, SendCode
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
            onResult(res) {
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

                    }
                } else {
                    weui.alert(data.msg)
                }
            },
            onError(msg) {
                weui.alert(msg);
            },
            bind() {
                api("smarthos.user.pat.wechat.bind", {
                    captcha: this.captcha,
                    cid: this.cid
                }).then((res) => {
                    if (res.code != 0) {
                        weui.alert(res.msg);
                    } else {
                        this.$router.push({
                            name: 'home'
                        })
                    }
                })
            }
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
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
            height: 70px;
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
