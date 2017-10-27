<template>
    <div>
        <li class="form-item form-item-upload overflow-hidden piclist">
            <div v-show="imgList.length>0" class="pic float-left relative"
                 v-for="item in imgList">
                <img :src="item.attaFileUrl"
                     alt="" @touchend.prevent="makeLarge(item.attaFileUrl)">
            </div>
            <div class="pic float-left relative" v-for="pic in picList">
                <img @click="scan(pic.url)" :id="pic.id" :src="pic.url?pic.url:pic.thumbUrl"
                     alt="">
                <div class="mask absolute" v-show="pic.status!='loaded'">{{pic.progress}}</div>
            </div>
            <div class="show-upload float-left overflow-hidden">
                <slot name="upload"></slot>
                <div class="text float-left flex">
                    <div class="flex0">
                        <h3>添加图片</h3>
                        <p>上传相关照片</p>
                    </div>
                </div>
            </div>
        </li>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../components/app-header.vue'
    import {mainHeightMixin, jssdkMixin} from '../lib/mixin'
    import config from '../lib/config'
    import {debug} from "../lib/util"

    export default {
        components: {
            top
        },
        props: ['picList', 'imgList'],
        mixins: [mainHeightMixin],
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            scan(img) {
                let urls = []
                Array.prototype.forEach.call(this.picList, (file) => {
                    debug("file", file);
                    urls.push(file.url);
                })
                wx.previewImage({
                    current: img,
                    urls: urls
                })
            },
            makeLarge(url){
                 this.$emit('large',url)
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../common/common.scss';

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
        background-image: url(../../static/img/icon/arrow-right-grow.png);
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
        background-image: url(../../static/img/upload.png);
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
