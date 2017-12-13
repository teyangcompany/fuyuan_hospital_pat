<template>
    <div>
        <div class="weui-cells weui-cells_checkbox" v-for="item in waitPayList">
          <label class="weui-cell weui-check__label">
            <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" name="checkbox1"  v-model="itemPickedAll"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd title">
              <p>{{ item.deptname }}</p>
              <p>{{ item.costdate }} </p>
            </div>
          </label>
          <label class="weui-cell weui-check__label" v-for="subItem in item.list" v-if="subItem">
            <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check"  v-model="itemPickedAll" name="checkbox1"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd content" @click="goDetail(subItem)">
              <p>{{ subItem.projecttype }}</p>
              <p>¥{{ subItem.totalcost }}</p>
            </div>
          </label>
        </div>
        <div v-if="waitPayList.length == 0 && isLoad" class="emptyStatus">
           <img src="../../../static/img/形状-8.png" alt="">
          <p>您没有需要支付的费用</p>
        </div>
        <div class="bottomTotal" v-if="waitPayList.length != 0 && isLoad">
          <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" for="s11">
              <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check" name="checkbox1" v-model="itemPickedAll"  id="s11" />
                <i class="weui-icon-checked"></i>
              </div>
              <div class="weui-cell__bd">
                <p>全选 共 <span>¥{{ totalPrice }}</span></p>
              </div>
            </label>
          </div>
          <div class="payBtn" @click="pay">
              立即支付
          </div>
        </div>
        <toast v-if="showToast"></toast>
    </div>
</template>
<script>
  import http from '../../lib/bookApi'
  import Toast from '../../base/toast.vue'
  export default{
      data(){
          return{
              waitPayList:[],
              itemPickedAll:false,
//              subItemPicked:[],
              pickedPrice:[],
              totalPrice:0,
              totalString:"",
              totalArray:[],
              returnInfo:"",
              showToast:false,
              pickedAll:false,
              ddid:"",
              addArray:[],
            isLoad:false
          }
      },
      created(){
        this.previousInfo =  JSON.parse(localStorage.getItem('attachContent'))
        this.getList()
      },
      components:{
        Toast
      },
      watch:{
        itemPickedAll(){
            console.log(this.itemPickedAll)
            if(this.itemPickedAll){
               this.addRelative()
            }else{
                this.totalPrice = 0
            }
        }
//        itemPickedAll(){
//           if(this.itemPickedAll.length == 0){
//             this.subItemPicked = []
//           }else{
//             this.pickedPrice = []
//             this.subItemPicked = []
//             this.totalPrice = 0
//             this.itemPickedAll.forEach((item)=>{
//               for(var i=0;i<item.list.length;i++){
//                 this.subItemPicked.push(item.list[i].uniqueId)
//                 this.pickedPrice.push(Number(item.list[i].totalcost))
//               }
//             })
//               this.sum()
//           }
//        },
//        subItemPicked(){
//            console.log(this.subItemPicked)
//        },
//        pickedAll(){
//            if(this.pickedAll){
//              this.waitPayList.forEach((item)=>{
//                   this.itemPickedAll.push(item)
//              })
//            }else{
//              this.itemPickedAll = []
//            }
//        }
      },
      methods:{
          addRelative(){
            this.waitPayList.forEach((item)=>{
              item.list.forEach((subItem,index)=>{
                 this.totalArray.push({
                   identificationnumber:subItem.identificationnumber,
                   medicalprescription:subItem.medicalprescription,
                   patientcode:subItem.patientcode
                 })
              })
            })
            this.unique()
            this.totalString = ''
            this.addArray.forEach((subItem,index)=>{
                 if(index == this.addArray.length - 1){
                   this.totalString +=  subItem.identificationnumber + '|' + subItem.medicalprescription + '|' + subItem.patientcode
                 }else{
                   this.totalString +=  subItem.identificationnumber + '|' + subItem.medicalprescription + '|' + subItem.patientcode + '|'
                 }
            })
            this.serverendSum()
          },
          unique(){
            var array = this.totalArray
            var flags = [], output = [], l = array.length, i;
            for( i=0; i<l; i++) {
              if( flags[array[i].identificationnumber] && flags[array[i].medicalprescription]) continue;
              flags[array[i].identificationnumber] = true;
              flags[array[i].medicalprescription] = true
              output.push({
                identificationnumber:array[i].identificationnumber,
                medicalprescription:array[i].medicalprescription,
                patientcode:array[i].patientcode
              });
            }
            this.addArray = output
            },
          serverendSum(){
              http("smarthos.yygh.ApiHosPayService.clinicPayPreSettlement",{
                orgid:this.previousInfo.hosId,
                identificationNumbers:this.totalString
              }).then((data)=>{
                  if(data.code == 0){
                        console.log(data,333)
                    this.totalPrice = data.obj.amount
                    this.ddid = data.obj.ddid
                  }else{
                      weui.alert(data.msg)
                  }
              })
          },
          pay(){
//              if(!this.ddid){
//                  weui.alert('请先选择支付项目')
//              }else{
                  http("smarthos.yygh.ApiHosPayService.pay",{
                    orgid:this.previousInfo.hosId,
                    ddid:"10000037",
                    patName:this.previousInfo.patName,
                    paymode:"2",
                    patid:this.previousInfo.patId,
                    patvisitid:this.previousInfo.id,
                  }).then((data)=>{
                    if(data.code ==0){
                      console.log(data)
                      this.returnInfo = JSON.parse(data.keyword)
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
                            weui.toast("支付成功")
                            this.$router.replace({
                                 path:"/payItem/payed"
                            })
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
//              }
          },
          getList(){
              this.showToast = true
              http("smarthos.yygh.ApiHosPayService.queryPendPayList",{
                orgid:this.previousInfo.hosId,
                patid:this.previousInfo.patId,
                patvisitid:this.previousInfo.id,
                type:"1"
              }).then((data)=>{
                this.showToast = false
                this.isLoad = true
                  if(data.code ==0 ){
                      console.log(data)
                     if(data.list){
                       this.waitPayList = data.list
                       this.waitPayList.forEach((item)=>{
                         item.list.forEach((subItem,index)=>{
                           subItem.uniqueId = `${item.deptname}${index}`
                         })
                       })
                     }
                  }else{
                      weui.alert(data.msg)
                  }
              })
          },
        goDetail(item){
            this.$router.push({
                 path:"/waitPayDetail",
                 query:{orgid:this.previousInfo.hosId,number:item.identificationnumber,paper:item.medicalprescription,name:item.projecttype}
            })
        }
      }
  }
</script>
<style scoped lang="scss">
.weui-cells{
   margin-top: 20px;
  .weui-cell__bd{
     display: flex;
     align-items: center;
     justify-content: space-between;
  }
  .title{
      p{
        font-size: 30px;
        color: #333333;
      }
  }
  .content{
      p{
         font-size: 30px;
         color: #666666;
      }
      p:nth-child(2){
        color: #F07818;
      }
  }
}
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
  .bottomTotal{
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    z-index:1000;
    height: 90px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    .payBtn{
      width: 210px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 30px;
      color: #FFFFFF;
      background-color: #FFB415;
    }
    .weui-cells{
       margin-top: 0;
      .weui-cell__bd{
         p{
           font-size: 30px;
           color: #333333;
            span{
               font-size: 30px;
               color: #F07818;
            }
         }
      }
    }
  }
</style>
