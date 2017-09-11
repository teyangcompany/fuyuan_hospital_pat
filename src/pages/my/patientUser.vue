<template>
    <div>
        <top>
            <div class="mfb">常用就诊人</div>
            <span slot="right" class="step">添加</span>
        </top>
        <div class="wrap" ref="wrapper">
            <div>
                <div class="userList">
                      <p>
                          <span class="bf">李康飞</span>
                          <span class="mfc">男 25</span>
                      </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import BScroll from 'better-scroll'
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){
            this.initScroll()
        },
        methods:{
            initScroll(){
                this.scroll = new BScroll(this.$refs.wrapper,{
                    click:true
                })
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';

    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
        font-size: 32px;
    }
    .wrap{
        position: fixed;
        left: 0;
        right: 0;
        top: 88px;
        bottom: 0;
        background: #c7ddf4;
    }
    .userList{
        box-sizing: border-box;
        margin: 20px;
        background: white;
        padding: 30px;
    }
</style>
