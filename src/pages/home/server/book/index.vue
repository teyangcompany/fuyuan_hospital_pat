<template>
  <div class="page">
    <app-header title="预约挂号" class="noflex">
      <i slot="back"></i>
      <div class="right absolute" slot="right">
        <span>我的挂号</span>
      </div>
    </app-header>
    <div class="wrapper" ref="main">
      <div class="list">
        <ul>
          <router-link :key="i" to="/home/server/book/dept" tag="li" class="flex" v-for="i in 3">
            <div class="ava flex0">
              <img src="https://p.ssl.qhimg.com/dmsmfl/120_95_/t01034ff8df2db3b277.webp?size=196x220" alt="">
            </div>
            <div class="info flex1">
              <h3>浙二医院</h3>
              <div>三级甲等</div>
              <p>解放路358号</p>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../../../components/app-header.vue"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
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
  @import "../../../../common/common";

  .list {
    ul {
      li + li {
        @include border(top);
      }
      li {
        padding: 210px/2 - 130px/2 28px;
        background-color: white;
        %a {
          @include w_h(130px, 130px);
        }
        .ava {
          @extend %a;
          overflow: hidden;
          border-radius: 8px;
          img {
            @extend %a;
          }
        }
        .info {
          background-image: url(../../../../../static/img/icon/arrow-right-grow.png);
          @include backgroundImageSet(16px, 26px, right);
          margin-left: 30px;
          h3 {
            font-size: 16px; /*no*/
          }
          p, div {
            margin-top: 20px;
            font-size: 12px; /*no*/
            color: #999;
          }
        }
      }
    }
  }
</style>
