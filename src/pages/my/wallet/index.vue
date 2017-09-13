<template>
  <div class="page">
    <app-header title="交易记录" class="noflex">
      <i slot="back"></i>
    </app-header>
    <scroll class="wrapper list" :height="scrollHeight">
      <ul>
        <li v-for="i in 10">
          <h3 class="flex">
            <div class="name flex1">团队咨询</div>
            <div class="status flex0">
              支付￥20元
            </div>
          </h3>
          <div class="content">e租宝案一审在北京宣判，26人因集资诈骗等获刑，判处公司罚金19亿，主犯丁宁被判无期徒刑，处罚金1亿。</div>
          <div class="b flex">
            <div class="replay flex1"></div>
            <div class="time flex0">2017-09-09</div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import AppHeader from "../../../components/app-header.vue"
  import {scrollHeightMixin} from "../../../lib/mixin"
  import Scroll from "../../../base/scroll.vue"
  import config from "../../../lib/config"
  import {getConsultStatusText} from "../../../lib/util"

  export default {
    mixins: [scrollHeightMixin],
    data() {
      return {};
    },
    computed: {},
    components: {
      Scroll,
      AppHeader
    },
    created() {
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../../common/common";

  .wrapper {
    overflow: hidden;
  }

  .nav {
    ul {
      @include border();
      background-color: white;
    }
    li {
      &:nth-child(1) {
        @include border(right);
      }
      @include w_h(50%, 90px);
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      background-image: url(../../../../static/img/icon/arrow-down.png);
      @include backgroundImageSet(22px, 22px, 750px/4 + 32px*2 + 10px, center)
    }
  }

  .list {
    ul {
      padding: $commonSpace 0;
    }
    li + li {
      margin-top: $commonSpace;
    }
    li {
      background-color: white;
      padding: $commonSpace;
      h3 {
        font-size: 32px;
        line-height: 32px;
        .name {
          color: #333333;
        }
        .status {
          $statusColors: (
            -1 #999,
            0 orange,
            1 $mainColor,
            3 red,
            5 blue,
            7 green
          );
          @each $s, $c in $statusColors {
            &.status#{$s} {
              color: $c;
            }
          }
        }
      }
      .content {
        margin-top: 20px;
        color: #666666;
        font-size: 28px;
        line-height: 1.5;
      }
      .b {
        margin-top: 20px;
        color: #999999;
        font-size: 28px;
      }
    }
  }
</style>
