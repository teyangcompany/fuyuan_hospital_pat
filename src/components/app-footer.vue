<template>
    <div class="footer">
        <ul>
            <li @click="goPage(item.name)" :class="[currentNav==index?'cover':'',item.name]"
                v-for="(item,index) in nav">
                <div :class="`icon${index}`"></div>
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
//                if (page == "home") {
//                    page = "home";
//                }else if(page == 'health'){
//                    location.href='https://ddys-wechat.diandianys.com/WeChat/jkbk/?from=groupmessage&isappinstalled=0#/home'
//                }
//                page = "home";
                this.$router.push(`/${page}`);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../common/var";

    .footer {
        $footerHei: 70px;
        height: $footerHei; /*no*/
        background-color: #fafafa;
        z-index:8888;
        ul {
            height: $footerHei; /*no*/
            display: flex;
            align-items: center;
            li {
                text-align: center;
                flex: 0 0 auto;
                width: 25%;

                $iconWid: 46px;
                $iconHeight:45px;
                .icon0,.icon1,.icon2,.icon3 {
                    display: inline-block;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
              .icon0,.icon3{
                height: 46px;
                width: 46px;
              }
              .icon1{
                width: 43px;
                height:48px;
              }
              .icon2{
                width: 46px;
                height:44px
              }
                @each $val in home, my-doc, health, my {
                    &.#{$val} .icon0,&.#{$val} .icon1,&.#{$val} .icon2,&.#{$val} .icon3 {
                        background-image: url("../../static/img/footer/#{$val}.png");
                    }
                    &.#{$val}.cover .icon0,&.#{$val}.cover .icon1,&.#{$val}.cover .icon2,&.#{$val}.cover .icon3 {
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
