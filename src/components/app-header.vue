<template>
  <div class="header relative">
    <div class="back">{{backText}}</div>
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
    text-align: center;
    font-size: 18px; /*no*/
    background-color: white;
    @include border(bottom);
    @extend %a;
    .right {
      right: 28px;
      top: 0px;
      @extend %a;
      font-size: 16px; /*no*/
      color: $mainColor;
    }
  }
</style>
