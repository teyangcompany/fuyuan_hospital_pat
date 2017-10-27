<template>
  <div class="page">
    <top class="noflex" title="支付" ref="header">
      <!--<div slot="right" class="right absolute">返回</div>-->
    </top>
    <div class="payInfo">
      <div class="paySum border-1px">
        <span>订单金额</span>
        <span v-if="fee">{{ fee | consultPrice }}</span>
        <span v-else>{{ roomPrice | consultPrice }}</span>
      </div>
      <p class="border-1px payMethod">支付方式:</p>
      <div class="payBy border-1px">
        <div class="payByCenter">
          <div>
            <img src="../../../static/img/weixin1.jpg" alt="">
            <span>微信</span>
          </div>
          <div class="icon_sp_area">
            <i class="weui-icon-success"></i>
          </div>
        </div>
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
  import top from '../../components/app-header.vue'
  import {mainHeightMixin} from '../../lib/mixin'
  import { consultPrice } from '../../lib/filter'
  import config from '../../lib/config'
  import api from '../../lib/http'

  export default {
    components: {
      top
    },
    mixins: [mainHeightMixin],
    data() {
      return {
        id: "",
        paySort:"",
        fee:"",
        roomPrice:""
      }
    },
    filters:{
      consultPrice
    },
    mounted() {
      this.id = this.$route.params.id;
      this.fee = this.$route.query.fee
      this.paySort = this.$route.query.dept
      this.roomPrice = this.$route.query.roomPrice
//      setTimeout((res) => {
//        this.paySucc();
//      }, 1000)

    },
    methods: {
      paySucc() {
        api('smarthos.consult.pay', {
          consultId: this.id
        }).then(res => {
          if (res.code == 0 && res.obj) {
            this.returnInfo = JSON.parse(res.obj)
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
                    if(this.paySort == 'dept'){
                      this.$router.push("/consuitDetail/" + this.id)
                    }else{
                      this.$router.push("/oneConsult/" + this.id)
                    }
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  console.log("支付过程中用户取消")
                  this.$router.back(-1)
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  console.log("支付失败")
                  this.$router.back(-1)
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
  @import '../../common/common.scss';

  .wrap {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: blue;
  }
  .payInfo{
    position: fixed;
    top: 188px;
    left:0;
    right:0;
    bottom:0;
    .paySum{
      width:100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child{
        font-size: 28px;
        color: #999999;
      }
      span:last-child{
        font-size: 36px;
        color: #333333;
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
        background-color: #3CC51F;
      }
    }
  }
</style>
