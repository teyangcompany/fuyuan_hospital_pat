<template>
  <div class="date">
    <div class="dateList">
      <div class="menu">
        <div class="smallBlank"></div>
        <ul ref="wrapWidth" class="border-1px">
          <li class="arrangeTime" :class="{picked:selected == index}"  v-for="(item,index) in timeArray" @click="selectOne(index)">
            <p>{{timeArray[index]}}</p>
            <p>{{ weekArray[index] }}</p>
          </li>
        </ul>
        <div class="smallBlank"></div>
      </div>
      <div v-if="!commonRoom" class="loading">
        <img src="../../../../../static/img/loading.gif" alt="">
        <span>正在很努力的加载中...</span>
      </div>
      <div v-else-if="commonRoom.length == 0" class="loading">
        <!--<tips></tips>-->
        暂无可预约的号源
      </div>
      <div class="contentWrap" ref="contentWrap">
        <div>
          <div class="content" style="display: block">
            <div  class="border-1px" v-if="!(item.ysid)" v-for="(item,index) in commonRoom">
              <div  class="border-1px" @click="selectTime(single,index)"  v-for="(single,index) in item.deptSchemeList[0].schemeList">
                <div class="cancelImg">
                  <img src="../../../../../static/img/common.png" alt="">
                </div>
                <div class="cancelIntro">
                  <div>
                    <span class="chatDoctor">普通号</span> <span class="doctorTitle">{{ item.ysxm }}</span>
                    <p class="oneLine">{{ item.yymc }}</p>
                    <p style="color: #333333;">{{ single.schdate.substr(0,4) }}-{{  single.schdate.substr(4,2) }}-{{  single.schdate.substr(6) }} <span style="color: #3d9bff">{{ single.ampm == '1'? '上午':'下午' }}</span> 普通</p>
                  </div>
                </div>
                <div class="cancelTime specialCancel"  v-if="single.schstate == 0 && single.numremain > 0">
                  <div >
                    <p>预约</p>
                    <p style="color: #FAAC79;"> {{ single.fee }}元 </p>
                  </div>
                  <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                </div>
                <div class="cancelTime" v-else>
                  <div >
                    <span class="fullNum" v-if="single.schstate == 0 && single.numremain <= 0">已满</span>
                    <span class="year gray" v-else-if="single.schstate == 1">停诊</span>

                    <!--<span class="year gray" v-if="single.schemeStats == 0">无</span>-->
                    <!--<span class="year gray" v-if="single.schemeStats == 1">停诊</span>-->
                    <!--<span class="year gray" v-if="single.schemeStats == 2">已满</span>-->
                    <!--<span class="year" v-if="single.schemeStats == 3">即将(未放号或号子被锁定)</span>-->
                    <!--&lt;!&ndash;<span class="year" >预约</span>&ndash;&gt;-->
                    <!--<span class="specialMoney" v-if="single.schemeStats == 4">预约{{ single.bookFee }}元</span>-->
                    <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="blank border-1px"></div>-->
          <div class="content" style="display: block">
            <div class="border-1px"  v-if="item.ysid" v-for="item in commonRoom">
              <div  class="border-1px" @click="selectTime(single,index)"  v-for="(single,index) in item.deptSchemeList[0].schemeList">
                <div class="cancelImg">
                  <img class="avartarImg" v-if="item.docAvatar" :src="item.docAvatar" alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">
                  <img class="avartarImg" src="../../../../../static/img/doctorM.png" v-else alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">
                </div>
                <div class="cancelIntro">
                  <div>
                    <span class="chatDoctor"></span> <span class="doctorTitle">{{ item.ysxm }} {{ item.yszc }}</span>
                    <p class="oneLine">擅长：{{ item.goodat }}</p>
                    <p style="color: #333333;">{{ single.schdate.substr(0,4) }}-{{  single.schdate.substr(4,2) }}-{{  single.schdate.substr(6) }} <span style="color: #3d9bff"> {{ single.ampm == '1'? '上午':'下午' }}</span> 专家</p>
                  </div>
                </div>
                <div class="cancelTime specialCancel" id="" v-if="single.schstate == 0 && single.numremain > 0">
                  <div >
                    <p>预约</p>
                    <p style="color: #FAAC79;"> {{ single.fee }}元 </p>
                  </div>
                  <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                </div>
                <div class="cancelTime" v-else>
                  <div >
                    <!--<span class="year gray" v-if="single.schstate == 0 ">无</span>-->
                    <!--<span class="year gray" v-if="single.schstate == 1">停诊</span>-->
                    <!--<span class="year gray" v-if="single.schstate == 2">已满</span>-->
                    <!--<span class="year" v-if="single.schstate == 3">即将(未放号或号子被锁定)</span>-->
                    <!--<span class="year" >预约</span>-->
                    <!--<span class="specialMoney" v-if="single.schstate == 0 && single.numremain > 0">预约{{ single.bookFee }}元</span>-->
                    <span class="fullNum" v-if="single.schstate == 0 && single.numremain <= 0">已满</span>
                    <span class="year gray" v-else-if="single.schstate == 1">停诊</span>
                    <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                  </div>
                </div>
              </div>
              <!--<div class="avartarImg">-->
              <!--<img :src="item.docAvatar" alt="">-->
              <!--</div>-->
              <!--<div class="cancelIntro">-->
              <!--<div>-->
              <!--<span class="chatDoctor">{{ item.docName }}</span> <span class="doctorTitle">{{ item.docTitle }}</span>-->
              <!--<p>{{ item.docDescription }}</p>-->
              <!--<p>{{ item.deptSchemeList[0].schemeList[0].schemeDate.substr(0,10) }} {{ item.deptSchemeList[0].schemeList[0].schemeAmpm == 'am'? '上午':'下午' }} 专家</p>-->
              <!--</div>-->
              <!--</div>-->
              <!--<div class="cancelTime">-->
              <!--<div >-->
              <!--<span class="year gray" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 0">无</span>-->
              <!--<span class="year gray" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 1">停诊</span>-->
              <!--<span class="year gray" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 2">已满</span>-->
              <!--<span class="year" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 3">即将(未放号或号子被锁定)</span>-->
              <!--&lt;!&ndash;<span class="year" >预约</span>&ndash;&gt;-->
              <!--<span class="specialMoney" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 4">预约{{ item.deptSchemeList[0].schemeList[0].bookFee }}元</span>-->
              <!--<img src="../../../../static/img/查看更多.png" alt="">-->
              <!--</div>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
      <div v-if="showAlertTips" class="loading">
        <alert-tips ></alert-tips>
      </div>
    </div>
    <time-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closeTime()"></time-toggle>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
  import TimeToggle from '../../../../base/timeToggle'
  import Toast from '../../../../base/toast'
//  import Tips from '../../../base/tips'
//  import AlertTips from '../../../base/alertTips'
  import BScroll from 'better-scroll'
  import api from '../../../../lib/bookApi'
//  import weui from 'weui.js'
//  import {isLoginMixin} from "../../../lib/mixin"
//  import {tokenCache} from '../../../lib/cache'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        patientAll:[],
        showPat:false,
        showAlertTips:false,
        patOption:"",
        commonRoom:"",
        commonDoctor:"",
        selected:0,
        timeArray:[],
        weekArray:[],
        completeTimeArray:[],
        isImg:[],
        commonInfo:[],
        infoWrap:[],
        bookSchemeId:"",
        showToast:false,
        clickedIndex:"",
        listIndex:"",
        allInfo:[],
        hosid:"",
        depid:"",
        schid:"",
        ampm:"",
        hosName:""
      }
    },
    created(){
      this.hosid = this.$route.query.hosid
      this.depid = this.$route.query.depid
      this.hosName = this.$route.query.hosName
      for(var i=1;i<8;i++){
        this.timeArray.push(this.GetDateStr(i))
        this.weekArray.push(this.getWeek(i))
        this.completeTimeArray.push(this.getcompleteTime(i))
      }
      this.patOption =this.completeTimeArray[this.selected]
      if(this.completeTimeArray.length != 0){
        api("smarthos.yygh.ApiDoctorService.pblist",{
          hosId:this.hosid,
          deptId:this.depid,
          isPb:"0",
          date:this.completeTimeArray[this.selected]
        }).then((data)=>{
           console.log(data)
          if(data.code == 0){
            this.commonRoom = data.list
          }else if(!(data.msg)){
            this.commonRoom = true
           weui.alert("网络错误，稍后重试")
          }else{
            this.commonRoom = true
            weui.alert(data.msg)
          }
        })
      }
    },
    methods:{
      GetDateStr(i){
        var dd = new Date();
        dd.setDate(dd.getDate()+i);//获取AddDayCount天后的日期
//          var y = dd.getFullYear();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();

        return(month < 10 ? "0" + month : month)+"-"+(d < 10 ? "0" + d : d);
      },
      getcompleteTime(i){
        var dd = new Date();
        dd.setDate(dd.getDate()+i);//获取AddDayCount天后的日期
        var y = dd.getFullYear().toString();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();

        return (y) + (month < 10 ? "0" + month : month) + (d < 10 ? "0" + d : d);
      },
      getWeek(i){
        var dd = new Date();
        dd.setDate(dd.getDate()+i);//获取AddDayCount天后的日期
        var week = dd.getDay()
        switch (week){
          case 0:
            week="周日";
            break;
          case 1:
            week="周一";
            break;
          case 2:
            week="周二";
            break;
          case 3:
            week="周三";
            break;
          case 4:
            week="周四";
            break;
          case 5:
            week="周五";
            break;
          case 6:
            week="周六";
            break;
        }
        return week
      },
      selectOne(index){
        this.selected = index
        this.commonRoom = ''
        api("smarthos.yygh.ApiDoctorService.pblist",{
          hosId:this.hosid,
          deptId:this.depid,
          isPb:"0",
          date:this.completeTimeArray[this.selected]
        }).then((data)=>{
           console.log(data,333)
          if(data.code == 0){
            this.commonRoom = data.list
          }else if(!(data.msg)){
            this.commonRoom = true
            weui.alert("网络错误，稍后重试")
          }else{
            this.commonRoom = true
            weui.alert(data.msg)
          }
        })
      },
      check(index){
        this.showPat=false;
//          console.log(item)
        this.clickedIndex = index
        console.log(index)
        this.$router.push({
          path:'/home/server/book/confirmOrder',
//          query:{bookDeptId:this.bookDeptId,bookNumId:this.patientAll[this.clickedIndex].bookNumId,numTime:this.patientAll[this.clickedIndex].numTime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
          query:{hosid:this.hosid,hosName:this.hosName,patnumid:this.patientAll[this.clickedIndex].numid,numTime:this.patientAll[this.clickedIndex].numtime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
        })
      },
      selectTime(index,single){
        this.listIndex = single
        if(index.ampm == '1'){
          this.patOption =this.completeTimeArray[this.selected]
          this.patOption= this.patOption + "上午"
        }else{
          this.patOption =this.completeTimeArray[this.selected]
          this.patOption= this.patOption + "下午"
        }
        console.log(this.patOption)
        this.allInfo = JSON.stringify(index)
            if(index.schstate == 0 ){
              this.showToast = true
              api("smarthos.yygh.apiQueryNumberService.selectNum",{
                token:localStorage.getItem('token'),
                hosid:this.hosid,
                schid:index.schid,
                ampm:index.ampm
              }).then((data)=>{
                if(data.code == 0){
                  this.patientAll = data.list
                  this.showPat=true;
                  this.showToast = false
                }else if(!(data.msg)){
                  this.showToast = false
                  weui.alert("网络错误，稍后重试")
                }else{
                  this.showToast = false
                  weui.alert(data.msg)
                }
              })
            }





      },
      closeTime(){
        this.showPat=false;
      },
      _initDateList(){
        this.dateList = new BScroll(this.$refs.contentWrap,{
          click:true
        })
        console.log(this.dateList)
      }
    },
    components:{
      TimeToggle,
      Toast,
//      Tips,
//      AlertTips
    },
    watch:{
      commonRoom(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initDateList()
          },100)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common.scss';
  .date{
    position: absolute;
    top: 182px;
    left:0;
    right:0;
    bottom:0;
    background-color: white;
    .dateList{
      position: absolute;
      top: 0px;
      left:0;
      right:0;
      bottom:0;
      background-color: white;
      .menu{
        position: absolute;
        left:0;
        right:0;
        top: 0px;
        z-index:100;
        ul{
          width:100%;
          display: flex;
          height: 110px;
          background-color: white;
          li{
            list-style-type: none;
            flex:1;
            font-size: 32px;
            text-align: center;
            height: 110px;
            line-height: 55px;
            p{
              /*height:110px;*/
              font-size: 24px;
              color: #999999;
              /*line-height: 35px;*/
            }
          }
          li.picked{
            p{
              color: $mainColor;
            }
          }
        }
      }
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
      .smallBlank{
        width:100%;
        height: 10px;
        background-color: rgb(245,245,245);
      }
      .blank{
        width:100%;
        height: 20px;
        background-color: rgb(245,245,245);
      }
      .contentWrap{
        position: fixed;
        top: 298px;
        left:0;
        right:0;
        bottom:0;
        >div{
          .content{
            >div{
              >div{
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
                  img.avartarImg{
                    border-radius: 0px;
                  }
                }
                .cancelIntro{
                  flex:2;
                  display: flex;
                  align-items: center;
                  p{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:1;
                    overflow: hidden;
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
                  >div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img{
                      width:16px;
                      height:24px;
                    }
                    span.year{
                      font-size: 28px;
                      color: $mainColor;
                      margin-right: 5px;
                    }
                    .specialMoney{
                      min-width:170px;
                      height:60px;
                      color: white;
                      font-size: 32px;
                      margin-right: 5px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 7px;
                      background-color: $mainColor;
                    }
                    .fullNum{
                      min-width:170px;
                      height:60px;
                      color: #999999;
                      font-size: 32px;
                      margin-right: 5px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 7px;
                      background-color: #f5f5f5;
                    }
                    span.gray{
                      color: #999999;
                      margin-right: 5px;
                    }
                  }
                }
                .specialCancel{
                  >div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    /*<!--margin-right: 10px;-->*/
                    p:nth-child(1){
                      height:60px;
                      margin-bottom: 10px;
                      font-size: 32px;
                    }
                    p:nth-child(2){
                      /*<!--color: $assistWordBrown;-->*/
                      font-size: 32px;
                    }
                  }
                  img{
                    width:16px;
                    height:24px;
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
