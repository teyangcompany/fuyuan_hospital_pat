<template>
  <div class="header relative center">
    <div class="back absolute" @click="$router.go(-1)">
      <slot name="back"></slot>
    </div>
    <slot name="right"></slot>
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  %a {
    line-height: 45px; /*no*/
    height: 45px; /*no*/
  }

  .header {
    font-size: 18px; /*no*/
    background-color: white;
    z-index:8888;
    @include border(bottom);
    @extend %a;

    .back {
      @include t_r_b_l(0, 1, 1, 0);
      i {
        display: block;
        width: 45px; /*no*/
        height: 45px; /*no*/
        background-image: url(../../static/img/icon/arrow-left-grow.png);
        @include backgroundImageSet(22px, 39px, $commonSpace);
      }
    }

    .right {
      right: $commonSpace;
      top: 0px;
      @extend %a;
      font-size: 16px; /*no*/
      color: $mainColor;
    }
  }
</style>
