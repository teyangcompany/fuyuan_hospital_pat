<template>
  <div class="page">
    <!--<top>-->
      <!--<div class="middle big">修改手机号</div>-->
    <!--</top>-->
    <top title="修改手机号" ref="header" class="noflex">
      <i slot="back"></i>
    </top>
    <div >
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell weui-cell_warn">
          <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
          <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
            <input  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
          </div>
          <div class="weui-cell__ft" @click="showRemind">
            <i class="weui-icon-warn"></i>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label">验证码</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="tel" v-model="captcha" placeholder="请输入验证码"/>
          </div>
          <div class="weui-cell__ft">
            <button v-show="flag" class="weui-vcode-btn" @click="getCode">获取验证码</button>
            <button v-show="!flag" class="weui-vcode-btn bf" >
              {{msg+ 's'}}
            </button>
          </div>
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="confirm">确认修改</a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { required, between, minLength, maxLength} from 'vuelidate/lib/validators'
  import top from "../../../components/app-header.vue"
  import phone from '../../../lib/regex'
  import api from '../../../lib/http'
  import {mainHeightMixin} from "../../../lib/mixin"
//  var token = localStorage.getItem('token')
  export default{
    components:{
      top
    },
    mixins: [mainHeightMixin],
    data(){
      return {
        token:localStorage.getItem('token'),
        mobile:'',
        captcha:'',
        cid:'',
        showError:false,
        commpatId:'',
        msg:'获取验证码',
        flag:true,
        item:""
      }
    },
    validations: {
      mobile: {
        required,
        phone:phone(1)
      }
    },
    mounted(){
//      console.log(this.$route.query.item,565656)
      this.item = this.$route.query.item
      this.$set(this.$data,'commpatId',this.$route.query.compatId)
//      console.log(this.$route.query,222221111)
    },
    methods:{
      showRemind(){
        this.$weui.dialog({
          content: '若该患者曾前往浙二就诊过，最好填写在浙二留的手机号 若该手机号不再使用，可以前往医院修改，或者直接填写真实的本人使用的手机号',
          buttons: [{
            label: '确定',
            type: 'primary'
          }]
        });
      },
      confirm(){
//        this.$router.push('./confrimPhone')
        if(this.mobile.length!=11){
          alert('请输入手机号')
        }else {
          api("smarthos.user.commpat.mobile.modify",{
            "token": this.token,
            "commpatId":this.commpatId,
            "cid": this.cid,
            "captcha": this.captcha
          }).then(res=>{
            console.log(res);
            if(res.succ){
              this.$weui.alert('修改成功')
              this.$router.push({
                name:'users'
              })
            }else {
              this.$weui.alert(res.msg)
            }
          })

        }

      },
      getCode(){
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else {
          api("smarthos.captcha.commpat.mobile.modify",{
            token:this.token,
            mobile:this.mobile,
            commpatId:this.commpatId
          }).then(res=>{
            console.log(res,3333)
            if(res.succ){
              this.flag = false;
              this.msg = 60;
              var time1 = setInterval(()=>{
                this.msg-=1;
                if(this.msg==0){
                  window.clearInterval(time1);
                  this.flag = true;
                  this.msg = '重新获取';
                }
              },1000)
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
    flex: 1;  }
  .weui-cells{
    margin-top: 0px;
  }
  .weui-cell_warn{
    color: black;
  }
  .weui-icon-warn{
    color: grey;
  }
  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
  .weui-vcode-btn{
    background:#0fbdff;
    color: white;
    width: 90%;
    padding: 3px 11.25px;/*no*/
  }
  .weui-label{
     width: 70px; /*no*/

  }

</style>
