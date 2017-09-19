<template>
    <div id="onlinepage">
        <top title="我的挂号" class="noflex">
            <i slot="back"></i>
        </top>
        <scroll :height="scrollHeight">
            <div class="wrap">
                <div class="content" v-for="detail of 2">
                    <div class="registrationDetail">
                        <p>2017-08-23&nbsp;&nbsp;上午 <span class="current" >实时挂号</span></p>
                        <p>医院 : 浙二医院</p>
                        <p>科室 : 内科</p>
                        <p>医生 : 华佗</p>
                        <p>预估就诊时间 : 2017-9-30</p>
                        <p>支付方式 : 微信支付</p>
                        <p>挂号费 : 20</p>
                        <p>取号密码 : 251125</p>
                    </div>
                    <div class="patDetail">
                        <p>患者 : 张三</p>
                        <p>身份证号 : 410425199212183536</p>
                        <p>手机号 : 13522365145</p>
                    </div>
                    <div class="state" >
                        <a >取消预约</a>
                    </div>

                </div>
            </div>
        </scroll>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../components/app-header.vue'
    import scroll from '../../../base/scroll.vue'
    export default{
        components: {
            top,
            scroll
        },
        filters:{
        },
        data(){
            return {
                patId:'',
                list:[],
                scrollHeight:""
            }
        },
        mounted(){
            setTimeout(()=>{
                this.scrollHeight = window.innerHeight-45
            },50)
        },
        methods:{

        }
    }
</script>
<style scoped lang="scss">
@import "../../../common/common.scss";
    #onlinepage{
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        font-size: 32px;
    }

    .wrap{
        -webkit-overflow-scrolling: touch;
        overflow: auto;

    }

    .registrationDetail{
        border-bottom: 1px dashed gainsboro;
        padding: 10px ;
    }
    .content{
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 15px;
        border-top: 1px solid gainsboro;
        color: gray;
        box-sizing: border-box;
        background: white;
        overflow: hidden;
    }
    .patDetail{
        padding: 10px ;
        box-sizing: border-box;
    }
    .state{
        float: right;
        box-sizing: border-box;
        padding-right: 15px;
        color: #0BB20C;
    }
    .current{
        display: inline-block;
        float: right;
    }
</style>
