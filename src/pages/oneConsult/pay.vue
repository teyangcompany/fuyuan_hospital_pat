<template>
    <div class="page">
        <top class="noflex" title="支付" ref="header">
            <div slot="right" class="right absolute">返回</div>
        </top>
        <div class="wrap" @click="paySucc">
            微信支付
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    export default{
        components: {
            top
        },
        mixins: ['mainHeightMixin'],
        data(){
            return {
                id:"",
                token:localStorage.getItem('token')
            }
        },
        mounted(){
            this.id = this.$route.params.id
        },
        methods:{
            paySucc(){
                api('smarthos.consult.pay',{
                    token:this.token,
                    consultId:this.id
                }).then(res=>{
                    console.log(res,2222)
                    if(res.succ){
                        this.$router.push('/oneConsult/'+this.id)
                    }else {
                        alert(res.msg)
                    }
                })
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.wrap{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: blue;
}
</style>
