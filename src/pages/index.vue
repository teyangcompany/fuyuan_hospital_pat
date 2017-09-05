<template>
  <div class="page index">
    <div class="wrapper">
      <div class="banner swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">slider1</div>
          <div class="swiper-slide">slider2</div>
          <div class="swiper-slide">slider3</div>
        </div>
      </div>
    </div>
    <app-footer class="noflex"></app-footer>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
  import http from "../lib/http"
  import Loading from "../base/loading.vue";
  import AppFooter from "../components/app-footer.vue"

  export default {
    mixins: [],
    data() {
      return {};
    },
    computed: {},
    components: {
      Loading,
      AppFooter
    },
    created() {
      this.swiper = null;
    },
    mounted() {
      this._swiper();
      this._init();
    },
    beforeDestroy() {

    },
    watch: {},
    methods: {
      _init() {
        this.$refs.loading.show();
        http("smarthos.user.pat.index", {})
          .then((res) => {
            this.$refs.loading.hide();
            console.log(res);
          });
      },
      _swiper() {
        setTimeout((res) => {
          this.swiper = new Swiper(this.$refs.swiper);
        }, 20)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .index {
    .wrapper {

    }
  }

  .banner {
    $bannerHei: 350px;
    height: $bannerHei;
    overflow: hidden;
    > div {
      height: $bannerHei;
      > img {
        height: $bannerHei;
      }
    }
  }
</style>
