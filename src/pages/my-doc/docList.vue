<template>
    <div class="page">
        <top class="noflex" title="关注医生" ref="header">
            <i slot="back"></i>
        </top>
        <div class="navbar">
            <div class="mfb pub" :class="item.name" v-for="(item,index) of bar" @click="selItem(index,item)">
                <span :class="{bar:index==num}">{{item.value}}</span>
            </div>
        </div>
        <scroll class="wrapper" :height="scrollHeight" :data="docList" ref="wrapper">
            <div class="contain">
                <div v-show="num==0">
                    <div class="weui-cells" v-for="item of docList" @click="goDocCard(item.userDocVO.id)">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img :src="item.userDocVO.docAvatar" alt="" class="docImg"></div>
                            <div class="weui-cell__bd">
                                <p class="mfb">
                                    <span class="mfb">{{item.userDocVO.docName}}</span>
                                    <span class="famous" v-if="item.followDocpat.vipStatus">我的医生</span>
                                </p>
                                <p>
                                    <span  class="mfc">{{item.userDocVO.hosName}}</span>
                                </p>
                                <p>
                            <span class="mfc">
                               {{item.userDocVO.deptName}} {{item.userDocVO.docTitle}}
                            </span>
                                </p>
                            </div>
                            <div class="weui-cell__ft"></div>

                        </a>
                    </div>
                </div>
                <div v-show="num==1" class="wrap" v-for="item of 1">
                  <div class="centerTip">
                  该功能暂未开放，敬请期待
                  </div>
                    <!--<div class="detail">-->
                        <!--<span class="mfb">王小仙名医团队</span>-->
                        <!--<span class="grade">9.5</span>-->
                    <!--</div>-->
                    <!--<div class="detail">-->
                        <!--<span class="mf">医院:</span>-->
                        <!--<span class="mfc">浙二医院</span>-->
                    <!--</div>-->
                    <!--<div class="detail">-->
                        <!--<span class="mf">科室:</span>-->
                        <!--<span class="mfc">眼科</span>-->
                    <!--</div>-->
                    <!--<div class="detail">-->
                        <!--<span class="mf">擅长:</span>-->
                        <!--<span class="mfc">各种针灸，不孕不育等等.....</span>-->
                    <!--</div>-->
                    <!--<div class="detail docDetail">-->
                        <!--<div class="doc" v-for="item of 4">-->
                            <!--<p><img class="doctorImg" src="../../../static/img/test.jpg" alt=""></p>-->
                            <!--<p> 王小仙</p>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </scroll>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import scroll from '../../base/scroll.vue'
    export default{
        components: {
            top,
            scroll
        },
        mixins: ['mainHeightMixin'],
        data(){
            return {
                num:0,
                bar:config.docList_bar,
                docList:[],
                token:localStorage.getItem('token'),
                scrollHeight:''
            }
        },
        create(){
          this.scrollHeight = window.innerHeight-45-window.rem2px*1
        },
        mounted(){
            this.getData()
        },
        methods:{
            selItem(index,item){
                this.num=index;
                setTimeout(()=>{
                    this.$refs.wrapper.refresh()
                },100)

            },
            getData(){
                api('smarthos.follow.docpat.list',{
                    token:this.token
                }).then(res=>{
                    console.log(res,77777);
                    if(res.succ){
                        this.docList = res.list
                    }else {
                        alert(res.msg)
                    }
                })
            },
            goDocCard(id){
                this.$router.push('docCard/'+id)
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .page{
        display: flex;
        flex: 1;
        flex-direction: column;
        background: white;
    }
    .wrapper{
        overflow: hidden;
        .wrap{
            margin: 30px;
          .centerTip{
              margin-top: 430px;
              font-size: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
        }
    }
    .navbar{
        flex:0 ;
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 50px;
        border-bottom: 1px solid gainsboro;
        height: 100px;
    }
    .bar{
        padding-bottom: 20px;
        border-bottom: 1px solid #2772ff;
        color: #2772ff;
    }
    .docImg{
        width: 130px;
        height: 130px;
        border-radius: 65px;
        margin-right: 50px;
    }
    .famous{
        width: 120px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        display: inline-block;
        margin-left: 20px;
        color: blue;
        border: 1px solid blue;
        border-radius: 5px;
        font-size: 24px;
    }
    .weui-cells{
        margin-top: 0;
    }
    .grade{
        display: inline-block;
        padding: 0px 15px;
        height: 28px;
        line-height: 28px;
        border: 1px solid orange;
        color: orange;
        border-radius: 5px;
        font-size: 24px;
        margin-left: 30px;
    }
    .detail{
        margin-bottom: 15px;
    }
    .docDetail{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-bottom: 30px;
        border-bottom: 1px solid gainsboro;
    }
    .docDetail{
        text-align: center;
    }
    .doctorImg{
        width: 130px;
        height: 130px;
        border-radius: 65px;
    }
</style>
