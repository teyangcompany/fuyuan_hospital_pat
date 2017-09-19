<template>
    <div>
        <div class="contain">
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">精选课堂</span>
                <span class="more mfc">查看更多</span>
            </div>
            <div class="docImg">
                <div class="wrapImg" v-for="item of 2">
                    <div class="docTro" >
                        <img class="vioImg"  src="../../../static/img/vio.png" alt="">
                        <img class="stop" src="../../../static/img/my-doc/zanting.png" alt="">
                    </div>
                    <div class="mfb">
                        M名医课堂，如何有效的避免癌症......
                    </div>
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">精选语音</span>
                <span class="more mfc">查看更多</span>
            </div>
            <div class="docImg voice" v-for="item of 3">
                <div class="docTitle">
                    <img src="../../../static/img/test.jpg" alt="">
                </div>
                <div class="textDetail">
                    <p class="mfb">李时珍</p>
                    <p class="mfc character">眼底病患者应该注意的事项，最好不要长时间用眼,容易造成......</p>
                    <div class="player">
                        <div class="zan">
                            <span class="lis smc">
                                <img class="good" src="../../../static/img/zan.png" alt="">&nbsp;&nbsp;
                                200&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <span class="lis smc">2000人听过&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">精选文章</span>
                <span class="more mfc">查看更多</span>
            </div>
            <div class="docImg voice" v-for="(item,index) of DocArticleList">
                <div class="essay">
                   <p class="mfb">{{item.title}}</p>
                   <p class="mfc essayCon">{{item.content}}</p>
                </div>
                <div class="docTitle">
                    <img class="smallImg" src="../../../static/img/test.jpg" alt="">
                </div>
                <div class="mfc">
                    <span>{{item.docName}}</span>
                    <span class="lis smc" >
                    <img class="good" :class="{big:num==index}" src="../../../static/img/zan.png" @click="addZan(index,item.id)" alt="">&nbsp;&nbsp;
                    {{item.likesCount}}&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="lis smc audience" >{{item.readCount}}人听过&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">精选咨询</span>
                <span class="more mfc">查看更多</span>
            </div>
            <div class="docImg voice" v-for="item of 3">
                <div class="essay">
                   <p class="mfc essayCon">良好的睡觉可以促进血液循环，皮肤好，血管好等等的......</p>
                </div>
                <div class="docTitle">
                    <img class="smallImg" src="../../../static/img/test.jpg" alt="">
                </div>
                <div class="mfc">
                    <span>李时珍</span>
                    <span class="lis smc" >
                    <img class="good" src="../../../static/img/zan.png" alt="" >&nbsp;&nbsp;
                    200&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="lis smc audience" >2000人听过&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
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
                active:true,
                isActive:true,
                num:Number,
                token:localStorage.getItem('token'),
                docId:sessionStorage.getItem('docId')||"",
                DocArticleList:[],
                docObj:{}
            }
        },
        mounted(){
            console.log(sessionStorage.getItem('docId'));
            this.getData()
        },
        methods:{
            getData(){
              api('smarthos.user.doc.choice',{
                  token:this.token,
                  docId:this.docId
              }).then(res=>{
                  console.log(res,222222);
                  if(res.succ){
                      this.DocArticleList = res.obj.userDocArticleList
                  }else {
                      alert(res.msg)
                  }
              })
            },
            addZan(index,id){
                console.log(21212121212)
                this.num  = index;
                api('smarthos.user.doc.article.likes',{
                    token:this.token,
                    articleId:id
                }).then(res=>{
                    console.log(res,6666);
                    if(res.succ){
                        this.getData()
                    }else {
                        alert(res.msg)
                    }
                })
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

    .docImg{
        display: flex;
        flex-wrap:wrap;
        margin: 30px 0;
    }
    .wrapImg{
        width: 50%;
    }

    .vioImg{
        display: inline-block;
        width: 325px;
        height: 220px;
        margin-right: 25px;
        margin-bottom: 20px;
    }
    .docTitle{
        flex: 0;
        margin-right: 15px;
        img{
            width: 60px;
            height: 60px;
            border-radius: 30px;
            margin-right: 15px;

        }
    }
    .textDetail{
        flex:1;
    }
    .docTro{
        position: relative;
    }
    .stop{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top:0;
        margin: auto;
        width: 85px;
        height: 85px;
    }
.player{
    position: relative;
    width: 100%;
    height: 80px;
    background-image: url("../../../static/img/player.png");
    background-position: left bottom;
    background-size: 50% 100%;
    background-repeat: no-repeat;
}
    .character{
        padding: 10px 0 20px 0;
    }
    .lis{
        display: inline-block;
        float: right;
    }
    .zan{
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .good{
        width: 28px;
        height: 28px;
    }
    .big{
        animation: myfirst .5s
    }
    @keyframes myfirst{
        0%   {transform: scale(1.0);}
        25%  {transform: scale(1.2);}
        50%  {transform: scale(1.4);}
        75%  {transform: scale(1.2);}
        100% {transform: scale(1.0);}
    }
    .essay{
        /*margin: 20px 30px;*/
    }
    .essayCon{
        padding: 20px 0;
    }
    .docTitle{
    .smallImg{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    }
    .audience{
        margin-left: 260px;
    }
    .voice{
        border-bottom: 1px solid gainsboro;
        padding-bottom: 20px;
    }

</style>
