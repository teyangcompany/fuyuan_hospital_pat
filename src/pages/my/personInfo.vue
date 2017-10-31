<template>
  <div class="success">
    <!--<v-header :title="title" :rightTitle="rightTitle" @on-bookService="goBookService()"></v-header>-->
    <top class="noflex" title="个人资料" ref="header">
      <i slot="back"></i>
    </top>
    <div class="successContent" ref="success">
      <div>
        <div class="avatar">
            <span></span>
        </div>
        <div class="line"></div>
        <p class="doctorInfoTitle border-1px">个人信息</p>
        <div class="doctorInfo">
          <div class="circleAngle">
            <!--<div class="aboutConsult">-->
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
            <!--</div>-->
          </div>
        </div>
        <div class="secondLine"></div>
        <p class="patientInfoTitle"> <span class="leftPatTitle">医院账号</span>  </p>
        <div class="patientInfo">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p v-if="hosList">{{ hosList[0].yymc }}</p>
              </div>
              <div class="weui-cell__ft" style="text-align: right" v-if="personInfo">{{ personInfo.userCommonPatRecords[0].compatRecord }}</div>
            </div>
          </div>

        </div>
        <div class="aboutCode" @click="goBookService">
          <button>
             <span>添加医院账号</span>
            <img src="../../../static/img/add.png" alt="">
          </button>
        </div>
        <div class="assistScroll">

        </div>
      </div>

    </div>
    <toast v-if="showToast"></toast>
    <vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
    <relation-toggle :patList="compatInfo" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></relation-toggle>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import api from '../../lib/bookApi'
  import http from '../../lib/http'
  import top from '../../components/app-header.vue'
  import Toast from '../../base/toast'
  import relationToggle from '../../base/relationToggle.vue'
  import vueArea from 'vue-area'
  import { getAge } from '../../lib/filter'
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
        hosList:""
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
        this.getHosList()
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
      getHosList(){
         api("smarthos.yygh.ApiHospitalService.areaHosList",{
         }).then((data)=>{
             this.hosList = data.list
             console.log(data,333)
         })
      },
      areaResult: function(show, result){
        this.show = show
        this.result = result
        console.log(this.show)
        console.log(this.result)
      },
      check(index){
        console.log(index)
        this.showPat=false;
        this.isChange = true
        this.clickIndex=index;
      },
      closePatient(){
        this.showPat=false;
      },
      toggleArea(){
          this.show = true
      },
      showRelation(){
         this.showPat = true
      },
      _initSuccessScroll(){
        this.success = new BScroll(this.$refs.success,{
          click:true
        })
        console.log(this.success)
      },

      goBookService(){
          this.$router.push({
               path:"/my/addHosNum"
          })
      },

    },
    components:{
      Toast,
      top,
      vueArea,
      relationToggle
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
  /*.weui-cells:before{*/
    /*border:none;*/
  /*}*/
  /*.weui-cells:after{*/
    /*border:none;*/
  /*}*/
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
    .doctorInfo{
      width:100%;
      .circleAngle{
        width:690px;
        margin:0 auto;

      }

    }
    .patientInfo{
      width: 690px;
      margin:0 auto;
      /*<!--background-color: $bgColor2;-->*/
    }
    .aboutCode{
      width:690px;
      margin:0 auto;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      button{
        width:400px;
        height:80px;
        border:none;
        outline:medium;
        color: $mainColor;
        font-size: 32px;
        padding:10px 10px 10px 10px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width:36px;
          margin-left: 10px;
        }
      }
    }
    .assistScroll{
      height: 50px;
    }
  }
</style>
