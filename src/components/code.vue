<template>
    <span :class="[time==timer?'':'going','code']" @click.stop="send">
        {{showText}}
    </span>
</template>

<script>
    export default {
        props: {
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
                if (this.text != this.showText) {
                    return
                }
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
