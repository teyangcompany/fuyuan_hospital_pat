<template>
  <div class="page">
    <app-header title="我的咨询" class="noflex">
      <i slot="back"></i>
    </app-header>
    <div class="nav">
      <ul class="flex">
        <li class="flex0" v-for="item in nav">{{item.value}}</li>
      </ul>
    </div>
    <scroll class="wrapper list" :data="list" :height="scrollHeight">
      <ul>
        <li v-for="(item,index) in list">
          <h3 class="flex">
            <div class="name flex1">团队咨询 {{item.price}}</div>
            <div :class="['status'+(index-2),(index-2)%2==0?'status0':'']" class="status flex0">
              {{getConsultStatusText(index)}}
            </div>
          </h3>
          <div class="content">{{item.content}}</div>
          <div class="piclist">
            <dl class="overflow-hidden">
              <dd :class="['img','img'+item.imglist]" v-for="j in item.imglist" class="float-left">
                <img
                  src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3179544980,4261368179&fm=173&s=321014CD448AAD4D1C1A98220300501B&w=218&h=146&img.JPEG"
                  alt="">
              </dd>
            </dl>
          </div>
          <div class="b flex">
            <div class="replay flex1">暂无医生回答</div>
            <div class="time flex0">2小时前 | 3回复</div>
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
  import http from "../../../lib/http"

  export default {
    mixins: [scrollHeightMixin],
    data() {
      return {
        nav: config.consult_type_nav,
        list: []
      };
    },
    computed: {
      _bottomHeight() {
        return window.rem2px * (0.9)
      }
    },
    components: {
      Scroll,
      AppHeader
    },
    created() {
      this.postConsultList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getConsultStatusText,
      postConsultList() {
        http("my.consult.list", {mock: true}).then((res) => {
          this.list = res.data;
        })
      }
    }
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
      .piclist {
        dd {
          margin-top: $commonSpace;
          $wid: (750px - $commonSpace*4);
          $wid3: $wid/3;
          $wid1-2: ($wid/4*3, $wid/5*4/2);
          &.img {
            @include thumb($wid3, $wid3);
          }

          @each $w in $wid1-2 {
            &.img#{index($wid1-2,$w)} {
              @include thumb($w, $w);
            }
          }

          &:nth-child(3n+2), &:nth-child(3n+3) {
            margin-left: $commonSpace;
          }

        }
      }
      .b {
        margin-top: 20px;
        color: #999999;
        font-size: 28px;
      }
    }
  }
</style>
