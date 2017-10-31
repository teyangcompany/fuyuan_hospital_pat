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
        <div class="doctorInfo">
          <div class="circleAngle">
            <!--<div class="aboutConsult">-->
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">头像</label></div>
                <div class="weui-cell__bd">
                  <img :src="patAvatar" alt="" v-if="patAvatar">
                  <img src="../../../static/img/pat.m.jpg" alt="" v-else-if="!patAvatar && personInfo.commpatGender == 'M'">
                  <img src="../../../static/img/pat.f.jpg" alt="" v-else>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                  <input class="weui-input" style="text-align: right" type="text"  v-model="patName"  placeholder="请输入姓名"/>
                </div>
              </div>
              <div class="weui-cell" v-if="showGender">
                <div class="weui-cell__hd"><label class="weui-label">性别</label></div>
                <div class="weui-cell__bd">
                  <input class="weui-input" readonly style="text-align: right" type="text"  v-model="changeGender"  placeholder=""/>
                </div>
              </div>

              <div class="weui-cell" v-if="showAge">
                <div class="weui-cell__hd"><label class="weui-label">年龄</label></div>
                <div class="weui-cell__bd">
                  <input class="weui-input" readonly style="text-align: right" type="text"  v-model="changeAge"  placeholder=""/>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                  <input class="weui-input" style="text-align: right" type="text"  v-model="patMobile" placeholder="请输入手机号"/>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
                <div class="weui-cell__bd">
                  <input class="weui-input" style="text-align: right" type="text"  v-model="patIdCard"  placeholder="请输入身份证号"/>
                </div>
              </div>
            </div>

            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <toast v-if="showToast"></toast>

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
        hosList:"",
        changeGender:"",
        changeAge:"",
        patAvatar:""
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
        this.patAvatar = data.obj.pat.patAvatar
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
          this.changeGender = parseInt(this.patIdCard.substr(16,1)) % 2 == 1 ? '男':'女'
          this.changeAge = JSON.stringify(new Date()).substr(1,4)- this.nowAge
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
    .doctorInfo{
      width:100%;
      img{
        width:84px;
        height:84px;
        border-radius: 50%;
      }
      .weui-cell__bd{
         text-align: right;
          input{
              font-size: 32px;
              color: #666666;
          }
      }
    }

  }
</style>
