<template>
    <div class="page">
        <div class="wrapper" ref="main">
            <header class="relative center">
                <div class="back absolute"></div>
                我的
            </header>
            <div class="subheader flex">
                <div class="ava flex0"><img
                        src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1907944229,3898051778&fm=173&s=3A82C44C5402215940ED1C83030060D3&w=218&h=146&img.JPEG"
                        alt=""></div>
                <div class="info flex1">
                    <h3>小李</h3>
                    <div>姓名：李明卫</div>
                    <p>男 27岁 浙江杭州</p>
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li v-for="item in nav" :class="[item.name]" class="flex">
                        <div class="icon flex0"></div>
                        <div class="text flex1">{{item.value}}</div>
                    </li>
                </ul>
            </div>

            <div class="quit flex">
                <div class="icon flex0"></div>
                <div class="text flex0">退出登录</div>
            </div>
        </div>
        <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../../components/app-footer.vue"
    import config from "../../lib/config"
    import {mainHeightMixin} from "../../lib/mixin"

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                nav: config.my_nav,
                currentNav: 3
            };
        },
        computed: {},
        components: {
            AppFooter
        },
        mounted() {

            let s = "";
            this.nav.forEach(function (i) {
                s += i.name + ","
            })
            console.log(s)
        },
        beforeDestroy() {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    header {
        $hHei: 128px;

        @include h_lh($hHei);
        font-size: 18px; /*no*/
        color: white;
        background-color: #1b8afe;
        .back {
            @include w_h($hHei, $hHei);
            @include t_r_b_l(0, 1, 1, 0);
            background-image: url(../../../static/img/icon/back.png);
            @include backgroundImageSet(12px*1.8, 22px*1.8);
        }
    }

    .subheader {
        @include w_h(750px, 213px);
        background-image: url(../../../static/img/my/bg2.png);
        @include backgroundImageSet(750px, 213px);
        padding: 0 $commonSpace;

        $aWid: 134px;
        %a {
            @include w_h($aWid, $aWid);
        }
        .ava {
            border-radius: 50%;
            overflow: hidden;
            @extend %a;
            img {
                @extend %a;
            }
        }
        .info {
            margin-left: 30px;
            color: white;
            background-image: url(../../../static/img/icon/arrow-right-white.png);
            @include backgroundImageSet(18px*1.5, 33px*1.5, right, $aWid/2 - 33px*1.5/2);
            p {
                font-size: 12px; /*no*/
            }
            div, p {
                margin-top: 15px;
            }
        }
    }

    %icon {
        $iconWid: 45px;
        @include w_h($iconWid, $iconWid);
        @include backgroundImageSet(100%, 0);
    }

    %text {
        font-size: 16px; /*no*/
        margin-left: 30px;
    }

    .nav {
        ul {
            li + li {
                @include border(top);
            }
            li {
                align-items: center;
                background-color: white;
                @include h_lh(90px);
                padding: 0 $commonSpace;
                .icon {
                    @extend %icon;
                }
                .text {
                    @extend %text;
                    background-image: url("../../../static/img/icon/arrow-right-grow.png");
                    @include backgroundImageSet(18px, 30px, right);
                }
                &.account, &.wallet {
                    &::after {
                        display: none;
                    }
                }
                &.wallet {
                    margin: 20px 0;
                }
                @each $i in my-consult, my-book, common-visitperson, archives, wallet, account, about {
                    &.#{$i} {
                        .icon {
                            background-image: url("../../../static/img/my/#{$i}.png");

                        }
                    }
                }
            }
        }
    }

    .quit {
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        height: 90px;
        .icon {
            @extend %icon;
            @include backgroundImageSet(90%, 0);
            background-image: url("../../../static/img/my/quit.png");
        }
        .text {
            @extend %text;
        }
    }
</style>
