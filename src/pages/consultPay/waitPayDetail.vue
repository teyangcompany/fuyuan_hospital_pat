<template>
    <div class="wrapDetail">
          <v-header :title="name" :rightTitle="rightTitle"></v-header>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <img src="../../../static/img/就诊科室@2x.png" alt="" style="width:30px;margin-right:10px;display:block">
              </div>
              <div class="weui-cell__bd">
                <p>就诊科室</p>
              </div>
              <div class="weui-cell__ft">{{ displayInfo.deptname }}</div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <img src="../../../static/img/就诊医生@2x.png" alt="" style="width:30px;margin-right:10px;display:block">
              </div>
              <div class="weui-cell__bd">
                <p>就诊医生</p>
              </div>
              <div class="weui-cell__ft">{{ displayInfo.docname }}</div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <img src="../../../static/img/费用名称@2x.png" alt="" style="width:30px;margin-right:10px;display:block">
              </div>
              <div class="weui-cell__bd">
                <p>{{ name }}</p>
              </div>
              <div class="weui-cell__ft" style="color: #F07818;">¥{{ displayInfo.totalcost }}</div>
            </div>
          </div>
          <div class="itemList">
            <div class="itemDetail border-1px" v-for="item in payList">
              <p>
                <span>{{ item.costname }}({{ item.unit }}) </span>
                <span>¥{{ item.price }}x{{ item.itemnumber }}</span>
              </p>
              <p>¥{{ item.amount }}</p>
            </div>
          </div>
        <toast v-if="showToast"></toast>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import Toast from '../../base/toast.vue'
  import http from '../../lib/bookApi'
  export default{
      data(){
          return{
              title:"",
              rightTitle:"",
              displayInfo:"",
              showToast:false,
              payList:[]
          }
      },
      created(){
          this.name = this.$route.query.name
           this.orgid =  this.$route.query.orgid
         this.number =  this.$route.query.number
        this.paper = this.$route.query.paper
        this.getDetail()
      },
      components:{
          "VHeader":header,
          Toast
      },
      methods:{
           getDetail(){
               this.showToast = true
               http("smarthos.yygh.ApiHosPayService.queryPayInfo",{
                 orgid:this.orgid,
                 identificationnumber:this.number,
                 medicalprescription:this.paper,
               }).then((data)=>{
                 this.showToast = false
                   if(data.code == 0){
                       console.log(data)
                      this.displayInfo = data.obj
                      this.payList = data.obj.list
                   }else{
                       weui.alert(data.msg)
                   }
               })
           }
      }
  }
</script>
<style scoped lang='scss'>
  .wrapDetail{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow: auto;
    .weui-cells{
      margin-top: 0;
    }
    .itemList{
      width: 100%;
      background-color: white;
      margin-top: 20px;
      .itemDetail{
        width:690px;
        height: 90px;
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p:nth-child(1){
          display: flex;
          flex-direction: column;
          span{
            font-size: 30px;
            color: #666666;
          }
        }
        p:nth-child(2){
          font-size: 30px;
          color: #F07818;
        }
      }
    }
  }
</style>
