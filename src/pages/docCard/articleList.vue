<template>
    <div class="whole">
        <!--<top class="noflex" title="文章列表" ref="header">-->
            <!--<i slot="back"></i>-->
        <!--</top>-->
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <scroll class="articleList"  :height="scrollHeight" :data="easyList">
             <div>
                 <div class="easy border-1px" >
                    <div class="border-1px center" v-for="item in easyList" @click="goDetail(item.id)">
                      <p class="title"> 《{{item.title}}》 </p>
                      <p class="content">{{item.content}}</p>
                      <p class="footNote">
                        <span class="zan"> {{item.likesCount}} 赞</span>
                        <span class="zan">{{item.readCount}}  阅读</span>
                      </p>
                    </div>
                 </div>
             </div>
         </scroll>
         <toast v-if="showToast"></toast>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import header from '../../base/header.vue'
    import scroll from  '../../base/scroll.vue'
    import Toast from '../../base/toast.vue'
    export default{
      data(){
          return{
              scrollHeight:"",
              doctorId:"",
              easyList:[],
              title:"精选文章",
            rightTitle:"",
            showToast:false
          }
      },
       created(){
           this.scrollHeight = window.innerHeight-45
       },
     mounted(){
         this.doctorId = sessionStorage.getItem('docId')
        this.showToast = true
         api("smarthos.user.doc.article.list",{
             docId:this.doctorId,
             token:localStorage.getItem('token')
         }).then((res)=>{
           this.showToast = false
             console.log(res,88888);
             if(res.succ){
                 this.easyList = res.list
             }else {
                 alert(res.msg)
             }
         })
     },
        methods:{
            goDetail(id){
                this.$router.push('/articleDetail/'+id)
            }
        },
      components:{
          top,
          scroll,
          "VHeader":header,
          Toast
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/mix.scss';
  .whole{
    position: absolute;
    top:0px;
    bottom:0;
    left:0;
    right:0;
    background: white;
  }
  .articleList{
      position: absolute;
      top:120px;
      bottom:0;
      left:0;
      right:0;
      .easy{
        /*height:400px;*/
        background: white;
        margin:0 auto;
        .center{
          width:690px;
          margin:0 auto;
          P{
            width:690px;
          }
          .title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            word-break: break-all;
            text-align: left;
            color: #333333;
            font-size: 32px;
            margin-top: 10px;
          }
          .content{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break: break-all;
            margin-top: 20px;
            margin-bottom: 20px;
            color: #666666;
            font-size: 28px;
            text-align: left;
          }
          .footNote{
            height:50px;
          }
          .zan{
            display: inline-block;
            float: right;
            color: #999999;
            margin-right: 20px;
            font-size: 28px;
          }
        }
      }
  }
</style>
