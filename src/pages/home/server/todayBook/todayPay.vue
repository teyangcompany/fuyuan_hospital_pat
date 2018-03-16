<template>
  <div class="page">
    <top class="noflex" title="支付" ref="header">
      <!--<div slot="right" class="right absolute">返回</div>-->
    </top>
    <div class="payTip">
        <p v-if="countDown > 0">请在<span style="color: #FABE00;">{{ convertTime }}</span>内完成支付</p>
       <p v-else>订单已失效</p>
    </div>
    <div class="payInfo">
      <div class="paySum border-1px">
        <span>订单金额</span>
        <span v-if="fee">¥{{ fee }}元</span>
      </div>
      <p class="border-1px payMethod">支付方式:</p>
      <div class="payBy border-1px">
        <div class="payByCenter">
          <div>
            <img src="../../../../../static/img/weixin1.jpg" alt="">
            <span>微信</span>
          </div>
          <div class="icon_sp_area">
            <i class="weui-icon-success"></i>
          </div>
        </div>
      </div>
      <div class="attachTips">
          <span>1.在线支付后可直接凭挂号记录详情单就诊，无需取号；</span>
      </div>
      <div class="confirmPay">
        <div class="confirmCenter">
          <button @click="paySucc()">确认支付</button>
        </div>
      </div>
    </div>
    <!--<div class="wrap">-->
    <!--正在支付中...-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../../../components/app-header.vue'
  import {mainHeightMixin} from '../../../../lib/mixin'
  import { consultPrice } from '../../../../lib/filter'
  import config from '../../../../lib/config'
  import api from '../../../../lib/http'

  export default {
    components: {
      top
    },
    mixins: [mainHeightMixin],
    data() {
      return {
        ddid: "",
        paySort:"",
        fee:"",
        roomPrice:"",
        source:"",
        convertTime:"",
        countDown:300
      }
    },
    filters:{
      consultPrice
    },
    mounted() {
      this.ddid = this.$route.query.ddid;
      this.fee = this.$route.query.fee
      this.orgid = this.$route.query.orgid
      this.paySort = this.$route.query.dept
      this.source = this.$route.query.source
      this.roomPrice = this.$route.query.roomPrice
//      setTimeout((res) => {
//        this.paySucc();
//      }, 1000)
      setInterval(()=>{
        if( this.countDown > 0){
          this.countDown--
          let m = Math.floor( this.countDown / 60)
          let s = Math.floor((this.countDown ) - m*60)
          let myM
          m == 0 ? myM = '' : myM = m + "分"
          this.convertTime =  myM  + s + '秒'
        }
      },1000)
    },
    methods: {
      paySucc() {
        api('smarthos.yygh.ApiyGHpaymentService.ghPayment', {
          orgid: this.orgid,
          ddid:this.ddid,
          paymode:"2"
        }).then(res => {
          if (res.code == 0 && res.keyword) {
            this.returnInfo = JSON.parse(res.keyword)
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
                  setTimeout(()=>{
                      this.$router.push({
                        path:"/home/server/paySucc"
                      })
                  },1000)
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
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../../../common/common.scss';

  .wrap {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: blue;
  }
  .payTip{
     p{
       height:94px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 32px;
       color: #333333;
       background-color: white;
       span{

       }
     }
  }
  .payInfo{
    position: fixed;
    top: 188px;
    left:0;
    right:0;
    bottom:0;
    background-color: white;
    .paySum{
      width:690px;
      margin:0 auto;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child{
        font-size: 36px;
        color: #333333;
        font-weight: bold;
      }
      span:last-child{
        font-size: 46px;
        color: #F4888C;
        font-weight: bold;
      }
    }
    .payMethod{
      height:80px;
      font-size: 28px;
      color: #666666;
      background-color: rgb(245,245,245);
    }
    p{
      margin:0;
      padding-left:30px;
      height: 80px;
      line-height: 80px;
    }
    .payBy{
      width:100%;
      height: 80px;
      .payByCenter{
        width:690px;
        height: 80px;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
          display: flex;
          align-items: center;
          span{
            font-size: 32px;
            color: #333333;
          }
          img{
            margin-right: 5px;
            width:60px;
          }
        }
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .attachTips{
      width: 690px;
      margin: 20px auto;
        span{
            font-size: 30px;
          color: #999999;
        }
    }
    .confirmPay{
      width:100%;
      height: 80px;
      margin-top: 200px;
      .confirmCenter{
        width:690px;
        margin: 0 auto;
      }
      button{
        width:690px;
        border:none;
        outline: medium;
        height: 80px;
        border-radius: 7px;
        color: white;
        font-size:32px;
        background-color: #3d9bff;
      }
    }
  }
</style>
