<template>

    <div class="page index">
        <div class="wrapper" ref="main">
            <div class="banner swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-if="ad.userType=='PAT'" v-for="ad in adsettings">
                        <img :src="ad.adUrl" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <!--<div class="search">-->
                    <!--<i></i><span>搜索医生</span>-->
                <!--</div>-->
                <!--<div class="message">-->
                    <!--<span>0</span>-->
                <!--</div>-->
            </div>
            <div class="fastnav">
                <ul>
                     <li>
                       <img src="../../static/img/箭头.png" alt="" @click="goDoctor">
                     </li>
                    <!--<li :class="[item.name]" v-for="item in fastNav" @click="goMyRouter(item)">-->

                        <!--<li :class="[item.name]" v-for="(item,index) in fastNav" @click="go(index)">-->

                        <!--<div class="name">{{item.value}}</div>-->
                        <!--<div class="text">{{item.text}}</div>-->
                        <!--<div class="btn">-->
                            <!--<span>{{item.btn}}</span>-->
                        <!--</div>-->
                    <!--</li>-->
                </ul>
            </div>
            <div class="indexnav">
                <ul>
                    <li @click="goPage(item)" v-for="item in nav" :class="[item.name]">
                        <div class="icon"></div>
                        <div class="text">{{item.value}}</div>
                    </li>
                </ul>
            </div>
            <!--<div class="notice">-->
                <!--<ul>-->
                    <!--<li v-for="i in 3">-->
                        <!--<div class="icon">-->
                            <!--<i></i>-->
                        <!--</div>-->
                        <!--<div class="info">-->
                            <!--<div class="title">预约挂号</div>-->
                            <!--<div class="time">10:09</div>-->
                            <!--<div class="content">-->
                                <!--您在浙二医院预约挂号成功-->
                            <!--</div>-->
                            <!--<div class="sub">浙二医院</div>-->
                        <!--</div>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</div>-->

        </div>
        <app-footer class="noflex" ref="footer"></app-footer>
        <loading ref="loading"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
    import config from "../lib/config"
    import http from "../lib/http"
    import Loading from "../base/loading.vue";
    import AppFooter from "../components/app-footer.vue"

    import {mainHeightMixin} from "../lib/mixin"


    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                adsettings: [],
                fastNav: config.index_fast_nav,
                nav: config.index_nav,
                token: localStorage.getItem('token')
            };
        },
        computed: {},
        components: {
            Loading,
            AppFooter
        },
        created() {
            this.swiper = null;
        },
        mounted() {
            this.__init();
        },
        beforeDestroy() {

        },
        watch: {},
        methods: {
            __init() {
                this.$refs.loading.show();

                http("smarthos.user.pat.index", {
                    token: this.token
                })
                    .then((res) => {
                        this.$refs.loading.hide();
                        console.log(res, 88888);
                        if (res.code == 0) {
                            let obj = res.obj;
                            this.adsettings = obj.adsettings;
                            this._swiper();
                        }
                    });
            },
            _swiper() {
                setTimeout((res) => {
                    this.swiper = new Swiper(this.$refs.swiper, {
                        loop: true,
                        autoplay: 5000,
                        pagination: '.swiper-pagination',
                    });
                }, 20)
            },
//      go(index){
//         if(index == 0){
//             this.$router.push('/home/server/quickConsult/index')
//         }
//      },
            goPage(item) {
                console.log(item)
                if(item.name == 'guide'){
                    weui.alert("该功能正在建设中")
                }else{
                  item.path && this.$router.push(item.path);
                }
            },
            goDoctor(){
                this.$router.push({
                  path:"my/consultService/consultDoc"
                })
            },
            goMyRouter(item) {

                this.$router.push(item.route)
            }
        }
    };
</script>

<style lang="scss">
    @import "../common/common.scss";

    .index {
        $wrapperPadding: 12px;
        .wrapper {
            .message {
                position: absolute;
                right: $commonSpace;
                top: 52px;
                width: 66px;
                height: 66px;
                background-image: url(../../static/img/index/icon-message.png);
                background-size: 45px;
                background-position: right center;
                background-repeat: no-repeat;
                z-index: 100;
                span {
                    @extend .message-tip;
                }
            }
            .search {
                position: absolute;
                top: 52px;
                width: 560px;
                left: 50%;
                margin-left: -280px;
                z-index: 100;
                @include h_lh(66px);
                background-color: rgba(255, 255, 255, .4);
                border-radius: 33px;
                text-align: center;
                color: white;
                i {
                    width: 25px;
                    height: 25px;
                    margin-right: 5px;
                    background-image: url(../../static/img/index/search.png);
                    background-size: 100% 100%;
                }
                i, span {
                    display: inline-block;
                }
            }
            .fastnav {
                ul {
                    display: flex;
                    li {
                        box-sizing: border-box;
                        height: 180px;
                        background-size: 100% 100%;
                        flex: 0 0 auto;
                        background-color: white;
                        /*padding-top: 20px;*/
                        /*<!--padding-left: $commonSpace;-->*/
                        /*width: 50%;*/
                        width:100%;
                        img{
                          width:100%;
                          /*box-shadow: 5px 5px 20px #888888;*/
                        }
                        .name {
                            font-size: 16px; /*no*/
                        }
                        .text {
                            margin-top: 10px;
                        }
                        .btn {
                            margin-top: 14px;
                            span {
                                color: #fb791f;
                                border: 1px #fb791f solid; /*no*/
                                border-radius: 5px;
                                padding: 6px;
                            }
                        }
                        @each $i in ask-doc, fast-consult {
                            &.#{$i} {
                                background-image: url("../../static/img/index/#{$i}.png");
                            }
                        }
                    }
                }
            }
            .indexnav {
                /*<!--margin-top: $wrapperPadding;-->*/
                ul {
                    background-color: white;
                    overflow: hidden;
                    li {
                        text-align: center;
                        float: left;
                        width: 25%;
                        padding-top: 25px;
                        padding-bottom: 25px;
                        @each $i in guide, book, queuing, payment, report, steward, help, more {
                            &.#{$i} {
                                .icon {
                                    background-image: url("../../static/img/index/#{$i}.png");
                                }
                            }
                        }
                        .icon {
                            background-size: 100% 100%;
                            width: 80px;
                            height: 80px;
                            margin: 0 auto;
                        }
                    }
                }
            }
            .notice {
                ul {
                    padding-top: $wrapperPadding;
                    li + li {
                        margin-top: $wrapperPadding;
                    }
                    li {
                        padding: 30px $commonSpace;
                        display: flex;
                        background-color: white;
                        .icon {
                            $iconWid: 60px;
                            flex: 0 0 auto;
                            width: $iconWid;
                            i {
                                display: inline-block;
                                width: $iconWid;
                                height: $iconWid;
                                background-image: url(../../static/img/index/icon-book.png);
                                background-size: 100% 100%;
                            }
                        }
                        .info {
                            max-width: 610px;
                            margin-left: 20px;
                            .time, .title {
                                color: #999999;
                                font-size: 12px; /*no*/
                            }
                        }
                        .content {
                            padding-top: 30px;
                            font-size: 16px; /*no*/
                            color: #666;
                        }
                        .sub {
                            padding-top: 20px;
                            color: #999999;
                        }
                    }
                }
            }
            .banner {
                $bannerHei: 350px;
                height: $bannerHei;
                overflow: hidden;
                .swiper-slide {
                    height: $bannerHei;
                    > img {
                        width: 100%;
                        height: $bannerHei;
                    }
                }
                .swiper-pagination {
                    text-align: right;
                    span {
                        background-color: white;
                        opacity: 0.8;
                        &.swiper-pagination-bullet-active {
                            background-color: $mainColor;
                        }
                    }
                }
            }
        }

    }


</style>
