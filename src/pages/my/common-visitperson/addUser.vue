<template>
    <div>
        <!--<top>-->
            <!--<div class="middle big">添加就诊人</div>-->
          <!--<span slot="right" class="add" @click="goAddUser">完成</span>-->
        <!--</top>-->
      <top title="添加就诊人" ref="header" class="noflex">
        <i slot="back"></i>
        <div slot="right" class="right absolute" @click="goAddUser">
          完成
        </div>
      </top>
        <div class="wrap">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label bf">姓名</label></div>
              <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patName.$error }">
                <input  @blur="$v.patName.$touch()" class="weui-input" type="text" v-model="patName"  placeholder="请输入姓名"/>
              </div>
            </div>
            <span class="form-group__message bf" v-if="!$v.patName.minLength&&showNameError">姓名至少2位</span>
            <span class="form-group__message bf" v-if="!$v.patName.maxLength&&showNameError">姓名至多15位</span>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label bf" >身份证号</label></div>
              <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patIdcard.$error }">
                <input  @input="$v.patIdcard.$touch()"   class="weui-input" type="text" v-model="patIdcard" placeholder="请输入身份证号"/>
              </div>
            </div>
            <div class="weui-cell" v-if="showAge">
              <div class="weui-cell__hd"><label class="weui-label bf">年&nbsp;&nbsp;&nbsp;龄</label></div>
              <div class="weui-cell__bd bf">
                    {{ JSON.stringify(new Date()).substr(1,4)- nowAge }}
              </div>
            </div>
            <div class="weui-cell" v-if="showGender">
              <div class="weui-cell__hd"><label class="weui-label bf">性&nbsp;&nbsp;&nbsp;别</label></div>
              <div class="weui-cell__bd bf">
                {{ parseInt(patIdcard.substr(16,1)) % 2 == 1 ? '男':'女' }}
              </div>
            </div>
          </div>
          <span class="form-group__message bf" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>

          <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_warn">
              <div class="weui-cell__hd"><label class="weui-label bf">手机号</label></div>
              <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
                <input  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
              </div>
              <div class="weui-cell__ft" @click="showRemind">
                <i class="weui-icon-warn"></i>
              </div>
            </div>
            <span class="form-group__message bf" v-show="!$v.mobile.cd&&showPhoneError">请输入正确的手机号</span>
            <div class="weui-cell weui-cell_vcode">
              <div class="weui-cell__hd">
                <label class="weui-label bf">验证码</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="tel" v-model="captcha" placeholder="请输入验证码"/>
              </div>
              <div class="weui-cell__ft">
                <button v-show="flag" class="weui-vcode-btn bf" @click="getCode">{{msg}}</button>
                <button v-show="!flag" class="weui-vcode-btn bf" >
                  {{msg+ 's'}}
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import top from "../../../components/app-header.vue"
  import {mainHeightMixin} from "../../../lib/mixin"
    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    import cd from '../../../lib/regex'
    import api from '../../../lib/http'
//    var token = localStorage.getItem('token')
    export default{
        components: {
            top
        },
      mixins: [mainHeightMixin],
      validations: {
       patName: {
          required,
          minLength:minLength(2),
          maxLength:maxLength(15)
        },patIdcard:{
          required,
          cd:cd(15,18)
        },
        mobile: {
          required,
          cd:cd(1)
        }
      },
        data(){
            return {
              token:localStorage.getItem('token'),
              patName:'',
              patIdcard:'',
              showNameError:false,
              showCd:false,
              showPhoneError:false,
              mobile:'',
              captcha:'',
              cid:'',
              msg:'获取验证码',
              flag:true,
              num:"",
              showAge:false,
              showGender:false,
              nowAge:"",
              patientListLength:""
            }
        },
        mounted(){

        },
       created(){
            this.num = this.$route.query.num
           this.getPatientList()
       },
      watch:{
        patIdcard(){

            if(this.patIdcard.substr(16,1) != ''){
              this.nowAge = this.patIdcard.substr(6,4)
              this.showAge = true
                console.log(this.patIdcard.substr(16),666)
              this.showGender = true
            }else{
              this.showAge = false
              this.showGender = false
            }
        }
      },
      methods:{
        showRemind(){
          this.$weui.dialog({
            content: '若该患者曾前往復元医院就诊过，最好填写在復元医院留的手机号 若该手机号不再使用，可以前往医院修改，或者直接填写真实的本人使用的手机号',
            buttons: [{
              label: '确定',
              type: 'primary'
            }]
          });
        },
        getPatientList(){
           api("smarthos.user.commpat.list",{
             token:localStorage.getItem('token')
           }).then((data)=>{
               this.patientListLength = data.list.length
               console.log(this.patientListLength)
           })
        },
        getCode(){

          if(this.$v.mobile.$invalid){
            this.$set(this.$data,'showPhoneError',true)
          }else {
            console.log(2222)
            api('smarthos.captcha.commpat.add',{
              token:this.token,
              mobile:this.mobile
            }).then(res=>{
              console.log(res,3333);
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
                this.$set(this.$data,'cid',res.obj.cid);

              }else {
                this.$weui.alert(res.msg)
              }


            })
          }
        },
        goAddUser(){
          if(this.patientListLength == 5){
              weui.alert("最多可以绑定五个就诊人")
          }else if(this.patName == ''){
            weui.alert("请填写您的真实姓名")
          }else if(this.$v.patName.$invalid){
            this.$set(this.$data,'showNameError',true)
          }else if(this.$v.patIdcard.$invalid){
            this.$set(this.$data,'showCd',true)
          }else if(this.captcha.length!=4 || this.cid == ''){
            weui.alert('请输入正确的验证码')
          }else {
            api("smarthos.user.commpat.add",{
              token:this.token,
              commpatName:this.patName,
              commpatIdcard:this.patIdcard,
              cid:this.cid,
              captcha:this.captcha
            }).then(res=>{
              console.log(res,232323);
              if(res.succ){
               if(this.num = 1){
                   this.$router.back(-1)
               }else if(this.num = 2){
                 this.$router.back(-1)
               }else if(this.num = 3){
                 this.$router.back(-1)
               }else{
                 this.$router.push({
                   path:"/my/common-visitperson"
                 })
               }
              }else{
                weui.alert(res.msg)
              }
            })
          }
        },
      }
    }
</script>
<style scoped lang="scss">
  @import '../../../common/common.scss';
    .form-group__message{
      color: red;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 12px;
    }
    .add{
      color: #0FBDFF;
    }
  .weui-cell_warn{
    color: black;
  }
  .weui-icon-warn{
    color: grey;
  }
    .weui-cells{
      margin: 30px 0;
    }
  .weui-vcode-btn{
    background:#0fbdff;
    color: white;
  }
  .weui-label{
    width: 80px;  /*no*/

  }

</style>
