<template>
  <div class="page download">
    <div class="mask fixed center" @click="showMask=!showMask" v-if="showMask">
      <img src="../../../static/img/download-open-in-brower.png" alt="">
    </div>
    <div class="btn fixed center">
      <a @click="download">点击下载</a>
    </div>
  </div>
</template>

<script>
  import weuijs from 'weui.js'
  import {DOWNLOAD} from '../../lib/config1'

  export default {
    data() {
      return {
        showMask: false,
        inWeixin: false
      };
    },
    computed: {},
    components: {},
    created() {
      if (window.brower === 'weixin') {
        this.inWeixin = true;
      }
      this.download()
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      download() {
        let downloadURL = '';
        if (this.inWeixin) {//在微信打开
          if (window.device === 'iphone') {
            downloadURL = DOWNLOAD.ios;//
          } else {
            this.showMask = true;
            return
          }
        } else {
          if (window.device === 'iphone') {
            downloadURL = DOWNLOAD.ios;//
          } else {
            downloadURL = DOWNLOAD.android;
          }
        }
        this.doDownload(downloadURL);
      },
      doDownload(downloadURL) {
        if (downloadURL) {
          location.href = downloadURL;
        } else {
          weuijs.alert('暂未上架，敬请期待');
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .download {
    background-image: url("../../../static/img/download-bg.png");
    @include backgroundImageSet();
    .mask {
      background-color: rgba(0, 0, 0, .5);
      @include t_r_b_l();
      img {
        width: 620px;
      }
    }
    .btn {
      width: 690px;
      left: 30px;
      height:90px;
      line-height: 90px;
      bottom: 200px;
      border-radius: 10px;
      background-color: #3d9bff;
      a {
        font-size: 36px;
        color: white;
      }

    }
  }
</style>
