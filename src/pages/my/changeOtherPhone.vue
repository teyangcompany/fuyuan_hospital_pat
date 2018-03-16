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
        <div class="weui-cell__ft" >
          <button class="weui-vcode-btn" @click="getNowCode" v-if="countdown == 60 || countdown == 0">获取验证码</button>
          <button class="weui-vcode-btn" v-else>{{ countdown }}s后重新获取</button>
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
      <button @click="confirmChange">修改手机号</button>
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
        countdown: 60,
        a:"",
        commpatId:"",
        captcha:"",
        newCid:"",
        newCaptcha:"",
      }
    },
    created(){
          this.commpatId = this.$route.query.commpatId
    },
    methods:{
      getOldCode(){
        if(this.newPhone == ''){
          weui.alert("手机号不能为空")
        }else{
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
        }
      },
      getNowCode(){
        if(this.newPhone == ''){
          weui.alert("手机号不能为空")
        }else{
          http("smarthos.captcha.commpat.mobile.modify",{
            commpatId:this.commpatId,
            mobile:this.newPhone
          }).then((data)=>{
             console.log(data)
            if(data.code == 0){
              this.cid = data.obj.cid
              this.a = setInterval(() => {
                this.countdown--
              }, 1000)
            }else{
              weui.alert(data.msg)
            }
          })
        }
      },
      confirmChange(){
        if(this.newPhone == ''){
          weui.alert("手机号不能为空")
          return
        }else if (this.newCaptcha == ''){
          weui.alert("验证码不能为空")
          return
        }else if(this.cid == ''){
          weui.alert("验证码错误")
          return
        }
        http("smarthos.user.commpat.mobile.modify",{
          "token":localStorage.getItem('token'),
          "cid": this.cid,
          "captcha":this.newCaptcha,
//          "newCid": this.newCid,
//          "newCaptcha": this.newCaptcha,
          commpatId:this.commpatId,
          "mobile":this.newPhone
        }).then((data)=>{
          if(data.code == 0){
            console.log(data)
            weui.toast("修改成功")
            this.$router.back(-1)
          }else{
            weui.alert(data.msg)
          }
        })
      }
    },
    watch: {
      countdown() {
        if (this.countdown == 0) {
          clearInterval(this.a)
          this.countdown = 60
        }
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
