<template>
  <div class="page">
    <top title="修改绑定手机号" class="noflex">
      <i slot="back"></i>
    </top>
    <div >
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label bf">手机号</label></div>
          <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
            <input readonly="readonly"  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label bf">验证码</label>
          </div>
          <div class="weui-cell__bd">
            <input  class="weui-input" type="tel" v-model="captcha" placeholder="请输入验证码"/>
          </div>
          <div class="weui-cell__ft">
            <button v-show="!(msg>0)" class="weui-vcode-btn" @click="getCode">{{msg}}</button>
            <button v-show="msg>0" class="weui-vcode-btn" @click="getCode">有效期{{msg}}s</button>
          </div>
        </div>
      </div>
      <div class="btn">
        <a style="background: rgb(48, 207, 208)" href="javascript:;  " class="weui-btn weui-btn_primary" @click="goNext">下一步</a>
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
        mobile:JSON.parse(localStorage.getItem('commpat')).commpatMobile||{},
        captcha:'',
        cid:'',
        showError:false,
        msg:"获取验证码"
      }
    },
    validations: {
      mobile: {
        required,
        phone:phone(1)
      }
    },
    mounted(){

    },
    methods:{
      goNext(){
//        this.$router.push('./confrimPhone')
        if(this.mobile.length!=11){
          alert('请输入手机号')
        }else if(this.captcha.length!=4){
          alert('请输入正确的验证码')
        }else {
            api('smarthos.captcha.check',{
              "cid": this.cid,
              "captcha": this.captcha
            }).then(res=>{
              if(res.succ){
                this.$router.push({
                  name:'confrimPhone',
                  params:{
                    captcha:this.captcha,
                    cid:this.cid
                  }
                })
              }else {
                alert(res.msg)
              }
            })
        }
      },

      getCode(){
        this.msg = 60;
        var time = setInterval(()=>{
          this.msg -=1;
          if(this.msg==0){
            this.msg='重新获取';
            clearInterval(time)
          }
        },1000)
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else {
          api('smarthos.captcha.pat.mobile.modify',{
            token:this.token,
          }).then(res=>{
            console.log(res,3333);
            if(res.succ){
              this.$set(this.$data,'cid',res.obj.cid)
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
  .btn{
    box-sizing: border-box;
    text-align: center;
    margin: 142px auto 0 auto;
    width: 670px;
  }
  .weui-btn_primary{
    background: #0aace9;
  }
 .page{
   display: flex;
   overflow: auto;
   flex-direction: column;
   flex: 1;
 }
 .weui-cells{
   margin-top: 0px;
 }

  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
 .weui-vcode-btn{
  color: rgb(48, 207, 208);
  padding: 0 .5rem 0 .6rem;
 }

  /*.weui-label{*/
    /*width: 70px;*/
  /*}*/

</style>
