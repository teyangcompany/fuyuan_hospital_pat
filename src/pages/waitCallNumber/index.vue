<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-check="goCheck()" @on-home="goHome"></v-header>
      <div class="hosTitle" @click="goHosList">
        <p class="titleToggle"> <span>选择医院</span> <span class="hosTitleLeft"><span v-if="hosList">{{hosList[hosIndex].yymc}}</span><img src="../../../static/img/icon/arrow-right.png" alt=""> </span> </p>
      </div>
      <div class="hosTitle" @click="togglePatient">
        <p class="titleToggle"> <span>就诊人信息</span> <span class="hosTitleLeft"><span v-if="allPatient">{{ allPatient[index].commpatName }}</span><img src="../../../static/img/icon/arrow-right.png" alt=""> </span> </p>
      </div>
      <div class="hosTitle">
        <p class="titleToggle" v-if="allPatient && allPatient[index].userCommonPatRecords"> <span>病案号</span>
          <span class="hosTitleLeft illNumColor">
            <span v-if="allPatient[index].userCommonPatRecords.length != 0">{{ allPatient[index].userCommonPatRecords[0].compatRecord  }}</span>
            <span v-else>暂未绑定病案号</span>
            <!--<img src="../../../static/img/icon/arrow-right.png" alt="">-->
          </span>
        </p>
      </div>
      <div class="checkMenu">
        <button  @click="isBindCard">立即查询</button>
      </div>
      <v-dialog :dialogTitle="dialogTitle"
                :dialogMain="dialogMain"
                :dialogLeftFoot="dialogLeftFoot"
                :dialogRightFoot="dialogRightFoot"
                v-if="showDialog"
                @on-cancel="cancelDialog" @on-download="confirmBindCard"></v-dialog>
      <v-dialog :dialogTitle="dialogCreateTitle"
                :dialogMain="dialogCreateMain"
                :dialogLeftFoot="dialogCreateLeftFoot"
                :dialogRightFoot="dialogCreateRightFoot"
                v-if="showCreateDialog"
                @on-cancel="cancelCreate" @on-download="ConfirmCreateCard"></v-dialog>
      <patient-toggle :patList="allPatient" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>
      <div class="emptyHistory" v-if="fail">
        <bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus"  @on-iSee="iSee()"></bind-fail>
      </div>
      <div class="emptyHistory" v-if="successDisplay">
        <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>
      </div>
      <div class="emptyHistory" v-if="createDisplay">
        <create-success :title="createWord" :illNumber="createNumber" :secondLine="secondCreateLine" :failKnow="failKnow" @on-iSee="iSeeCreate()"></create-success>
      </div>
      <toast v-if="showToast"></toast>
      <v-mask v-if="fail || successDisplay || createDisplay"></v-mask>
    </div>
  </transition>
</template>
<script>
  import header from '../../base/header'
  import http from '../../lib/http'
  import api from '../../lib/bookApi'
  import Dialog from '../../base/dialog'
  import bindSuccess from '../../base/bindSuccess/bindSuccess'
  import bindFail from '../../base/bindFail/bindFail'
  import createSuccess from '../../base/createSuccess/createSuccess.vue'
  import VMask from '../../base/mask'
  import Toast from '../../base/toast'
  import patientToggle from '../../base/patientToggle.vue'
  import {isBindMixin} from '../../lib/mixin'
  //  import weui from 'weui.js'
  //  import {isLoginMixin} from "../../../lib/mixin"
  //  import {tokenCache} from '../../../lib/cache'
  export default{
    mixins: [isBindMixin],
    data(){
      return{
        title:"排队叫号",
        rightTitle:"",
        allPatient:"",
        index:0,
        hosIndex:0,
        dialogCreateTitle:"",
        dialogCreateMain:"该就诊人没有在医院建过档，请先新建医院账号，才能使用功能。",
        dialogCreateLeftFoot:"取消",
        dialogCreateRightFoot:"新建医院账号",
        showCreateDialog:false,
        createDisplay:false,
        failKnow:"我知道了",
        illNumber:"314324",
        createWord:"新建成功，您的医院账号是",
        createNumber:"",
        secondCreateLine:"初次前往医院就诊时请务必携带身份证和医保卡(本)，缺一不可",
        dialogTitle:"",
        dialogMain:"该就诊人没有绑定病案号，无法执行该操作",
        dialogLeftFoot:"取消",
        dialogRightFoot:"去绑卡",
        showDialog:false,
        fail:false,
        successDisplay:false,
        showToast:false,
        alertStatus:"",
        description:"绑定成功，您的病案号是：",
        failDes:"未查询到病案号",
        failDetail:"请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化、请前往医院窗口修改",
        failDetailSecond:"若该就诊人未在医院建档，请前往医院窗口办理",
        failKnow:"我知道了",
        illNumber:"314324",
        hosList:"",
        patOption:"请选择就诊人",
        showPat:false
      }
    },
    created(){
      this._isBind().then((res) => {
        if (res === false) {
//          fromCache.set(this.$route.fullPath);
          this.$router.push("/login")
        }
      });
      if(this.$route.query.index){
        this.index = this.$route.query.index
      }else{
        this.index= 0
      }
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
      this.getPatientList()
    },
    methods:{
      getPatientList(){
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
      cancelDialog(){
        this.showDialog = false
      },
      confirmBindCard(){
        this.showDialog = false
        this.bindCard()
      },
      closePatient(){
        this.showPat = false
      },
      cancelCreate(){
        this.showCreateDialog = false
      },
      ConfirmCreateCard(){
        this.showCreateDialog = false
        this.createCard()
      },
      check(item){
        console.log(item)
        this.showPat=false;
        this.index=item;
      },
      togglePatient(){
        this.showPat = true
      },
      iSeeCreate(){
        this.getPatientList()
        this.createDisplay = false
      },
      bindCard(){
        this.showDialog = false
        this.showToast = true
        http("smarthos.user.commpat.record.bind",{
          bookHosId:this.hosList[this.hosIndex].yyid,
          commpatId:this.allPatient[this.index].id
        }).then((data)=>{
          this.showToast = false
          if(data.code == 0){
            this.alertStatus = data.obj.compatRecord
            this.fail = false
            this.successDisplay = true
          }else{
            this.alertStatus = data.msg
            this.successDisplay = false
            this.fail = true
          }
          console.log(data)
        })
      },
      createCard(){
        http("smarthos.user.commpat.record.new",{
          commpatId:this.allPatient[this.index].id,
          bookHosId:this.hosList[this.hosIndex].yyid
        }).then((data)=>{
          if(data.code == 0){
            console.log(data)
            this.createNumber = data.obj.compatRecord
            this.createDisplay = true
          }else{
            weui.alert(data.msg)
          }
        })
      },
      isBindCard(){
        this.showToast = true
        http("smarthos.user.commpat.record.check",{
          commpatId:this.allPatient[this.index].id,
          bookHosId:this.hosList[this.hosIndex].yyid
        }).then((data)=>{
          this.showToast = false
          if(data.code == 0){
            if(data.obj == 'needCreate'){
              this.showCreateDialog = true
            }else if(data.obj == 'needBind'){
              this.showDialog = true
            }else{
              this.goTest()
            }
          }else{
            weui.alert(data.msg)
          }
        })
      },
      iSee(){
        this.getPatientList()
        this.successDisplay = false
        this.fail = false
      },
//      goCheck(){
//        if(!(this.allPatient[this.index].compatMedicalRecord)){
//          this.showDialog = true
//        }else{
//          this.$router.push({
//            path:'/checkSortList',
//            query:{specialIndex:this.index,patCard:this.allPatient[this.index].compatMedicalRecord,compatId:this.allPatient[this.index].compatId}
//          })
//        }
//      },
      goUsual(){
        this.$router.push('/checkTogglePatient')
      },
      goHosList(){
        this.$router.push({
          path:"/hosList",
          query:{from:'wait'}
        })
      },
      goTest(){
        this.$router.push({
          path: '/waitNumList',
          query: {userId:this.allPatient[this.index].patId,hosId:this.hosList[this.hosIndex].yyid,hosName:this.hosList[this.hosIndex].yymc,patCard:this.allPatient[this.index].commpatIdcard}
        })
        var attachContent = {
          hosId:this.hosList[this.hosIndex].yyid,
          hosName:this.hosList[this.hosIndex].yymc,
          patId:this.allPatient[this.index].patId,
          id:this.allPatient[this.index].id,
          patName:this.allPatient[this.index].commpatName
        }
        localStorage.setItem('attachContent',JSON.stringify(attachContent))
      },
      goCheck(){
        this.$router.push({
          path: '/checkReportDetail',
          query:{hosId:this.hosList[this.hosIndex].yyid,hosName:this.hosList[this.hosIndex].yymc,patCard:this.allPatient[this.index].commpatIdcard}
        })
      },
      goHome(){
        this.$router.push({
          path:"/home"
        })
      }
    },
    components:{
      "VHeader":header,
      "VDialog":Dialog,
      patientToggle,
      bindSuccess,
      createSuccess,
      VMask,
      bindFail,
      Toast
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .emptyHistory{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
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
    margin-top: 150px;
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
