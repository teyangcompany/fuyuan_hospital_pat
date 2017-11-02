<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_vcode">
            <div class="weui-cell__hd">
              <label class="weui-label">手机号</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="tel" v-model="newPhone" placeholder="请输入手机号"/>
            </div>
            <div class="weui-cell__ft" @click="getNowCode">
              <button class="weui-vcode-btn">获取验证码</button>
            </div>
          </div>
          <div class="weui-cell weui-cell_vcode second">
            <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="number" v-model="newCaptcha" placeholder="请输入验证码"/>
            </div>
            <div class="weui-cell__ft">
            </div>
          </div>
        </div>
        <div class="confirmBtn">
             <button @click="getOldCode">修改手机号</button>
        </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import http from '../../lib/http'
  export default{
      data(){
          return{
              title:"修改手机号",
              rightTitle:"",
              newPhone:"",
                cid:"",
              captcha:"",
              newCid:"",
              newCaptcha:"",
          }
      },
      methods:{
           getOldCode(){
               http("smarthos.captcha.pat.mobile.modify",{
                   token:localStorage.getItem('token')
               }).then((data)=>{
                     if(data.code == 0){
                         this.cid = data.obj.cid
                         this.captcha = data.obj.value
                         this.confirmChange()
                     }else{
                         weui.alert(data.msg)
                     }
               })
           },
           getNowCode(){
               if(this.newPhone == ''){
                   weui.alert("手机号不能为空")
               }else{
                   http("smarthos.captcha.pat.mobile.modify",{
                     token:localStorage.getItem('token'),
                     mobile:this.newPhone
                   }).then((data)=>{
                     if(data.code == 0){
                       this.newCid = data.obj.cid
                       this.newCaptcha =  data.obj.value
                     }else{
                       weui.alert(data.msg)
                     }
                   })
               }
           },
           confirmChange(){
               http("smarthos.user.pat.mobile.modify",{
                  "token":localStorage.getItem('token'),
                 "cid": this.cid,
                 "captcha":this.captcha,
                 "newCid": this.newCid,
                 "newCaptcha": this.newCaptcha,
                 "patMobile":this.newPhone
               }).then((data)=>{
                   if(data.code == 0){
                       console.log(data)
                       weui.alert("修改成功")
                       this.$router.push({
                           path:"/my/profile"
                       })
                   }else{
                       weui.alert(data.msg)
                   }
               })
           }
      },
      components:{
            "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common';
  .weui-cells{
    margin:0;
    .weui-label{
      width:80px;/*no*/
    }
    .second{
      height:45px;/*no*/
    }
    label,input,button{
        font-size: 32px;
    }
  }
  .confirmBtn{
    width:690px;
    text-align: center;
    margin: 0 auto;
    margin-top: 150px;
    button{
      width: 650px;
      height:80px;
      border:none;
      outline:medium;
      color: white;
      font-size: 32px;
      border-radius: 10px;
      background-color: $mainColor;
    }
  }
</style>
