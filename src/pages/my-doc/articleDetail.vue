<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="wrapArticle" ref="wrapArticle">
      <div>
        <div class="articleTop">
          <p class="title">{{ article.title }}</p>
          <p class="time"> {{ article.createTime | Getdate }}  阅读：{{ article.readCount }}次</p>
        </div>
        <div class="contentWrap">
          <div v-html="article.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import http from '../../lib/http'
  import {Getdate} from '../../lib/filter'
  export default{
    data(){
      return{
        title:"文章详情",
        rightTitle:"",
        article:"",
        articleId:"",
        time:""
      }
    },
    filters:{
      Getdate
    },
    created(){
      this.articleId = this.$route.query.articleId
      http("smarthos.user.doc.article.get",{
        token:localStorage.getItem('token'),
        id:this.articleId
      }).then((data)=>{
        this.article = data.obj
//        this.time = formatDate(new Date(this.article.createTime))
        console.log(data)
      })
    },
    components:{
      "VHeader":header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .wrapArticle{
    position: fixed;
    top: 88px;
    left:0;
    right:0;
    bottom:40px;
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
    }
  }
</style>
