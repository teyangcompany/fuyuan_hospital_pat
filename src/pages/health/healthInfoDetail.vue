<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="wrapArticle" ref="wrapArticle">
      <div>
        <div class="articleTop">
          <p class="title">{{ infoDetail.title }}</p>
          <p class="time"> <span v-if="infoDetail.createTime">{{ infoDetail.createTime | Todate }}</span> 阅读：{{ infoDetail.viewCount }}次</p>
        </div>
        <div class="contentWrap">
          <div v-html="infoDetail.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import {Todate} from '../../lib/filter'
  import http from '../../lib/http'
  export default{
    data(){
      return{
        title:"资讯详情",
        rightTitle:"",
        newId:"",
        infoDetail:"",
        articleTitle:"",
        articleTime:""
      }
    },
    filters:{
      Todate
    },
    created(){
      this.articleTitle= this.$route.query.title
      this.newId = this.$route.query.newId
      console.log(this.newId)
      http("smarthos.information.news.info",{
        id: this.newId
      }).then((data)=>{
        this.infoDetail = data.obj
//        this.articleTime = formatDate(new Date(this.infoDetail.createTime))
        console.log(data)
      })
    },
    mounted(){

    },
    methods:{
      _initArticleScroll(){
        this.articleScroll = new BScroll(this.$refs.wrapArticle,{
          click:true
        })
      }
    },
    components:{
      "VHeader":header
    },
    watch:{
      infoDetail(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initArticleScroll()
          },20)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common';
  .wrapArticle{
    position: fixed;
    top: 98px;
    left:0;
    right:0;
    bottom:0px;
    background-color: #FFFFFF;
    .articleTop{
      width:690px;
      margin:0 auto;
      text-align: center;
      p.title{
        font-size: 40px;
        color: #333333;
        margin-top: 10px;
      }
      p.time{
        font-size: 28px;
        color: #999999;
        margin-top: 10px;
      }
    }
    .contentWrap{
      width:690px;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
</style>
