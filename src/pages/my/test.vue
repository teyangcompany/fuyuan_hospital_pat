<template>
    <div class="wrap" ref="wrapper">
        <div class="contain">

                <li v-for="item of 36">11111</li>

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
//            setTimeout(()=>{
//                this.scroll = new BScroll(this.$refs.wrapper,{
//                    click:true
//                });
//                console.log( this.scroll,36666)
//            },2000)

        }
    }
</script>
<style  lang='scss'>
    /*@import '../../common/common.scss';*/

    .wrap{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom:0;
        overflow: scroll;

    }

</style>
