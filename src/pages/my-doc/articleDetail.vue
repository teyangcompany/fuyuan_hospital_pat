<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <scroll class="wrapArticle" ref="wrapArticle" :data="article">
      <div>
        <div class="articleTop">
          <p class="title">{{ article.title }}</p>
          <p class="time">{{ article.docName }} {{ article.createTime | Getdate }}  阅读：{{ article.readCount }}次</p>
        </div>
        <div class="contentWrap">
          <div v-html="article.content">
          </div>
           <div class="codeImg">
             <span>扫描二维码关注我</span>
             <img :src="doc.docQrcode" alt="">
           </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import header from '../../base/header'
  import http from '../../lib/http'
  import scroll from '../../base/scroll.vue'
  import {Getdate} from '../../lib/filter'
  export default{
    data(){
      return{
        title:"文章详情",
        rightTitle:"",
        article:"",
        articleId:"",
        time:"",
        doc:"",
        docId:""
      }
    },
    filters:{
      Getdate
    },
    created(){
      this.articleId = this.$route.query.articleId
      this.docId = this.$route.query.docId
      http("smarthos.user.doc.article.get",{
        token:localStorage.getItem('token'),
        id:this.articleId
      }).then((data)=>{
          if(data.code == 0){
            this.article = data.obj
//            this.getDocInfo()
            this.getData()
          }else{
              weui.alert(data.msg)
          }
      })

    },
    methods:{
       getDocInfo(){
         http("smarthos.user.doc.card.get",{
           docId:this.article.docId
         }).then((data)=>{
           console.log(data,99)
           if(data.code == 0){
             console.log(data)
           }else{
             weui.alert(data.msg)
           }
         })
       },
      getData() {
//        this.docId = sessionStorage.getItem('docId')
        http('smarthos.user.doc.card.get', {
          docId: this.article.docId
        }).then(res => {
          if (res.succ) {
            this.doc = res.obj.doc;
          } else {
            if (res.msg == '医患关系不存在') {

            } else {
             weui.alert(res.msg)
              console.log(res,444)
            }
          }
        })
      },
    },
    components:{
      "VHeader":header,
      scroll
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
    overflow: auto;
    background-color: white;
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
      .codeImg{
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img{
            width: 400px;
            height:400px;
          }
      }
    }
  }
</style>
