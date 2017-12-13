<template>
    <div class="wrapper">
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="center">
           <div class="topLine">
             <div>
               <p class="title">{{ patientInfo.patientname }}</p>
               <p> <span>科室：</span> <span>{{ patientInfo.deptname }}</span>  </p>
               <p> <span>床位号：</span> <span>{{ patientInfo.bedid }}</span>  </p>
               <p> <span>病案号：</span>
                 <span v-if="patientInfo.medcardno">{{ patientInfo.medcardno }}</span>
                 <span v-else>暂无病案号</span>
               </p>
               <p> <span>入院时间：</span> <span>{{ patientInfo.begintime }}</span>  </p>
             </div>
           </div>
         </div>
         <div class="recordCenter">
           <div class="payRecord">
             <div v-for="item in payRecord">
               <p>{{ item.payedTime }}</p>
               <p>缴纳 ¥{{ item.payAmount }}</p>
             </div>
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
            title:"缴费记录",
            rightTitle:"",
            hosid:"",
            payRecord:[]
          }
      },
      created(){
          this.patientInfo = JSON.parse(localStorage.getItem('patientInfo'))
          this.hosid = this.$route.query.hosid
          this.getLog()
      },
      components:{
          "VHeader":header
      },
      methods:{
          getLog(){
              http("smarthos.yygh.ApiPrepaidInpatientGoldService.queryRechargeRecord",{
                orgid:this.hosid,
                hosid:this.hosid,
                patientidentitycardnumber:"330726198911131517"
              }).then((data)=>{
                  console.log(data)
                if(data.code == 0){
                    this.payRecord = data.obj.paymentrecord
                }else{
                    weui.alert(data.msg)
                }
              })
          }
      }
  }
</script>
<style scoped lang="scss">
  .wrapper{
     position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow: auto;
    .center{
      width: 690px;
      margin:20px auto 0;
      background-color: white;
      border-radius: 15px;
      .topLine{
        >div{
          padding:5px 20px 5px 20px;
          .title{
            font-size: 34px;
            color: #333333;
            text-align: left;
            /*margin-bottom: 30px;*/
          }
          p{
            text-align: left;
            margin-bottom: 15px;
          }
        }
      }
    }
    .recordCenter{
      width: 100%;
      background-color: #ffffff;
      margin:20px auto 0;
      .payRecord{
        width: 690px;
        margin:0 auto;
        div{
            height: 90px;
            display: flex;
            justify-content: space-between;
           p{
             height: 90px;
             line-height: 90px;
           }
            p:nth-child(1){
                font-size: 32px;
                color: #333333;
            }
            p:nth-child(2){
                 font-size: 30px;
                color: #666666;
            }
        }
      }
    }
  }
</style>
