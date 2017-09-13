<template>
  <div class="page">
    <app-header title="我的挂号" class="noflex">
      <i slot="back"></i>
    </app-header>
    <scroll class="wrapper list" :height="scrollHeight">
      <ul>
        <li v-for="i in 10">
          <h3 class="flex">
            <div class="name flex1">浙医二院</div>
            <div :class="['status'+(i-2),(i-2)%2==0?'status0':'']" class="status flex0">
              {{getBookOrderStatusText(i <= 5 ? i - 1 : i - 6)}}
            </div>
          </h3>
          <div class="content">呼吸内科 王德华</div>
          <div class="b flex">
            <div class="replay flex1">取号密码:939939393</div>
            <div class="time flex0">2017-09-03</div>
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
  import {getBookOrderStatusText} from "../../../lib/util"

  export default {
    mixins: [scrollHeightMixin],
    data() {
      return {
        nav: config.consult_type_nav
      };
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
    methods: {
      getBookOrderStatusText,
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/common";

  .page {
    background-color: white;
  }

  .wrapper {
    overflow: hidden;
  }

  .list {
    ul {
      padding: $commonSpace 0;
    }
    li + li {
      margin-top: $commonSpace;
    }
    li {
      background-color: #f5fbfb;
      margin: 0 $commonSpace;
      padding: 0 $commonSpace;
      border-radius: 10px;
      h3 {
        font-size: 32px;
        @include h_lh(94px);
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
        padding:10px 0;
        color: #666666;
        font-size: 28px;
        line-height: 1.5;
      }
      .b {
        @include h_lh(90px);
        color: #999999;
        font-size: 28px;
      }
    }
  }
</style>
