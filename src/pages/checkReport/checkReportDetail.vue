<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="checkList">
      <div>
        <div class="topMenu border-1px-top">
          <p class="picked" @click="seeTime('一个月内')">一个月内</p>
          <p @click="seeTime('近三个月')">近三个月</p>
          <p @click="seeTime('三至六个月')">三至六个月</p>
        </div>
        <div class="wrapContent" ref="wrapContent">
          <div>
            <!--<div v-if="reportInfo == 1" class="loading">-->
              <!--<img src="../../../static/img/loading.gif" alt="">-->
              <!--<span>正在很努力的加载中...</span>-->
            <!--</div>-->
            <div v-if="isChanged && reportInfo.length == 0 " class="tips">
              <span>抱歉，未能查询到您的相关报告</span>
            </div>
            <div v-else-if="isChanged && reportInfo.length > 0">
              <router-link tag="div" :to="{path:'/checkReportCard',query:{specialIndex:index,reportInfoString:reportInfoString}}" class="checkCenter" style="display: block" v-for="(item,index) in reportInfo" :key="item.id">
                <div class="reportList">
                  <h3 class="border-1px">{{ item.inspectitemname }}</h3>
                  <p><span>{{ hosName }}</span></p>
                  <p><span>{{ item.name }}</span><span>{{ item.checkdate }}</span></p>
                </div>
              </router-link>
            </div>
            <div class="assistScroll" style="height: 20px;">

            </div>
            <toast v-if="showToast"></toast>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import api from '../../lib/bookApi'
  import BScroll from 'better-scroll'
  import Toast from '../../base/toast.vue'
//  import weui from 'weui.js'
//  import {tokenCache} from '../../../lib/cache'
  export default{
    data(){
      return{
        title:"检查报告",
        rightTitle:"",
        selectValue:"检查报告",
        patCard:"",
        compatId:"",
        index:"",
        reportInfo:[],
        report:[],
        isChanged:false,
        reportInfoString:"",
        oneWeek:"",
        threeMonth:"",
        halfYear:"",
        oneYear:"",
        nowTime:"",
        hosid:"",
        hosName:"",
        showToast:false
      }
    },
    mounted(){
      this.$nextTick(()=>{
        var ps = document.getElementsByClassName("topMenu")[0].getElementsByTagName("p")
//           var divs = document.getElementsByClassName("checkCenter")
        var lastIndex = 0;
        console.log(ps)
        for(var i=0;i<ps.length;i++){
          ps[i].index = i;
          ps[i].onclick = function(){
            ps[lastIndex].className = ""
//                   divs[lastIndex].style.display = 'none'
            this.className = 'picked'
//                   divs[this.index].style.display = 'block'
            lastIndex = this.index;
          }
        }
        this.oneWeek = this.GetDateStr(7)
        this.threeMonth = this.getMonth(3)
        this.halfYear = this.getMonth(6)
        this.oneYear = this.getMonth(12)
        this.nowTime = this.getNow()
        console.log(this.getMonth(12))
        console.log()
      })
    },
    created(){
//      this.selectValue = this.$route.query.selectValue
      this.hosName = this.$route.query.hosName
      this.hosid = this.$route.query.hosId
      this.index= this.$route.query.index
      this.patCard = this.$route.query.patCard
      this.specialIndex = this.$route.query.specialIndex
      this.threeMonth = this.getMonth(3)
      this.oneWeek = this.GetDateStr(7)
      this.nowTime = this.getNow()
      this.showToast = true
        api("smarthos.yygh.apiQueryInspectionService.selectCheckList",{
          token:localStorage.getItem('token'),
          orgid:this.hosid,
          hosid:this.hosid,
          idcard:this.patCard,
//          idcard:this.patCard,
          bdate:this.oneWeek,
          edate:this.nowTime,
        }).then((data)=>{
          this.showToast = false
          this.isChanged = true
          if(data.code == 0){
             if(data.list){
               this.reportInfo = data.list
               this.reportInfoString = JSON.stringify(this.reportInfo)
             }else{
                 this.reportInfo = this.report
             }
            console.log(data)
          }else if(!(data.msg)){
            weui.alert("网络错误，请稍后重试")
          }else{
            weui.alert(data.msg)
          }
        })

    },
    methods:{
      _initCheckScroll(){
        this.checkScroll = new BScroll(this.$refs.wrapContent,{
          click:true
        })
      },
      GetDateStr(i){
        var dd = new Date();
        dd.setDate(dd.getDate()-i);//获取AddDayCount天后的日期
        var y = dd.getFullYear().toString();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y + (month < 10 ? "0" + month : month) + (d < 10 ? "0" + d : d);
      },
      getNow(){
        var dd = new Date();
        var y = dd.getFullYear().toString();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y + (month < 10 ? "0" + month : month)+(d < 10 ? "0" + d : d);
      },
      getMonth(i){
        var dd = new Date();
        dd.setMonth(dd.getMonth()- i)
        var y = dd.getFullYear().toString();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y + (month < 10 ? "0" + month : month)+(d < 10 ? "0" + d : d);
      },
      seeTime(time){
        if(time == "一个月内"){
          this.showToast = true
          if(this.selectValue == '检查报告'){
            api("smarthos.yygh.apiQueryInspectionService.selectCheckList",{
              token:localStorage.getItem('token'),
              idcard:"620321196303280021",
              orgid:this.hosid,
              hosid:this.hosid,
              bdate:this.oneWeek,
              edate:this.nowTime,
            }).then((data)=>{
              this.showToast = false
              this.isChanged = true
              if(data.code == 0){
                if(data.list){
                  this.reportInfo = data.list
                  this.reportInfoString = JSON.stringify(this.reportInfo)
                }else{
                  this.reportInfo = this.report
                }
                console.log(data)
              }else{
                weui.alert(data.msg)
              }
            })
          }
        }else if(time == '近三个月'){
          this.showToast = true
          if(this.selectValue == '检查报告'){
            api("smarthos.yygh.apiQueryInspectionService.selectCheckList",{
              token:localStorage.getItem('token'),
              idcard:"620321196303280021",
              orgid:this.hosid,
              hosid:this.hosid,
              bdate:this.threeMonth,
              edate:this.nowTime,
            }).then((data)=>{
              this.showToast = false
              this.isChanged = true
              if(data.code == 0){
                if(data.list){
                  this.reportInfo = data.list
                  this.reportInfoString = JSON.stringify(this.reportInfo)
                }else{
                  this.reportInfo = this.report
                }
                console.log(data)
              }else if(!(data.msg)){
                weui.alert("网络错误，请稍后重试")
              }else{
                weui.alert(data.msg)
              }
            })
          }
        }else if(time == '三至六个月'){
          this.showToast = true
          if(this.selectValue == '检查报告'){
            api("smarthos.yygh.apiQueryInspectionService.selectCheckList",{
              token:localStorage.getItem('token'),
              idcard:"620321196303280021",
              orgid:this.hosid,
              hosid:this.hosid,
              bdate:this.halfYear,
              edate:this.threeMonth,
            }).then((data)=>{
              this.showToast = false
              this.isChanged = true
              if(data.code == 0){
                if(data.list){
                  this.reportInfo = data.list
                  this.reportInfoString = JSON.stringify(this.reportInfo)
                }else{
                  this.reportInfo = this.report
                }
                console.log(data)
              }else if(!(data.msg)){
                weui.alert("网络错误，请稍后重试")
              }else{
                weui.alert(data.msg)
              }
            })
          }
        }else{
          this.showToast = true
          if(this.selectValue == '检查报告'){
            api("smarthos.yygh.apiQueryInspectionService.selectCheckList",{
              token:localStorage.getItem('token'),
              idcard:this.patCard,
              orgid:this.hosid,
              hosid:this.hosid,
              bdate:this.oneYear,
              edate:this.nowTime,
            }).then((data)=>{
              this.showToast = false
              this.isChanged = true
              if(data.code == 0){
                if(data.list){
                  this.reportInfo = data.list
                  this.reportInfoString = JSON.stringify(this.reportInfo)
                }else{
                  this.reportInfo = this.report
                }
                console.log(data)
              }else if(!(data.msg)){
                weui.alert("网络错误，请稍后重试")
              }else{
                weui.alert(data.msg)
              }
            })
          }
        }
      }
    },
    components:{
      "VHeader":header,
      Toast
    },
    watch:{
      reportInfo(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this. _initCheckScroll()
          },100)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .checkList{
    position: absolute;
    top: 99px;
    left:0;
    right:0;
    bottom:0;
    .topMenu{
      height:80px;
      display: flex;
      z-index:100;
      align-items: center;
      background-color: #FFFFFF;
      P{
        flex:1;
        text-align: center;
        height:90px;
        line-height: 90px;
        font-size: 28px;
        color: #999999;
      }
      .picked{
        color: $mainColor;
        border-bottom:2px solid $mainColor;
      }
    }
    >div{
      .wrapContent{
        position: absolute;
        top:85px;
        left:0;
        right:0;
        bottom:0;
        >div{
          .tips{
            position: absolute;
            top: 90px;
            left:0;
            right:0;
            bottom:0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            /*img{*/
            /*width:100px;*/
            /*margin-bottom: 10px;*/
            /*}*/
            span{
              font-size: 32px;
              color: #999999;
            }
          }
          >div{
            .checkCenter{
              width:690px;
              height:197px;
              margin: 0 auto;
              display: none;
              border-radius: 10px;
              background-color: #FFFFFF;
              .reportList{
                margin-top: 15px;
                border-radius: 7px;
                height:197px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                /*<!--background-color: $bgColor2;-->*/
                h3{
                  font-weight: normal;
                  font-size: 36px;
                  color: #333333;
                  padding-top: 15px;
                  padding-bottom: 15px;
                  padding-left: 15px;
                }
                p{
                  margin-top: 15px;
                  padding-bottom: 15px;
                  font-size: 28px;
                  color: #999999;
                  font-family: PingFangSC;
                  display: flex;
                  justify-content: space-between;
                  span:nth-child(1){
                    margin-left: 15px;
                  }
                  span:nth-child(2){
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
