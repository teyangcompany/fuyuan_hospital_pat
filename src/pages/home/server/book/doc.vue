<template>
  <div class="page">
    <app-header title="内科" class="noflex">
      <i slot="back"></i>
    </app-header>
    <div class="nav">
      <ul class="flex">
        <li class="flex0" @click="current=index" :class="[current==index?'cover':'']" v-for="(item,index) in nav">
          {{item.value}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import config from "../../../../lib/config"
  import AppHeader from "../../../../components/app-header.vue"

  export default {
    data() {
      return {
        current: 0,
        nav: config.book_doc_nav
      };
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

  .nav {
    ul {
      li {
        &:nth-child(2) {
          @include border(left, #ccc, before);
          &::before {
            top: 10px;
            height: 70px;
          }
        }

        &.cover {
          color: $mainColor;
          @include border(bottom, $mainColor, after, solid, 8px);
          &::after {
            width: 200px;
            left: (750px/2 - 200px)/2;
          }
        }

        background-color: white;
        @include h_lh(90px);
        text-align: center;
        width: 50%;
        font-size: 30px;
        color: #999999;
      }
    }
  }
</style>
