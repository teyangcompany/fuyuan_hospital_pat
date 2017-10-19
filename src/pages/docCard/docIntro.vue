<template>
    <div>
        <div class="contain">
            <div class="headerTro" @click="goTeam">
                <span class="col"></span>
                <span class="mfb">所属团队</span>
                <span class="teamName">
                    华佗名医团队 >
                </span>
            </div>
            <div class="skilled">

            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">医生擅长</span>
            </div>
            <div class="skilled">
                <div :class="{text:active}" class="mfb skillText">
                    {{docObj.docSkill}}
                </div>
                <div class="mfb" :class="{arrow:active,arrow1:!active}" @click="toggleArrow">
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">医生介绍</span>
            </div>
            <div class="skilled">
                <div :class="{text:isActive}" class="mfb skillText">
                    {{docObj.docResume}}
                </div>
                <div class="mfb" :class="{arrow:isActive,arrow1:!isActive}" @click="toggleArrow1">
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">医生相册</span>
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
                isActive:true,
                docObj:{}
            }
        },
        mounted(){
            setTimeout(()=>{
                console.log( this.$store.state.docObj,66666666);
                this.docObj = this.$store.state.docObj
            },500)

        },
        methods:{
            goTeam(){
//              this.$router.push('/teamCard/1')
            },
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
    .skillText{
        flex: 1;
    }
    .teamName{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 75%;
        color: #3b9dff;
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
        flex: 0 0 auto;
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
        flex: 0 0 auto;
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
