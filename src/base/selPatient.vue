<template>
    <transition name="fade" >
        <div class="page" v-show="flag"  @click.stop="close">
            <div class="wrap">

            </div>

            <div class="contain" >
                <div class="selPeople bor mfc">选择就诊人</div>
                <slot name="pat"></slot>
                <div class="add " @click="addPatient()">添加就诊人</div>
            </div>
            <div class="cancel">

            </div>
            <div class="really">
                取消
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import config from '../lib/config'
    import api from '../lib/http'
    export default{
        components: {

        },
        data(){
            return {
                flag:false,
                list:config.basic_service,
                textList:config.basic_text,
                test:0
            }
        },
        mounted(){

        },
        methods:{
            close(){
                this.flag = false
            },
            getText(index){
                this.test = index
            },
          addPatient(){
                this.$emit('on-addPatient')
          }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../common/common.scss';
    .cancel{
        width: 100%;
        height: 15px;
        background: gainsboro;
    }
    .really{
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 32px;
        color: black;
        background: white;
    }
    .add{
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 32px;
        color: blue;
    }
.selPeople{
    width: 100%;
    text-align: center;
    padding: 20px;
}
    .bor{
        border-bottom: 1px solid gainsboro;
    }

    .page{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom:0;
        background: grey;
        z-index: 991;
        /*opacity: .6;*/
    }
    .wrap{
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .contain{
        width: 100%;
        height: auto;
        background: white;
        padding: 30px;

    }
    .fade-enter{
        opacity: 0;
    .contain{
        transform: translateY(100%);
    }


    }
    .fade-enter-active{
        transition: all 0.6s ease;
    .contain {
        transition: all 0.6s ease;
    }

    }
    .fade-leave-active{
        transition: all 0.6s ease;
    .contain{
        transition: all 0.6s ease;
    }
    }
    .fade-leave-to{
        opacity: 0;
    .contain{
        transform: translateY(100%);
    }
    }
    /*.fade-enter-to{*/
    /*transform: translateY(0);*/
    /*}*/

</style>
