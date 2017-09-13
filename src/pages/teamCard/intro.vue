<template>
    <div>
        <div class="contain">
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">团队擅长</span>
            </div>
            <div class="skilled">
                <div :class="{text:active}" class="mfb">
                    此时，基于上面的配置，当你访问时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个空的子路由：
                </div>
                <div class="mfb" :class="{arrow:active,arrow1:!active}" @click="toggleArrow">
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">团队介绍</span>
            </div>
            <div class="skilled">
                <div :class="{text:isActive}" class="mfb">
                    数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时，Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。                </div>
                <div class="mfb" :class="{arrow:isActive,arrow1:!isActive}" @click="toggleArrow1">
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">团队成员(12位)</span>
                <span class="more mfc">查看更多</span>
            </div>
            <div class="docImg">
                <div class="docTro" v-for="item of 6">
                    <p>
                        <img class="docTitle" src="../../../static/img/test.jpg" alt="">
                    </p>
                    <p>
                        张晓燕
                    </p>
                    <p>
                        主任医师
                    </p>
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">团队相册</span>
                <span class="more mfc">查看更多</span>
            </div>
            <div class="docImg">
                <div class="teamImg" v-for="item of 3">
                    <img class="teamTitle" src="../../../static/img/test.jpg" alt="">
                </div>
            </div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    export default{
        components: {
            top
        },
        mixins: ['mainHeightMixin'],
        data(){
            return {
                active:true,
                isActive:true
            }
        },
        mounted(){

        },
        methods:{
            toggleArrow(){
                this.active=!this.active
            },
            toggleArrow1(){
                this.isActive=!this.isActive
            },
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.contain{
    margin: 60px 25px;
}
    .headerTro{
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
    }
    .col{
        display: inline-block;
        width: 10px;
        height: 30px;
        background: #1885ff;
        margin-right: 20px;
    }
    .more{
     display: inline-block;
       position: absolute;
        right: 30px;

    }
    .skilled{
        display: flex;
        align-items: center;

        margin: 30px 0;
    }
    .text{
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .text1{

    }
    .arrow{
        display: flex;
        flex: 1 0 auto;
        margin-left: 10px;
        width: 34px;
        height: 20px;
        background-image: url('../../../static/img/2.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .arrow1{
        display: flex;
        flex: 1 0 auto;
        margin-left: 10px;
        width: 34px;
        height: 20px;
        background-image: url('../../../static/img/1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .docImg{
        display: flex;
        flex-wrap:wrap;
        margin: 30px 0;
    }
    .docTro{
        text-align: center;
        width: 130px;
        margin-right: 45px;
        margin-bottom: 20px;
    }
    .docTitle{
        width: 130px;
        height: 130px;
        border-radius: 65px;
    }
    .teamTitle{
        width: 220px;
        height: 220px;
        margin-right: 10px;
    }
</style>
