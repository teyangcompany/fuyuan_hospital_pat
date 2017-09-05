<template>
    <div class="page index">
        <div class="wrapper">
            <div class="banner swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-if="ad.userType=='PAT'" v-for="ad in adsettings">
                        <img :src="ad.adUrl" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <app-footer class="noflex"></app-footer>
        <loading ref="loading"></loading>
    </div>
</template>

<script>
    import http from "../lib/http"
    import Loading from "../base/loading.vue";
    import AppFooter from "../components/app-footer.vue"

    export default {
        mixins: [],
        data() {
            return {
                adsettings: [],
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
            this._init();
        },
        beforeDestroy() {

        },
        watch: {},
        methods: {
            _init() {
                this.$refs.loading.show();
                http("smarthos.user.pat.index", {})
                    .then((res) => {
                        this.$refs.loading.hide();
                        console.log(res);
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
            }
        }
    };
</script>

<style lang="scss">
    @import "../common/common";

    .index {
        .wrapper {
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
                        &.swiper-pagination-bullet-active{
                            background-color: $mainColor;
                        }
                    }
                }
            }
        }

    }


</style>
