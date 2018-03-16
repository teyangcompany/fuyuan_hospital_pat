<template>
    <div class="page health">
        <app-header class="noflex" title="健康" ref="header">
            <!--<div class="right absolute" slot="right">-->
                <!--<span>0</span>-->
            <!--</div>-->
        </app-header>
        <scroll :height="scrollHeight" :data="healthList">
            <div class="wrapper" ref="main">
                <div class="banner swiper-container" ref="swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="i in carouselPic" :key="i.id">
                            <img :src="i.adUrl" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="nav">
                    <ul>
                        <li v-for="item in nav" :class="[item.name]" @click="goRouter(item.router)">
                            <div class="icon"></div>
                            <div class="text">{{item.value}}</div>
                        </li>
                    </ul>
                </div>
                <div class="title flex">
                    <div class="name flex1">健康资讯</div>
                    <div class="more flex0" @click="goConsultList"> <span>更多</span></div>
                </div>
                <div class="list">
                    <router-link tag="ul" :to="{path:'/healthInfoDetail',query:{newId:i.id}}" v-for="i in healthList" :key="i.id">
                        <li class="flex" >
                            <div class="ava flex0">
                                <img :src="i.titleCoverImg" alt="">
                            </div>
                            <div class="info flex1">
                                <h3>{{ i.title }}</h3>
                                <div class="cate"></div>
                                <p style="color: #666666">来源：{{ i.sourceName }}</p>
                            </div>
                        </li>
                    </router-link>
                </div>
            </div>
        </scroll>

        <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import AppFooter from "../../components/app-footer.vue"
    import AppHeader from "../../components/app-header.vue"
    import {mainHeightMixin} from "../../lib/mixin"
    import config from "../../lib/config"
    import scroll from '../../base/scroll.vue'
    import api from '../../lib/http'
    export default {
//        mixins: [mainHeightMixin],
        data() {
            return {
                currentNav: 2,
                nav: config.health_nav,
                scrollHeight:"",
                carouselPic:"",
                healthList:""
            };
        },
        computed: {},
        components: {
            AppFooter,
            AppHeader,
            scroll
        },
        created() {
            this.swiper = null;
            this.getIndexInfo()
            this.getHealthList()
        },
        mounted() {
            this.scrollHeight = window.innerHeight-45-60;
            this._swiper();
            api('smarthos.consult.my.list.page',{
                token:localStorage.getItem('token')
            }).then(res=>{
                console.log(res,555555)
            })

        },
        beforeDestroy() {

        },
        methods: {
            goRouter(router){
              console.log(router)
              if(router == '/my/wiki'){
                 location.href='https://ddys-wechat.diandianys.com/WeChat/jkbk/?from=groupmessage&isappinstalled=0#/home'
              }else{
                this.$router.push(router)
              }
            },
            goConsultList(){
              this.$router.push('/healthModule')
            },
            getIndexInfo(){
               api("smarthos.information.news.index",{
               }).then((data)=>{
                   this.carouselPic = data.obj.adSettingPage
               })
            },
            getHealthList(){
               api("smarthos.information.news.page",{
                 moduleId:"",
                 pageSize:1000
               }).then((data)=>{
                   this.healthList = data.list
                   console.log(data,333)
               })
            },
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
        padding-left: $commonSpace;
        padding-right: $commonSpace;
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
            span{
                margin-right: 6px;
            }
        }
    }

    .list {
        ul {
            background-color: white;
            /*padding-top: 30px;*/
             padding-bottom: 20px;
            li + li {
                margin-top: 30px;
            }
            li {
                padding: 0 $commonSpace;
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
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    .cate {
                        /*margin-top: 20px;*/
                        height:20px;
                        /*display: -webkit-box;*/
                        /*-webkit-box-orient: vertical;*/
                        /*-webkit-line-clamp: 2;*/
                        overflow: hidden;
                        color: #b2b2b2;
                        font-size: 12px; /*no*/
                        word-break: break-all;
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
