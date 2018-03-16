<template>
  <div>
    <v-header :title="hosName" :rightTitle="rightTitle"></v-header>
    <div class="wrap" v-if="!displayStatus">
         <div class="info">
           <div class="center">
             <div class="topLine">
               <p class="title">{{ patientInfo.patientname }} <span class="payLog" @click="goLog">缴费记录</span></p>
               <div class="brief">
                 <p><span>科室：</span> {{ patientInfo.deptname }}</p>
                 <p><span>床位号：</span>{{ patientInfo.bedid }}</p>
                 <p v-if="patientInfo.medcardno">病案号：{{ patientInfo.medcardno }}</p>
                 <p v-else>病案号：暂无病案号</p>
                 <p> <span>入院时间：{{ patientInfo.begintime }}</span>  </p>
               </div>
             </div>
             <div class="secondLine">
               <div>
                    <p>总计费用</p>
                    <p v-if="patientInfo.totalamount != 0">¥{{ patientInfo.totalamount }}</p>
                    <p v-else>--</p>
               </div>
               <div>
                 <p>共交预缴金</p>
                 <p v-if="patientInfo.payamount != 0">¥{{ patientInfo.payamount }}</p>
                 <p v-else>--</p>
               </div>
               <div>
                 <p>预缴金余额</p>
                 <p>--</p>
               </div>
             </div>
           </div>
           <div class="bottomLine" @click="payMoney">
             缴纳住院预缴金
           </div>
         </div>
         <div class="timeArea border-1px">
           <p class="large" @click="selectStart" v-if="wholeStart">{{ wholeStart }}</p>
           <p class="large" @click="selectStart" v-else>{{ now }}</p>
         </div>
         <div class="historyList">
             <div class="topSelect border-1px">
                 <div class="previous">
                   <img src="../../../static/img/left@2x.png" alt="">
                   <p @click="getcompleteTime('negative')">前一天</p>
                 </div>
                 <div class="middleTime">
                   <p class="middle" v-if="totalMount">合计费用:¥{{ totalMount }}</p>
                 </div>
                 <div class="next">
                   <p @click="getcompleteTime('add')">后一天</p>
                   <img src="../../../static/img/left@2x.png" alt="">
                 </div>
             </div>
             <!--<div class="topSelect border-1px" v-if="totalMount">-->
               <!--<p>当日费用合计</p>-->
               <!--<p></p>-->
               <!--<p>¥{{ totalMount }}</p>-->
             <!--</div>-->
         </div>
         <div class="itemList" v-for="item in historyList">
           <div class="topSelect border-1px-dashed">
             <p>项目名称 {{ item.chargeName }}</p>
             <!--<p></p>-->
             <!--<p>{{ item.chargeName }}</p>-->
           </div>
           <div class="itemDetail border-1px" v-for="subItem in item.costList">
               <p>
                   <span v-if="subItem.costUnit">{{ subItem.costName }} ({{ subItem.costUnit }})</span>
                   <span v-else>{{ subItem.costName }} {{ subItem.costUnit }}</span>
                   <span>¥{{ subItem.costUnitPrice }} x {{ subItem.costQuantity }}</span>
               </p>
               <p>¥{{ subItem.costSubtotal }}</p>
           </div>
         </div>
    </div>
    <div v-else class="emptyStatus">
        <img src="../../../static/img/形状-8.png" alt="">
        <p>暂无相关记录</p>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
    import header from '../../base/header.vue'
    import {formatDate} from '../../lib/filter'
    import Toast from '../../base/toast.vue'
    import http from '../../lib/bookApi'
   export default{
       data(){
           return{
               title:"",
               rightTitle:"",
               patientInfo:"",
               idCard:"",
               totalMount:"",
               historyList:[],
               wholeStart:"",
               now:"",
              date:"",
              i:0,
             displayStatus:false,
             showToast:false
           }
       },
       components:{
            "VHeader":header,
            Toast
       },
       created(){
           this.hosName = this.$route.query.hosName
           this.id = this.$route.query.id
           this.patid = this.$route.query.patId
           this.hosid = this.$route.query.hosId
           this.now = this.previousDay()
           this.getInfo()
         var dd = new Date();
         console.log(dd.getDate(),434)
       },
       watch:{
         wholeStart(){
             this.getList()
         }
       },
       methods:{
            getInfo(){
                 this.showToast = true
                  http("smarthos.yygh.ApiPrepaidInpatientGoldService.zyryxx",{
                    patvisitid:this.id,
                    patid:this.patid,
                    hosid:this.hosid,
                  }).then((data)=>{
                      console.log(data)
                      if(data.code == 0){
                        this.patientInfo = data.obj
                        this.idCard = data.obj.idcard
                        this.getList()
                      }else if(data.code == 1){
                        this.showToast = false
                          this.displayStatus = true
                      }else{
                        this.showToast = false
                          weui.alert(data.msg)
                      }
                  })
            },
            getList(){
                  http("smarthos.yygh.ApiPrepaidInpatientGoldService.queryDailyHospitalizationList",{
                    orgid:this.hosid,
                    hosid:this.hosid,
//                    patientidentitycardnumber:"330726198911131517",
                    patientidentitycardnumber:this.idCard,
                    costdate:this.wholeStart ? this.wholeStart : this.now
                  }).then((data)=>{
                      this.showToast = false
                      if(data.code == 0){
                          console.log(data)
                          if(data.obj){
                            this.totalMount = data.obj.totalcost
                            this.historyList = data.obj.maincostlist
                          }else{
//                              weui.toast(data.msg)
                            this.totalMount = ''
                            this.historyList = ''
                          }
                      }else{
                          weui.alert(data.msg)
                      }
                  })
            },
           getcompleteTime(value){
             if(value == 'add'){
               this.i = this.i + 1
               if(this.wholeStart == this.now || this.wholeStart == ''){
                 weui.alert("最多只能查询到当前日期")
                 return
               }
             }else{
               this.i = this.i - 1
               if(this.wholeStart == this.patientInfo.begintime.substr(0,10)){
                 weui.alert("最多只能查询到当前日期")
                 return
               }
             }
             var dd = new Date();
             dd.setDate(dd.getDate()-1+this.i);//获取AddDayCount天后的日期
             var y = dd.getFullYear().toString();
             var month = dd.getMonth()+1;//获取当前月份的日期
             var d = dd.getDate();

             this.wholeStart = (y) + '-'+ (month < 10 ? "0" + month : month) + '-'+ (d < 10 ? "0" + d : d);
           },
            previousDay(){
             var dd = new Date();
             dd.setDate(dd.getDate()-1);//获取AddDayCount天后的日期
             var y = dd.getFullYear().toString();
             var month = dd.getMonth()+1;//获取当前月份的日期
             var d = dd.getDate();
             return (y) + '-'+ (month < 10 ? "0" + month : month) + '-'+ (d < 10 ? "0" + d : d);
           },
           selectStart(){
             let that =this
             let pastTime = this.patientInfo.begintime.substr(0,10)
             weui.datePicker({
               start: pastTime,
               end: this.now,
               defaultValue: [new Date().getFullYear(), new Date().getMonth()+1 , new Date().getDate()],
               onChange: function(result){
               },
               onConfirm: function(result){
                 that.$set(that.$data,'date',result)
                 let year = that.date[0].label.substr(0,4)
                 let month = that.date[1].label.substr(2,1) != '' ? that.date[1].label.substr(0,2) : '0'+ that.date[1].label.substr(0,1)
                 let day = that.date[2].label.substr(2,1) != '' ? that.date[2].label.substr(0,2) : '0'+ that.date[2].label.substr(0,1)
                 that.wholeStart = year + '-' + month + '-' + day
               },
             })
           },
           payMoney(){
                this.$router.push({
                     path:"/prePay",
                    query:{patid:this.patid,hosid:this.hosid,id:this.id}
                })
           },
          goLog(){
               localStorage.setItem('patientInfo',JSON.stringify(this.patientInfo))
               this.$router.push({
                   path:"/payLog",
                   query:{hosid:this.hosid,idCard:this.idCard}
               })
          }
       }
   }
</script>
<style scoped lang="scss">
  @import '../../common/common';
   .wrap{
       position: absolute;
       top:98px;
       left:0;
       right:0;
       bottom:0;
       overflow: scroll;
     .info{
        width: 690px;
        background-color: white;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        margin:30px auto 0;
       .bottomLine{
         height: 90px;
         color: white;
         font-size: 30px;
         line-height: 90px;
         text-align: center;
         background-color: $mainColor;
         border-bottom-left-radius: 15px;
         border-bottom-right-radius: 15px;
       }
       .center{
         width: 650px;
         margin:0 auto;
         .topLine{
           padding:30px 0 0px 0 ;
           border-bottom: 1px dashed #F1F1F1;
           .title{
             font-size: 34px;
             color: #333333;
             text-align: left;
             margin-bottom: 10px;
             .payLog{
               font-size: 30px;
               color:#3d9bff;
             }
           }
           .brief{
             text-align: left;
             margin-bottom: 30px;
             position: relative;
             p{
               text-align: left;
               font-size: 30px;
               color: #666666;
               margin-bottom: 10px;
             }
           }
         }
         .secondLine{
              margin-top: 40px;
             margin-bottom: 20px;
              display: flex;
             justify-content: space-between;
             >div{
                 p:nth-child(1){
                    font-size: 28px;
                   color: #666666;
                 }
                 p:nth-child(2){
                     margin-top: 20px;
                     font-size: 28px;
                    color: #F07818;
                 }
             }
         }
       }
     }
     .timeArea{
       width:100%;
       margin-top: 30px;
       background-color: white;
       height: 80px;
       line-height: 80px;
       padding-left: 30px;
       .large{
           font-size: 34px;
           color: #333333;
       }
     }
     .historyList{
       width: 100%;
       margin:0px auto 0;
       background-color: white;
       .topSelect{
         width:690px;
         height: 90px;
         margin: 0 auto;
         display: flex;
         align-items: center;
         justify-content: space-between;
         p{
             font-size: 34px;
             color: #333333;
         }
         .previous,.next{
            display: flex;
             p{
               font-size: 30px;
               color: #666666;
             }
             img{
               width: 20px;
               height:32px;
             }
         }
         .middleTime{
           display: flex;
           align-items: center;
           img{
             width: 24px;
             height:18px;
             margin-left: 10px;
           }
         }
         .previous{
            img{
              margin-right: 10px;
            }
         }
         .next{
             img{
                transform: rotate(180deg);
                margin-left: 10px;
             }
         }
         .middle{
           font-size: 30px;
           color: #666666;
         }
       }
     }
     .itemList{
       width: 100%;
       background-color: white;
       .topSelect{
         width:690px;
         height: 90px;
         margin: 0 auto;
         display: flex;
         align-items: center;
         justify-content: space-between;
         p:nth-child(1){
           font-size: 30px;
           color: #333333;
         }
         p:nth-child(3){
           font-size: 34px;
           color: #333333;
         }
       }
       .itemDetail{
         width:690px;
         height: 90px;
         margin: 0 auto 0px;
         padding-left: 40px;
         display: flex;
         align-items: center;
         justify-content: space-between;
         p:nth-child(1){
           display: flex;
           flex-direction: column;
           span{
              font-size: 30px;
              color: #999999;
           }
         }
         p:nth-child(2){
            font-size: 30px;
            color: #999999;
         }
       }
     }
   }
  .emptyStatus{
       position: absolute;
    top: 98px;
    left:0;
    right:0;
    bottom:200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 566px;
      height: 715px;
    }
    p{
        margin-top: 40px;
        font-size: 32px;
        color: #666666;
    }
  }
</style>
