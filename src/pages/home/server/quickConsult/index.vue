<template>
  <div>
      <app-header class="noflex" title="快速咨询" ref="header">
        <div class="right absolute" slot="right">立即提问</div>
      </app-header>
      <div class="tips">
           <p>生病看哪个科室？哪个医生适合我？</p>
           <p>值班医生为您快速解答</p>
      </div>
      <div class="basic border-1px">
        <div>
            咨询信息
        </div>
      </div>
      <router-link tag="div" to="/ill" class="illness border-1px">
        <div>
          咨询对象
          <div>
            <span>华佗名医团队</span>
            <img src="../../../../../static/img/icon/arrow-right.png" alt="">
          </div>
        </div>
      </router-link>
      <router-link tag="div" to="/pastHistory" class="history border-1px">
        <div>
          就诊人
          <div>
            <span>噜啦啦 男 24岁</span>
            <img src="../../../../../static/img/icon/arrow-right.png" alt="">
          </div>
        </div>
      </router-link>
      <router-link tag="div" to="/familyHistory" class="family border-1px">
        <div>
          疾病名称
          <div>
            <span>未确诊请不要填写</span>
            <img src="../../../../../static/img/icon/arrow-right.png" alt="">
          </div>
        </div>
      </router-link>
      <div class="basic border-1px">
        <div>
             病情资料
        </div>
      </div>
      <div class="ill border-1px">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea"  placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。（如有症状照片、病历、检查单、可在下方上传）" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="uploadWrap">
        <div class="upload">
          <div class="addPicture" v-for="(singleImage,index) in previewImg" v-if="previewImg.length != 0">
            <!--<span class="deleteImg">X</span>-->
            <img :src="singleImage" alt="" ref="replaceImg" @click="makeLarge(index)">
          </div>
          <div class="addPicture">
            <input type="file" name="upload" id="upload" ref="upload" @change="onFileChange">
            <img src="../../../../../static/img/upload.png" alt=""  @click="selectImg()">
          </div>
          <div class="wordFor">
            <span>添加图片</span>
            <span>请上传患处图片,让医生更了解您的病情</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import AppHeader from "../../../../components/app-header.vue"
  export default{
      data(){
          return{

          }
      },
      components:{
        AppHeader
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common';
.tips{
  width:100%;
  background-color: rgb(59,157,255);
  p{
    width: 690px;
    margin:0 auto;
    font-size: 28px;
    color: blue;
  }
}
.basic{
  width: 100%;
  height: 80px;
  >div{
    width: 690px;
    height: 80px;
    font-size: 32px;
    color: #333333;
    font-family: PingFangSC;
    margin:0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.illness,.history,.family{
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  /*border-top: 1px solid rgb(205,205,205);*/
  >div{
    width: 690px;
    height: 90px;
    margin:0 auto;
    display: flex;
    font-size:32px;
    font-family: PingFangSC;
    color: #333333;
    align-items: center;
    justify-content: space-between;
    >div{
      span{
        font-size:32px;
        font-family: PingFangSC;
        color: #666666;
        display: inline-block;
      }
      img{
        width: 7.5px;
      }
    }
  }
}
.weui-cells_form{
  margin:0;
}
.uploadWrap{
  width:100%;
  background-color: #ffffff;
  padding-top: 20px;
  .upload{
    width: 690px;
    height: 600px;
    border-radius: 10px;
    word-break: break-all;
    position: relative;
    margin: 0px auto;
    /*display: flex;*/
    .addPicture{
      float: left;
      margin-right: 16.2px;
      .deleteImg{
        position: absolute;
        top:0;
        left:0;
        background-color: #E64340;
      }
      >input{
        display: none;
      }
      img{
        width: 140px;
        height: 140px;
      }
    }
    .wordFor{
      span:first-child{
        font-size: 32px;
        color: #333333;
        display: block;
      }
      span:last-child{
        font-size: 28px;
        display: block;
        margin-top: 14.5px;
        color: #999999;
      }
    }
  }
}
</style>
