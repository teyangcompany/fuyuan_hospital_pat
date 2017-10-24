<template>
    <div class="page">
        <top class="noflex" title="" ref="header">
            <!--<i slot="back"></i>-->
        </top>
        <scroll :height="scrollHeight">
            <div class="wrap">
                <ul  v-for="item of selList" class="contain">
                    <p class="titleText">{{item.value}}</p>
                    <li class="item" v-for="item of item.list">
                        <div :class="item.name">
                        </div>
                        <div>
                            {{item.value}}
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import scroll from '../../base/scroll.vue'
    export default{
        components: {
            top,
            scroll
        },
        mixins: ['mainHeightMixin'],
        data(){
            return {
                selList:config.basic_more,
                scrollHeight:""
            }
        },
        mounted(){
            setTimeout(()=>{
                this.scrollHeight = window.innerHeight-45
            },50)

        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .contain{
        background: white;
        margin-bottom: 20px;
        overflow: hidden;
    }
.item{
    float: left;
    width: 25%;
    padding: 20px 0;
    text-align: center;
}
    .titleText{
        padding: 20px 40px;
    }
    /*.item1{*/
        /*!*background: gold;*!*/
        /*width: 100px;*/
        /*height: 100px;*/
        /*background-image: url("../../../static/img/index/help.png");*/
        /*background-position: center center;*/
        /*background-repeat: no-repeat;*/
        /*background-size: 100% 100%;*/
       /*margin: 0 auto;*/
    /*}*/
    @each $i in book, guide, queuing, payment, report, steward, help{
        .#{$i}{
            width: 90px;
            height: 90px;
            background-image: url("../../../static/img/index/#{$i}.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
        }
    }
</style>
