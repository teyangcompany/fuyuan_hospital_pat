<template>
  <div v-if="showTag" class="loading">
    <div class="main">
      <img src="../../static/img/loading.png" alt="">
      <span>{{text}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        showTag: false
      };
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      show() {
        this.showTag = true;
      },
      hide() {
        this.showTag = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .loading {
    @include t_r_b_l();
    position: fixed;
    .main {
      $imgWid: 45px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -$imgWid;
      margin-top: -($imgWid*2+20)/2;
      width: $imgWid*2;
      height: $imgWid*2+20;
      span {
        @include h_lh(20px);
        font-size: 14px;
      }
      img {
        width: $imgWid*2;
        height: $imgWid*2;
        animation-name: loading-anim;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
    }
  }

  @keyframes loading-anim {
    @for $i from 0 to 11 {
      #{$i*10}% {
        transform: rotate((360deg*$i*10/100));
      }
    }
  }

</style>
