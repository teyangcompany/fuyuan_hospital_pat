<template>
    <div class="page">
        <div class="wrapper" ref="main">
            <div class="teamImg">
                <div class="myHeader">
                    <span class="back">
                        <img src="../../../static/img/back.png" alt="">
                    </span>
                   <span class="headerImg">
                       <img src="../../../static/img/share.png" alt="">
                       <span class="mfw">
                             分享
                       </span>

                   </span>

                    <span class="headerImg">
                       <img src="../../../static/img/guan.png" alt="">

                       <span class="mfw">
                           关注  &nbsp;&nbsp;
                       </span>
                   </span>
                </div>
                <div class="teamBottom">
                    <div class="teamDetail">
                        <ul>
                            <li class="row">
                                <span class="mfb">华佗名医团队</span>
                            </li>
                            <li class="row">
                            <span class="mf">
                                浙二医院 &nbsp;&nbsp;&nbsp;眼科
                            </span>
                            </li>
                            <li class="row">
                            <span class="mf">
                                粉丝&nbsp;&nbsp; 555&nbsp;&nbsp;&nbsp;&nbsp; 患者&nbsp;&nbsp; 9
                                &nbsp;&nbsp;&nbsp;&nbsp;评分&nbsp;&nbsp;8.5 >
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="navbar">
                <div class="mfb pub" :class="item.name" v-for="(item,index) of bar" @click="selItem(index,item)">
                    <span :class="{bar:index==num}">{{item.value}}</span>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <div ref="footer" class="btn" @click="consultTeam">
           咨询团队
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
                bar:config.basic_bar,
                num:0
            }
        },
        mounted(){

        },
        methods:{
            selItem(index,item){
                this.num=index;
                this.$router.push({
                    name:item.router
                })
            },
            consultTeam(){
                this.$router.push({
                    name:'consultTeam'
                })
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .page{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
        background: white;
    }
    .wrapper{
        overflow: scroll;
    }
    .myHeader{
        width: 100%;
        padding: 0px 30px;
        position: absolute;
        top: 30px;;
    }
    .headerImg{
        float: right;
        img{
            width: 30px;
            height: 30px;
        }
    }
    .back{
        width: 25px;
        height: 40px;
        img{
            width: 25px;
            height: 40px;
        }
    }
    .teamImg{
        position: relative;
        width: 100%;
        height: 660px;
        background-image: url("../../../static/img/team.png");
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .teamBottom{
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 240px;
        background-image: url("../../../static/img/teamBottom.png");
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .teamDetail{
        margin-top: 80px;
    }
    .row{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
    }
    .navbar{
        width: 100%;
        display: flex;
        flex-direction: row;
       justify-content: space-around;
        align-items: center;
       padding: 10px 0;

    }
    .bar{
        padding-bottom: 20px;
        border-bottom: 1px solid #2772ff;
        color: #2772ff;
    }
    .sel{
        border-right: 1px solid gainsboro;
        border-left: 1px solid gainsboro;
        padding: 0 88px;
    }
    .btn{
        width: 100%;
        height: 100px;
        background: #2772ff;
        text-align: center;
        line-height: 100px;
        color: white;
    }
</style>
