<template>
    <span :class="[time==timer?'':'going','code']" @click.stop="send">
        {{showText}}
    </span>
</template>

<script>
  import {validate} from "../lib/class"

  export default {
    props: {
      mobile: [Number, String],
      text: {
        type: String,
        default: "发送验证码"
      },
      service: {
        type: String,
        default: ""
      },
      timer: {
        type: Number,
        default: 60
      }
    },
    data() {
      return {
        time: this.timer,
      };
    },
    computed: {
      showText() {
        if (this.time == this.timer) {
          return this.text;
        } else {
          return `${this.time}s重发`
        }
      }
    },
    components: {},
    created() {
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      send() {
        const validator = new validate();
        let error = validator.add(this.mobile, [
          ["need", "手机号不能为空"],
          ["isPhone", "手机号格式错误"]
        ]).start();
        if (error) {
          this.$emit("error", error);
          return
        }
        /*倒计时期间不能重复点击*/
        if (this.text != this.showText) {
          return
        }

        this.$emit("input", '11');
        this._countdown();
      },
      _countdown() {
        if (this.time > 0) {
          this.time--;
          setTimeout(() => {
            this._countdown();
          }, 1000)
        } else {
          this.time = this.timer;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .code {
    color: $mainColor;
  }
</style>
