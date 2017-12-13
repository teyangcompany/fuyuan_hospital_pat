<template>
    <div>
      <div class="topNav border-1px">
        <div class="backBtn" @click="forceBack">
          <img src="../../../../../static/img/icon/arrow-left-black.png" alt="">
        </div>
        <div class="toggleNmae">
          <div>
            <router-link tag="p" to="/my/consultService/consultDoc" class="listP">找医生</router-link>
            <router-link tag="p" to="/my/consultService/bestPick" class="listP">精选</router-link>
            <router-link tag="p" to="/my/consultService/myConsult" class="listP">我的</router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
  export default{
      data(){
          return{

          }
      },
      methods:{
        forceBack(){
            this.$router.push({
                 path:"/home"
            })
        }
      }
  }
</script>
<style scoped lang="scss">
  .topNav{
    width:100%;
    height: 90px;
    display: flex;
    align-items: center;
    position: relative;
    z-index:100;
    background-color: #ffffff;
    .backBtn{
      width:100px;
      height:90px;
      display: flex;
      align-items: center;
      img{
        width:22px;
        height:39px;
        margin-left: 30px;
      }
    }
    .toggleNmae{
      width:650px;
      margin: 0 auto;
      >div{
        width:500px;
        margin:0 auto;
        display: flex;
        p{
          flex:1;
          height: 90px;
          display: flex;
          font-size: 32px;
          color: #333333;
          align-items: center;
          justify-content: center;
        }
        .router-link-exact-active{
          color: #2772FF;
          border-bottom: 4px solid #2772FF;
        }
      }
    }
  }
</style>
