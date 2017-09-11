<template>
    <div>
        <transition name="f">
            <div class="boxShaw" v-show="isShow" @click="cancel">
                <div class="bottom">
                    <div class="cell mfc">{{msg}}</div>
                    <div class="cell photo" v-for="item of msgDetail">
                        <label >{{item}}</label>
                    </div>
                    <div class="cancel" @click="cancel">取消</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        components: {

        },
        props:['msg','msgDetail','showShaw'],
        data(){
            return {

            }
        },
        computed:{
          isShow(){
              return this.showShaw
          }
        },
        mounted(){

        },
        methods:{
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../common/public.scss';
    .f-enter-active {
    .bottom{
        transition: height .5s ease;
    }
    transition: all .5s ease;
    }
    .f-enter ,.f-leave-to {
    .bottom{
        height: 0;
    }
    }
    .boxShaw{
        position: absolute;
        left: 0;
        top:0;
        right: 0;
        border-bottom: 0;
        height: 100%;
        background: rgba(0,0,0,.2);
        z-index: 111;
    }
    .bottom{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 666;
        height: 500px;

    }
    .cell{
        width: 100%;
        text-align: center;
        background: white;
        padding: 20px;
        border-bottom: 1px solid gainsboro;
    }
    .cancel{
        width: 100%;
        text-align: center;
        background: white;
        margin-top: 20px;
        padding: 20px 0;
        font-size: 32px;
    }
    .photo{
        font-size: 32px;
        color: #0aace9;
    }


</style>
