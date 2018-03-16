<template>
    <div>
          <v-header :title="info.title" :rightTitle="rightTitle"></v-header>
          <div class="wrapCon">
            <div class="wrapImg">
              <img :src="info.titleCoverImg" alt="">
            </div>
            <div v-html="info.content">

            </div>
          </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  export default{
      data(){
          return{
               title:"",
               rightTitle:"",
               info:""
          }
      },
      components:{
          "VHeader":header
      },
      created(){
         console.log(JSON.parse(localStorage.getItem('helpDetail')))
         this.info =  JSON.parse(localStorage.getItem('helpDetail'))
      }
  }
</script>
<style scoped lang="scss">
 .wrapCon{
   position: absolute;
   top: 98px;
   left:0;
   right:0;
   bottom:0;
   overflow: auto;
   background-color: white;
   div{
     width: 690px;
     margin: 20px auto;
   }
   .wrapImg{
      text-align: center;
      img{

      }
   }
 }
</style>
