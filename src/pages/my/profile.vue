<template>
  <div class="success">
    <v-header :title="title" :rightTitle="rightTitle" @on-docCard="modify()"></v-header>
    <!--<top class="noflex" title="个人资料" ref="header">-->
      <!--<i slot="back"></i>-->
    <!--</top>-->
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
                <div class="weui-cell__bd alignCenter" @click="uploadImg">
                  <img :src="patAvatar" alt="" v-if="patAvatar">
                  <img src="../../../static/img/pat.m.jpg" alt="" v-else-if="!patAvatar && personInfo.commpatGender == 'M'">
                  <img src="../../../static/img/pat.f.jpg" alt="" v-else>
                  <img src="../../../static/img/icon/arrow-right-grow.png" alt="" class="arrow">
                  <input type="file" style="display: none" accept="image/*" name="upload" id="upload" ref="upload" @change="onFileChange">
                </div>
              </div>
              <div class="weui-cell" v-if="personInfo && personInfo.userCommonPatRecords.length != 0" @click="alertInfo('姓名')">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                  <p>{{patName}}</p>
                </div>
              </div>
              <div class="weui-cell" v-else>
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                  <input class="weui-input" style="text-align: right" type="text"  v-model="patName"  placeholder="请输入姓名"/>
                </div>
              </div>
              <div class="weui-cell" v-if="showGender">
                <div class="weui-cell__hd"><label class="weui-label">性别</label></div>
                <div class="weui-cell__bd">
                  <p>{{ changeGender }}</p>
                </div>
              </div>

              <div class="weui-cell" v-if="showAge">
                <div class="weui-cell__hd"><label class="weui-label">年龄</label></div>
                <div class="weui-cell__bd">
                  <p>{{ changeAge }}</p>
                </div>
              </div>
              <div class="weui-cell"  v-if="personInfo && personInfo.userCommonPatRecords.length != 0" @click="alertInfo('手机号')">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                  <p >{{ patMobile }}</p>
                  <!--<input class="weui-input" readonly style="text-align: right" type="text"  v-model="patMobile" placeholder="请输入手机号"/>-->
                </div>
              </div>
              <div class="weui-cell"  v-else @click="goPhone">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                  <p >{{ patMobile }}</p>
                  <!--<input class="weui-input" readonly style="text-align: right" type="text"  v-model="patMobile" placeholder="请输入手机号"/>-->
                </div>
              </div>
              <div class="weui-cell" v-if="result" @click="toggleArea">
                <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                <div class="weui-cell__bd">
                  <p>{{selectedName}}</p>
                  <!--<input class="weui-input" readonly  style="text-align: right" type="text"  v-model="selectedName" placeholder=""/>-->
                </div>
              </div>
              <div class="weui-cell" v-else-if="areaName" @click="toggleArea">
                <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                <div class="weui-cell__bd alignCenter">
                  <p>{{ areaName }}</p>
                  <img src="../../../static/img/icon/arrow-right-grow.png" alt="" class="arrow">
                  <!--<input class="weui-input" readonly  style="text-align: right" type="text"  v-model="areaName" placeholder=""/>-->
                </div>
              </div>
              <div class="weui-cell" v-else  @click="toggleArea">
                <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                <div class="weui-cell__bd">
                  <p>{{ empty }}</p>
                  <!--<input class="weui-input" readonly  style="text-align: right" type="text"  v-model="empty" placeholder=""/>-->
                </div>
              </div>
              <!--<a class="weui-cell weui-cell_access" href="javascript:;" @click="toggleArea">-->
                <!--<div class="weui-cell__bd">-->
                  <!--<p>所在地区</p>-->
                <!--</div>-->
                <!--<div class="weui-cell__ft" v-if="result">-->
                  <!--{{ result.province.name }} {{ result.city.name == '市辖区' || result.city.name == '县' ? '': result.city.name }} {{ result.area.name == '市辖区' ? '': result.area.name }}-->
                <!--</div>-->
                <!--<div class="weui-cell__ft" v-else-if="personInfo.areaName">-->
                  <!--{{ personInfo.areaName }}-->
                <!--</div>-->
                <!--<div class="weui-cell__ft" v-else>-->
                  <!--qingxuanze-->
                <!--</div>-->
              <!--</a>-->
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
                <div class="weui-cell__bd"  v-if="personInfo && personInfo.userCommonPatRecords.length != 0" @click="alertInfo('身份证号')">
                  <p>{{ patIdCard }}</p>
                </div>
                <div class="weui-cell__bd"  v-else>
                  <input class="weui-input" style="text-align: right" type="text"  v-model="patIdCard"  placeholder="请输入身份证号"/>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">与我的关系</label></div>
                <div class="weui-cell__bd">
                    <p>本人</p>
                </div>
              </div>
            </div>

            <!--</div>-->
          </div>
          <div class="hosNumber">
             <p>医院账号</p>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label" style="font-size: 16px">义乌復元医院</label></div>
            <div class="weui-cell__bd">
              <p v-if="personInfo && personInfo.userCommonPatRecords.length != 0" style="font-size: 16px">{{ personInfo.userCommonPatRecords[0].compatRecord }}</p>
              <p v-else style="font-size: 16px">暂无病案号</p>
            </div>
          </div>
          <div class="addNumber" @click="goAddNumber">
               <p>添加医院账号</p>
               <img src="../../../static/img/add.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <toast v-if="showToast"></toast>
    <vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
  </div>
</template>
<script>
  import header from '../../base/header.vue'
  import BScroll from 'better-scroll'
  import api from '../../lib/bookApi'
  import http from '../../lib/http'
  import top from '../../components/app-header.vue'
  import Toast from '../../base/toast'
  import relationToggle from '../../base/relationToggle.vue'
  import vueArea from 'vue-area'
  import { getAge } from '../../lib/filter'
  import upload from "../../base/upload.vue"
  import config from '../../lib/config'
  import {getApiUrl,getEnv} from "../../lib/util"
  export default{
//    mixins: [isLoginMixin],
    data(){
      return{
        title:"个人资料",
        rightTitle:"保存",
        picList: [],
        config: config,
        personInfo:"",
        patOption:"",
        showPat:false,
        showToast:false,
        originName:"",
        originIdCard:"",
        modifyName:true,
        modifyIdCard:true,
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
        patAvatar:"",
        previewImg:"",
        areaName:"",
        selectedName:"",
        empty:"",
        finalCode:""
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
      this.getPersonInfo()
    },
    watch:{
      patName(){
           if(this.originName != this.patName){
             this.modifyName = false
           }
      },
      patIdCard(){
        this.originIdCard == this.patIdCard ? this.modifyIdCard : this.modifyIdCard = false
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
      },
      result(){
          if(this.result){
              this.modifyArea()
          }
      }
    },
    methods:{
      alertInfo(value){
          console.log(value)
         if(value == '姓名'){
              weui.alert("姓名不可修改")
         }else if(value == '手机号'){
           weui.alert("手机号不可修改")
        }else{
           weui.alert("身份证号不可修改")
         }
      },
      getPersonInfo(){
        http("smarthos.user.pat.get",{
          token:localStorage.getItem('token')
        }).then((data)=>{
            console.log(data)
          if(data.code == 0){
            this.personInfo = data.obj.userCommonPatVo
            this.patAvatar = data.obj.pat.patAvatar
            this.patName = this.personInfo.commpatName
            this.originName = this.personInfo.commpatName
            this.patIdCard = this.personInfo.commpatIdcard
            this.originIdCard = this.personInfo.commpatIdcard
            this.patMobile = this.personInfo.commpatMobile
            if(this.personInfo.areaName ){
              this.areaName = this.personInfo.areaName
            }
          }else{
              weui.alert(data.msg)
          }
        })
      },
      goAddNumber(){
        this.$router.push({
          path:"/my/addHosNum",
          query:{record:this.personInfo.userCommonPatRecords[0] && this.personInfo.userCommonPatRecords[0].compatRecord ? this.personInfo.userCommonPatRecords[0].compatRecord :'',id:this.personInfo.id }
        })
      },
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
        if(this.result){
          this.selectedName =  result.province.name + ','+ result.city.name + ','+  result.area.name
        }

//        console.log(this.show,)
        console.log(this.result,111)
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
      goPhone(){
//         this.$router.push({
//              path:"/changeSelfPhone"
//         })
      },

      uploadImg(){
        this.$refs.upload.click()
      },
      onFileChange(e) {
        console.log(e)
        var file = e.target.files[0]
        this.createImage(file)
      },
      createImage(file) {
        if (typeof FileReader === "undefined") {
          alert("您的浏览器不支持图片上传，请升级您的浏览器")
          return false
        }
        let that = this
        let fileName = file.name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          http("smarthos.system.file.upload.image.base64", {
            base64: this.result,
            fileName: fileName,
            fileType:"IMAGE",
            module:"PAT"
          }).then((data) => {
             if(data.code == 0){
               that.$set(that.$data, 'previewImg', data.obj.attaFileUrl)
               that.modifyPic()
             }else{
                 weui.alert(data.msg)
             }
          })
        }
      },
      modifyPic(){
        if(!this.showAge || !this.showGender || this.patIdCard.length != 18){
            weui.alert("身份证号不合法")
            return
        }
        http("smarthos.user.pat.infomation.modify",{
          patAvatar:this.previewImg,
//          areaCode:this.result == null || this.result.area.code == '' ? this.personInfo.areaCode :this.result.area.code,
//          patName:this.patName,
//          patIdcard:this.patIdCard
        }).then((data)=>{
          if(data.code == 0){
            this.getPersonInfo()
          }else{
            weui.alert(data.msg)
          }
        })
      },
      modifyArea(){
        http("smarthos.user.pat.infomation.modify",{
          areaCode:this.result == null || this.result.area.code == '' ? this.personInfo.areaCode :this.result.area.code,
        }).then((data)=>{
          if(data.code == 0){
            this.getPersonInfo()
            weui.toast("修改成功")
            this.$router.push({
              path:"/my"
            })
          }else{
            weui.alert(data.msg)
          }
        })
      },
      modify(){
        if(!this.showAge || !this.showGender || this.patIdCard.length != 18){
          weui.alert("身份证号不合法")
          return
        }else if(this.modifyIdCard &&  this.modifyName){
           weui.alert("您没有进行修改")
           return
        }
        http("smarthos.user.pat.infomation.modify",{
//             areaCode:this.result == null || this.result.area.code == '' ? this.personInfo.areaCode :this.result.area.code,
             patName:this.patName,
             patIdcard:this.patIdCard
           }).then((data)=>{
               if(data.code == 0){
                  this.getPersonInfo()
                  weui.toast("修改成功")
                  this.$router.push({
                      path:"/my"
                  })
               }else{
                   weui.alert(data.msg)
               }
           })
      },
    },
    components:{
      Toast,
      top,
      vueArea,
      upload,
      relationToggle,
      "VHeader":header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .weui-cells{
    margin:0;
    p{
      font-size: 32px;
    }
    .weui-cell__ft{
      font-size: 32px;
    }
    .weui-cell{
      /*padding:0;*/
      label{
        font-size: 32px;
      }
      input{
        font-size: 32px;
      }
      p{
        font-size: 32px;
        color: #666666;
      }
      .alignCenter{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .arrow{
          width: 18px;
          height:30px;
          margin-left: 10px;
        }
      }
    }
  }
  .upload{
    position: absolute;
    width:500px;
    height:100px;
    /*background-color: #1FB820;*/
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
      .hosNumber{
        width:710px;
        margin:0 auto;
        height: 90px;
        display: flex;
        align-items: center;
        p{
          height: 30px;
          line-height: 30px;
          font-size: 32px;
          padding-left: 10px;
          border-left: 8px solid #3d9bff;
        }
      }
      .addNumber{
        width:100%;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        /*margin-top: 20px;*/
        p{
          font-size: 32px;
          color: #333333;
        }
        img{
          width: 30px;
          height: 30px;
          margin-left: 10px;
        }
      }
    }

  }
</style>
