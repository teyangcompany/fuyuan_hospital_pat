<template>
    <div class="page">
        <top class="noflex" title="快速咨询" ref="header">
            <i slot="back"></i>
            <div slot="right" class="right absolute">立即提问</div>
        </top>
        <div class="myHeader">
                <span class="col">
                        生病看哪个科室？哪个医生适合我？
                </span><br>
                <span class="col">
                        值班医生为您快速解答
                </span>
        </div>
        <div class="weui-cells__title">咨询信息</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p class="mfb">咨询对象</p>
                </div>
                <div class="weui-cell__ft mfb">华佗名医团队</div>
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="togglePatient">
                <div class="weui-cell__bd">
                    <p class="mfb">就诊人</p>
                </div>
                <div class="weui-cell__ft mfb">李康飞 男</div>
            </a>

        </div>
        <div class="weui-cells__title">病情描述</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="请输入描述" rows="3"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/200</div>
                </div>
            </div>
        </div>
        <div class="addImg">
            <upload-img :picList="picList">

                <upload slot="upload" class="float-left"
                        :server="config.api_url"
                        :params="config.base_params"
                        service="smarthos.system.file.upload"
                        module="MEDICAL"
                        fileType="IMAGE"
                        @progress="progress"
                        @success="success"
                        @added="added"></upload>

            </upload-img>
        </div>
        <sel-patient ref="patient">
            <div slot="pat" class="myPat bor" v-for="item of 4">
                李康飞
            </div>
        </sel-patient>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import upload from "../../base/upload.vue"
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import scroll from '../../base/scroll.vue'
    import uploadImg from '../../base/uploadImg.vue'
    import selPatient from '../../base/selPatient.vue'

    import api from '../../lib/http'
    export default{
        components: {
            top,
            scroll,
            upload,
            uploadImg,
            selPatient
        },
        mixins: ['mainHeightMixin'],
        data(){
            return {
                scrollHeight:'',
                config: config,
                picList: [],
            }
        },
        create(){
            this.scrollHeight = window.innerHeight-45
        },
        mounted(){

        },
        methods:{
            togglePatient(){
                this.$refs.patient.flag = true;
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
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .page{
        display: flex;
        flex: 1;
        overflow: hidden;
        flex-direction: column;
    }
    .myHeader{
        width: 100%;
        height: 90px;
        background: #e1ebff;
        text-align: center;
    }
    .col{
        font-size: 24px;
        color: #2772ff;
    }
    .upload {
        background-image: url(../../../static/img/upload.png);
        width: 140px;
        height: 140px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 99% 99%;
    }
    .addImg{
        box-sizing: border-box;
        background: white;
        flex: 1;
        overflow: auto;
        padding: 10px 30px;
        margin-top: 30px;
    }
    .myPat{
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 30px;
        color: black;
        border-bottom: 1px solid gainsboro;
    }
</style>
