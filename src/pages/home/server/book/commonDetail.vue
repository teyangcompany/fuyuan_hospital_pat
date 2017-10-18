<template>
  <div class="expertDetail">
    <!--<v-header :title="title" :rightTitle="rightTitle"></v-header>-->
    <top class="noflex" title="科室" ref="header">
      <i slot="back"></i>
    </top>
    <div v-if="!(commonNumDetail && commonNumDetail[0] && commonNumDetail[0].schemeList)" class="loading">
      <img src="../../../../../static/img/loading.gif" alt="">
      <span>正在很努力的加载中...</span>
    </div>
    <div class="expertList" ref="list">
      <div  v-if="commonNumDetail && commonNumDetail[0] && commonNumDetail[0].schemeList">
        <ul  class="border-1px">
          <div>
            <li>
              <div class="cancelImg">
                <img src="../../../../../static/img/common.png" alt="">
              </div>
              <div class="cancelIntro">
                <div v-if="commonNumDetail">
                  <span class="chatDoctor">{{ commonNumDetail[0].ksmc }}</span> <span class="doctorTitle"></span>
                  <p>{{ commonNumDetail[0].ysmc }}</p>
                  <!--<p>普通号</p>-->
                </div>
              </div>
            </li>
          </div>
        </ul>
        <div v-for="parentItem in commonNumDetail">
          <!--<div class="blank"></div>-->
          <!--<div class="blank border-1px"></div>-->
          <div class="list border-1px" v-if="commonNumDetail">
            <p>{{ parentItem.ksmc }}<img src="../../../../../static/img/icon/arrow-right-grow.png" alt=""> </p>
          </div>
          <div class="list border-1px" v-for="(item,index) in parentItem.schemeList" @click="book(item,index)">
            <p class="specialBlack">{{ (item.schdate).substr(0,4) }}-{{ (item.schdate).substr(4,2) }}-{{ (item.schdate).substr(6) }} {{ weekNum[index] }} {{ item.ampm == '1'? '上午':'下午' }}
              <span class="specialMoney" v-if="item.schstate == 0">预约 {{ item.fee }}元</span>
              <span class="year gray" v-if="item.schstate == 1">停诊</span>
              <span class="year gray" v-if="item.schstate == 2">已满</span>
              <span class="year" v-if="item.schstate == 3">即将(未放号或号子被锁定)</span>
              <!--<span class="year" >预约</span>-->
              <span class="specialMoney" v-if="item.schstate == 4" >预约{{ item.bookFee }}元</span>
            </p>
          </div>
        </div>
        <!--<div class="list border-1px">-->
        <!--<p class="specialBlack">2017-08-24 周四 上午 <span class="specialMoney">预约10元</span> </p>-->
        <!--</div>-->
        <div class="blank"></div>
        <div class="blank border-1px"></div>
        <div class="list border-1px">
          <p>科室介绍<img src="../../../../../static/img/icon/arrow-right-grow.png" alt=""> </p>
        </div>
        <div class="deptDescription">
          <p>{{ deptDescription }}</p>
        </div>
      </div>
    </div>
    <time-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closeTime()"></time-toggle>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
//  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../../lib/bookApi'
  import TimeToggle from '../../../../base/timeToggle'
  import Toast from '../../../../base/toast'
  import top from '../../../../components/app-header.vue'
//  import weui from 'weui.js'
//  import {isLoginMixin} from "../../../lib/mixin"
//  import {tokenCache} from '../../../lib/cache'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        patientAll:[],
        showPat:false,
        patOption:"",
        title:"科室",
        rightTitle:"",
        commonNumDetail:"",
        bookDeptId:"",
        weekNum:[],
        bookSchemeId:"",
        showToast:false,
        clickedIndex:"",
        bookSort:"",
        deptDescription:"",
        ksid:"",
        ampm:"",
        finalTime:"",
        hosName:""
      }
    },
    mounted(){

    },
    created(){
      this.bookSort=this.$route.query.bookSort
      this.ksid = this.$route.query.ksid
      this.hosid = this.$route.query.hosid
      this.hosName = this.$route.query.hosName
      api("smarthos.yygh.ApiDoctorService.ptpbinfo",{
        deptId:this.ksid,
        hosId:this.hosid
      }).then((data)=>{
        if(data.code == 0){

          this.commonNumDetail = data.obj.deptSchemeList
          console.log(this.commonNumDetail)
          for(var i=0;i<this.commonNumDetail[0].schemeList.length;i++){
//            console.log(this.commonNumDetail[0].schemeList[i].weekNum)
            var arr = []
            arr[i] = this.commonNumDetail[0].schemeList[i].weekNum
//            console.log(arr[i])
//              let that = this
//             (function(){
//                 console.log(i)
            switch (arr[i]){
              case '星期一':
                this.weekNum.push("周一")
                break;
              case '星期二':
                this.weekNum.push("周二")
                break;
              case '星期三':
                this.weekNum.push("周三")
                break;
              case '星期四':
                this.weekNum.push("周四")
                break;
              case '星期五':
                this.weekNum.push("周五")
                break;
              case '星期六':
                this.weekNum.push("周六")
                break;
              case '星期日':
                this.weekNum.push("周日")
                break;

            }

          }
        }else{
          weui.alert(data.msg)
        }
      })

    },
    methods:{
      _initListScroll(){
        this.listScroll = new BScroll(this.$refs.list,{
          click:true
        })
        console.log(this.listScroll )
      },
      check(index,item){
        this.showPat=false;
//          console.log(item)
        this.clickedIndex = index
        console.log(index)
//        console.log(item)
        this.$router.push({
          path:'/home/server/book/confirmOrder',
//          query:{bookDeptId:this.bookDeptId,bookNumId:this.patientAll[this.clickedIndex].bookNumId,numTime:this.patientAll[this.clickedIndex].numTime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
          query:{hosid:this.hosid,hosName:this.hosName,patnumid:this.patientAll[this.clickedIndex].numid,numTime:this.patientAll[this.clickedIndex].numtime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
        })
      },
      closeTime(){
        this.showPat=false;
      },
      book(index,item){

        this.listIndex = item
        this.patOption = (index.schdate).substr(0,10) + (index.ampm == '1'?'上午':'下午')
        this.finalTime =   (index.schdate).substr(0,4) + '-'+(index.schdate).substr(4,2) + '-'+ (index.schdate).substr(6)

        this.allInfo = JSON.stringify(index)
        this.bookSchemeId = index.schid
        this.ampm = index.ampm


            if(index.schstate == 0 ){
              this.showToast = true
              api("smarthos.yygh.apiQueryNumberService.selectNum",{
                token:localStorage.getItem('token'),
                orgid:index.orgid,
                hosid:this.hosid,
                schdate:this.finalTime,
                schid:this.bookSchemeId,
                ampm:this.ampm,
              }).then((data)=>{
                if(data.code == 0){
                  this.patientAll = data.list
                  this.showPat=true;
                  this.showToast = false
                  console.log(data)
                }else{
                  this.showToast = false
                  weui.alert(data.err)
                  console.log(data)
                }
              })
            }



      }
    },
    components:{
//      "VHeader":header,
      TimeToggle,
      Toast,
      top
    },
    watch:{
      commonNumDetail(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initListScroll()
          },20)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common.scss';
  .expertDetail{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: #FFFFFF;
    .loading{
      position: fixed;
      top: 90px;
      left:0;
      right:0;
      bottom:0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width:100px;
        margin-bottom: 10px;
      }
      span{
        font-size: 32px;
        color: #999999;
      }
    }
    .expertList{
      position: fixed;
      top: 88px;
      left:0;
      right:0;
      bottom:0;
      .blank{
        width:100%;
        height: 20px;
        background-color: rgb(245,245,245);
      }
      .list{
        width:100%;
        height: 80px;
        display: block;
        p{
          width:690px;
          height: 80px;
          line-height: 80px;
          margin:0 auto;
          font-size: 32px;
          color: #999999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{
            width: 16px;
            height: 20px;
          }
        }
        p.specialBlack{
          color: #333333;
          .specialMoney{
            min-width: 170px;
            height: 60px;
            font-size: 32px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 7px;
            background-color: $mainColor;
          }
        }
      }
      ul{
        padding:0;
        margin:0;
        height: 180px;
        li{
          list-style-type: none;
          height: 180px;
          display: flex;
          .cancelImg{
            width: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 110px;
              height: 110px;
              border-radius: 50%;
            }
          }
          .avartarImg{
            width: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 110px;
              height: 110px;
            }
          }
          .cancelIntro{
            flex:2;
            display: flex;
            align-items: center;
            line-height: 40px;
            .badgeDoc{
              display: inline-block;
              padding-top: -5px;
              .myDoctor{
                width: 80px;
                height: 36px;
                background-color: darkturquoise;
                border-radius:5px;
                display: inline-block;
                font-size: 10px;
                color: white;
                line-height: 40px;
                text-align: center;
              }
            }
            p{
              margin:0;
              color: #999999;
              font-size: 28px;
            }
            span.chatDoctor{
              font-size: 32px;
              color: #333333;
            }
            span.doctorTitle{
              font-size: 28px;
              color: #666666;
            }
          }
          .cancelTime{
            flex:1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 20px;
            img{
              width:16px;
              height: 24px;
            }
            span.year{
              font-size: 28px;
              color: $mainColor;
            }
            span.full{
              color: #999999;
            }
          }
        }
      }
      .deptDescription{
        p{
          width:690px;
          font-size: 32px;
          margin:10px auto;
        }
      }
    }
  }
</style>
