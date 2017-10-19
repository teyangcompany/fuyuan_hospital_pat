<template>
  <div>
    <!--<top>-->
    <!--<div class="middle big">注册</div>-->
    <!--</top>-->
    <top class="noflex" title="注册" ref="header">
      <i slot="back"></i>
    </top>
    <div>
      <div class="weui-cells__title">请输入姓名</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="patName" placeholder="请输入"/>
          </div>
        </div>
      </div>
      <div class="weui-cells__title">请输入身份证</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="patIdcard" placeholder="请输入"/>
          </div>
        </div>
      </div>
      <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
      <div class="weui-cells__title">请设置密码</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" @blur="$v.patPassword.$touch()" v-model="patPassword" type="password"
                   placeholder="请输入8-20位密码"/>
          </div>
        </div>
      </div>
      <span class="form-group__message" v-show="showPatPassWord">密码必须是8-20字母和数字组合</span>
      <div class="weui-cells__title">请输入短信验证码</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="captcha" type="number" placeholder="请输入"/>
          </div>
          <div class="weui-cell__ft">
            <button v-show="!(msg>0)" class="weui-vcode-btn" @click="getCode">{{msg}}</button>
            <button v-show="msg>0" class="weui-vcode-btn" @click="getCode">有效期{{msg}}s</button>
          </div>
        </div>
      </div>
    </div>
    <label for="weuiAgree" class="weui-agree">
      <input id="weuiAgree" type="checkbox" v-model="checkbox" class="weui-agree__checkbox"/>
      <span class="weui-agree__text">
                同意<a href="javascript:void(0);">《医药用户协议》</a>
            </span>
    </label>

    <div class="btn" @click="myDetail">
      <a style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">下一步</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/app-header.vue'
  import {mainHeightMixin} from '../../lib/mixin'
  import config from '../../lib/config'
  import {openidCache} from "../../lib/cache"
  import api from '../../lib/http'
  import {required, between, minLength, maxLength, alphaNum} from 'vuelidate/lib/validators'
  import phone from '../../lib/regex'

  export default {
    components: {
      top
    },
    mixins: ['mainHeightMixin'],
    data() {
      return {
        patName: "",
        patPassword: "",
        captcha: this.$route.query.captcha,
        showError: false,
        patIdcard: "",
        checkbox: Boolean,
        showPatPassWord: false,
        cid: this.$route.query.cid,
        msg: "获取验证码"
      }
    },
    validations: {
      mobile: {
        required,
        phone: phone(1)
      },
      patPassword: {
        required,
        alphaNum,
        minLength: minLength(6)
      }
    },
    mounted() {

    },
    watch: {
      patPassword() {
        if (!/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?!\W+$)\S{8,20}$/g.test(this.patPassword)) {
          console.log(21212121)
          this.$set(this.$data, 'showPatPassWord', true)
        } else {
          this.$set(this.$data, 'showPatPassWord', false)
        }
      }
    },
    methods: {
      getCode() {
        if (false) {
          console.log(this.$v)
          this.$set(this.$data, 'showError', true)
        } else {
          this.msg = 60;
          api("smarthos.captcha.pat.register", {
            patName: this.patName,
            patPassword: this.patPassword,
            cid: this.$route.query.cid,
            captcha: this.$route.query.captcha,
            openid: openidCache.get()
          }).then(res => {
            console.log(res, 11111);
            if (res.succ) {
              this.$set(this.$data, 'cid', res.obj.cid);
              localStorage.setItem('cid', res.obj.cid)
            } else {
              this.$weui.alert(res.msg);
            }
          })
        }


      },
      myDetail() {
        api("smarthos.user.pat.register", {
          patIdcard: this.patIdcard,
          patName: this.patName,
          patPassword: this.patPassword,
          cid: this.$route.query.cid,
          captcha: this.$route.query.captcha,
          openid: openidCache.get()
        }).then((res) => {
          if (res.code == 0) {
            this.$router.push("/home");
          } else {
            alert(res.msg)
          }
        })
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../common/common.scss';

  .weui-vcode-btn {
    height: auto;
    line-height: 1;
    color: white;
    border: none;
    padding: 5px 3px;
    margin-left: 0;
  }

  .weui-cell__ft {
    background: #30cfd0;
    width: auto;
  }

  .btn {
    width: 100%;
    box-sizing: border-box;
    padding: 80px 30px 40px 30px;
  }

  .form-group__message {
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
</style>
