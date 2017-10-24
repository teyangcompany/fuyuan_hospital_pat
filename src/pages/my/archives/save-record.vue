<template>
    <div class="page">
        <app-header :title="title" class="noflex">
            <i slot="back"></i>
            <div slot="right" class="right absolute" @click="save">
                保存
            </div>
        </app-header>
        <div class="wrapper" :style="wrapperStyle">
            <ul class="form">
                <!--<li class="form-item form-item-input flex">-->
                    <!--<div class="label flex0">日期</div>-->
                    <!--<div class="input flex1 right">-->
                        <!--2017-12-09-->
                    <!--</div>-->
                <!--</li>-->
                <date :time="time" @getDate="getDate">

                </date>
                <li class="form-item form-item-input flex illDetail">
                    <div class="label flex0">
                      <span>请输入病历详情</span>
                      <span>{{ textLength }}/500</span>
                    </div>
                </li>
                <li class="form-item form-item-text">
                    <div class="textarea flex1">
                        <textarea v-model="description" @keyup="keypress()" id="myArea" placeholder="请输入"></textarea>
                    </div>
                </li>
                <upload-img :picList="picList">
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

            </ul>
        </div>

        <!--<div class="del-record noflex">-->
            <!--<a class="block">删除</a>-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import Upload from "../../../base/upload.vue"
    import date from "../../../base/date.vue"
    import uploadImg from "../../../base/uploadImg.vue"
    import AppHeader from "../../../components/app-header.vue"
    import config from "../../../lib/config"
    import api from "../../../lib/http"
    import {jssdkMixin} from '../../../lib/mixin'
    export default {
        data() {
            return {
                title: "",
                wrapperStyle: {},
                picList: [],
                config: config,
                time:"",
                description:'',
                textLength:0,
                token:localStorage.getItem('token')
            };
        },
        computed: {},
        components: {
            AppHeader,
            Upload,
            uploadImg,
            date
        },
        created() {
            if (this.$route.params.type) {
                let type = this.$route.params.type
                this.title = (type == "add") ? "添加病历" : "病历详情";
            }
            this.$set(this.wrapperStyle, "height", `${window.innerHeight - 45 - window.rem2px * (0.94 + 0.3 * 2)}px`)

        },
        mounted() {
            console.log(212121132)
            var day2 = new Date();
            day2.setTime(day2.getTime());
            var month = day2.getMonth()+1>=10?day2.getMonth()+1:'0'+(day2.getMonth()+1);
            var day = day2.getDate()>10?day2.getDate():'0'+day2.getDate();
            this.time = day2.getFullYear()+"-" + month + "-" + day;
        },
        beforeDestroy() {

        },
        methods: {
            keypress(){
              this.text = document.getElementById("myArea").value
              this.textLength = this.text.length
              if(this.textLength > 500){
                document.getElementById("myArea").value = this.text.substr(0,500)
                weui.alert("字数不能超过500")
              }
            },
            getDate(val){
              this.time = val
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

            },
            save(){
                if(this.description == '' && this.picList.length == 0){
                    weui.alert("请先完善病历相关信息")
                }else if(this.textLength >500){
                    weui.alert("最多可输入500个字")
                }else{
                  console.log(this.picList);
                  var arr = []
                  for(var i=0;i<this.picList.length;i++){
                    arr.push(this.picList[i].imgId)
                  };
                  api('smarthos.medical.history.add',{
                    "medicalTime":this.time,
                    "medContent":this.description,
                    "token":this.token,
                    "attaList":arr
                  }).then(res=>{
                    console.log(res,6666)
                    if(res.succ){
                      this.$router.push({
                        name:'healthRecord'
                      })
                    }else {
                      this.$weui.alert(res.msg)
                    }
                  })
                }
            },
        },
        watch:{
          description(){
            this.text = document.getElementById("myArea").value
            this.textLength = this.text.length
            if(this.textLength > 500){
              document.getElementById("myArea").value = this.text.substr(0,500)
              weui.alert("字数不能超过500")
            }
          }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common.scss";

    $wid: 140px;

    .pic {
        margin-right: 30px;
        margin-bottom: 30px;
        @include w_h($wid, $wid);
        img {
            @include w_h($wid, $wid);
        }
        .mask {
            @include t_r_b_l();
            text-align: center;
            color: white;
            line-height: $wid;
            background-color: rgba(0, 0, 0, .4);
        }
    }

    .input {
        background-image: url(../../../../static/img/icon/arrow-right-grow.png);
    }

    .text {
        align-items: center;
        margin-left: 30px;
        height: $wid;
        h3 {
            color: #333333;
            font-size: 28px;
        }
        p {
            margin-top: 20px;
            color: #999999;
            font-size: 24px;
        }
    }

    .upload {
        background-image: url(../../../../static/img/upload.png);
    }

    .del-record {
        padding: (750px - 690px)/2 0;
        a {
            border-radius: 10px;
            text-align: center;
            color: white;
            margin: 0 auto;
            @include w_h(690px, 94px);
            line-height: 94px;
            background-color: #ff8588;
        }
    }
    .illDetail{
         div{
           width:690px;
           display: flex;
           justify-content: space-between;
         }
    }
</style>
