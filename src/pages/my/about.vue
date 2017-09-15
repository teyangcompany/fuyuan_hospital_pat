<template>
  <div class="page">
    <app-header title="账户相关" class="noflex" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="wrapper list" ref="main">
      <div @click="current=index" class="item" v-for="(item,index) in list">
        <h3>{{item.title}}</h3>
        <div v-show="current==index" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mainHeightMixin} from "../../lib/mixin"
  import AppHeader from "../../components/app-header.vue"
  import http from "../../lib/http"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        current: -1,
        list: []
      };
    },
    computed: {},
    components: {
      AppHeader
    },
    created() {
      http("", {}, {
        url: "./static/help.xml",
        method: "get",
        responseType: "document"
      }).then((data) => {
        let rootNodes = [];
        let list = data.documentElement.childNodes;
        list = this.xmlFilter(list);
        Array.prototype.forEach.call(list, (node) => {
          let title = node.getElementsByTagName("h3")[0];
          let content = node.getElementsByTagName("div")[0];

          rootNodes.push({
            title: title.innerHTML,
            content: content.innerHTML
          })
        });
        this.list = rootNodes;
      })
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      xmlFilter(nodes) {
        return Array.prototype.filter.call(nodes, (node) => {
          return node.nodeType == 1;
        })
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .page {
    background-color: white;
  }

  .list {
    > div {
      h3 {
        padding: 0 $commonSpace;
        @include border();
        @include h_lh(90px);
        background-image: url(../../../static/img/icon/arrow-bottom.png);
        @include backgroundImageSet(30px, 18px, 750px - $commonSpace - 30px);
      }
      > div {
        padding: 20px;
        color: #999999;
        line-height: 1.5;
        @include border();
        p {
          text-indent: 2em;
        }
      }
    }
  }
</style>
