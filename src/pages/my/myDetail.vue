<template>
    <div class="page">
        <top class="headerTop">
            <div class="mfw">我的</div>
        </top>
        <div class="wrapper" ref="wrap">
            <div>
                <div class="myHeader">
                    <div class="headerImg">
                        <img src="../../../static/img/header.png" alt="">

                    </div>
                    <div class="headersImg">
                        <img src="../../../static/img/headers.png" alt="">
                    </div>
                    <div class="patDetail">
                        <div>
                            <img class="myImg" src="../../../static/img/my.jpg" alt="">
                        </div>
                        <div class="name">
                            <p style="line-height: 1.4" class="mfw">小李</p>
                            <p style="line-height: 1.4" class="mfw">姓名: 李康飞</p>
                            <p style="line-height: 1.4" class="mfw">男 18 浙江杭州</p>
                        </div>
                        <div class="arrow">
                            <img src="../../../static/img/arrow.png" alt="">
                        </div>
                    </div>

                </div>
                <div class="contain">
                    <div class="test weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/zixun.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>我的咨询</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/guahao.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>我的挂号</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="test1 weui-cells">
                        <a @click="goPatientUser" class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/jiuzhen.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>常用就诊人</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/jiankang.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>健康档案</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells" style="margin: 10px 0">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/qianbao.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>我的钱包</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="test1 weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/zhanghu.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>账户相关</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/gengxin.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>检查更新</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/guanyu.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>关于</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                </div>
                <div class="contain">
                    <div class="test weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/zixun.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>我的咨询</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/guahao.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>我的挂号</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="test1 weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/jiuzhen.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>常用就诊人</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/jiankang.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>健康档案</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells" style="margin: 10px 0">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/qianbao.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>我的钱包</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="test1 weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/zhanghu.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>账户相关</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/gengxin.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>检查更新</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__hd">
                                <img class="menuImg" src="../../../static/img/guanyu.png" alt="">
                            </div>
                            <div class="weui-cell__bd">
                                <p>关于</p>
                            </div>
                            <div class="weui-cell__ft"></div>
                        </a>
                    </div>
                </div>
                <div class="btns">
                    <div><img src="../../../static/img/tuichu.png" alt=""></div>
                    <div class="loginOut">退出登录</div>
                </div>
            </div>

        </div>
        <muen index="3"></muen>



    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/header.vue'
    import muen from '../../business/app-footer.vue'
    import BScroll from 'better-scroll';
    export default{
        components: {
            top,
            muen
        },
        data(){
            return {}
        },
        mounted(){
              this.$nextTick(()=>{
                  this.scroll = new BScroll(this.$refs.wrap,{
                      click:true
                  });
                  console.log(this.scroll,9999)
              })
        },
        methods:{
            goPatientUser(){
                this.$router.push({
                    name:'patientUser'
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
    flex: 1;
}
    .headerTop{
        background: #0b7ffe;
    }
    .wrapper{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom:90px;
        overflow: scroll;
    }
    .myHeader{
        position: relative;
    }
    .headerImg{
        width: 100%;
        position: relative;
        img{
            width: 100%;
            display: block;
            height: 130px;
        }
    }
    .headersImg{
        width: 100%;
        img{
            width: 100%;
            display: block;
            height: 210px;

        }
    }
    .patDetail{
        position: absolute;
        box-sizing: border-box;
        padding-left: 28px;
        bottom: 60px;
        display: flex;
        align-items: center;
        width: 100%;
    }
.myImg{
    width: 134px;
    height: 134px;
    border-radius: 67px;
}
    .name{
        box-sizing: border-box;
        padding-left: 30px;
        flex: 7;
    }
    .arrow{
        float: right;
        margin-right: 30px;
        flex: 1;
        img{
            width: 25px;
            height: 34px;


        }
    }
    .menuImg{
        width: 40px;
        height: 40px;
        display: block;
        margin-right: 30px;
    }
    .weui-cells{
        height: 95px;
        line-height: 95px;
        box-sizing: border-box;
        padding: 10px 30px;
    }
    .test:before{
        border-top: none;
    }
    .contain{
       height: auto;
    }
    /*.test1:after{*/
        /*border-bottom: none;*/
    /*}*/
    /*.test:after{*/
        /*border-bottom: none;*/
    /*}*/
    .btns{
        display: flex;
        justify-content: center;
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        line-height: 60px;
        padding: 50px 0;

        img{
            width: 40px;
            height: 40px;
            display: block;



        }
    }
    .loginOut{
        font-size: 32px;
        color:#ff1616;
        margin-left: 30px;
    }

</style>
