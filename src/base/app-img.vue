<template>
  <div class="imgbox">
    <img :src="src" alt="">
  </div>
</template>

<script>

  export default {
    data() {
      return {};
    },
    props: {
      src: String,
      error: Function,
      click: Function
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

  .imgbox {
    @include w_h(160px, 160px);
    overflow: hidden;
    display: inline-block;
    img {
      width: 160px;
    }
  }
</style>
