<template>
  <div class="loading">
    <img src="./u519.png" alt="">
    <p class="title">{{ title }}</p>
    <p class="illNumber">{{illNumber}}</p>
    <p class="secondLine">{{ secondLine }}</p>
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
      illNumber:{
        type:String,
      },
      failKnow:{

      },
      secondLine:{

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
      width: 130px;
      height: 186px;
    }
    p{
      font-size: 32px;
    }
    .title{
      margin-top: 40px;
    }
    p.illNumber{
      color: #FAAC79;
      margin-top: 60px;
    }
    p.secondLine{
        margin-top: 20px;
      color: #999999;
    }
    p.des{
      width:450px;
      height:80px;
      margin:0 auto;
      line-height: 80px;
      margin-top: 50px;
      font-size: 36px;
      color: white;
      border-radius: 10px;
      background-color: #3d9bff;
    }
  }
</style>
