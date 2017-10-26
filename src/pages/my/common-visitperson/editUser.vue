<template>
    <div>
        <!--<top>-->
            <!--<div>常用就诊人</div>-->
            <!--<span slot="right" class="add"@click="saveEdit">保存修改</span>-->
        <!--</top>-->
      <top title="常用就诊人" ref="header" class="noflex">
        <i slot="back"></i>
        <div slot="right" class="right absolute" @click="saveEdit">
          保存修改
        </div>
      </top>
      <div class="wrap">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patName.$error }">
              <input  @blur="$v.patName.$touch()" class="weui-input" type="text" v-model="patName"  placeholder="请输入姓名"/>
            </div>
          </div>
          <span class="form-group__message bf" v-if="!$v.patName.minLength&&showNameError">姓名至少2位</span>
          <span class="form-group__message bf" v-if="!$v.patName.maxLength&&showNameError">姓名至多15位</span>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf" >身份证号</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patIdcard.$error }">
              <input @blur="getAge"  @input="$v.patIdcard.$touch()"  class="weui-input" type="text" v-model="patIdcard" placeholder="请输入身份证号"/>
            </div>
          </div>
        </div>
        <span class="form-group__message bf" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="editPhone">
            <div class="weui-cell__bd">
              <p>手机号 &nbsp; &nbsp;&nbsp;{{mobile}}</p>
            </div>
            <div class="weui-cell__ft">
            </div>
          </a>
        </div>

        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">年&nbsp;&nbsp;&nbsp;龄</label></div>
            <div class="weui-cell__bd bf" v-if="age != ''">
              {{age}}
            </div>
            <div class="weui-cell__bd bf" v-else>
              {{JSON.stringify(new Date()).substr(1,4) - patIdcard.substr(6,4)}}
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label  class="weui-label bf">性&nbsp;&nbsp;&nbsp;别</label>
            </div>
            <div class="weui-cell__bd bf" v-if="gender != ''">
              {{ gender == 'M'? '男':'女'  }}
            </div>
            <div class="weui-cell__bd bf" v-else>
              {{ parseInt(patIdcard.substr(16,1)) % 2 == 1 ? '男':'女'  }}
            </div>
          </div>
          <div class="weui-cell" @click="toggleArea">
            <div class="weui-cell__hd">
              <label  class="weui-label bf">所在地区</label>
            </div>
            <div class="weui-cell__bd bf" v-if="result">
                {{ result.province.name }} {{ result.city.name == '市辖区' || result.city.name == '县' ? '': result.city.name }} {{ result.area.name == '市辖区' ? '': result.area.name }}
            </div>
            <div class="weui-cell__bd bf" v-else-if="itemInfo.areaName">
                {{ itemInfo.areaName }}
            </div>
            <div class="weui-cell__bd bf" v-else>

            </div>
            <img src="../../../../static/img/icon/arrow-right-grow.png" alt="" class="rightArrow">
          </div>
          <div class="weui-cell relation" @click="toggleRelation">
            <div class="weui-cell__hd"><label class="weui-label bf relationShip">与本人的关系</label></div>
            <div class="weui-cell__bd" v-if="itemInfo.relationship">
                 {{ itemInfo.relationship }}
            </div>
            <div class="weui-cell__bd" v-else>
                 {{ compatInfo[clickIndex] }}
            </div>
            <img src="../../../../static/img/icon/arrow-right-grow.png" alt="" class="rightArrow">
          </div>
          <div class="hosNumber">
            <p>医院账号</p>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label  class="weui-label bf">浙二医院</label>
            </div>
            <div class="weui-cell__bd bf" >

            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label  class="weui-label bf hos">长兴人民医院</label>
            </div>
            <div class="weui-cell__bd bf" >

            </div>
          </div>
        </div>
      </div>
      <vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
      <relation-toggle :patList="compatInfo" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></relation-toggle>
    </div>
</template>
<script type="text/ecmascript-6">
  import top from "../../../components/app-header.vue"
  import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
  import cd from '../../../lib/regex'
  import api from '../../../lib/http'
  import relationToggle from '../../../base/relationToggle.vue'
  import {mainHeightMixin} from "../../../lib/mixin"
  import vueArea from 'vue-area'
//  var token  = localStorage.getItem('token')
  export default{
    components: {
      top,
      vueArea,
      relationToggle
    },
    mixins: [mainHeightMixin],
    validations: {
      patName: {
        required,
        minLength:minLength(2),
        maxLength:maxLength(15)
      },patIdcard:{
        required,
        cd:cd(15,18)
      }
    },
    data(){
      return {
        token:localStorage.getItem('token'),
        patName:'',
        patIdcard:'',
        showNameError:false,
        showCd:false,
        mobile:'',
        patId:'',
        age:'',
        gender:"",
        compatId:'',
        patDetail:{},
        itemInfo:"",
        relationInfo:"",
        showPat:false,
        compatInfo:['本人','父母','配偶','子女','亲戚','朋友','其他'],
        clickIndex:0,
        patOption:"",
        result: null,
        show: false
      }
    },
    mounted(){
//      console.log(this.$route.query.item,565656)
      this.itemInfo = JSON.parse(this.$route.query.item)
      console.log(this.itemInfo)
      this.$set(this.$data,'patName',this.itemInfo.commpatName);
      this.$set(this.$data,'patIdcard',this.itemInfo.commpatIdcard);
      this.$set(this.$data,'mobile',this.itemInfo.commpatMobile);
      this.$set(this.$data,'gender',this.itemInfo.commpatGender);
//      this.$set(this.$data,'initAge',this.$route.params.item.compatAge);
      this.$set(this.$data,'compatId',this.itemInfo.id);

    },
    methods:{
      areaResult: function(show, result){
        this.show = show
        this.result = result
        console.log(this.show)
        console.log(this.result)
      },
      toggleRelation(){
            this.showPat = true
      },
      check(index){
          this.clickIndex = index
        this.showPat = false
          console.log(index)
      },
      closePatient(){
        this.showPat = false
      },
      toggleArea(){
            this.show = true
      },
      getAge(){
        var date = new Date;
        var year = date.getFullYear();
        var num = this.patIdcard.substring(6,10);
        var age = year-num;
        return this.$set(this.$data,'age',age)
      },
      editPhone(){
        this.$router.push({
          name:'editPhone',
          query:{
            compatId:this.compatId,
            item:JSON.stringify(this.$route.query.item)
          }
        })
      },
      saveEdit(){
        if(this.$v.patName.$invalid){
          this.$set(this.$data,'showNameError',true)
        }else if(this.$v.patIdcard.$invalid){
          this.$set(this.$data,'showCd',true)
        } else {
             api('smarthos.user.commpat.infomation.modify',{
               "token":this.token,
               "commpatId":this.compatId,
               "commpatName":this.patName,
               "commpatIdcard":this.patIdcard,
               relationship:this.compatInfo[this.clickIndex],
               areaCode:this.result.area.code ? this.result.area.code:itemInfo.areaName,
             }).then(res=>{
               console.log(res)
               if(res.succ){
                 this.$router.push({
                   path:"/my/common-visitperson"
                 })
               }else {
                 this.$weui.alert(res.msg)
               }
             })

        }
      },
      getAge(){
        var date = new Date;
        var year = date.getFullYear();
        var num = this.patIdcard.substring(6,10);
        var age = year-num;
        return this.$set(this.$data,'age',age)
      },
      bindCode(){
        Api('nethos.book.compat.bind',{
          token:this.token,
          compatId:this.compatId
        }).then(req=>{
          console.log(req,999999);
          if(req.succ){

          }else {
            this.$router.push('feedback')
          }
        })
      },
      deleteUser(){
        Api('nethos.pat.compat.delete',{
          token:this.token,
          compatId:this.compatId
        }).then(req=>{
          console.log(req,56565656);
          if(req.succ){
            this.$router.push('users')
          }
        })
      },
      changePhone(){
        this.$router.push('editPhone')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/common.scss';
  .add{
    color: #0FBDFF;
  }
  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
  .arrow{
    color: gray;
    font-weight: 800;
  }
  .rightArrow{
    width:16px;
    height:24px;
  }
  .weui-cells{
    margin-top: 30px;
  }
  .weui-label{
    width: 80px;/*no*/
  }
  .relationShip{
    width:130px;/*no*/
  }
  .relationRight{
    width:300px;
    text-align: right;
  }
  .relationInput{
      text-align: right;
  }
  .hosNumber{
    width: 100%;
    background-color:#f5f5f5;
    margin:0 auto;
    height: 80px;
    p{
      width:690px;
      margin:0 auto;
      font-size: 28px;
      height:80px;
      line-height: 80px;
    }
  }
  .hos{
    width:400px;
  }

</style>
