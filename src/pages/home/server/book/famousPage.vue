<template>
  <div class="expertDetail">
    <!--<v-header :title="title" :rightTitle="rightTitle"></v-header>-->
    <top class="noflex" title="名医主页" ref="header">
      <i slot="back"></i>
    </top>
    <div v-if="!doctorInfo" class="loading">
      <img src="../../../../../static/img/loading.gif" alt="">
      <span>正在很努力的加载中...</span>
    </div>
    <scroll class="expertList" v-if="doctorInfo" :data="deptSchemeList">
      <div>
        <ul  class="border-1px">
          <div>
            <li>
              <div class="cancelImg" v-if="doctorInfo.docAvatar">
                <img :src="doctorInfo.docAvatar" alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">
              </div>
              <div class="cancelImg" v-else>
                <img src="../../../../../static/img/doctorM.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">{{ doctorInfo.ysxm }}</span> <span class="doctorTitle">{{ doctorInfo.yszc }}</span>
                  <p>{{ doctorInfo.yymc }}</p>
                  <p>{{ doctorInfo.ksmc }}</p>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <div v-for="parentItem in deptSchemeList">
          <div class="blank border-1px"></div>
          <div class="list border-1px">
            <p v-if="deptSchemeList.length != 0">{{ parentItem.ksmc }}
              <!--<img src="../../../../../static/img/icon/arrow-right-grow.png" alt="">-->
            </p>
          </div>
          <div class="list border-1px" v-if="parentItem.schemeList.length != 0" v-for="(item,index) in parentItem.schemeList" @click="book(item,index)">
            <p class="specialBlack">{{(item.schdate).substr(0,4) + '-'+ (item.schdate).substr(4,2) + '-'+ (item.schdate).substr(6)}} {{ weekNum[index]  }} {{ item.ampm == '1'? '上午':'下午' }}
              <span class="specialMoney"  v-if="item.schstate == 0">预约 {{ item.fee }}元</span>
              <span class="year gray" v-if="item.schstate == 1">停诊</span>
              <!--<span class="year gray" v-if="item.schstate == 2">已满</span>-->
              <!--<span class="year" v-if="item.schstate == 3">即将(未放号或号子被锁定)</span>-->
              <!--&lt;!&ndash;<span class="year" >预约</span>&ndash;&gt;-->
              <!--<span class="specialMoney" v-if="item.schstate == 4">预约{{ item.fee }}元</span>-->
            </p>
          </div>
          <div class="list border-1px" v-else>
            <p class="specialBlack">暂无医生排班信息

            </p>
          </div>
        </div>
        <!--<div class="list border-1px">-->
        <!--<p class="specialBlack">2017-08-24 周四 上午  </p>-->
        <!--</div>-->
        <div class="blank border-1px"></div>
        <div class="list border-1px">
          <p>医生擅长
            <!--<img src="../../../../../static/img/icon/arrow-right-grow.png" alt=""> -->
          </p>
        </div>
        <div class="goodAt">
          <p>{{ doctorInfo.goodat }}</p>
        </div>
      </div>
    </scroll>
    <time-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closeTime()"></time-toggle>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
  import api from '../../../../lib/bookApi'
  import Toast from '../../../../base/toast'
  import timeToggle from '../../../../base/timeToggle'
  import Scroll from '../../../../base/scroll'
  import top from '../../../../components/app-header.vue'
  export default{
    data(){
      return{
        patientAll:[],
        hosid:"",
        showPat:false,
        patOption:"",
        title:"名医主页",
        rightTitle:"",
        doctorInfo:"",
        deptSchemeList:"",
        schemeList:"",
        weekNum:[],
        bookSchemeId:"",
        showToast:false,
        clickedIndex:"",
        bookSort:"",
        schid:"",
        ampm:"",
//        号源id
        patnumid:"",
//        预约医院id
        orgid:"",
//        平台患者id
        patid:"",
//        常用就诊人id
        patvisitid:"",
        hosName:"",
      }
    },
    methods:{
      check(index,item){
        this.showPat=false;
        this.clickedIndex = index
        console.log(index)
//        console.log(item)
        this.$router.push({
          path:'/home/server/book/confirmOrder',
          query:{hosid:this.hosid,hosName:this.hosName,patnumid:this.patientAll[this.clickedIndex].numid,numTime:this.patientAll[this.clickedIndex].numtime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
        })
      },
      closeTime(){
        this.showPat=false;
      },
      book(index,item){
        this.schid = index.schid
        this.ampm = index.ampm
        this.listIndex = item
        this.patOption = (index.schdate).substr(0,10) + (index.ampm == '1'?'上午':'下午')
        console.log(this.patOption)
        this.allInfo = JSON.stringify(index)

//          console.log(data.obj)

//            console.log(data,66666)
            if(index.schstate == 0 ){
              this.showToast = true
              api("smarthos.yygh.apiQueryNumberService.selectNum",{
                token:localStorage.getItem('token'),
                hosid:this.hosid,
                schid:this.schid,
                ampm:this.ampm
              }).then((data)=>{
                 console.log(data,222)
                if(data.code == 0){
                  this.patientAll = data.list
                  this.showPat=true;
                  this.showToast = false
                  console.log(data)
                }else{
                  this.showToast = false
                  weui.alert(data.err)
                }
              })
            }



      }
    },
    created(){
      this.bookDocId= this.$route.query.bookDocId
      this.hosid = this.$route.query.hosid
      this.bookSort=this.$route.query.bookSort
      this.hosName = this.$route.query.hosName
      api("smarthos.yygh.ApiDoctorService.yspbinfo",{
        docId:this.bookDocId,
        hosId:this.hosid
      }).then((data)=>{
          console.log(data,1111)
        if(data.code == 0){

//              console.log(this.schemeList)
//              console.log(this.deptSchemeList)
          console.log(data)

          this.doctorInfo = data.obj
          this.deptSchemeList = data.obj.deptSchemeList
          if(this.deptSchemeList.length != 0){
            this.schemeList = data.obj.deptSchemeList[0].schemeList
            for(var i=0;i<this.schemeList.length;i++){
              switch (this.schemeList[i].weekNum){
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
          }

        }else{
          weui.alert(data.msg)
        }

      })
    },
    components:{
      Toast,
      Scroll,
      timeToggle,
      top
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
        height: 90px;
        line-height: 90px;
        display: block;
        span.year{
          font-size: 28px;
          color: $mainColor!important;
        }
        p{
          width:690px;
          height: 90px;
          margin:0 auto;
          line-height: 90px;
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
            color: white;
            font-size: 32px;
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

            /*span.full{*/
            /*color: #999999;*/
            /*}*/
          }
        }
      }
      .goodAt{
        p{
          width:690px;
          font-size: 32px;
          color: #333333;
          margin: 10px auto;
        }
      }
    }
  }
</style>
