<template>
  <div class="success">
    <!--<v-header :title="title" :rightTitle="rightTitle" @on-bookService="goBookService()"></v-header>-->
    <top class="noflex" title="个人资料" ref="header">
      <i slot="back"></i>
    </top>
    <div class="successContent" ref="success">
      <div>
        <div class="line"></div>
        <p class="doctorInfoTitle border-1px">个人信息</p>
        <div class="doctorInfo">
          <div class="circleAngle">
            <div class="aboutConsult">
              <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" style="text-align: right" type="text"  v-model="patName"  placeholder="请输入姓名"/>
                  </div>
                </div>
                <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" style="text-align: right" type="text"  v-model="patIdCard"  placeholder="请输入身份证号"/>
                  </div>
                </div>
                <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" style="text-align: right" type="text"  v-model="patMobile" placeholder="请输入手机号"/>
                  </div>
                </div>
              </div>
              <div class="weui-cells border-1px-top">
                <a class="weui-cell weui-cell_access" href="javascript:;" v-if="showAge">
                  <div class="weui-cell__bd">
                    <p>年龄</p>
                  </div>
                  <div class="weui-cell__ft"> {{ JSON.stringify(new Date()).substr(1,4)- nowAge }}</div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" v-else>
                  <div class="weui-cell__bd">
                    <p>年龄</p>
                  </div>
                  <div class="weui-cell__ft"></div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" v-if="showGender">
                  <div class="weui-cell__bd">
                    <p>性别</p>
                  </div>
                  <div class="weui-cell__ft">{{ parseInt(patIdCard.substr(16,1)) % 2 == 1 ? '男':'女' }}</div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" v-else>
                  <div class="weui-cell__bd">
                    <p>性别</p>
                  </div>
                  <div class="weui-cell__ft"></div>
                </a>
              </div>
              <div class="weui-cells border-1px-top">
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="toggleArea">
                  <div class="weui-cell__bd">
                    <p>所在地区</p>
                  </div>
                  <div class="weui-cell__ft" v-if="result">
                    {{ result.province.name }} {{ result.city.name == '市辖区' || result.city.name == '县' ? '': result.city.name }} {{ result.area.name == '市辖区' ? '': result.area.name }}
                  </div>
                  <div class="weui-cell__ft" v-else-if="personInfo.areaName">
                     {{ personInfo.areaName }}
                  </div>
                  <div class="weui-cell__ft" v-else>

                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="showRelation()">
                  <div class="weui-cell__bd">
                    <p>与我的关系</p>
                  </div>
                  <div class="weui-cell__ft" v-if="personInfo.self && !isChange">本人</div>
                  <div class="weui-cell__ft" v-else-if="personInfo.relationship && !isChange">{{ personInfo.relationship }}</div>
                  <div class="weui-cell__ft" v-else>{{ compatInfo[clickIndex] }}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="secondLine"></div>
        <p class="patientInfoTitle"> <span class="leftPatTitle">医院账号</span>  </p>
        <!--<div class="patientInfo">-->
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p>标题文字</p>
              </div>
              <div class="weui-cell__ft" style="text-align: right">说明文字</div>
            </div>
          </div>

        <!--</div>-->
        <div class="aboutCode" @click="goBookService">
          <button>添加医院账号</button>
        </div>
        <div class="assistScroll">

        </div>
      </div>

    </div>
    <!--<v-dialog :dialogTitle="dialogTitle"-->
              <!--:dialogMain="dialogMain"-->
              <!--:dialogLeftFoot="dialogLeftFoot"-->
              <!--:dialogRightFoot="dialogRightFoot"-->
              <!--v-if="showDialog"-->
              <!--@on-cancel="cancelDialog" @on-download="bindCard"></v-dialog>-->
    <!--<v-dialog :dialogTitle="dialogCreateTitle"-->
              <!--:dialogMain="dialogCreateMain"-->
              <!--:dialogLeftFoot="dialogCreateLeftFoot"-->
              <!--:dialogRightFoot="dialogCreateRightFoot"-->
              <!--v-if="showCreateDialog"-->
              <!--@on-cancel="cancelCreate" @on-download="createCard"></v-dialog>-->
    <!--<div class="emptyHistory" v-if="fail">-->
      <!--<bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus"  @on-iSee="iSee()"></bind-fail>-->
    <!--</div>-->
    <!--<div class="emptyHistory" v-if="successDisplay">-->
      <!--<bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>-->
    <!--</div>-->
    <!--<div class="emptyHistory" v-if="createDisplay">-->
      <!--<create-success :title="createWord" :illNumber="createNumber" :secondLine="secondCreateLine" :failKnow="failKnow" @on-iSee="iSeeCreate()"></create-success>-->
    <!--</div>-->
    <!--<patient-toggle :patList="compatInfo" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>-->
    <toast v-if="showToast"></toast>
    <vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
    <!--<v-mask v-if="fail || successDisplay || createDisplay"></v-mask>-->
    <relation-toggle :patList="compatInfo" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></relation-toggle>
  </div>
</template>
<script>
  //  import header from '../../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/bookApi'
  import http from '../../lib/http'
  import top from '../../components/app-header.vue'
  import patientToggle from '../../base/patientToggle.vue'
  import Dialog from '../../base/dialog'
  import bindSuccess from '../../base/bindSuccess/bindSuccess'
  import bindFail from '../../base/bindFail/bindFail'
  import VMask from '../../base/mask'
  import Toast from '../../base/toast'
  import relationToggle from '../../base/relationToggle.vue'
  import createSuccess from '../../base/createSuccess/createSuccess.vue'
  import vueArea from 'vue-area'
  import { getAge } from '../../lib/filter'
  //  import Alert from '../../../base/alert'
  //  import weui from 'weui.js'
  //  import {isLoginMixin} from "../../../lib/mixin"
  //  import {tokenCache} from '../../../lib/cache'
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
          personInfo:"",
          patOption:"",
          showPat:false,
        showToast:false,
          compatInfo:['本人','父母','配偶','子女','亲戚','朋友','其他'],
        result: null,
        show: false,
        isChange:false,
        clickIndex:0,
        patName:"",
        patIdCard:"",
        patMobile:"",
        showAge:false,
        showAgeSec:true,
        showGender:false,
        showGenderSec:true,
        nowAge:"",
      }
    },
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this._initSuccessScroll()
        },20)
      })
    },
    filters:{
      getAge
    },
    created(){
      http("smarthos.user.pat.get",{
        token:localStorage.getItem('token')
      }).then((data)=>{
          this.personInfo = data.obj.userCommonPatVo
          this.patName = this.personInfo.commpatName
          this.patIdCard = this.personInfo.commpatIdcard
          this.patMobile = this.personInfo.commpatMobile
          console.log(data,666)
      })


    },
    watch:{
      patIdCard(){
        if(this.patIdCard.substr(16,1) != ''){
          this.nowAge = this.patIdCard.substr(6,4)
          this.showAge = true
          console.log(this.patIdCard.substr(16),666)
          this.showGender = true
        }else{
          this.showAge = false
          this.showGender = false
          this.showAgeSec = false
          this.showGenderSec = false
        }
      }
    },
    methods:{
      getPatient(){
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
      areaResult: function(show, result){
        this.show = show
        this.result = result
        console.log(this.show)
        console.log(this.result)
      },
      toggleArea(){
          this.show = true
      },
      showRelation(){
         this.showPat = true
      },
      cancelDialog(){
        this.showDialog = false
      },
      iKnow(){
        this.showAlert = false
      },
      iSee(){
        this.successDisplay = false
        this.fail = false
      },
      iSeeCreate(){
        this.getPatient()
        this.createDisplay = false
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
      check(index){
         console.log(index)
        this.clickIndex = index
        this.isChange = true
        this.showPat = false
      },
      closePatient(){
        this.showPat=false;
      },
      //就诊卡绑定
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
      //就诊卡创建
      createNum(){
        http("smarthos.user.commpat.record.new",{
          token:localStorage.getItem('token'),
          commpatId:this.compatInfo[this.index].id,
          bookHosId:this.hosid
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
          commpatId:this.compatInfo[this.index].id,
          bookHosId:this.hosid
        }).then((data)=>{
          console.log(data)
          this.showToast = false
          if(data.code == 0){
            if(data.obj == 'needCreate'){
              this.showCreateDialog = true
            }else if(data.obj == 'needBind'){
              this.showDialog = true
            }else{
              this.finalBook()
            }
          }else{
            weui.alert(data.msg)
          }
        })
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
      //预约挂号提交

      //确认预约的点击事件
      goBookService(){
        this.showToast = true
        this.recordCheck()
      },

    },
    components:{
//      'VHeader':header,
      "VDialog":Dialog,
      bindSuccess,
      VMask,
      bindFail,
      Toast,
      top,
      createSuccess,
      patientToggle,
      relationToggle,
      vueArea,
//      Alert
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .weui-cell{
    /*padding:0;*/
    label{
      font-size: 32px;
    }
    input{
        font-size: 32px;
    }
  }
  .weui-cells{
    margin:0;
      p{
        font-size: 32px;
      }
       .weui-cell__ft{
        font-size: 32px;
       }
  }
  .weui-cells:before{
    border:none;
  }
  .weui-cells:after{
    border:none;
  }
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
      top:805px;
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
        color: $mainColor;
        font-size: 32px;
        border-radius: 10px;
        background-color: #FFFFFF;
      }
    }
    .assistScroll{
      height: 50px;
    }
  }
</style>
