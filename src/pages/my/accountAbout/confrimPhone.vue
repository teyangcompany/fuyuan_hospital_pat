<template>
  <div class="page">
    <top title="修改绑定手机号" class="noflex">
      <i slot="back"></i>
    </top>
    <div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label bf">新手机号</label></div>
          <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
            <input  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label bf">验证码</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="tel" v-model="newCaptcha" placeholder="请输入验证码"/>
          </div>
          <div class="weui-cell__ft">
            <button class="weui-vcode-btn" @click="getCode">获取验证码</button>
          </div>
        </div>
      </div>
      <div class="btn">
        <a style="background: rgb(48, 207, 208)" href="javascript:;" class="weui-btn weui-btn_primary" @click="goNext">下一步</a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { required, between, minLength, maxLength} from 'vuelidate/lib/validators'
  import phone from '../../../lib/regex'
  import top from '../../../components/app-header.vue'
  import api from '../../../lib/http'
//  var token = localStorage.getItem('token')
  export default{
    components:{
      top
    },
    data(){
      return {
        token:localStorage.getItem('token'),
        mobile:'',
        captcha:'',
        cid:'',
        showError:false,
        newCid:'',
        newCaptcha:''
      }
    },
    validations: {
      mobile: {
        required,
        phone:phone(1)
      }
    },
    mounted(){
      console.log(this.$route.params.cid,this.$route.params.captcha)
      this.$set(this.$data,'cid',this.$route.params.cid)
      this.$set(this.$data,'captcha',this.$route.params.captcha)
    },
    methods:{
      goNext(){
//        this.$router.push('/changePhoneSucc')
          api("smarthos.user.pat.mobile.modify",{
            captcha:this.captcha,
            cid:this.cid,
            newCid:this.newCid,
            newCaptcha:this.newCaptcha,
            token:this.token,
            patMobile:this.mobile
          }).then(res=>{
            console.log(res,3363663)
            if(res.succ){
              this.$router.push({
                name:'succeed',
                params:{
                  msg:'成功修改绑定手机号'
                }
              })
            }else {
              alert(res.msg)
            }
          })
      },
      getCode(){
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else {
          api('smarthos.captcha.pat.mobile.modify',{
            token:this.token,
            mobile:this.mobile
          }).then(res=>{
            console.log(res,3333)
            if(res.succ){
              this.$set(this.$data,'newCid',res.obj.cid)
            }else {
              this.$weui.alert(res.msg)
            }
          })
        }

      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/common.scss';
  .page{
    display: flex;
    overflow: auto;
    flex-direction: column;
    flex: 1;
  }
  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
  .btn{
    box-sizing: border-box;
    text-align: center;
    margin: 142px auto 0 auto;
    width: 670px;
  }
  .weui-btn_primary{
    background: #0aace9;
  }
  .weui-cells{
    margin-top: 0px;
  }
  .weui-vcode-btn{
    color: rgb(48, 207, 208);
    padding: 0 .5rem 0 .6rem;
  }

  .weui-label{
    width: 70px;
  }

</style>
