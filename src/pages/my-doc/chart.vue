<template>
  <div class="page">
    <app-header class="noflex" title="与医生对话中..." ref="header">
      <i slot="back"></i>
    </app-header>
    <scroll class="chart flex0" ref="scroll" :height="scrollHeight">
      <ul>
        <li ref="msgItem" v-for="i in 50" :class="[i%2==0?'receiver':'sender']">
          <div class="time center">2017-09-09 09:08:54</div>
          <dl class="flex ">
            <dt class="flex0 ava overflow-hidden">
              <img
                src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1119603072,1998988070&fm=173&s=61D25322F45015C64644BE8803004085&w=218&h=146&img.JPEG"
                alt="">
            </dt>
            <dd class="flex0 msg">
              <msg-type @load="onLoad" :type="i%Math.floor(Math.random()*10)==0?'image':'text'" text="信息学"
                        image="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=903308649,172955524&fm=173&s=AD705C87EE1211C68101FD3A03006011&w=218&h=146&img.JPEG"></msg-type>
            </dd>
          </dl>
        </li>
      </ul>
    </scroll>
    <div class="reply noflex">

    </div>
  </div>
</template>

<script>
  import {scrollHeightMixin} from "../../lib/mixin"
  import Scroll from "../../base/scroll.vue"
  import AppHeader from "../../components/app-header.vue"
  import MsgType from "../../components/msg-type.vue"

  export default {
    mixins: [scrollHeightMixin],
    data() {
      return {
        bottomHeight: 50,
        lmw: 'll'
      }
    },
    computed: {},
    components: {
      MsgType,
      Scroll,
      AppHeader
    },
    mounted() {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 200)
    },
    beforeDestroy() {

    },
    methods: {
      onLoad(e) {
        this.$refs.scroll.refresh();
        setTimeout((res) => {
          this.$refs.scroll.scrollToElement(this.$refs.msgItem[this.$refs.msgItem.length - 1]);
        }, 20)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .chart {
    overflow: hidden;
    > ul {
      padding-bottom: $commonSpace;
      li {
        padding-top: $commonSpace;
        .time {
          color: #999999;
          font-size: 28px;
          @include h_lh(40px);
        }
        dl {
          padding: 0 $commonSpace;
          .ava {
            border-radius: 50%;
            @include thumb(80px, 80px);
          }
          .msg {
            background-color: $mainColor;
            border-radius: 10px;
            padding: 23px;
            max-width: 750px*0.6;
            margin: 0 $commonSpace;
          }
        }
        &.receiver {

        }
      ;
        &.sender {
          dl {
            flex-direction: row-reverse;
          }
        }
      }
    }
  }

  .reply {
    height: 50px; /*no*/
    background-color: white;
  }
</style>
