<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-check="goCheck()" @on-index="goIndex()"></v-header>
      <div class="hosTitle" @click="goHosList">
        <p class="titleToggle"> <span>选择医院</span> <span class="hosTitleLeft"><span v-if="hosList">{{hosList[hosIndex].yymc}}</span><img src="../../../static/img/icon/arrow-right.png" alt=""> </span> </p>
      </div>
      <div class="hosTitle" @click="togglePatient">
        <p class="titleToggle"> <span>就诊人信息</span> <span class="hosTitleLeft"><span v-if="allPatient">{{ allPatient[index].commpatName }}</span><img src="../../../static/img/icon/arrow-right.png" alt=""> </span> </p>
      </div>
      <div class="hosTitle">
        <p class="titleToggle" v-if="allPatient && allPatient[index].userCommonPatRecords"> <span>病案号</span>
          <span class="hosTitleLeft illNumColor">
            <span v-if="allPatient[index].userCommonPatRecords.length != 0">{{ allPatient[index].userCommonPatRecords[0].compatRecord  }}(义乌復元医院)</span>
            <span v-else>暂未绑定病案号</span>
            <img src="../../../static/img/icon/arrow-right.png" alt="">
          </span>
        </p>
      </div>
      <div class="checkMenu">
        <button @click="goTest">立即查询</button>
      </div>
      <patient-toggle :patList="allPatient" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>
      <toast v-if="showToast"></toast>
    </div>
  </transition>
</template>
<script>
  import header from '../../base/header'
  import http from '../../lib/http'
  import api from '../../lib/bookApi'
  import Toast from '../../base/toast'
  import patientToggle from '../../base/patientToggle.vue'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        title:"排队叫号",
        rightTitle:"",
        allPatient:"",
        index:0,
        hosIndex:0,
        showToast:false,
        hosList:"",
        patOption:"请选择就诊人",
        showPat:false
      }
    },
    created(){
      if(this.$route.query.pickedIndex){
        this.hosIndex = this.$route.query.pickedIndex
      }else{
        this.hosIndex = 0
      }
      api("smarthos.yygh.ApiHospitalService.areaHosList",{
      }).then((data)=>{
        if(data.code == 0){
          this.hosList = data.list
        }else{
          weui.alert(data.msg)
        }
        console.log(data)
      })
      http("smarthos.user.commpat.list",{
        token:localStorage.getItem('token')
      }).then((data)=>{
        console.log(data)
        if(data.code == 0){
          this.allPatient=data.list
        }else if(!(data.msg)){
          weui.alert("网络错误，请稍后重试")
        }else{
          weui.alert(data.msg)
        }
        console.log(data.list)
      })
    },
    methods:{
      closePatient(){
        this.showPat = false
      },
      check(item){
        console.log(item)
        this.showPat=false;
        this.index=item;
      },
      togglePatient(){
        this.showPat = true
      },

      goHosList(){
        this.$router.push({
          path:"/hosList",
          query:{from:"wait"}
        })
      },
      goTest(){
        this.$router.push({
          path: '/waitNumList',
          query: {userId:this.allPatient[this.index].patId,hosId:this.hosList[this.hosIndex].yyid,hosName:this.hosList[this.hosIndex].yymc,patCard:this.allPatient[this.index].commpatIdcard}
        })
      },
    },
    components:{
      "VHeader":header,
      patientToggle,
      Toast
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .emptyHistory{
    position: absolute;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation:makeBigger 0.6s;
    @keyframes makeBigger {
      0%{
        transform: scale(0.5);
      }
      25%{
        transform: scale(0.9);
      }
      50%{
        transform: scale(1.3);
      }
      75%{
        transform: scale(0.9);
      }
      100%{
        transform: scale(1.0);
      }
    }
  }
  .hosTitle{
    width:100%;
    margin-top: 15px;
    background-color: #FFFFFF;
    .titleToggle{
      height:80px;
      width:690px;
      margin:0 auto;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      background-color: #FFFFFF;
      span{
        font-size: 32px;
      }
      .hosTitleLeft{
        color: $mainColor;
        display: flex;
        align-items: center;
        span{
          padding-right: 10px;
        }
        img{
          width:15px;

        }
      }
      .illNumColor{
        color: #999999;
      }
    }
  }
  .checkMenu{
    width:690px;
    margin:0 auto;
    margin-top: 80px;
    height:80px;
    display: flex;
    justify-content: space-between;
    p{
      flex:0.2;
    }
    button{
      flex:2;
      height:80px;
      border:none;
      outline:medium;
      color: white;
      font-size: 32px;
      border-radius: 7px;
      background-color: $mainColor;
    }
  }
  .warmWrap{
    width:100%;
    background-color: $boederCol;
    .warmTips{
      width:690px;
      padding-top: 15px;
      padding-bottom: 15px;
      margin:0 auto;
      margin-top: 15px;
      h3,p{
        font-size: 24px;
        color: #666666;
        font-weight: normal;
        line-height: 36px;
        padding:3px 0 3px 0;
      }
    }
  }
  .usual{
    width:100%;
    height: 100%;
    /*position: absolute;*/
    /*top: 88px;*/
    background-color: white;
    .usualLine{
      width:100%;
      background-color: white;
    }
    .usualCenter{
      width:690px;
      margin:0 auto;
      /*margin-top: 5px;*/
      background-color: white;
      ul{
        margin:0;
        padding:0;
        margin-top: 10px;
        .patientToggle{
          padding-top: 15px;
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;
          .patientToggleLeft{
            font-size: 32px;
          }
        }
        li{
          list-style-type: none;
          height:80px;
          line-height: 80px;
          margin-top: 1px;
          /*<!--background-color: $bgColor2;-->*/
          font-size: 32px;
          padding-left: 10px;
          span{
            font-size: 32px;
            color: #999999;
          }
        }
        li:first-child{
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
        }
        li:last-child{
          border-bottom-left-radius: 7px;
          border-bottom-right-radius: 7px;
        }
      }
    }
    span.change{
      padding-left: 50px;
      font-size: 32px;
      color: $mainColor;
    }
  }
  .checkList{
    background-color: #FFFFFF;
    .checkCenter{
      width:690px;
      margin: 0 auto;
      .weuiMargin{
        margin-top: 10px;
        /*<!--background-color: $bgColor2;-->*/
        border-radius: 7px;
        p{
          height:80px;
          line-height: 80px;
          font-size: 32px;
        }
      }
      .warmTips{
        margin-top: 30px;
        h3,p{
          font-size: 24px;
          color: #666666;
          font-weight: normal;
          line-height: 36px;
        }
      }
    }
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
    opacity: 1;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
    opacity: 1;
  }
</style>
