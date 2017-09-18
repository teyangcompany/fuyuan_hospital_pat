<template>
    <span :class="[time==timer?'':'going','code']" @click.stop="send">
        {{showText}}
    </span>
</template>

<script>
  import {phone, need} from "../lib/validate"

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
    validations: {
      mobile: {
        need,
        phone
      }
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
        if (!this.$v.mobile.need) {
          this.$emit("error", "手机号不能为空");
          return
        }

        if (!this.$v.mobile.phone) {
          this.$emit("error", "手机号格式错误");
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
