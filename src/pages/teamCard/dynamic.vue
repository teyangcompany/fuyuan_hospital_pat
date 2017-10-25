<template>
    <div>
        <div class="contain">
            <h3>该功能暂未开通，敬请期待！</h3>
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
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';

    .contain{
        margin: 60px 25px;
        height: 100%;
        text-align: center;
    }
</style>
