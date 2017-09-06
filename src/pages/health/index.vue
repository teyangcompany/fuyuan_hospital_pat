<template>
  <div class="page health">
    <app-header class="noflex" title="健康" ref="header">
      <div class="right absolute" slot="right">
        <span>0</span>
      </div>
    </app-header>
    <div class="wrapper" ref="main">
      <div class="banner swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="i in 4">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504700244175&di=68e85a71e961263b6321dca0b40c179b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b91c577f7b280000012e7ec2cd9b.jpg%40900w_1l_2o_100sh.jpg"
              alt="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="nav">
        <ul>
          <li v-for="item in nav" :class="[item.name]">
            <div class="icon"></div>
            <div class="text">{{item.value}}</div>
          </li>
        </ul>
      </div>
    </div>
    <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
  </div>
</template>

<script>
  import AppFooter from "../../components/app-footer.vue"
  import AppHeader from "../../components/app-header.vue"
  import {mainHeightMixin} from "../../lib/mixin"
  import config from "../../lib/config"


  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        currentNav: 2,
        nav: config.health_nav
      };
    },
    computed: {},
    components: {
      AppFooter,
      AppHeader
    },
    created() {
      this.swiper = null;
    },
    mounted() {
      this._swiper();
    },
    beforeDestroy() {

    },
    methods: {
      _swiper() {
        setTimeout((res) => {
          this.swiper = new Swiper(this.$refs.swiper, {
            loop: true,
            autoplay: 5000,
            pagination: '.swiper-pagination',
          });
        }, 20)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .nav {
    ul {
      background-color: white;
      display: flex;
      li:nth-child(2) {
        @include border(left);
      }
      li {
        height: 120px;
        flex: 0 0 auto;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        @each $i in wiki, archives {
          &.#{$i} {
            .icon {
              background-image: url("../../../static/img/health/#{$i}.png");
            }
          }
        }

        .icon {
          width: 66px;
          height: 66px;
          background-size: 100%;
        }
        .text {
          font-size: 16px; /*no*/
          margin-left: 20px;
        }
      }
    }
  }

  .health {
    .header {
      .right {
        $iWid: 45px;

        width: $iWid; /*no*/
        background-size: 60% 60%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url(../../../static/img/health/message.png);
        span {
          @extend .message-tip;
          transform: translate(0px, 10px);
        }
      }
    }
    .banner {
      $bannerHei: 250px;
      height: $bannerHei;
      .swiper-slide {
        height: $bannerHei;
        img {
          width: 100%;
          height: $bannerHei;
        }
      }
    }
  }
</style>
