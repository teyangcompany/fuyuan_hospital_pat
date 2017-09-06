<template>
    <div class="page health">
        <app-header class="noflex" title="健康" ref="header">
            <div class="right absolute" slot="right">
                <span>0</span>
            </div>
        </app-header>
        <div class="wrapper" ref="main">
            <div class="banner swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="i in 4">
                        <img
                                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504700244175&di=68e85a71e961263b6321dca0b40c179b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b91c577f7b280000012e7ec2cd9b.jpg%40900w_1l_2o_100sh.jpg"
                                alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="nav">
                <ul>
                    <li v-for="item in nav" :class="[item.name]">
                        <div class="icon"></div>
                        <div class="text">{{item.value}}</div>
                    </li>
                </ul>
            </div>
            <div class="title flex">
                <div class="name flex1">健康资讯</div>
                <div class="more flex0">更多</div>
            </div>
            <div class="list">
                <ul>
                    <li class="flex" v-for="i in 3">
                        <div class="ava flex0">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1209344693,1206146625&fm=173&s=9D384597490274CE16D48C5A0300D031&w=550&h=385&img.JPEG"
                                 alt="">
                        </div>
                        <div class="info flex1">
                            <h3>继续教育市场调查：文凭买卖泛滥 花钱拿证成噱头</h3>
                            <div class="cate">健康资讯</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../../components/app-footer.vue"
    import AppHeader from "../../components/app-header.vue"
    import {mainHeightMixin} from "../../lib/mixin"
    import config from "../../lib/config"

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                currentNav: 2,
                nav: config.health_nav
            };
        },
        computed: {},
        components: {
            AppFooter,
            AppHeader
        },
        created() {
            this.swiper = null;
        },
        mounted() {
            this._swiper();
        },
        beforeDestroy() {

        },
        methods: {
            _swiper() {
                setTimeout((res) => {
                    this.swiper = new Swiper(this.$refs.swiper, {
                        loop: true,
                        autoplay: 5000,
                        pagination: '.swiper-pagination',
                    });
                }, 20)
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    $paddingHei: 28px;
    .nav {
        ul {
            background-color: white;
            display: flex;
            li:nth-child(2) {
                @include border(left);
            }
            li {
                height: 120px;
                flex: 0 0 auto;
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                @each $i in wiki, archives {
                    &.#{$i} {
                        .icon {
                            background-image: url("../../../static/img/health/#{$i}.png");
                        }
                    }
                }

                .icon {
                    width: 66px;
                    height: 66px;
                    background-size: 100%;
                }
                .text {
                    font-size: 16px; /*no*/
                    margin-left: 20px;
                }
            }
        }
    }

    .title {
        margin-top: $paddingHei;
        @include h_lh(110px);
        padding-left: 28px;
        padding-right: 28px;
        background-color: white;
        .name, .more {
            color: #b2b2b2;
        }
        .name {
            font-size: 16px; /*no*/
        }
        .more {
            padding-right: 20px;
            background-position: right center;
            background-repeat: no-repeat;
            background-size: 18px 30px;
            background-image: url(../../../static/img/icon/arrow-right.png);
        }
    }

    .list {
        ul {
            background-color: white;
            li + li {
                margin-top: 30px;
            }
            li {
                padding: 0 28px;
                %a {
                    @include w_h(230px, 150px);
                }
                .ava {
                    @extend %a;
                    img {
                        @extend %a;
                    }
                }
                .info {
                    margin-left: 24px;
                    h3 {
                        color: #333;
                    }
                    .cate {
                        margin-top: 30px;
                        color: #b2b2b2;
                        font-size: 12px; /*no*/
                    }
                }
            }
        }
    }

    .health {
        .header {
            .right {
                $iWid: 45px;

                width: $iWid; /*no*/
                background-size: 60% 60%;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url(../../../static/img/health/message.png);
                span {
                    @extend .message-tip;
                    transform: translate(0px, 10px);
                }
            }
        }
        .banner {
            $bannerHei: 250px;
            height: $bannerHei;
            .swiper-slide {
                height: $bannerHei;
                img {
                    width: 100%;
                    height: $bannerHei;
                }
            }
        }
    }
</style>
