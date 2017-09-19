<template>
    <div class="page">
        <app-header class="noflex" title="我的医生" ref="header">
            <div class="right absolute" slot="right">找医生</div>
        </app-header>
        <div class="wrapper" ref="main">
            <div class="nav">
                <ul>
                    <router-link tag="li" :to="item.path" :key="item.name" v-for="item in nav" :class="[item.name]">
                        <div class="icon"></div>
                        <div class="text">{{item.value}}</div>
                    </router-link>
                </ul>
            </div>
            <div class="title">最新消息</div>
            <div class="list">
                <ul>
                    <router-link :key="index" tag="li" to="/chart" v-for="(item,index) in list">
                        <div class="ava">
                            <img :src="item.ava">
                        </div>
                        <div class="info">
                            <h3>
                                <div class="name">{{item.name}}</div>
                                <div class="dept">{{item.dept}}</div>
                                <div class="time">{{item.time}}</div>
                            </h3>
                            <div class="content">
                                {{item.msg}}
                            </div>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>
        <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../../components/app-footer.vue"
    import AppHeader from "../../components/app-header.vue"
    import http from '../../lib/http'
    import {mainHeightMixin} from "../../lib/mixin"
    import config from "../../lib/config"

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                currentNav: 1,
                nav: config.my_doc_nav,
                list: []
            };
        },
        computed: {},
        components: {
            AppFooter,
            AppHeader
        },
        created() {
            this.postMsgList();
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            postMsgList() {
                http("my.doc.latestmsg", {mock: true})
                    .then((res) => {
                        this.list = res.data;
                        console.log(this.list);
                    })
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

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
                @each $i in follow, circle {
                    &.#{$i} {
                        .icon {
                            background-image: url("../../../static/img/my-doc/#{$i}.png");
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
        @include h_lh(60px);
        padding-left: $commonSpace;
        color: #888888;
        font-size: 16px; /*no*/
    }

    .list {
        background-color: white;
        ul {
            li + li {
                @include border(top);
            }
            li {
                padding: 34px $commonSpace;
                display: flex;
                %a {
                    $imgWid: 90px;
                    width: $imgWid;
                    height: $imgWid;
                }
                .ava {
                    flex: 0 0 auto;
                    border-radius: 50%;
                    overflow: hidden;
                    @extend %a;
                    img {
                        @extend %a;
                    }
                }
                .info {
                    flex: 1 1 auto;
                    max-width: 570px;
                    margin-left: $commonSpace;
                    h3 {
                        @include h_lh(40px);
                        display: flex;
                        .name, .time {
                            flex: 0 0 auto;
                        }
                        .name {
                            color: #333333;
                        }
                        .time, .dept {
                            font-size: 12px; /*no*/
                            color: #b2b2b2;
                        }
                        .dept {
                            margin-left: $commonSpace;
                            flex: 1 1 auto;
                        }
                    }
                    .content {
                        @extend .ellipsis;
                        color: #666666;
                        line-height: 1.1;
                        padding-top: 20px;
                    }
                }
            }
        }
    }
</style>
