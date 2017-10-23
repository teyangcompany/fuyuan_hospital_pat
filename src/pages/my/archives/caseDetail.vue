<template>
  <div class="page">
    <!--<top>-->
      <!--<div class="middle big">病例详情</div>-->
      <!--<span slot="right" class="step" @click="save">保存</span>-->
    <!--</top>-->
    <top title="病历详情" class="noflex">
      <i slot="back"></i>
      <div slot="right" class="right absolute" @click="save">
        保存
      </div>
    </top>

        <div >
          <!--<div class="weui-cells">-->
            <!--<a @click="selectDate" class="weui-cell weui-cell_access" href="javascript:;">-->
              <!--<div class="weui-cell__bd">-->
                <!--<p class="bf">日期</p>-->
              <!--</div>-->
              <!--<div class="weui-cell__ft bf">{{date | Getdate}}</div>-->
            <!--</a>-->
          <!--</div>-->
          <date :time="time" @getDate="getDate"></date>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <p class="bf">请输入病历详情</p>
              </div>
            </div>
          </div>
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <textarea class="weui-textarea" v-model="caseText" placeholder="请输入文本" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="addImg">
          <!--<img :src="item.attaFileUrl" alt="" v-for="item of imgList">-->
          <upload-img :picList="picList" :imgList="imgList">
                    <span slot="upload">
                        <upload class="float-left"
                                :server="config.api_url"
                                :params="config.base_params"
                                service="smarthos.system.file.upload"
                                module="MEDICAL"
                                fileType="IMAGE"
                                @progress="progress"
                                @success="success"
                                @added="added"></upload>
                    </span>
          </upload-img>
        </div>
        <div class="btn">
          <div class="text mfc">{{date |  getDay}} &nbsp;&nbsp;由{{creatorName}}添加</div>
          <a @click="deleteCase" style="background: #ff8588" href="javascript:;" class="weui-btn weui-btn_primary">删除</a>
        </div>
        <v-dialog @on-cancel="closeAll" @on-download="closeAllCancel" v-if="showAllDialog"
                  :dialogTitle="dialogTitle"
                  :dialogMain="dialogMain"
                  :dialogLeftFoot="dialogLeftFoot"
                  :dialogRightFoot="dialogRightFoot"
        ></v-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  import Upload from "../../../base/upload.vue"
  import uploadImg from "../../../base/uploadImg.vue"
  import date from "../../../base/date.vue"
  import top from "../../../components/app-header.vue"
  import config from "../../../lib/config"
  import Dialog from '../../../base/dialog.vue'
  import {Getdate,Todate,getDay} from '../../../lib/filter'
  import api from '../../../lib/http'
  export default{
    components: {
      top,
      Upload,
      date,
      uploadImg,
      "VDialog":Dialog
    },
    filters:{
      Todate,
      Getdate,
      getDay
    },
    data(){
      return {
        token:localStorage.getItem('token'),
        caseObj:{},
        date:'',
        caseText:'',
        imgList:[],
        imgId:[],
        id:'',
        creatorName:'',
        picList: [],
        config: config,
        time:"",
        dialogTitle: "删除",
        dialogMain: "确定删除此条记录",
        dialogLeftFoot: "取消",
        dialogRightFoot: "删除",
        showAllDialog:false
      }
    },
    created(){
      var caseObj = this.$route.params.caseObj;
      console.log(caseObj,121212)
      this.$set(this.$data,'caseObj',caseObj)
      this.$set(this.$data,'date',caseObj.medicalHistory.createTime)
      this.$set(this.$data,'caseText',caseObj.medicalHistory.medContent)
      this.$set(this.$data,'id',caseObj.medicalHistory.id)
      this.$set(this.$data,'imgList',caseObj.attaList)
      this.$set(this.$data,'creatorName',caseObj.creatorName);
      if(this.imgList && this.imgList.length>0){
        for(var i=0;i<this.imgList.length;i++){
          this.imgId.push(this.imgList[i].id)
        }
      };
       this.time =  getDay(this.date);
    },
    methods:{
      getDate(val){
        this.time = val
      },
      save(){
        for(var i=0;i<this.picList.length;i++){
          this.imgId.push(this.picList[i].imgId)
        };
        api("smarthos.medical.history.modify",{
          "medicalTime":this.time,
          "medContent":this.caseText,
          "id":this.id,
          "attaList":this.imgId,
          "token":this.token
        }).then(res=>{
          console.log(res,565656565656)
          if(res.succ){
            this.$router.push({
              name:'healthRecord'
            })
          }else {
            this.$weui.alert(res.msg)
          }
        })
      },
      deleteCase(){
          this.showAllDialog = true
      },
      closeAll(){
        this.showAllDialog = false
      },
      closeAllCancel(){
        this.showAllDialog = false
        api("smarthos.medical.history.delete",{
          id:this.id,
          token:this.token
        }).then(res=>{
          console.log(res,7877878)
          if(res.succ){
            this.$router.push({
              name:'healthRecord'
            })
          }else {
            this.$weui.alert(res.msg)
          }
        })
      },
      added(file) {
        file.thumb().then(res => {
          file.setThumbUrl(res);
          this.picList.push(file);
          this.picList.sort((a, b) => {
            return a.sort - b.sort
          })
        });
      },
      progress(file, pro) {
        let index = this.picList.findIndex((pic) => {
          return pic.id == file.id;
        });
        this.picList[index].changeStatus("loading");
        this.picList[index].setProgress(pro);
      },
      success(file, res) {
        let index = this.picList.findIndex((pic) => {
          return pic.id == file.id;
        });
        if (res.code == 0) {
          this.picList[index].changeStatus("loaded");
          this.picList[index].setImgId(res.obj.id);
          this.picList[index].setUrl(res.obj.attaFileUrl)
        }

      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../../common/common.scss';
.page{
  display: flex;
  flex: 1;
  flex-direction: column;
}

  .weui-cells{
    margin-top: 0;
  }
  .addImg{
    box-sizing: border-box;
    background: white;
    flex: 1;
    overflow: auto;
    padding:0 30px;
  }
  .btn{
    /*position: fixed;*/
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    background: white;
  }
  .text{
    text-align: center;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
  .addImg img{
    width: 140px;
    height: 140px;
    margin-right: 5px;
  }
  .weui-cells:after{
    border: none;
  }
  .upload {
    background-image: url(../../../../static/img/upload.png);
    width: 140px;
    height: 140px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 99% 99%;
  }



</style>
