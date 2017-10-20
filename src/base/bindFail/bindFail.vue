<template>
  <div class="loading">
    <img src="./u4197.png" alt="">
    <p class="title">{{ title }}</p>
    <p class="second">{{ failDetail }}</p>
    <p class="third">{{ failDetailSecond }}</p>
    <p class="des" @click="iSee()">{{failKnow}}</p>
  </div>
</template>
<script>
  export default{
    props:{
      title:{
        type:String,
        default:""
      },
      failDetail:{
        type:String,
      },
      failDetailSecond:{
        type:String,
      },
      failKnow:{
        type:String,
      }
    },
    methods:{
      iSee(){
        this.$emit("on-iSee")
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .loading{
    width: 500px;
    height: 650px;
    margin: 0 auto;
    background-color:white;
    text-align: center;
    border-radius: 12px;
    img{
      padding-top: 60px;
      width: 140px;
      height: 186px;
    }
    .title{
      margin-bottom: 15px!important;
    }
    p.second{
      margin-top: 10px;
    }
    p{
      font-size: 32px;
      color: #333333;
      text-align: center!important;
    }
    p.des{
      width:450px;
      height:80px;
      margin:0 auto;
      margin-top: 160px;
      line-height: 80px;
      font-size: 36px;
      color: white;
      border-radius: 10px;
      background-color: #3d9bff;
    }
    p.second,p.third{
      text-align: left;
      width:450px;
      margin: 0 auto;
    }
  }
</style>
