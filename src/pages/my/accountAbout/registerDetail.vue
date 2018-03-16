<template>
    <div class="wrapAll">
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="wrapDetail" v-if="registerInfo">
            <div class="wrapImg">
               <img src="" alt="" id="invoice" @click="makeBig">
            </div>
            <div class="wrapInfo">
               <div class="centerWrap">
                    <p v-if="registerInfo.regid">
                      <span class="mainTitle">{{ registerInfo.numdate.substr(0,4) }}-{{ registerInfo.numdate.substr(4,2) }}-{{ registerInfo.numdate.substr(6) }} {{ registerInfo.ampm == 1 ? '上午':'下午' }} {{ registerInfo.numno }}号</span>
                      <span v-if="registerInfo.orderState == 0" class="statusSpan" style="color: #FABE00;">待支付</span>
                      <span v-if="registerInfo.orderState == 1" class="statusSpan" style="color: #3d9bff;">挂号成功</span>
                      <span v-if="registerInfo.orderState == 2" class="statusSpan">已就诊</span>
                      <span v-if="registerInfo.orderState == 3" class="statusSpan" style="color: #2AB6B3;">未就诊</span>
                      <span v-if="registerInfo.orderState == 4" class="statusSpan" style="color: #F37575;">已退号</span>
                      <span v-if="registerInfo.orderState == 5" class="statusSpan">挂号失败</span>
                      <span v-if="registerInfo.orderState == -1" class="statusSpan">已取消</span>
                    </p>
                     <p v-else>
                       <span>{{ registerInfo.numdate.substr(0,4) }}-{{ registerInfo.numdate.substr(4,2) }}-{{ registerInfo.numdate.substr(6) }}  {{ registerInfo.ampm == 1 ? '上午':'下午' }} {{ registerInfo.numno }}号</span>
                       <span v-if="registerInfo.orderState == -1" class="statusSpan" style="color: #F37575;">已退号</span>
                       <span v-if="registerInfo.orderState == 1" class="statusSpan">已就诊</span>
                       <span v-if="registerInfo.orderState == 2" class="statusSpan" style="color: #2AB6B3;">未就诊</span>
                       <span v-if="registerInfo.orderState == 0" class="statusSpan" style="color: #3d9bff;">预约成功</span>
                     </p>
                    <p> <span class="leftSpan">科室：</span> <span class="rightSpan">{{ registerInfo.deptname }}</span> </p>
                   <p> <span class="leftSpan">医生：</span> <span class="rightSpan">{{ registerInfo.docname ? registerInfo.docname : '普通号' }}</span> </p>
                   <p> <span class="leftSpan">费用：</span> <span class="rightSpan">¥{{ registerInfo.treatfee }}元</span> </p>
                   <p> <span class="leftSpan">医院：</span> <span class="rightSpan">{{ registerInfo.hospitalname }}</span> </p>
                   <p v-if="!registerInfo.regid"> <span class="leftSpan" >支付方式：</span> <span class="rightSpan">线下支付</span> </p>
                 <p v-if="registerInfo.regid"> <span class="leftSpan" >支付方式：</span> <span class="rightSpan">在线支付</span> </p>
                 <p> <span class="leftSpan">预估就诊时间：</span> <span class="rightSpan">{{ registerInfo.numtime }}</span>
                   <span style="color: #999999;font-size: 13px">(以医院实际情况为准)</span> </p>
                 <p> <span class="leftSpan" v-if="registerInfo.orderid">取号密码：</span> <span class="rightSpan">{{ registerInfo.qhmm }}</span> </p>
               </div>
               <div class="patientInfo">
                   <p> <span class="leftSpan">患者信息：</span> <span class="rightSpan">{{ registerInfo.patname }} {{ gender }} {{ age }}岁</span> </p>
                   <p> <span class="leftSpan">身份证号：</span> <span class="rightSpan">{{ registerInfo.idcard }}</span> </p>
                   <p> <span class="leftSpan">手机号码：</span> <span class="rightSpan">{{ registerInfo.mobileno }}</span> </p>
               </div>
               <div v-if="registerInfo.orderid" class="patientInfo">
                 <p> <span class="leftSpan">注意事项</span></p>
                 <p> <span class="leftSpan">1.请于就诊当日凭就诊人本人身份证到医院窗口或自助机上取号。</span></p>
                 <p> <span class="leftSpan">2.预约挂号可在就诊当天使用医院现场自助机、收费窗口支付的方式完成费用支付。</span></p>
               </div>
              <div v-if="registerInfo.id" class="patientInfo">
                <p> <span class="leftSpan">注意事项</span></p>
                <p> <span class="leftSpan">1.支付完成后，凭手机预约记录到相关科室就诊。</span></p>
                <p> <span class="leftSpan">2当日挂号必须在5分钟内支付，超时自动取消。</span></p>
              </div>
            </div>
           <v-dialog :dialogTitle="dialogTitle"
                     :dialogMain="dialogMain"
                     :dialogLeftFoot="dialogLeftFoot"
                     :dialogRightFoot="dialogRightFoot"
                     v-if="showDialog"
                     @on-cancel="cancelDialog" @on-download="confirmCancel"></v-dialog>
         </div >
        <div class="status" v-if="!registerInfo.regid">
          <span class="statusP" v-if="registerInfo.orderState == 0" @click="cancelBook(registerInfo)">取消预约</span>
          <span class="statusP againColor" v-if="registerInfo.orderState == 1" @click="bookAgain(registerInfo)" style="color: #2AB6B3;">再次预约</span>
          <span class="statusP againColor" v-if="registerInfo.orderState == 2" @click="bookAgain(registerInfo)" style="color: #2AB6B3;">再次预约</span>
          <span class="statusP againColor" v-if="registerInfo.orderState == -1" @click="bookAgain(registerInfo)" style="color: #2AB6B3;">再次预约</span>
        </div>
        <div class="status"  v-else>
          <span class="statusP againColor special" v-if="registerInfo.orderState == 0 &&  registerInfo.remainTime > 0" style="color: #2AB6B3;" @click="paySucc(registerInfo)">立即支付 <span style="color: #FABE00;">{{ convertTime }}</span></span>
        </div>
        <v-toast v-if="showToast"></v-toast>
    </div>
</template>
<script>
  import  header from '../../../base/header.vue'
  import dialog from '../../../base/dialog.vue'
  import http from '../../../lib/http'
  import api from '../../../lib/bookApi'
  import Toast from '../../../base/toast.vue'
  import JsBarcode from 'jsbarcode'
  export default{
      data(){
          return{
              title:"我的挂号",
              rightTitle:"",
              registerInfo:"",
              dialogTitle:"",
              dialogMain:"确定取消此预约",
              dialogLeftFoot:"取消",
              dialogRightFoot:"确定",
              showDialog:false,
              showToast:false,
              convertTime:"",
              item:"",
              gender:"",
              age:""
          }
      },
     created(){
//         this.registerInfo = JSON.parse(localStorage.getItem('registerDetail'))
       this.patId = this.$route.query.patId
       this.orgid = this.$route.query.orgid
       this.orderid = this.$route.query.orderid
       this.id = this.$route.query.id
       this.getDetail()
     },
     mounted(){

     },
      watch:{
        registerInfo(){
          if(this.registerInfo.remainTime && this.registerInfo.remainTime > 0){
            setInterval(()=>{
              this.registerInfo.remainTime--
              if(this.registerInfo.remainTime == 0){
                  this.getDetail()
                  return
              }
              let m = Math.floor( this.registerInfo.remainTime / 60)
              let s = Math.floor((this.registerInfo.remainTime ) - m*60)
              let myM
              m == 0 ? myM = '' : myM = m + "分"
              this.convertTime =  myM  + s + '秒'
            },1000)
          }
        }
      },
     methods:{
       getDetail(){
           if(this.orderid){
              this.showToast = true
             api('smarthos.yygh.apiOrderService.ghBespeakList',{
               token:localStorage.getItem('token'),
               hzid:this.patId,
               orgid:this.orgid,
               orderid:this.orderid,
               pageNum:"1",
               pageSize:"10"
             }).then((data)=>{
                console.log(data,3333)
               this.showToast = false
               if(data.code == 0){
                 this.registerInfo = data.list[0]
                 this.nowAge = this.registerInfo.idcard.substr(6,4)
                 this.gender = parseInt(this.registerInfo.idcard.substr(16,1)) % 2 == 1 ? '男':'女'
                 this.age = JSON.stringify(new Date()).substr(1,4)- this.nowAge
                 this.$nextTick(()=>{
                   let invoiceNum =  `${this.registerInfo.patid}`
                   JsBarcode('#invoice',invoiceNum,{
                     height:40,
                     width:2,
                   });
                 })
               }else{
                 weui.alert(data.msg)
               }
             })
           }else{
             this.showToast = true
             api('smarthos.yygh.apiOrderService.ghBespeakList',{
               token:localStorage.getItem('token'),
               hzid:this.patId,
               orgid:this.orgid,
               id:this.id
             }).then((data)=>{
               this.showToast = false
               if(data.code == 0){
                 this.registerInfo = data.list[0]
                 this.nowAge = this.registerInfo.idcard.substr(6,4)
                 this.gender = parseInt(this.registerInfo.idcard.substr(16,1)) % 2 == 1 ? '男':'女'
                 this.age = JSON.stringify(new Date()).substr(1,4)- this.nowAge
                 this.$nextTick(()=>{
                   let invoiceNum =  `${this.registerInfo.patid}`
                   JsBarcode('#invoice',invoiceNum,{
                     height:40,
                     width:2,
                   });
                 })
                 console.log(this.registerInfo,666)
               }else{
                 weui.alert(data.msg)
               }
             })
           }
       },
       makeBig(){
         var img =  document.getElementById('invoice').src
         wx.previewImage({
           current: img,
           urls: [img]
         })
       },
       cancelDialog(){
         this.showDialog = false
       },
       cancelBook(registerInfo){
         this.showDialog = true
         this.item = registerInfo
       },
       confirmCancel(){
         this.showDialog = false
         let time = this.item.numdate.substr(0,4) + this.item.numdate.substr(5,2) + this.item.numdate.substr(8,2)
         console.log(time)
         http("smarthos.yygh.apiOrderService.cancel",{
           orderid:this.item.orderid ? this.item.orderid : this.item.id,
           pass:this.item.qhmm,
           visitdate:time,
           orgid:this.item.orgid
         }).then((data)=>{
           this.showToast = false
           if(data.code == 0){
             weui.toast("取消成功")
             this.getDetail()
             console.log(data)
           }else{
             weui.alert(data.msg)
           }
         })
       },
       bookAgain(registerInfo){
         if(registerInfo.docname){
           this.$router.push({
             path:"/home/server/book/famousPage",
             query:{hosName:registerInfo.hospitalname,bookDocId:registerInfo.docid,hosid:registerInfo.orgid}
           })
         }else{
           this.$router.push({
             path:"/home/server/book/commonDetail",
             query:{hosName:registerInfo.hospitalname,ksid:registerInfo.deptid,hosid:registerInfo.orgid}
           })
         }
       },
       paySucc(registerInfo) {
         http('smarthos.yygh.ApiyGHpaymentService.ghPayment', {
           orgid: registerInfo.orgid,
           ddid:registerInfo.id,
           paymode:"2"
         }).then(res => {
           if (res.code == 0 && res.keyword) {
             this.returnInfo = JSON.parse(res.keyword)
             console.log(this.returnInfo)
             let conf = {
               "appId": this.returnInfo.appid,     //公众号名称，由商户传入
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
                   this.getDetail()
                 } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                   console.log("支付过程中用户取消")
                 } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                   console.log("支付失败")
                   weui.alert(JSON.stringify(res))
                 }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
               }
             );
           }
           else {
             weui.alert(res.msg)
           }
         })
       },
     },
     components:{
        "VHeader":header,
       "VDialog":dialog,
       "VToast":Toast
     }
  }
</script>
<style scoped lang="scss">
    .wrapDetail{
    position: absolute;
    top: 98px;
    right:0;
    left:0;
    right:0;
    bottom:100px;
    overflow: auto;
    .wrapImg{
      width:100%;
      height:200px;
      text-align: center;
      margin-top: 20px;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .wrapInfo{
      width:100%;
      margin-top: 20px;
      .centerWrap{
        width: 690px;
        margin:0 auto;
        background-color: white;
        padding:20px 15px 20px 15px;
        border-radius: 15px;
        p{
          margin-bottom: 20px;
          .leftSpan{
            font-size: 30px;
            color: #999999;
          }
          .rightSpan{
            font-size: 30px;
            color: #333333;
          }
          .statusSpan{
               font-size: 32px;
               font-weight: bold;
          }
        }
        p:nth-child(1){
          display: flex;
          justify-content: space-between;
          .mainTitle{
            font-size: 32px;
            color: #333333;
            font-weight: bold;
          }
        }
      }
      .patientInfo{
        width: 690px;
        margin:20px auto 0;
        padding:20px 15px 20px 15px;
        background-color: white;
        border-radius: 15px;
        p{
          margin-bottom: 20px;
          .leftSpan{
            font-size: 30px;
            color: #999999;
          }
          .rightSpan{
            font-size: 30px;
            color: #333333;
          }
        }
      }
      .attentionTips{
        width: 690px;
        margin:0 auto;
      }
    }
    .bottomBtn{
      position: fixed;
      left:0;
      right:0;
      bottom:0;
      height: 90px;
      color: white;
      font-size: 32px;
      line-height: 90px;
      text-align: center;
    }
  }
    .status{
      position: fixed;
      left:0;
      right:0;
      bottom:0;
      height: 90px;
      z-index:1000;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .statusP{
        height: 60px;
        width: 170px;
        margin-right: 20px;
        font-size: 24px;
        line-height: 60px;
        text-align: center;
        border:1px solid  #999999;
        border-radius: 10px;
      }
      .special{
        min-width: 200px;
      }
      .againColor{
        border:1px solid  #2AB6B3;
      }
    }
</style>
