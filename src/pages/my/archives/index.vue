<template>
    <div class="page">
        <app-header title="健康档案" class="noflex">
            <i slot="back"></i>
        </app-header>
        <scroll class="wrapper" :height="scrollHeight">
            <div>
                <div class="patinfo flex">
                    <div class="ava flex0">
                        <img src="../../../../static/img/my/pat-m.png" alt="">
                    </div>
                    <div class="info flex1">
                        <h3>小李</h3>
                        <div>姓名：小李</div>
                        <p>男 27岁 浙江杭州</p>
                    </div>
                </div>

                <div class="title">
                    基本情况
                </div>

                <div class="basic-situation">
                    <ul>
                        <li v-for="item in basicSituation" class="flex">
                            <div class="label flex0">{{item.value}}</div>
                            <div class="text flex1 right">
                                无
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="title">
                    诊疗记录
                </div>

                <div class="record">
                    <ul>
                        <li v-for="(o,i) in 6">
                            <h3>2017-10-23</h3>
                            <div class="content">根据中央统一部署，中央第二巡视组对国家烟草专卖局（以下称国家烟草局）党组开展专项巡视。</div>
                            <ol :class="['img','img'+o]">
                                <li v-for="oo in o">
                                    <img
                                            src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=736173869,3996641019&fm=173&s=D5BE8B75F7AD48BA8320D5CA0100E0B0&w=218&h=146&img.JPEG"
                                            alt="">
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <div class="add-medical-record noflex">
            <router-link tag="a" to="/my/archives/save-record/add" class="block">添加诊疗记录</router-link>
        </div>
    </div>
</template>

<script>
    import AppHeader from "../../../components/app-header.vue"
    import config from "../../../lib/config"
    import Scroll from "../../../base/scroll.vue"

    export default {
        data() {
            return {
                basicSituation: config.basic_situation,
                scrollHeight: 0,
                basicSituationForm: {}
            };
        },
        computed: {},
        components: {
            Scroll,
            AppHeader
        },
        created() {
            this.scrollHeight = window.innerHeight - 45 - (window.rem2px * (0.94 + 0.3 + 0.3));
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

    .wrapper {
        overflow: hidden;
    }

    .add-medical-record {
        padding: (750px - 690px)/2 0;
        a {
            border-radius: 10px;
            text-align: center;
            color: white;
            margin: 0 auto;
            @include w_h(690px, 94px);
            line-height: 94px;
            background-color: $mainColor;
        }
    }

    .patinfo {
        padding: $commonSpace;
        background-color: white;
        $avaWid: 134px;
        %ava {
            @include w_h($avaWid, $avaWid);
        }
        .ava {
            @extend %ava;
            border-radius: $avaWid/2;
            overflow: hidden;
            img {
                @extend %ava;
            }
        }
        .info {
            margin-left: 30px;
            h3 {
                font-size: 32px;
                color: #333333;
            }
            div, p {
                margin-top: 20px;
                font-size: 26px;
                color: #999999;
            }
        }
    }

    .title {
        @include h_lh(80px);
        padding: 0 $commonSpace;
        color: #666666;
        font-size: 28px;
    }

    .basic-situation {
        ul {
            li + li {
                @include border(top);
            }
            li {
                padding: 0 $commonSpace;
                background-color: white;
                @include h_lh(90px);
                .label {
                    color: #333333;
                    font-size: 32px;
                }
                .text {
                    padding-right: 18px + 20px;
                    background-image: url(../../../../static/img/icon/arrow-right-grow.png);
                    @include backgroundImageSet(18px, 30px, right);
                    color: #666666;
                }
            }
        }
    }

    .record {
        background-color: white;
        padding: 30px $commonSpace;
        ul {
            > li + li {
                margin-top: 30px;
            }
            > li {
                h3 {
                    font-size: 32px;
                    color: #333;
                }
                .content {
                    margin-top: 20px;
                    color: #666666;
                    font-size: 28px;
                }
                ol {
                    overflow: hidden;
                    li {
                        padding-top: 20px;
                        float: left;
                    }
                    &.img.img1 {
                        img {
                            @include w_h(300px, 300px);
                        }
                    }
                    &.img.img2 {
                        li + li {
                            margin-left: 30px;
                        }
                        img {
                            @include w_h(250px, 250px);
                        }
                    }
                    &.img {
                        li:nth-child(3n+2),li:nth-child(3n+3){
                            margin-left: 20px;
                        }
                        img {
                            @include w_h(218px, 218px);
                        }
                    }
                }
            }
        }
    }
</style>
