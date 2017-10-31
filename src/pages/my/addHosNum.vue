<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-check="goCheck()" @on-index="goIndex()"></v-header>
      <div class="hosTitle border-1px-top" @click="goHosList">
        <p class="titleToggle border-1px-top" v-for="item in hosList">
          <span>{{ item.yymc }}</span>
          <span class="hosTitleRight">
            <span v-if="hosList">{{hosList[hosIndex].yymc}}</span>
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
      <patient-toggle :patList="allPatient" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>
      <div class="emptyHistory" v-if="fail">
        <bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus"  @on-iSee="iSee()"></bind-fail>
      </div>
      <div class="emptyHistory" v-if="successDisplay">
        <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>
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
  //  import bindSuccess from '../../../base/bindSuccess/bindSuccess'
  //  import bindFail from '../../../base/bindFail/bindFail'
  //  import VMask from '../../../base/mask'
  import Toast from '../../base/toast'
  import patientToggle from '../../base/patientToggle.vue'
  //  import weui from 'weui.js'
  //  import {isLoginMixin} from "../../../lib/mixin"
  //  import {tokenCache} from '../../../lib/cache'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        title:"添加病案号",
        rightTitle:"添加",
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
        hosList:"",
        patOption:"请选择就诊人",
        showPat:false
      }
    },
    created(){

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
    },
    methods:{
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
      bindCard(){
        this.showDialog = false
        this.showToast = true
        api("nethos.book.compat.bind",{
          token:tokenCache.get(),
          compatId:this.allPatient[this.index].compatId
        }).then((data)=>{
          this.alertStatus = data.msg
          this.showToast = false
          if(data.code == 0){
            this.fail = false
            this.successDisplay = true
          }else{
            this.successDisplay = false
            this.fail = true
          }
          console.log(data)
        })
      },
      iSee(){
        this.successDisplay = false
        this.fail = false
      },
      goHosList(){
        this.$router.push({
          path:"/hosList"
        })
      },

    },
    components:{
      "VHeader":header,
      "VDialog":Dialog,
      patientToggle,
//      bindSuccess,
//      VMask,
//      bindFail,
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
