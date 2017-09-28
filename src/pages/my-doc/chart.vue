<template>
  <div class="page">
    <app-header class="noflex" :title="scrollHeight" ref="header">
      <i slot="back"></i>
    </app-header>
    <scroll class="chart flex1" ref="scroll" :height="scrollHeight">
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
              <msg-type @load="onLoad" :type="i==10?'image':'text'" :text="'信息'+i"
                        image="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=903308649,172955524&fm=173&s=AD705C87EE1211C68101FD3A03006011&w=218&h=146&img.JPEG"></msg-type>
            </dd>
          </dl>
        </li>
      </ul>
    </scroll>
    <div class="flex flex0 reply" ref="reply">
      <div class="flex0 upload">{{top}}</div>
      <div class="flex1 input">
        <input type="text" ref="input" @focus="onFocus" @blur="onBlur">
      </div>
      <div class="flex0 send"></div>
    </div>
  </div>
</template>

<script>
  import {scrollHeightMixin} from "../../lib/mixin"
  import Scroll from "../../base/scroll.vue"
  import AppHeader from "../../components/app-header.vue"
  import MsgType from "../../components/msg-type.vue"
  import {isBrower} from "../../lib/util"

  export default {
    mixins: [scrollHeightMixin],
    data() {
      return {
        bottomHeight: 40,
        timer: null,
        top: 0
      }
    },
    computed: {},
    components: {
      MsgType,
      Scroll,
      AppHeader
    },
    mounted() {
      this.getTop();
      window.addEventListener('resize', this.onResize, false);
    },
    beforeDestroy() {

    },
    methods: {
      onBlur() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        setTimeout((res) => {
          this._calcScrollHeight();
          this._scrollToBottom();
        }, 300)
        //console.log("blur")
      },
      onFocus() {
        if (isBrower("iphone")) {
          this.toView();
        }
      },
      onResize() {
        this._calcScrollHeight();
        this._scrollToBottom();
      },
      onLoad(e) {
        this._scrollToBottom();
      },
      getTop() {
        if (this.$refs.reply) {
          this.top = this.$refs.reply.getBoundingClientRect().top
        }
        if (this.top === 0) {
          this.getTop();
        }

      },
      toView() {
        if (this.timer) {
          return
        }
        this.timer = setInterval((res) => {
          this.$refs.reply.scrollIntoView();
          this.getTop();
        }, 100)
      },
      _scrollToBottom() {
        setTimeout((res) => {
          this.$refs.scroll.scrollToElement(this.$refs.msgItem[this.$refs.msgItem.length - 1]);
        }, 100);
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
    padding: 5px 0; /*no*/
    @include t_r_b_l(1px, 0, 0, 0);
    height: 40px; /*no*/
    background-color: white;
    .upload, .send {
      width: 40px; /*no*/
    }
    .input {
      input {
        width: 100%;
        height: 30px; /*no*/
      }
    }
  }
</style>
