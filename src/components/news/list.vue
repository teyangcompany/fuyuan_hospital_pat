<template>
  <ul class="list">
    <li class="flex" v-for="i in 3">
      <div class="ava flex0">
        <img
          src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1209344693,1206146625&fm=173&s=9D384597490274CE16D48C5A0300D031&w=550&h=385&img.JPEG"
          alt="">
      </div>
      <div class="info flex1">
        <h3>继续教育市场调查：文凭买卖泛滥 花钱拿证成噱头</h3>
        <div class="cate">健康资讯</div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
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
  @import "../../common/common";

  ul.list {
    padding-bottom: $commonSpace;
    background-color: white;
    li + li {
      margin-top: 30px;
    }
    li {
      padding: 0 $commonSpace;
      %a {
        @include w_h(230px, 150px);
      }
      .ava {
        @extend %a;
        img {
          @extend %a;
        }
      }
      .info {
        margin-left: 24px;
        h3 {
          color: #333;
        }
        .cate {
          margin-top: 30px;
          color: #b2b2b2;
          font-size: 12px; /*no*/
        }
      }
    }
  }

</style>
