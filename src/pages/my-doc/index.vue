<template>
  <div class="page">
    <app-header class="noflex" title="我的医生" ref="header">
      <div class="right absolute" slot="right">找医生</div>
    </app-header>
    <div class="wrapper" ref="main">
      <div class="nav">
        <ul>
          <li v-for="item in nav" :class="[item.name]">
            <div class="icon"></div>
            <div class="text">{{item.value}}</div>
          </li>
        </ul>
      </div>
      <div class="title">最新消息</div>
      <div class="list">
        <ul>
          <li v-for="i in 3">
            <div class="ava">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504696725556&di=7876d387d451ec2bd9ad0bc93ba25a26&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db201c6f9fa1f3a294ec5dd8df14cd644%2F2cf5e0fe9925bc31623566bf54df8db1cb1370a8.jpg"
                alt="">
            </div>
            <div class="info">
              <h3>
                <div class="name">泰罗卡</div>
                <div class="dept">眼科</div>
                <div class="time">17:09</div>
              </h3>
              <div class="content">
                您的全科分钟已经开始您的全科分钟已经开始您的全科分钟已经开始您的全科分钟已经开始
              </div>
            </div>
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
        currentNav: 1,
        nav: config.my_doc_nav
      };
    },
    computed: {},
    components: {
      AppFooter,
      AppHeader
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
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
        @each $i in follow, circle {
          &.#{$i} {
            .icon {
              background-image: url("../../../static/img/my-doc/#{$i}.png");
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

  .title {
    @include h_lh(60px);
    padding-left: $commonSpace;
    color: #888888;
    font-size: 16px; /*no*/
  }

  .list {
    background-color: white;
    ul {
      li + li {
        @include border(top);
      }
      li {
        padding: 34px $commonSpace;
        display: flex;
        %a {
          $imgWid: 90px;
          width: $imgWid;
          height: $imgWid;
        }
        .ava {
          flex: 0 0 auto;
          border-radius: 50%;
          overflow: hidden;
          @extend %a;
          img {
            @extend %a;
          }
        }
        .info {
          flex: 1 1 auto;
          max-width: 570px;
          margin-left: $commonSpace;
          h3 {
            @include h_lh(40px);
            display: flex;
            .name, .time {
              flex: 0 0 auto;
            }
            .name {
              color: #333333;
            }
            .time, .dept {
              font-size: 12px; /*no*/
              color: #b2b2b2;
            }
            .dept {
              margin-left: $commonSpace;
              flex: 1 1 auto;
            }
          }
          .content {
            @extend .ellipsis;
            color: #666666;
            padding-top: 20px;
          }
        }
      }
    }
  }
</style>
