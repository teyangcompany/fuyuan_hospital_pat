<template>
    <div class="submitPage">
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="wrapSubmit">
            <div class="center">
                <p>{{ patientInfo.patientname }}</p>
                <div class="brief">
                  <p>科室：{{ patientInfo.deptname }}</p>
                  <p>床位号：{{ patientInfo.bedid }}</p>
                  <p v-if="patientInfo.medcardno">病案号：{{ patientInfo.medcardno }}</p>
                  <p v-else>病案号：暂无病案号</p>
                  <p>入院时间：{{ patientInfo.begintime }}</p>
                </div>
            </div>
         </div>
         <div class="selectPrice">
            <p>充值金额</p>
         </div>
        <div class="weui-cells weui-cells_radio">
          <label class="weui-cell weui-check__label" for="x11">
            <div class="weui-cell__bd">
              <p>1000元</p>
            </div>
            <div class="weui-cell__ft">
              <input type="radio" class="weui-check" value="1000" v-model="pickedPrice" name="radio1" id="x11"/>
              <span class="weui-icon-checked"></span>
            </div>
          </label>
          <label class="weui-cell weui-check__label" for="x12">
            <div class="weui-cell__bd">
              <p>2000元</p>
            </div>
            <div class="weui-cell__ft">
              <input type="radio" name="radio1" value="2000" class="weui-check" v-model="pickedPrice" id="x12"/>
              <span class="weui-icon-checked"></span>
            </div>
          </label>
          <label class="weui-cell weui-check__label" for="x13">
            <div class="weui-cell__bd">
              <p>5000元</p>
            </div>
            <div class="weui-cell__ft">
              <input type="radio" name="radio1" value="5000" class="weui-check" v-model="pickedPrice" id="x13"/>
              <span class="weui-icon-checked"></span>
            </div>
          </label>
          <label class="weui-cell weui-check__label" for="x14">
            <div class="weui-cell__bd">
              <p>自定义费用</p>
            </div>
            <div class="weui-cell__ft">
              <input type="radio" name="radio1" value="自定义" class="weui-check" v-model="pickedPrice" id="x14" checked="checked"/>
              <span class="weui-icon-checked"></span>
            </div>
          </label>
          <div class="custom border-1px-top" v-if="pickedPrice == '自定义'">
              <div class="customWrap">
                   <div class="leftWord">请输入要缴纳的金额</div>
                   <div class="rightInput">
                     <input type="number" v-model="customPrice">
                     <p>元</p>
                   </div>
              </div>
          </div>
        </div>
        <div class="bottom">
            <div class="leftBottom">
                 <p>预缴金额</p>
                 <p v-if="pickedPrice != '自定义'">¥{{pickedPrice}}</p>
                 <p v-else>¥{{ customPrice }}</p>
            </div>
            <div class="rightBottom" @click="pay">
                立即支付
            </div>
        </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import http from '../../lib/bookApi'
  export default{
      data(){
          return{
              title:"缴纳预缴金",
              rightTitle:"",
            patientInfo:"",
            pickedPrice:1000,
            customPrice:"",
            returnInfo:""
          }
      },
      components:{
          "VHeader":header
      },
      created(){
        this.id = this.$route.query.id
        this.patid = this.$route.query.patid
        this.hosid = this.$route.query.hosid
        this.getInfo()
      },
      watch:{
        pickedPrice(){
            console.log(this.pickedPrice)
        }
      },
      methods:{
        getInfo(){
          http("smarthos.yygh.ApiPrepaidInpatientGoldService.zyryxx",{
            patvisitid:this.id,
            patid:this.patid,
            hosid:this.hosid,
          }).then((data)=>{
            console.log(data)
            if(data.code == 0){
              this.patientInfo = data.obj
            }else{
              weui.alert(data.msg)
            }
          })
        },
        pay(){
            if(this.pickedPrice == '自定义' && this.customPrice == ''){
                this.$weui.alert("请先输入要缴纳的金额")
                return
            }else if(this.pickedPrice == '自定义' && this.customPrice == 0){
              this.$weui.alert("请输入大于零的金额")
              return
            }
            this.customPrice = Math.abs(this.customPrice)
            http("smarthos.yygh.ApiPrepaidInpatientGoldService.prepaidRecharge",{
              orgid:this.hosid,
              hosid:this.hosid,
              patientidentitycardnumber:this.patientInfo.idcard,
              inhospitalrecordnumber:this.patientInfo.inhospitalrecordnumber,
              paymode:"2",
              payamount:this.customPrice ? this.customPrice*100 : this.pickedPrice*100,
              patId:this.patid,
              patvisitid:this.id
            }).then((data)=>{
                console.log(data,222)
                if(data.code == 0){
                  this.returnInfo = JSON.parse(data.keyword)
                  console.log(this.returnInfo)
                  let conf = {
                    "appId": this.returnInfo.sub_appid,     //公众号名称，由商户传入
                    "timeStamp": this.returnInfo.time_stamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": this.returnInfo.nonce_str, //随机串
                    "package": `prepay_id=${this.returnInfo.prepay_id}`,
                    "signType": "MD5",         //微信签名方式：
                    "paySign": this.returnInfo.pay_sign //微信签名
                  }
//                alert(JSON.stringify(conf))
                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    conf,
                    (res) => {
                      if (res.err_msg == "get_brand_wcpay_request:ok") {
                        weui.toast("支付成功")
                        this.$router.back(-1)
                      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        console.log("支付过程中用户取消")
                        weui.toast("已取消")
                      } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        console.log("支付失败")
                        weui.alert(JSON.stringify(res))
                      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                  );


                }else{
                    weui.alert(data.msg)
                }
            })
        }
      }
  }
</script>
<style scoped lang="scss">
 .submitPage{
   position: absolute;
   top:0;
   left:0;
   right:0;
   bottom:0;
   .weui-cells{
       margin-top: 0;
   }
   .wrapSubmit{
     width: 690px;
     /*height:210px;*/
     margin:30px auto 0;
     border-radius: 15px;
     background-color: white;
     display: flex;
     align-items: center;
     .center{
       width: 640px;
       /*height:170px;*/
       margin:0 auto;
       padding-top: 20px;
       p{
          text-align: left;
         font-size:34px;
         color: #333333;
         margin-bottom: 10px;
       }
       .brief{
         text-align: left;
         /*margin-bottom: 30px;*/
         position: relative;
         p{
           text-align: left;
           font-size: 30px;
           color: #666666;
           margin-bottom: 10px;
         }
       }
     }
   }
   .selectPrice{
     width:100%;
     height:90px;
     margin-top: 30px;
     display: flex;
     align-items: center;
     background-color: white;
     p{
       height: 35px;
       font-size: 34px;
       color: #666666;
       line-height: 35px;
       margin-left: 40px;
       padding-left: 20px;
       border-left: 8px solid #3d9bff;
     }
   }
   .weui-cell__bd{
       p{
         font-size: 34px;
         color: #666666;
       }
   }
   .custom{
       .customWrap{
         width: 690px;
         height: 90px;
         margin:0 auto;
         display: flex;
         justify-content: space-between;
         align-items: center;
         .leftWord{
            font-size: 34px;
            color: #666666;
         }
         .rightInput{
            display: flex;
            justify-content: space-between;
            input{
                text-align: center;
                font-size: 30px;
                color: #666666;
                width:300px;
            }
         }
       }
   }
   .bottom{
     position: fixed;
     bottom:0;
     left:0;
     right:0;
     height: 90px;
     display: flex;
     justify-content: space-between;
     .leftBottom{
       width: 520px;
       height: 90px;
       background-color: white;
       display: flex;
       align-items: center;
       p:nth-child(1){
           margin-left: 30px;
           margin-right: 20px;
           font-size: 32px;
           color: #333333;
       }
       p:nth-child(2){
           font-size: 34px;
         color:#F39655;
       }
     }
     .rightBottom{
       width: 230px;
       height: 90px;
       line-height: 90px;
       text-align: center;
       color: #ffffff;
       font-size: 34px;
       background-color: #FFB415;
     }
   }
 }
</style>
