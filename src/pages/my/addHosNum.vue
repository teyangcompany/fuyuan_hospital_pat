<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-check="goCheck()" @on-index="goIndex()"></v-header>
      <div class="hosTitle border-1px-top">
        <p class="titleToggle border-1px-top" v-for="item in hosList">
          <span>{{ item.yymc }}</span>
          <span class="hosTitleRight">
            <span v-if="record">{{record}}</span>
            <span v-else @click="recordCheck">点击绑定</span>
            <img src="../../../static/img/icon/arrow-right.png" alt="">
          </span>
        </p>
      </div>
      <v-dialog :dialogTitle="dialogTitle"
                :dialogMain="dialogMain"
                :dialogLeftFoot="dialogLeftFoot"
                :dialogRightFoot="dialogRightFoot"
                v-if="showDialog"
                @on-cancel="cancelDialog" @on-download="bindCard"></v-dialog>
      <v-dialog :dialogTitle="dialogCreateTitle"
                :dialogMain="dialogCreateMain"
                :dialogLeftFoot="dialogCreateLeftFoot"
                :dialogRightFoot="dialogCreateRightFoot"
                v-if="showCreateDialog"
                @on-cancel="cancelCreate" @on-download="createCard"></v-dialog>
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
      <v-mask v-if="fail || successDisplay"></v-mask>
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
  import VMask from '../../base/mask'
  import Toast from '../../base/toast'
  import patientToggle from '../../base/patientToggle.vue'
  import createSuccess from '../../base/createSuccess/createSuccess.vue'
  //  import weui from 'weui.js'
  //  import {isLoginMixin} from "../../../lib/mixin"
  //  import {tokenCache} from '../../../lib/cache'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        title:"添加医院账号",
        rightTitle:"",
        allPatient:"",
        index:0,
        hosIndex:0,
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
        createDisplay:false,
        createWord:"新建成功，您的医院账号是",
        createNumber:"",
        secondCreateLine:"初次前往医院就诊时请务必携带身份证和医保卡(本)，缺一不可",
        dialogCreateTitle:"",
        dialogCreateMain:"该就诊人没有在医院建过档，请先新建医院账号，才能使用功能。",
        dialogCreateLeftFoot:"取消",
        dialogCreateRightFoot:"新建医院账号",
        showCreateDialog:false,
        hosList:"",
        patOption:"请选择就诊人",
        showPat:false,
        record:"",
        id:""
      }
    },
    created(){
      this.record = this.$route.query.record
      this.id = this.$route.query.id
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
      this.getHosList()
    },
    methods:{
      getHosList(){
        api("smarthos.yygh.ApiHospitalService.areaHosList",{
        }).then((data)=>{
          if(data.code == 0){
            this.hosList = data.list
          }else{
            weui.alert(data.msg)
          }
          console.log(data)
        })
      },
      cancelDialog(){
        this.showDialog = false
      },
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
      //取消创建就诊卡
      cancelCreate(){
        this.showCreateDialog = false
      },
      //确认创建就诊卡
      createCard(){
        this.showCreateDialog = false
        this.createNum()
      },
      iSeeCreate(){
        this.createDisplay = false
      },
//      bindCard(){
//        this.showDialog = false
//        this.showToast = true
//        api("nethos.book.compat.bind",{
//          token:tokenCache.get(),
//          compatId:this.allPatient[this.index].compatId
//        }).then((data)=>{
//          this.alertStatus = data.msg
//          this.showToast = false
//          if(data.code == 0){
//            this.fail = false
//            this.successDisplay = true
//          }else{
//            this.successDisplay = false
//            this.fail = true
//          }
//          console.log(data)
//        })
//      },
      iSee(){
        this.successDisplay = false
        this.fail = false
      },
//      goHosList(){
//        this.$router.push({
//          path:"/hosList"
//        })
//      },
      //就诊卡绑定
      bindCard(){
        this.showDialog = false
        this.showToast = true
        http("smarthos.user.commpat.record.bind",{
          token:localStorage.getItem('token'),
          commpatId:this.id,
          bookHosId:this.hosList[0].yyid
        }).then((data)=>{
//          console.log(this.hosid)
//          console.log(this.compatInfo[this.index].id)
          console.log(data,5555)
          this.showToast = false
          if(data.code == 0){
            this.fail = false
            this.successDisplay = true
            this.alertStatus = data.obj.compatRecord
            this.record = data.obj.compatRecord
          }else{
            this.successDisplay = false
            this.fail = true
            this.alertStatus = data.msg
          }
          console.log(data)
        })
      },
      //就诊卡创建
      createNum(){
        http("smarthos.user.commpat.record.new",{
          token:localStorage.getItem('token'),
          commpatId:this.id,
          bookHosId:this.hosList[0].yyid
        }).then((data)=>{
          if(data.code == 0){
            this.createDisplay = true
            this.createNumber = data.obj.compatRecord
          }else{
            weui.alert(data.msg)
          }
          console.log(data)
        })
      },
      //就诊卡检验
      recordCheck(){
        http("smarthos.user.commpat.record.check",{
          token:localStorage.getItem('token'),
          commpatId:this.id,
          bookHosId:this.hosList[0].yyid
        }).then((data)=>{
          console.log(data)
          this.showToast = false
          if(data.code == 0){
            if(data.obj == 'needCreate'){
              this.showCreateDialog = true
            }else if(data.obj == 'needBind'){
              this.bindCard()
            }else{
//              this.finalBook()
            }
          }else{
            weui.alert(data.msg)
          }
        })
      },
    },
    components:{
      "VHeader":header,
      "VDialog":Dialog,
      patientToggle,
      bindSuccess,
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
      .hosTitleRight{
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




  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
    opacity: 1;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
    opacity: 1;
  }
</style>
