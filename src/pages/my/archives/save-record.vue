<template>
    <div class="page">
        <app-header :title="title" class="noflex">
            <i slot="back"></i>
            <div slot="right" class="right absolute">
                保存
            </div>
        </app-header>
        <div class="wrapper" :style="wrapperStyle">
            <ul class="form">
                <li class="form-item form-item-input flex">
                    <div class="label flex0">日期</div>
                    <div class="input flex1 right">
                        2017-12-09
                    </div>
                </li>
                <li class="form-item form-item-input flex">
                    <div class="label flex0">请输入病历详情</div>
                </li>
                <li class="form-item form-item-text">
                    <div class="textarea flex1">
                        <textarea placeholder="请"></textarea>
                    </div>
                </li>
                <li class="form-item form-item-upload overflow-hidden piclist">
                    <div class="pic float-left relative" v-for="pic in picList">
                        <img :id="pic.id" :src="pic.url?pic.url:pic.thumbUrl"
                             alt="">
                        <div class="mask absolute" v-show="pic.status!='loaded'">{{pic.progress}}</div>
                    </div>
                    <div class="show-upload float-left overflow-hidden">
                        <upload class="float-left"
                                :server="config.api_url"
                                :params="config.base_params"
                                service="smarthos.system.file.upload"
                                module="MEDICAL"
                                fileType="IMAGE"
                                @progress="progress"
                                @success="success"
                                @added="added"></upload>
                        <div class="text float-left flex">
                            <div class="flex0">
                                <h3>添加图片</h3>
                                <p>上传相关照片</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="del-record noflex">
            <a class="block">删除</a>
        </div>
    </div>
</template>

<script>
    import Upload from "../../../base/upload.vue"
    import AppHeader from "../../../components/app-header.vue"
    import config from "../../../lib/config"

    export default {
        data() {
            return {
                title: "",
                wrapperStyle: {},
                picList: [],
                config: config
            };
        },
        computed: {},
        components: {
            AppHeader,
            Upload
        },
        created() {
            if (this.$route.params.type) {
                let type = this.$route.params.type
                this.title = (type == "add") ? "添加病历" : "病历详情";
            }
            this.$set(this.wrapperStyle, "height", `${window.innerHeight - 45 - window.rem2px * (0.94 + 0.3 * 2)}px`)

        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
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
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common";

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

</style>
