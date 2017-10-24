<template>
    <div>
        <top class="noflex" title="疾病名称" ref="header">
            <i slot="back"></i>
            <div slot="right" class="right absolute" @click="goBack">确定</div>
        </top>
        <div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">疾病名称</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="illName" type="text" placeholder="请输入"/>
                    </div>
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
        mixins: [mainHeightMixin],
        data(){
            return {
                illName:"",
                routerName:''
            }
        },
        mounted(){
            console.log(this.$route.params.routerName,33333);
            this.routerName = this.$route.params.routerName
        },
        methods:{
            goBack(){
               this.$router.push({
                   name:this.routerName,
                   params:{
                       value:this.illName
                   }
               })

            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';

</style>
