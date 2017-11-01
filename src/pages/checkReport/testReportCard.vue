<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="reportDetail" ref="reportDetail">
      <div>
        <div class="topBanner">
          <p>{{ reportInfoArray[specialIndex].assayitemname }}</p>
        </div>
        <div class="testType">
          <div class="type">
            <h4>NO.{{ reportInfoArray[specialIndex].assayitemno }}</h4>
          </div>
          <div class="name">
            <p class="first">姓名：{{ reportInfoArray[specialIndex].name }}</p>
            <p>科室：{{ reportInfoArray[specialIndex].deptname }}</p>
          </div>
          <div class="name">
            <p class="first">性别：{{ reportInfoArray[specialIndex].gender == 2? '女':'男' }}</p>
            <p>病区：{{ reportInfoArray[specialIndex].inspectDept }}</p>
          </div>
          <div class="name">
            <p class="first">年龄：{{ reportInfoArray[specialIndex].age }}</p>
            <p>床号：{{  reportInfoArray[specialIndex].bedNo }}</p>
          </div>
          <div class="name">
            <p class="first">送检医生：{{  reportInfoArray[specialIndex].sjdocname }}</p>
            <p>标本类型：{{ reportInfoArray[specialIndex].specimenType }}</p>
          </div>
          <div class="name lastArrangeName">
            <p class="first">检验医生：{{  reportInfoArray[specialIndex].inspectdocname }}</p>
            <p>检验样本号：{{ reportInfoArray[specialIndex].sampleNum }}</p>
          </div>
          <p class="checkDoctor">临床诊断：{{ reportInfoArray[specialIndex].assayname }}</p>
          <p>采集日期：{{ reportInfoArray[specialIndex].collectiondate }}</p>
          <p>检验日期：{{ reportInfoArray[specialIndex].checkdate }}</p>
          <div class="checkDoctor">
            <p>审核医生：{{ reportInfoArray[specialIndex].checkdocname }}</p>
          </div>
          <div class="detailTips">
            <p style="color: red;">具体报告信息请以医院纸质报告为准！</p>
          </div>
        </div>
        <div class="blank"></div>
        <div class="testInfo">
          <table>
            <tr style="text-align: center" class="title">
              <td>NO</td>
              <td>项目</td>
              <td>结果</td>
              <td>参考值</td>
              <td>单位</td>
            </tr>
            <tr v-for="(item,index) in experiment">
              <td>{{ item.assayitemcode }}</td>
              <td class="secondCol">{{ item.assayitemname }}</td>
              <td >{{ item.result }}
                <img v-if="status[index] == 'up'" src="../../../static/img/up@2x.png" alt="">
                <img v-else-if="status[index] == 'down'" src="../../../static/img/down@2x.png" alt="">
              </td>
              <td>{{ item.refrange}}</td>
              <td>{{ item.unit }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/bookApi'
  export default{
    data(){
      return{
        title:"检验报告",
        rightTitle:"",
        recordId:"",
        reportInfoArray:"",
        specialIndex:"",
        experiment:"",
        completeRange:[],
        lowValue:[],
        highValue:[],
        status:[],
        lowStatus:[],
        hosid:""
      }
    },
    created(){
      this.recordId = this.$route.query.recordId
      this.hosid = this.$route.query.hosid
      this.reportInfoArray = JSON.parse(this.$route.query.item)
      this.specialIndex = this.$route.query.specialIndex
      console.log(this.specialIndex)
      console.log(this.reportInfoArray)
      api("smarthos.yygh.apiQueryInspectionService.selectExamInfo",{
        token:localStorage.getItem('token'),
        hosid:this.hosid,
        orgid:this.hosid,
        assayno:this.recordId,
      }).then((data)=>{
        console.log(data,111)
        if(data.code == 0){
          this.experiment = data.list
          for(var i=0;i<data.list.length;i++){
             if( parseFloat(data.list[i].result)  > parseFloat(data.list[i].refrange.substr(data.list[i].refrange.indexOf('~') + 1))){
                 this.status.push('up')
             }else if(parseFloat(data.list[i].result)  < parseFloat(data.list[i].refrange.substr(0,data.list[i].refrange.indexOf('~')))){
               this.status.push('down')
             }else{
               this.status.push(' ')
             }

//
//             console.log(this.status)
//             console.log(data.list[i].refrange.substr(0,data.list[i].refrange.indexOf('~')))
          }

        }else if(!(data.msg)){
          weui.alert("网络错误，请稍后重试")
        }else{
          weui.alert(data.msg)
        }
      })
    },
    methods:{
      _initReportDetailScroll(){
        this.reportDetailScroll = new BScroll(this.$refs.reportDetail,{
          click:true
        })
        console.log(this.reportDetailScroll)
      }
    },
    components:{
      "VHeader":header
    },
    watch:{
      experiment(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initReportDetailScroll()
          },20)
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
    bottom: 0px;
    background-color: rgb(250,250,250);
    .topBanner{
      width:100%;
      min-height:80px;
      background-color: $mainColor;
      p{
        width:690px;
        min-height: 80px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        color: white;
        font-size: 32px;
        word-break: break-all;
      }
    }
    .testType{
      width:750px;
      /*<!--height: 495px;-->*/
      margin:0 auto;
      background-color: #ffffff;
      .type{
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        padding-bottom: 10px;
        h4{
          font-weight:normal;
          font-size: 32px;
          color: #333333;
          padding-left: 15px;
        }
        p{
          font-size: 32px;
          color: #333333;
        }
      }
      .name{
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        p{
          font-size: 28px;
          color: #999999;
          padding-left: 15px;
        }
        p.first{
          flex-basis: 300px;
        }
        p:nth-child(2),p:nth-child(3){
          flex:1;
        }
      }
      .lastArrangeName{
        padding-bottom: 15px;
      }
      .checkDoctor{
        text-align: left;
        padding-top: 10px;
        p{
          font-size: 28px;
          color: #999999;
          padding-left: 15px;
        }
      }
      .detailTips{
        font-size: 28px;
        color: #666666;
        padding-left: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      >p{
        font-size: 28px;
        color: #999999;
        padding-left: 15px;
        padding-top: 10px;
      }
      p.checkDoctor{
        padding-top: 0;
      }
    }
    .blank{
      width:100%;
      height: 20px;
      background-color: rgb(245,245,245);
    }
    .testInfo{
      width:750px;
      margin: 0 auto;
      background-color: #ffffff;
      table{
        width:750px;
        border-collapse: collapse;
        line-height: 50px;
        td{
          font-size: 28px;
          color: #666666;
          text-align: center;
          img{
            width:20px;
          }
        }
        .secondCol{
         width:350px;
        }
        tr:nth-child(even){
          background-color: rgb(250,250,250);
        }
        .title{
          td{
            font-size: 32px;
            color: #333333;
          }
        }
      }
    }
  }
</style>
