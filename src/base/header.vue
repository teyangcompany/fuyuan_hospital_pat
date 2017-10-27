<template>
  <div class="top_bar main_head border-1px">
    <section class="goBack"  v-if="path == oneConsultPath && historyLength <= 1">
      <!--<img src="../../static/img/icon/arrow-left-black.png" alt="">-->
    </section>
    <section class="goBack"  v-else-if="path== nowPath  && historyLength <= 1">
      <!--<img src="../../static/img/icon/arrow-left-black.png" alt="">-->
    </section>
    <section class="goBack" @click="goBack" v-else>
      <img src="../../static/img/icon/arrow-left-black.png" alt="">
    </section>
    <section class="title">
      <img :src="waitImg" alt="" v-if="path==oneConsultPath">
      <span class="word">{{title}}</span>
      <span v-if="path== nowPath && showMy" class="myDoc" >我的医生</span>
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
         nowPath:"",
         oneConsultPath:"",
         historyLength:""
       }
    },
    props:{
      title:{
        type:String
      },
      rightTitle:{
        type:String
      },
      showMy:{
        default:false
      },
      waitImg:{

      },
    },
    mounted(){
      this.path = this.$route.path
      this.id = this.$route.params.id
      this.historyLength = window.history.length
      this.nowPath = `/docChat/${this.id}`
      this.oneConsultPath = `/oneConsult/${this.id}`
      console.log(this.nowPath,555)
      console.log(this.id)
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
    img{
      width:40px;
      height:40px;
      border-radius: 50%;
    }
    span{
      font-size: 36px;
      color: #333333;
       margin-left: 5px;
      display: inline-block;
    }
   .myDoc{
     font-size: 28px;
     height:45px;
     width:125px;
     line-height: 45px;
     border-radius: 7px;
     border:1px solid #3d9bff;
     color: #3d9bff;
     margin-left: 20px;
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
