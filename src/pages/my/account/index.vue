<template>
  <div class="page">
    <app-header title="账户相关" class="noflex" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="wrapper" ref="main">
      <ul class="list">
        <li v-for="item in nav">
          {{item.value}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../../components/app-header.vue"
  import {mainHeightMixin} from "../../../lib/mixin"
  import config from "../../../lib/config"
  import {arrayFind} from "../../../lib/util"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {};
    },
    computed: {
      nav() {
        return arrayFind(config.my_nav, (res) => {
          return res.name == "account";
        }).child;

      }
    },
    components: {
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

  .page {
    background-color: white;
  }

  .wrapper {
    overflow: hidden;
  }

  .list {
    li {
      font-size: $normalFont;
      @include border();
      @include h_lh(90px);
      padding: 0 $commonSpace;
      background-image: url(../../../../static/img/icon/arrow-right-grow.png);
      @include backgroundImageSet(18px,31px,750px - 28px - 18px);
    }
  }
</style>
