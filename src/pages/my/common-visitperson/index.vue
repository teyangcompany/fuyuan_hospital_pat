<template>
    <div class="page">
        <app-header title="常用就诊人" ref="header" class="noflex">
            <i slot="back"></i>
            <div slot="right" class="right absolute">
                添加
            </div>
        </app-header>
        <div class="wrapper list" ref="main">
            <left-del displacement="1.2" tag="ul" class="part" :key="i" v-for="i in 5">
                <ul class="flex">
                    <li class="left-part flex0 info">
                        <dl class="flex">
                            <dt class="flex0">王小龙 男 23岁</dt>
                        </dl>
                        <dl class="flex">
                            <dt class="flex0">身份证:</dt>
                            <dd class="flex1">321654987532153642</dd>
                        </dl>
                        <dl class="flex">
                            <dt class="flex0">手机号:</dt>
                            <dd class="flex1">1686581259</dd>
                        </dl>
                    </li>
                    <li class="del-part flex0 del"></li>
                </ul>
            </left-del>
        </div>
    </div>
</template>

<script>
    import AppHeader from "../../../components/app-header.vue"
    import {mainHeightMixin} from "../../../lib/mixin"
    import LeftDel from "../../../base/left-del.vue"

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {};
        },
        computed: {},
        components: {
            AppHeader,
            LeftDel
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common";

    .page {
        background-color: white;
    }

    $hei: 200px;
    .list {
        padding-top: 20px;
        .part + .part {
            margin-top: 20px;
        }
        .part {
            margin: 0 $commonSpace;
            @include w_h(750px - $commonSpace*2, $hei);
            ul {
                transition: all 0.3s;
                @include w_h(750px - $commonSpace*2 + 20px + 100px, $hei)
            }
        }

    }

    .info {
        background-color: #f5fbfb;
        @include w_h(750px - $commonSpace*2, $hei);
        border-radius: 20px;
        padding: 30px;
        background-image: url("../../../../static/img/icon/arrow-right-grow.png");
        @include backgroundImageSet(18px, 30px, 750px - $commonSpace*2 -30px - 18px);
        dl + dl {
            margin-top: 20px;
        }
        dl {
            dt {
                font-size: 32px;
                color: #333333;
            }
            dd {
                font-size: 28px;
                color: #666666;
                margin-left: 20px;
            }
        }
    }

    .del {
        margin-left: 20px;
        @include w_h(100px, $hei);
        background-color: #f4888c;
        background-image: url(../../../../static/img/icon/delete.png);
        @include backgroundImageSet(46px, 46px);
        border-radius: 20px;
    }
</style>
