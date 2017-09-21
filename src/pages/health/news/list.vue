<template>
    <div class="page">
        <app-header class="noflex" title="健康资讯" ref="header">
            <i slot="back"></i>
        </app-header>
        <scroll :scrollX="scrollX" :data="navs" class="nav flex0 overflow-hidden" ref="nav">
            <ul class="flex" :style="navStyle" ref="ul">
                <li class="flex0 center"
                    @click="onChangeNav(nav,i)"
                    :class="[currentNav==i?'current':'']" v-for="(nav,i) in navs">
                    {{nav.moduleName}}
                </li>
            </ul>
        </scroll>
        <div class="newslist">
            <news-list></news-list>
        </div>
    </div>
</template>

<script>
    import http from "../../../lib/http"
    import AppHeader from "../../../components/app-header.vue"
    import NewsList from "../../../components/news/list.vue"
    import Scroll from "../../../base/scroll.vue"

    export default {
        data() {
            return {
                scrollX: true,
                navs: [],
                currentNav: 0
            };
        },
        computed: {
            navStyle() {
                return {
                    width: `${this.navs.length * window.rem2px * 1.875}px`
                }
            }
        },
        components: {
            AppHeader,
            NewsList,
            Scroll
        },
        created() {
            this.deltaX = 0;
            this.postNewsNav();
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            onChangeNav(nav, i) {
                this.currentNav = i;
            },
            postNewsNav() {
                http("smarthos.information.news.module.list").then((res) => {
                    if (res.code == 0) {
                        this.navs = res.list;
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common";

    .newslist > ul {
        padding-top: $commonSpace;
    }

    .nav {
        @include border();
        $navHei: 90px;
        height: $navHei;
        background-color: white;
        ul {
            .current {
                color: $mainColor;
            }
            li {
                width: (750px/4);
                @include h_lh($navHei);
            }
        }
    }
</style>
