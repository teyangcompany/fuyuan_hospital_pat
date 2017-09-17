<template>
    <div class="page">
        <app-header ref="header" class="noflex" title="注册">
            <i slot="back"></i>
            <div class="right absolute" slot="right" @click="next">{{$route.name=='step1'?"下一步":"提交"}}</div>
        </app-header>
        <div class="wrapper relative overflow-x-hidden" ref="main">
            <transition :name="step">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mainHeightMixin} from "../../lib/mixin"

    import AppHeader from "../../components/app-header.vue"

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                step: "left"
            };
        },
        computed: {},
        components: {
            AppHeader
        },
        created() {

        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            next() {
                this.$router.push("/reg/step2");
            }
        },
        watch: {
            $route(to, from) {
                let r = ['step1', 'step2'];
                let i1 = r.indexOf(to.name);
                let i2 = r.indexOf(from.name);
                if (i1 > i2) {
                    this.step = "left"
                } else {
                    this.step = "right"
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    .left-enter, .right-leave-to {
        transform: translateX(100%);
    }

    .step-leave-to, .right-enter {
        transform: translateX(-100%);
    }

    .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
        @include t_r_b_l();
        position: absolute;
        transition: all 0.3s;
    }
</style>
