<template>
    <div class="allItem">
      <div v-for="(item,index) in payList" class="noEmpty">
        <div class="listWrap">
          <div class="imgArea border-1px" @click="makeBig(item.forID)">
            <img :id='item.forID' alt="">
          </div>
          <div class="itemStatus">
              <p v-if="item.executionstatus == '0'">（已付款）</p>
              <p v-else-if="item.executionstatus == '1'">（已取药）</p>
              <p v-else-if="item.executionstatus == '2'">（已执行）</p>
          </div>
          <div class="itemArea">
            <div class="leftName">
              <p>收费项目：</p>
              <p>费用：</p>
              <p>发票号：</p>
              <p>收款人：</p>
              <p>时间：</p>
              <p>备注：</p>
            </div>
            <div class="rightDetail">
              <p>西药费用Lorem ipsum dolor sit amet</p>
              <p class="money">¥{{ item.totalcost }}</p>
              <p>{{ item.invoicenumber }}</p>
              <p>{{ item.cashierclerk }}</p>
              <p>{{ item.costdate }}</p>
              <p>{{ item.remark }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="payList.length == 0 && isLoad" class="emptyStatus">
        <img src="../../../static/img/形状-8.png" alt="">
        <p>您没有已支付的项目</p>
      </div>
      <toast v-if="showToast"></toast>
    </div>
</template>
<script>
  import http from '../../lib/bookApi'
  import JsBarcode from 'jsbarcode'
  import Toast from '../../base/toast.vue'
  export default{
      data(){
          return{
              payList:[],
            isLoad:false,
            showToast:false
          }
      },
      created(){
        this.previousInfo =  JSON.parse(localStorage.getItem('attachContent'))
        console.log(this.previousInfo,666)
        this.getList()
      },
      components:{
        Toast
      },
      methods:{
          getList(){
              this.showToast = true
              http("smarthos.yygh.ApiHosPayService.completePayList",{
                orgid:this.previousInfo.hosId,
                idcard:this.previousInfo.idCard
              }).then((data)=>{
                this.showToast = false
                this.isLoad = true
                  if(data.code == 0){
                      this.payList = data.list
                      this.payList.forEach((item,index)=>{
                            item.forID = `id${index}`
                      })
                      this.$nextTick(()=>{
                        this.payList.forEach((item,index)=>{
                          console.log(item.invoicenumber)
                          JsBarcode(`#${item.forID}`, item.invoicenumber,{
//                            lineColor: "#F07818",
                            height:40,
                            width:2
                          });
                        })
                      })
                      console.log(data)
                  }else{
                      weui.alert(data.msg)
                  }
              })
          },
          makeBig(forId){
            var img =  document.getElementById(forId).src
            wx.previewImage({
              current: img,
              urls: [img]
            })
          }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common';
  .allItem{
    /*width:100%;*/
    /*margin-top: 20px;*/
    /*overflow: auto;*/
    .emptyStatus{
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 566px;
        height: 715px;
      }
      p{
        margin-top: 30px;
        font-size: 32px;
        color: #666666;
      }
    }
    .noEmpty{
      width:100%;
      margin-bottom: 20px;
      background-color: white;
      .listWrap{
        width: 690px;
        margin:0 auto;
        .imgArea{
          height:210px;
          text-align: center;
          img{
            /*height:150px;*/
            /*width:500px;*/
            margin-top: 30px;
          }
        }
        .itemStatus{
          width:100%;
          margin-top: 20px;
          P{
            text-align: center;
            font-size: 30px;
            color: $mainColor;
          }
        }
        .itemArea{
          height:360px;
          display: flex;
          padding-top: 15px;
          .leftName{
            height:200px;
            p{
              font-size: 28px;
              color: #333333;
              margin-bottom: 20px;
            }
          }
          .rightDetail{
            p{
              font-size: 28px;
              color: #333333;
              margin-bottom: 20px;
            }
            .money{
              color: #F07818;
            }
          }
        }
      }
    }
  }
</style>
