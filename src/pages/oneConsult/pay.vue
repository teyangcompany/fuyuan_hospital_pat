<template>
  <div class="page">
    <top class="noflex" title="支付" ref="header">
      <div slot="right" class="right absolute">返回</div>
    </top>
    <div class="wrap">
      正在支付中...
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/app-header.vue'
  import {mainHeightMixin} from '../../lib/mixin'
  import config from '../../lib/config'
  import api from '../../lib/http'

  export default {
    components: {
      top
    },
    mixins: ['mainHeightMixin'],
    data() {
      return {
        id: ""
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      setTimeout((res) => {
        this.paySucc();
      }, 1000)

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
                  this.$router.push("/oneConsult/" + this.id)
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  console.log("支付过程中用户取消")
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  console.log("支付失败")
                  alert(JSON.stringify(res))
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            );
          }
          else {
            alert(res.msg)
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
</style>
