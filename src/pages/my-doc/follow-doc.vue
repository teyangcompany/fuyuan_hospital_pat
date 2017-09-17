<template>
    <div class="page">
        <app-header class="noflex" title="关注医生" ref="header">
            <i slot="back"></i>
        </app-header>
        <scroll @scroll="scroll" ref="scroll" :listenScroll="listenScroll" :probeType="probeType" :height="scrollHeight"
                class="wrapper overflow-hidden relative list ">
            <ul>
                <li ref="name" class="" v-for="item in nameList">
                    <h2>{{item.alpha}}</h2>
                    <div class="flex" v-for="name in item.names">
                        <div class="flex0 ava overflow-hidden">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1883483834,2678646793&fm=173&s=4F8428C4CA300484F20C251B03005093&w=218&h=146&img.JPEG"
                                 alt="">
                        </div>
                        <div class="flex1 name">
                            <h3>{{name.name}}</h3>
                            <div class="ellipsis from">{{name.from}}</div>
                        </div>
                    </div>
                </li>
            </ul>
            <ol class="absolute flex">
                <li @click="goto(index)" :style="alphaStyle" :class="[current==index?'current':'']" class="center flex1"
                    v-for="(alpha,index) in nameList">
                    {{alpha.alpha}}
                </li>
            </ol>
        </scroll>
    </div>
</template>

<script>
    import AppHeader from "../../components/app-header.vue"
    import {scrollHeightMixin} from "../../lib/mixin"
    import Scroll from "../../base/scroll.vue"
    import {bjxdata} from "bjx"
    import pinyin from "tiny-pinyin"

    export default {
        mixins: [scrollHeightMixin],
        data() {
            return {
                current: 0,
                list: [],
                listenScroll: true,
                probeType: 2
            };
        },
        computed: {
            nameList() {
                let list = [], alphaArr = [];
                this.list.forEach((item) => {
                    let alpha = item.pinyin.substr(0, 1);
                    let i = alphaArr.indexOf(alpha);
                    if (i >= 0) {
                        list[i].names.push(item);
                        list[i].height = list[i].height + (1.1 + 0.28 * 2) * window.rem2px
                    } else {
                        alphaArr.push(alpha);
                        list.push({
                            alpha: alpha,
                            names: [item],
                            height: (1.1 + 0.28 * 2 + 0.6) * window.rem2px
                        })
                    }
                });
                return list;
            },
            alphaStyle() {
                let length = this.nameList.length;
                let height = window.innerHeight - 45 - (1 + 1) * window.rem2px;
                return {
                    lineHeight: `${height / length}px`
                }
            }
        },
        components: {
            Scroll,
            AppHeader
        },
        created() {
            bjxdata.forEach((bjx) => {
                bjx.pinyin = pinyin.convertToPinyin(bjx.name);
                this.list.push(bjx);
            });
            this.list.sort((a, b) => {
                return a.pinyin < b.pinyin ? -1 : 1
            })

        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            _showCurrentAlpha() {
                let i = 0;
                Array.prototype.forEach.call(this.$refs.name, (dom, index) => {
                    if (dom.getBoundingClientRect().top <= 45) {
                        i = index;
                    }
                });
                this.current = i;
            },
            scroll(e) {
                this._showCurrentAlpha();
            },
            goto(index) {
                this.current = index;
                this.$refs.scroll.scrollToElement(this.$refs.name[index], 300);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    .list {
        ol {
            border-radius: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            top: 100px;
            bottom: 100px;
            right: 0;
            width: 40px;
            flex-direction: column;
            li {
                color: white;
                width: 40px;
                font-size: 28px;
                &.current {
                    font-size: 32px;
                    color: yellow;
                }
            }
        }
        ul > li {
            $avaWid: 110px;
            h2 {
                padding: 0 $commonSpace;
                @include h_lh(60px);
            }
            > div {
                padding: $commonSpace;
                background-color: white;
            }
            > div + div {
                @include border(top);
            }
            .ava {
                border-radius: 50%;
                @include thumb($avaWid, $avaWid)
            }
            .name {
                max-width: 750px - $commonSpace*3 - 110px;
                margin-left: $commonSpace;
                .from {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
