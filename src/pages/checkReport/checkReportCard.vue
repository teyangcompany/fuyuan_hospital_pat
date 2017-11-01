<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="reportDetail" ref="reportDetail">
      <div>
        <div class="testType">
          <div class="type" style="background-color: #3d9bff;">
            <h4 style="color: white;">{{  reportInfoArray[specialIndex].inspectitemname }}</h4>
          </div>
          <div class="name firstLine">
            <p class="first">姓名:{{reportInfoArray[specialIndex].name}}</p>
            <p>送检医生:{{ reportInfoArray[specialIndex].sjdocname }}</p>
          </div>
          <div class="name">
            <p class="first">性别:{{reportInfoArray[specialIndex].compatGender == 'sex'?'女':'男'}}</p>
            <p>检验医生:</p>
          </div>
          <div class="name">
            <p class="first">年龄:{{reportInfoArray[specialIndex].age}}</p>
            <p>审核医生:{{ reportInfoArray[specialIndex].checkdocname }}</p>
          </div>
          <p>送检时间:{{ reportInfoArray[specialIndex].sendTime }}</p>
          <p>检验时间:{{ reportInfoArray[specialIndex].inspectdate }}</p>
          <div class="detailTips">
            <p style="color: red;">具体报告信息请以医院纸质报告为准！</p>
          </div>
        </div>
        <div class="blank"></div>
        <div class="testInfo">
          <div class="result">
            <h5>检查结果:</h5>
            <p>{{ reportInfoArray[specialIndex].inspectresult }}</p>
          </div>
        </div>
        <div class="blank"></div>
        <div class="testInfo">
          <div class="result">
            <h5>检查结果描述:</h5>
            <p>{{ reportInfoArray[specialIndex].inspectdes }}</p>
          </div>
        </div>
        <div class="assistArea" style="height: 100px;">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import api from '../../lib/bookApi'
  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        title:"检查报告",
        rightTitle:"",
        reportInfoArray:"",
        index:"",
        allPatient:"",
        specialIndex:""
      }
    },
    methods:{
      cardScroll(){
        this.cardScroll = new BScroll(this.$refs.reportDetail,{
          click:true
        })
      }
    },
    created(){
      this.reportInfoArray = JSON.parse(this.$route.query.reportInfoString)
      this.index = this.$route.query.index
      this.specialIndex = this.$route.query.specialIndex
      console.log( this.specialIndex)
      console.log(this.reportInfoArray)
//      api("smarthos.yygh.apiQueryInspectionService.selectCheckList",{
//        token:localStorage.getItem('token'),
//      }).then((data)=>{
//        if(data.code == 0){
//          this.allPatient=data.list
//        }else if(!(data.msg)){
//          weui.alert("网络错误，请稍后重试")
//        }else{
//          weui.alert(data.msg)
//        }
//        console.log(data.list)
//      })
    },
    components:{
      "VHeader":header
    },
    watch:{
      allPatient(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.cardScroll()
          },100)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common';
  .reportDetail{
    position: absolute;
    top: 100px;
    left:0;
    right:0;
    bottom:0;
    background-color: rgb(250,250,250);
    .testType{
      width:750px;
      min-height: 200px;
      margin:0 auto;
      padding-bottom: 10px;
      background-color: #ffffff;
      .type{
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        h4{
          font-weight:normal;
          font-size: 32px;
          color: #333333;
          padding-left: 15px;
          padding-bottom: 15px;
        }
        p{
          font-size: 32px;
          color: #333333;
          padding-left: 15px;
        }
      }
      .firstLine{
          margin-top: 10px;
      }
      .name{
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        p{
          font-size: 28px;
          color: #999999;
          padding-left: 15px;
        }
        p.first{
          flex-basis: 200px;
        }
        p:nth-child(2),p:nth-child(3){
          flex:1;
        }
      }
      .detailTips{
        font-size: 28px;
        color: #666666;
        padding-left: 15px;
        margin-top: 10px;
      }
      >p{
        font-size: 28px;
        color: #999999;
        padding-left: 15px;
        margin-bottom: 3px;
      }
    }
    .blank{
      width:100%;
      height: 20px;
      background-color: rgb(245,245,245);
    }
    .testInfo{
      width:750px;
      /*height: 500px;*/
      margin: 0 auto;
      background-color: #ffffff;
      .result,.resultDes{
        padding:10px 0 10px 0;
        h5{
          font-weight: normal;
          color: #333333;
          font-size: 32px;
          padding-left: 15px;
          padding-top: 10px;
        }
        p{
          font-size: 28px;
          color: #999999;
          padding-top: 10px;
          padding-left: 15px;
        }
      }
      .result{
        padding-top: 5px;
      }
      .resultDes{
        margin-top: 10px;
      }
    }
  }
</style>
