<template>
  <div class="top_bar main_head border-1px">
    <section class="goBack" @click="goBack">
      <img src="../../static/img/icon/arrow-left-black.png" alt="">
    </section>
    <section class="title">
      <img :src="waitImg" alt="" v-if="path== '/docChat/:id'">
      <span class="word">{{title}}</span>
    </section>
    <section class="nav" @click="goDocCard">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
  </div>
</template>
<script>
  export default{
    data(){
       return{
         path:"",
       }
    },
    props:{
      title:{
        type:String
      },
      rightTitle:{
        type:String
      },
      waitImg:{

      },
    },
    mounted(){
      this.path = this.$route.path
      console.log(this.path)
    },
    methods:{
      goBack(){
          this.$router.back(-1)
      },
      goDocCard(){
          this.$emit('on-docCard')
      }
    },
    watch:{
      "$route":function(){
        this.path = this.$route.path
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../common/common.scss';
  .top_bar{
    position: relative;
    background-color: white;
    height: 98px;
    line-height: 88px;
    width:100%;
    top:0;
    display: flex;

    /*z-index:160;*/

    z-index:6;

  section{
    text-align: center;
  .word{
    font-size: 18px;
    color: #333333;
    font-family: PingFang SC;
  }
  span{
    display: block;
  }
  }
  .goBack{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  img{
    height: 35px;
    padding-left: 30px;
  }
  }
  .scanImg{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  /*padding-left: 15px;*/
  img{
    width:40px;
    padding-left: 30px;
  }
  }
  .title{
    flex:2;
    display: flex;
    align-items: center;
    justify-content: center;
  span{
    font-size: 36px!important;
    color: #333333;
    display: inline-block;
  }
  img{
    width:45px;
    height:45px;
    display: inline-block;
    margin-right: 10px;
    /*<!--position: absolute;-->*/
    /*<!--left:270px;-->*/
    /*<!--top:15px;-->*/
    border-radius: 50%;
  }
  }
  .nav{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
  .rightWord{
    font-size: 32px;
    color: $mainColor;
  }
  }
  }
</style>
