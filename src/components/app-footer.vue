<template>
    <div class="footer">
        <ul>
            <li @click="goPage(item.name)" :class="[currentNav==index?'cover':'',item.name]"
                v-for="(item,index) in nav">
                <div class="icon"></div>
                <div class="text">{{item.value}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import config from "../lib/config"

    export default {
        props: {
            currentNav: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                nav: config.nav
            };
        },
        computed: {},
        components: {},
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            goPage(page) {
                if (page == "home") {
                    page = "";
                }
                this.$router.push(`/${page}`);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../common/var";

    .footer {
        $footerHei: 60px;
        height: $footerHei; /*no*/
        background-color: #fafafa;
        ul {
            height: $footerHei; /*no*/
            display: flex;
            align-items: center;
            li {
                text-align: center;
                flex: 0 0 auto;
                width: 25%;

                $iconWid: 25px;
                .icon {
                    display: inline-block;
                    height: $iconWid; /*no*/
                    width: $iconWid; /*no*/
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center center;
                }

                @each $val in home, my-doc, health, my {
                    &.#{$val} .icon {
                        background-image: url("../../static/img/footer/#{$val}.png");
                    }
                    &.#{$val}.cover .icon {
                        background-image: url("../../static/img/footer/#{$val}.cover.png");
                    }
                    &.#{$val}.cover .text {
                        color: $mainColor;
                    }
                }

            }
        }
    }
</style>
