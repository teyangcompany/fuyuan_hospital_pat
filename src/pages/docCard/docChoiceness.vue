<template>
    <div>
        <div class="contain">
            <!--<div class="headerTro">-->
                <!--<span class="col"></span>-->
                <!--<span class="mfb">精选课堂</span>-->
                <!--<span class="more mfc">查看更多</span>-->
            <!--</div>-->
            <!--<div class="docImg">-->
                <!--<div class="wrapImg" v-for="item of 2">-->
                    <!--<div class="docTro" >-->
                        <!--<img class="vioImg"  src="../../../static/img/vio.png" alt="">-->
                        <!--<img class="stop" src="../../../static/img/my-doc/zanting.png" alt="">-->
                    <!--</div>-->
                    <!--<div class="mfb">-->
                        <!--M名医课堂，如何有效的避免癌症......-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="headerTro">-->
                <!--<span class="col"></span>-->
                <!--<span class="mfb">精选语音</span>-->
                <!--<span class="more mfc">查看更多</span>-->
            <!--</div>-->
            <!--<div class="docImg voice" v-for="item of 3">-->
                <!--<div class="docTitle">-->
                    <!--<img src="../../../static/img/test.jpg" alt="">-->
                <!--</div>-->
                <!--<div class="textDetail">-->
                    <!--<p class="mfb">李时珍</p>-->
                    <!--<p class="mfc character">眼底病患者应该注意的事项，最好不要长时间用眼,容易造成......</p>-->
                    <!--<div class="player">-->
                        <!--<div class="zan">-->
                            <!--<span class="lis smc">-->
                                <!--<img class="good" src="../../../static/img/zan.png" alt="">&nbsp;&nbsp;-->
                                <!--200&nbsp;&nbsp;&nbsp;&nbsp;-->
                            <!--</span>-->
                            <!--<span class="lis smc">2000人听过&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                        <!--</div>-->

                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">精选文章</span>
                <span class="more mfc" @click="goArticleList">查看更多 <img src="../../../static/img/icon/arrow-right-grow.png" alt=""> </span>
            </div>
            <div class="docImg voice border-1px" v-for="(item,index) in DocArticleList">
                <div class="essay" @click="goArticleDe(item)">
                   <p class="mfb articleTitle">{{item.title}}</p>
                   <p class="mfc essayCon"></p>
                </div>
                <!--<div class="docTitle">-->
                    <!--<img class="smallImg" src="../../../static/img/test.jpg" alt="">-->
                <!--</div>-->
                <div class="mfc bottomLine">
                    <span>{{item.docName}}</span>
                    <span class="lis smc" >
                    <!--<img class="good" :class="{big:num==index}" src="../../../static/img/zan_off.png" @click="addZan(index,item.id)" alt="">&nbsp;&nbsp;-->
                    <!--{{item.likesCount}}&nbsp;&nbsp;&nbsp;&nbsp;-->
                       <span >阅读 {{item.readCount}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span class="lis smc audience" >{{ item.createTime | exactTime }}创建 |</span>
                </div>
            </div>
            <div class="headerTro">
                <span class="col"></span>
                <span class="mfb">精选咨询</span>
                <span class="more mfc" @click="goConsultMore">查看更多 <img src="../../../static/img/icon/arrow-right-grow.png" alt=""> </span>
            </div>
            <div class="docImg voice border-1px" v-for="item in consultInfoList" @click="goConsultDetail(item.consultInfo.id)">
                <div class="essay">
                   <p class="consultTitle"> <span>{{ item.userDocVo.deptName }}</span> <span>{{ item.consultInfo.illnessName }}</span></p>
                   <p class="mfc essayCon">{{ item.consultInfo.consultContent }}</p>
                    <div class="wrapImg">
                      <!--<img src="../../../static/img/privacy.png" alt="" v-for="(subItem,index) in item.attaList" @click="makeLarge(subItem.attaFileUrl,index)">-->
                    </div>
                </div>
                <!--<div class="docTitle">-->
                    <!--<img class="smallImg" src="../../../static/img/test.jpg" alt="">-->
                <!--</div>-->
                <div class="mfc bottomLine">
                    <img :src="item.userDocVo.docAvatar" alt="">
                    <span>{{ item.userDocVo.docName }} 回答</span>
                    <span class="lis smc" >
                    |&nbsp;&nbsp;点赞{{ item.consultInfo.praiseCount}}&nbsp;&nbsp;
                    </span>
                    <span class="lis smc audience" >阅读{{ item.consultInfo.readCount }} &nbsp;</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import { goodTime,exactTime } from '../../lib/filter'
    import api from '../../lib/http'
    export default{
            components: {
            top
        },
        filters:{
          goodTime,
          exactTime
        },
        mixins: [mainHeightMixin],
        data(){
            return {
                active:true,
                isActive:true,
                num:Number,
                token:localStorage.getItem('token'),
                docId:sessionStorage.getItem('docId')||"",
                DocArticleList:[],
                consultInfoList:[],
                docObj:{}
            }
        },
        mounted(){
            console.log(sessionStorage.getItem('docId'));
            this.getData()
        },
        methods:{
            goArticleList(){
                this.$router.push({
                    name:'articleList'
                })
            },
            goConsultMore(){
                this.$router.push({
                     path:"/DoconsultList"
                })
            },
            goArticleDe(item){
              this.$router.push('/articleDetail/'+item.id)
            },
            goConsultDetail(id){
              this.$router.push({
                path:'/bestPickDetail',
                query:{id:id}
              })
            },
            getData(){
              api('smarthos.user.doc.choice',{
                  token:this.token,
                  docId:this.docId
              }).then(res=>{
                  console.log(res,222222);
                  if(res.succ){
                      this.DocArticleList = res.obj.userDocArticleList
                      res.obj.consultInfoList ? this.consultInfoList = res.obj.consultInfoList : this.consultInfoList = null
                  }else {
                     weui.alert(res.msg)
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
                        weui.alert("点赞成功")
                    }else {
                       weui.alert(res.msg)
                    }
                })
            },
            makeLarge(url,index){
                console.log(url)
                console.log(index)
                wx.previewImage({
                  current: url,
                  urls: [url]
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
        height: 80px;
        line-height: 80px;
        display: inline-block;
        position: absolute;
        right: 30px;
        img{
          width:16px;
        }
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
      .consultTitle{
          span{
            color: $mainColor;
            border:1px solid $mainColor;
            border-radius: 10px;
            padding:2px 10px 2px 10px;
          }
      }
      .articleTitle{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-break: break-all;
      }
      .wrapImg{
        width:690px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-break: break-all;
        img{
          width:150px;
          height:150px;
          margin-left: 20px;
        }
      }
    }
    .essayCon{
        width:690px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
        margin-bottom: 20px;
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
        margin-right: 5px;
    }
    .voice{
        /*border-bottom: 1px solid gainsboro;*/
        padding-bottom: 20px;
      .bottomLine{
        width:690px;
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }

</style>
