<template>
    <div>
      <div class="topNav">
        <router-link tag="p" to="/my/home/server/consultService/consultDoc" class="listP">找医生</router-link>
        <router-link tag="p" to="/my/home/server/consultService/bestPick" class="listP">精选</router-link>
        <router-link tag="p" to="/my/home/server/consultService/myConsult" class="listP">我的</router-link>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
  .topNav{
    width:100%;
    height: 90px;
    display: flex;
    position: relative;
    z-index:100;
    background-color: #ffffff;
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
      color: blue;
      border-bottom: 2px solid blue;
    }
  }
</style>
