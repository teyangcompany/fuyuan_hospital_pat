<template>
    <div>
          <v-header :title="title" :rightTitle='rightTitle'></v-header>
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" v-for="item in helpList" @click="goDetail(item)">
              <div class="weui-cell__bd">
                <p>{{ item.title }}</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import http from '../../lib/http'
  export default{
      data(){
          return{
              title:"就诊指南",
              rightTitle:"",
              helpList:[]
          }
      },
      created(){
         this.getList()
      },
      components:{
           "VHeader":header
      },
      methods:{
           getList(){
               http("smarthos.information.news.commguide.list",{

               }).then((data)=>{
                   if(data.code == 0){
                       console.log(data)
                       this.helpList = data.list
                   }else{
                       weui.alert(data.msg)
                   }
               })
           },
          goDetail(item){
                this.$router.push({
                     path:"/helpDetail"
                })
               localStorage.setItem('helpDetail',JSON.stringify(item))
          }
      }
  }
</script>
<style scoped lang="scss">
.weui-cells{
   margin-top: 0;
}
.weui-cells:before {
  border-top: none;
}
</style>
