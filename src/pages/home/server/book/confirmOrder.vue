<template>
  <div class="success">
    <!--<v-header :title="title" :rightTitle="rightTitle" @on-bookService="goBookService()"></v-header>-->
    <top class="noflex" title="就诊信息确认" ref="header">
      <i slot="back"></i>
    </top>
    <div class="successContent" ref="success">
      <div>
        <div class="line"></div>
        <p class="doctorInfoTitle border-1px">预约信息</p>
        <div class="doctorInfo">
          <div class="circleAngle">
            <!--<ul>-->
              <!--<li>-->
                <!--<div class="cancelImg" v-if="!(allInfoArray.bookDocId)">-->
                  <!--<img src="" alt="">-->
                <!--</div>-->
                <!--<div class="cancelImg" v-else>-->
                  <!--<img :src="docAvatar" alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">-->
                <!--</div>-->
                <!--<div class="cancelIntro">-->
                  <!--<div class="introTitle">-->
                    <!--<span class="subTitle">{{ allInfoArray.docname }}</span>-->
                    <!--&lt;!&ndash;<span class="myDoctor">我的医生</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<p>浙江大学附属第二人民医院</p>&ndash;&gt;-->
                    <!--<p>{{ allInfoArray.deptname }}</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
            <div class="aboutConsult">
              <div class="list border-1px">
                <p>医院 <span>{{hosName}}</span> </p>
              </div>
              <div class="list border-1px">
                <p>科室 <span> {{ allInfoArray.deptname }} </span> </p>
              </div>
              <div class="list border-1px">
                <p>医生 <span> {{ allInfoArray.docname }} </span> </p>
              </div>
              <div class="list border-1px">
                <p>就诊日期 <span>{{ allInfoArray.schdate.substr(0,4) }}-{{ allInfoArray.schdate.substr(4,2) }}-{{ allInfoArray.schdate.substr(6) }} {{ allInfoArray.ampm == '1'? '上午':'下午' }} </span> </p>
              </div>
              <div class="list border-1px">
                <p>预估就诊时间 <span>{{ numTime }}</span> </p>
              </div>
              <div class="list border-1px">
                <p>支付方式 <span>现场支付</span> </p>
              </div>
              <div class="list">
                <p>挂号费用 <span>¥ {{ allInfoArray.fee }}</span> </p>
              </div>
            </div>
          </div>
        </div>
        <div class="secondLine"></div>
        <p class="patientInfoTitle"> <span class="leftPatTitle">就诊人信息</span> <span @click="goToggle">切换就诊人</span> </p>
        <div class="patientInfo">
          <div class="leftTitle">
            <span>姓&nbsp;&nbsp;名:</span>
            <span>身份证号:</span>
            <span>手机号:</span>
            <span>病案号:</span>
          </div>
          <div class="rightMatch" v-if="compatInfo">
            <span>{{ compatInfo[index].commpatName }}</span>
            <span>{{ compatInfo[index].commpatIdcard }}</span>
            <span>{{ compatInfo[index].commpatMobile }}</span>
            <span v-if=" compatInfo[index].compatMedicalRecord">{{ compatInfo[index].compatMedicalRecord }} </span>
            <span v-else>暂未绑定病案号</span>
          </div>
        </div>
        <!--<div class="aboutCode">-->
        <!--<div>-->
        <!--<p>验证码</p>-->
        <!--<input type="text" v-model="writeCode">-->
        <!--<p class="codeDisplay">-->
        <!--<img :src="'data:image/png;base64,'+verifyCode" alt="">-->
        <!--</p>-->
        <!--<p @click="getCode()" style="color: #2AB6B3;">刷新验证码</p>-->
        <!--</div>-->
        <!--</div>-->
        <div class="aboutCode" @click="goBookService">
             <button>确认挂号</button>
        </div>
        <div class="assistScroll">

        </div>
      </div>

    </div>
    <v-dialog :dialogTitle="dialogTitle"
              :dialogMain="dialogMain"
              :dialogLeftFoot="dialogLeftFoot"
              :dialogRightFoot="dialogRightFoot"
              v-if="showDialog"
              @on-cancel="cancelDialog" @on-download="bindCard"></v-dialog>
    <div class="emptyHistory" v-if="fail">
      <bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus"  @on-iSee="iSee()"></bind-fail>
    </div>
    <div class="emptyHistory" v-if="successDisplay">
      <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>
    </div>
    <patient-toggle :patList="compatInfo" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>
    <toast v-if="showToast"></toast>
    <v-mask v-if="fail || successDisplay"></v-mask>
    <alert v-if="showAlert" @on-iKnow="iKnow" :secondLine="secondLine" :bottomLine="bottomLine"></alert>
  </div>
</template>
<script>
//  import header from '../../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../../lib/bookApi'
  import http from '../../../../lib/http'
  import top from '../../../../components/app-header.vue'
  import patientToggle from '../../../../base/patientToggle.vue'
  import Dialog from '../../../../base/dialog'
  import bindSuccess from '../../../../base/bindSuccess/bindSuccess'
  import bindFail from '../../../../base/bindFail/bindFail'
  import VMask from '../../../../base/mask'
  import Toast from '../../../../base/toast'
//  import Alert from '../../../base/alert'
//  import weui from 'weui.js'
//  import {isLoginMixin} from "../../../lib/mixin"
//  import {tokenCache} from '../../../lib/cache'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        title:'就诊信息确认',
        rightTitle:'提交',
        dialogTitle:"",
        dialogMain:"该就诊人没有绑定病案号，无法执行该操作",
        dialogLeftFoot:"取消",
        dialogRightFoot:"去绑卡",
        showDialog:false,
        showAlert:false,
        fail:false,
        successDisplay:false,
        showToast:false,
        alertStatus:"",
        firstLine:"",
        secondLine:"",
        bottomLine:"我知道了",
        description:"绑定成功，您的病案号是：",
        failDes:"绑定失败",
        failDetail:"请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化、请前往医院窗口修改",
        failDetailSecond:"若该就诊人未在医院建档，请前往医院窗口办理",
        failKnow:"我知道了",
        illNumber:"314324",
        bookDeptId:"",
        bookNumId:"",
        numTime:"",
        allInfoArray:[],
        docAvatar:"",
        listIndex:"",
        selectedInfo:"",
        selfInfo:"",
        bookSort:"预约挂号",
        compatInfo:"",
        verifyCode:"",
        writeCode:"",
        cid:"",
        orderInfo:"",
        index:0,
        patientAll:[],
        showPat:false,
        patOption:"请选择就诊人",
        //号源id
        patnumid:"",
        //预约医院id
        orgid:"",
        //平台患者id
        patid:"",
        //常用就诊人id
        patvisitid:"",
        hosid:""
      }
    },
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this._initSuccessScroll()
        },20)
      })
    },
    created(){
      this.hosid = this.$route.query.hosid
      this.patnumid = this.$route.query.patnumid
      this.numTime = this.$route.query.numTime
      this.allInfo = this.$route.query.allInfo
      this.allInfoArray = JSON.parse(this.allInfo)
      this.listIndex = this.$route.query.listIndex
//      this.bookSort = this.$route.query.bookSort
      this.hosName = this.$route.query.hosName
      console.log(this.bookSort)
      console.log(this.allInfoArray)
      if(this.$route.query.index){
        this.index = this.$route.query.index
      }else{
        this.index= 0
      }
      console.log(this.listIndex)
      console.log(this.allInfoArray,666666)
      console.log(this.bookSort)

//          this.selfInfo = data.obj
          http("smarthos.user.commpat.list",{
            token:localStorage.getItem('token'),
//            patId:this.selfInfo.patId
          }).then((data)=>{
            if(data.code == 0){
              this.compatInfo = data.list
              console.log(data,555555555555)
            }else{
              weui.alert(data.msg)
            }
          })

    },
    methods:{
      cancelDialog(){
        this.showDialog = false
      },
      iKnow(){
        this.showAlert = false
      },
      bindCard(){
        this.showDialog = false
        this.showToast = true
        http("smarthos.user.commpat.record.bind",{
          token:localStorage.getItem('token'),
          commpatId:this.compatInfo[this.index].id,
          bookHosId:this.hosid
        }).then((data)=>{
            console.log(this.hosid)
           console.log(this.compatInfo[this.index].id)
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
      _initSuccessScroll(){
        this.success = new BScroll(this.$refs.success,{
          click:true
        })
        console.log(this.success)
      },
      goToggle(){
          this.showPat = true
//        this.$router.push({
//          path:'/bookTogglePatient',
//          query:{bookDeptId:this.bookDeptId,bookNumId:this.bookNumId,numTime:this.numTime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
//        })
      },
      check(item){
        console.log(item)
        this.showPat=false;
        this.index=item;
      },
      closePatient(){
        this.showPat=false;
      },
      goBookService(){
//          api("nethos.system.captcha.checkcaptcha",{
//            captcha:this.writeCode,
//            cid:this.cid
//          }).then((data)=>{
//              console.log(data)
//              if(data.code == 0){
        if(this.bookSort == '预约挂号'){
          api("smarthos.yygh.apiOrderService.register",{
            token:localStorage.getItem('token'),
            patnumid: this.patnumid,
            orgid:this.allInfoArray.orgid,
            patid:this.compatInfo[this.index].patId,
            patvisitid:this.compatInfo[this.index].id,
            patdeptid:this.allInfoArray.deptid,
            patdocid:""
//            bookHosId:this.allInfoArray.bookHosId,
//            compatId:this.compatInfo[this.index].compatId,
//            captcha:"1234"
          }).then((data)=>{
            console.log("下面挂号部分")
            console.log(data)
            console.log("上面挂号部分")

            if(data.code == 0){
              this.orderInfo = JSON.stringify(data.obj)
              this.$router.push({
                path:'/home/server/book/bookSuccess',
                query:{orderInfo:this.orderInfo}
              })
            }else if(data.msg == '用户记录未找到'){
              this.showDialog = true
            }else if(!(data.msg)){
             weui.alert("服务器错误")
            }else{
              weui.alert(data.msg)
            }
          })
        }else{
          api("nethos.book.z2order.register",{
            token:tokenCache.get(),
            bookNumId: this.bookNumId,
            bookHosId:this.allInfoArray.bookHosId,
            compatId:this.compatInfo[this.index].compatId,
//                    captcha:this.writeCode
          }).then((data)=>{
            console.log("下面挂号部分")
            console.log(data)
            console.log("上面挂号部分")




            if(data.code == 0){
              this.orderInfo = JSON.stringify(data.obj)
              this.$router.push({
                path:'/bookSuccess',
                query:{orderInfo:this.orderInfo}
              })
            }else if(data.msg == '请先绑定就诊卡号'){
              this.showDialog = true
            }else if(!(data.msg)){
              this.showAlert = true
              this.secondLine = "服务器错误"
            }else{
              this.showAlert = true
              this.secondLine = data.msg
            }
          })
        }
//              }else{
//                  this.showAlert = true
//                  this.secondLine = data.msg
//              }
//          })

      },
//      getCode(){
//          api("nethos.book.captcha.generate",{
//           token:localStorage.getItem("token"),
//            compatId:this.compatInfo[this.index].compatId,
//            bookHosId:this.allInfoArray.bookHosId,
//            bookNumId: this.bookNumId,
//          }).then((data)=>{
//            this.verifyCode = data.obj.captcha
//            this.cid = data.obj.cid
//              console.log(data)
//          })
//      }
    },
    components:{
//      'VHeader':header,
      "VDialog":Dialog,
      bindSuccess,
      VMask,
      bindFail,
      Toast,
      top,
      patientToggle
//      Alert
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common.scss';
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
  .successContent{
    width:100%;
    position: fixed;
    top: 88px;
    bottom:0;
    left:0;
    right:0;
    z-index:10;
    overflow: hidden;
    background-color: white;
    .line{
      position: absolute;
      top:25px;
      left:40px;
      height: 30px;
      width:10px;
      background-color: $mainColor;
    }
    .secondLine{
      position: absolute;
      top:680px;
      left:40px;
      height: 30px;
      width:10px;
      background-color: $mainColor;
    }
    .remark,.doctorInfoTitle{
      width: 690px;
      margin: 0px auto;
      font-size: 32px;
      height:80px;
      line-height: 80px;
      padding-left: 40px;
      display: flex;
      justify-content: space-between;
      /*background-color: #E64340;*/
    }
    .patientInfoTitle{
      width: 690px;
      margin: 30px auto;
      font-size: 28px;
      /*text-align: right;*/
      color: $mainColor;
      /*padding-right: 40px;*/
      display: flex;
      justify-content: space-between;
      .leftPatTitle{
        color: #333333;
        padding-left: 40px;
        font-size: 32px;
      }
    }
    .reasonWrap{
      display: flex;
      align-items:center;
      .refuseReason{
        width:100%;
        height: 140px;
        display: flex;
        /*<!--background-color: $bgColor2;-->*/
        .wrapImg{
          height: 140px;
          width: 140px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 30px;
          img{
            width: 60px;
            height: 60px;
          }
        }
        .wrapWord{
          height: 140px;
          display: flex;
          align-items: center;
          span{
            display: block;
            font-size: 24px;
            line-height: 19px;
            color: #4BCEC8;
            .time{
              display: inline-block;
              color: red;
            }
          }
        }
      }
    }
    .doctorInfo{
      width:100%;
      .circleAngle{
        width:690px;
        margin:0 auto;
        .aboutConsult{
          width:690px;
          margin: 0 auto;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          /*<!--background-color:$bgColor2;-->*/
          .list{
            width:100%;
            height: 80px;
            display: block;
            p{
              width:690px;
              height: 80px;
              margin:0 auto;
              font-size: 32px;
              color: #333333;
              padding-left: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span{
                padding-right: 20px;
                color: #999999;
              }
            }
          }
        }
        ul{
          padding:0;
          margin:0 auto;
          width: 690px;
          height: 190px;
          /*<!--background-color: $bgColor2;-->*/
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
          li{
            list-style-type: none;
            height: 190px;
            display: flex;
            .cancelImg{
              width: 160px;
              display: flex;
              justify-content: center;
              align-items: center;
              /*padding-left: 15px;*/
              img{
                width: 120px;
                height: 120px;
                border-radius: 50%;
              }
            }
            .cancelIntro{
              flex:2;
              display: flex;
              align-items: center;
              /*line-height: 10px;*/
              .introTitle{
                .subTitle{
                  font-size: 32px;
                  color: #333333;
                }
                .myDoctor{
                  width: 120px;
                  height: 36px;
                  display: inline-block;
                  font-size: 28px;
                  /*line-height: 18px;*/
                  color: #666666;
                  text-align: center;
                }
                p{
                  margin:0;
                  font-size: 28px;
                  color: #999999;
                }
              }


              span{

              }
            }
          }
        }
      }

    }
    .patientInfo{
      width: 690px;
      border-radius: 10px;
      margin:0 auto;
      /*<!--background-color: $bgColor2;-->*/
      display: flex;
      .leftTitle{
        width: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          height:80px;
          line-height: 80px;
          font-size: 32px;
          color: #333333;
        }
      }
      .rightMatch{
        width:540px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span{
          padding-right: 20px;
          height:80px;
          line-height: 80px;
          font-size: 32px;
          color: #999999;
        }
      }
    }
    .aboutCode{
      width:690px;
      margin: 30px auto;
      height:80px;
      display: flex;
      align-items: center;
      /*<!--background-color: $bgColor2;-->*/
      >div{
        width:690px;
        display: flex;
        justify-content: space-between;
        p{
          font-size: 32px;
          padding-left: 20px;
          padding-right: 20px;
          color: #333333;
        }
        p.codeDisplay{
          width:150px;
          background-color: #FFFFFF;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 90px;
            height: 30px;
          }
        }
        input{
          width:150px;
          border: none;
          outline:medium;
          text-align: center;
        }
      }
      button{
        width:690px;
        height: 80px;
        border:none;
        outline: medium;
        color: white;
        font-size: 32px;
        border-radius: 10px;
        background-color: $mainColor;
      }
    }
    .assistScroll{
      height: 50px;
    }
  }
</style>
