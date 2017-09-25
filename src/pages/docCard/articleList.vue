<template>
    <div>
        <top class="noflex" title="文章列表" ref="header">
            <i slot="back"></i>
        </top>
         <scroll class="articleList"  :height="scrollHeight" :data="easyList">
             <div>
                 <div class="easy" v-for="item of easyList" @click="goDetail(item.id)">
                     <p class="mfb"> 《{{item.title}}》 </p>
                     <p class="mfb" style="margin: 7px 0">{{item.content}}</p>
                     <p>
                         <span class="smc">{{item.docName}}</span>
                         <span class="smc zan"> {{item.likesCount}} 赞</span>
                         <span class="smc zan">{{item.readCount}}  阅读</span>
                     </p>
                 </div>
             </div>
         </scroll>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import scroll from  '../../base/scroll.vue'
    export default{
      data(){
          return{
              scrollHeight:"",
              doctorId:"",
              easyList:[]
          }
      },
       created(){
           this.scrollHeight = window.innerHeight-45


       },
     mounted(){
         this.doctorId = sessionStorage.getItem('docId')
         api("smarthos.user.doc.article.list",{
             docId:this.doctorId,
             token:localStorage.getItem('token')
         }).then((res)=>{
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
          scroll
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
.easy{
    background: white;
    padding: 20px;
    border-bottom: 1px solid gainsboro;
}
    .zan{
        display: inline-block;
        float: right;
        color: blue;
        margin-right: 20px;
    }
</style>
