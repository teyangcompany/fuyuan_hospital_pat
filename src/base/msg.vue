<template>
    <transition name="msg">
        <div class="msg fixed center" v-show="showTag">
            <span class="inline-block">{{text}}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            text: String,
            delay: {
                type: Number,
                default: 3000
            }
        },
        data() {
            return {
                timer: null,
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
                if (this.timer) {
                    return
                }
                this.showTag = true;
                this.timer = setTimeout(() => {
                    this.hide();
                }, this.delay)
            },
            hide() {
                this.timer = null;
                this.showTag = false;
                this.$emit("hide",1);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../common/common";

    .msg {
        left: 0;
        right: 0;
        bottom: 100px;
        span {
            font-size: 32px;
            padding: 0 10px; /*no*/
            min-width: 100px; /*no*/
            border-radius: 10px; /*no*/
            @include h_lh(40px, true);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
        }
    }

    .msg-enter, .msg-leave-to {
        transform: translateY(200%);
    }

    .msg-enter-active, .msg-leave-active {
        transition: all 0.3s;
    }
</style>
