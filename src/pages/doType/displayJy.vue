<template>
  <div class="whole">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="wrapPaper">
      <div class="itemTitle border-1px" @click="toggleDisplay">
        <p>
          <span>{{ name }}</span>
          <span>(已选{{ itemArray.length }}项)</span>
          <img src="../../../static/img/1.png" alt="" v-if="showAllItem">
          <img src="../../../static/img/2.png" alt="" v-else>
        </p>
      </div>
      <transition name="fade">
        <div class="weui-cells weui-cells_radio" v-if="showAllItem">
          <label class="weui-cell weui-check__label"  v-for="item in itemArray">
            <div class="weui-cell__bd centerP">
              <p>{{ item }}</p>
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-success"></i>
              <!--<input type="radio" class="weui-check" name="radio1" checked/>-->
              <!--<span class="weui-icon-checked"></span>-->
            </div>
          </label>
        </div>
      </transition>
      <div class="patientInfo">
        <p class="border-1px">就诊人信息</p>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>姓名：</p>
            </div>
            <div class="weui-cell__ft">{{ jcInfo.commpatName }}</div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>手机号：</p>
            </div>
            <div class="weui-cell__ft">{{ jcInfo.commpatPhone }}</div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>身份证号：</p>
            </div>
            <div class="weui-cell__ft">{{ jcInfo.commpatIdcard }}</div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>病案号：</p>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <div class="patientInfo">
        <p class="border-1px">标本种类</p>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="sampleType" placeholder="请输入文本" rows="3"></textarea>
              <div class="weui-textarea-counter"><span></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="patientInfo">
        <p class="border-1px">主诉及症状</p>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="symptom" placeholder="请输入文本" rows="3"></textarea>
              <div class="weui-textarea-counter"><span></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="patientInfo">
        <p class="border-1px">初步诊断</p>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="diagnosis" placeholder="请输入文本" rows="3"></textarea>
              <div class="weui-textarea-counter"><span></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="patientInfo">
        <p class="border-1px">备注</p>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="remark" placeholder="请输入文本" rows="3"></textarea>
              <div class="weui-textarea-counter"><span></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="attach">
        <p>{{ jcInfo.docName }}</p>
        <p>{{ jcInfo.createTime | getForMoment }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header.vue'
  import {getForMoment} from '../../lib/filter'
  import http from '../../lib/http'
  export default{
    data(){
      return{
        title:"检验单",
        rightTitle:"",
        itemArray:[],
        diagnosis:"",
        remark:"",
        symptom:"",
        sampleType:"",
        jcInfo:"",
        name:"",
        showAllItem:true,
        itemLength:0,
        inspectionItemName:""
      }
    },
    filters:{
      getForMoment
    },
    created(){
      this.id = this.$route.query.id
      this.getDetail()
    },
    components:{
      "VHeader":header
    },
    methods:{
      toggleDisplay(){
        this.showAllItem  = !this.showAllItem
      },
      getDetail(){
        http("smarthos.appiontment.inspection.sheet.detail",{
          id:this.id
        }).then((data)=>{
          if(data.code == 0){
            console.log(data)
            this.jcInfo = data.obj
            this.diagnosis = data.obj.diagnosis
            this.name = data.obj.inspectionTypeName
            this.inspectionItemName = data.obj.inspectionItemName
            this.itemArray = this.inspectionItemName.split(';')
            this.remark = data.obj.remark
            this.symptom =  data.obj.symptom
            this.sampleType = data.obj.sampleType
          }else{
            this.$weui.alert(data.msg)
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common';
  .wrapPaper{
    position: absolute;
    top:98px;
    left:0;
    right:0;
    bottom:0;
    background-color: $bgColor;
    overflow: auto;
    .itemTitle{
      height: 90px;
      width:100%;
      background-color: #ffffff;
      p{
        height: 90px;
        width:100%;
        line-height: 90px;
        text-align: center;
        span:nth-child(1){
          font-size: 32px;
          color: #333333;
        }
        span:nth-child(2){
          font-size: 30px;
          color: #333333;
        }
        img{
          width: 24px;
          height:16px;
        }
      }
    }
    .fade-enter-active,.fade-leave-active{
      transition: all .5s ease;
    }
    .fade-enter,.fade-leave-to{
      transform:translateY(100%);
    }
    .patientInfo{
      margin-top: 20px;
      .weui-cell:before{
        border-top:none;
      }
      .weui-cell__bd{
        p{
          font-size: 30px!important;
          color: #333333!important;
        }
      }
      >p{
        width:100%;
        height: 90px;
        line-height: 90px;
        background-color: #ffffff;
        font-size: 32px;
        color: #333333;
        padding-left: 30px;
      }
    }
    .attach{
      margin-top: 40px;
      width:100%;
      p{
        font-size: 32px;
        color: #333333;
        text-align: right;
        padding-right: 30px;
      }
      p:nth-child(2){
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .weui-cells:before{
      border-top: none;
    }
    .weui-cells{
      margin-top: 0;
      .weui-cell__bd{
        p{
          font-size: 32px;
          color: #333333;
        }
      }
      .centerP{
        p{
          text-align: center;
        }
      }
    }
  }
</style>
