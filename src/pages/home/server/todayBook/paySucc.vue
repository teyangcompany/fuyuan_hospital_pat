<template>
  <div class="page">
    <div class="weui-msg">
      <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">预约成功</h2>
        <p class="weui-msg__desc">您可以前往个人中心查看预约记录</p>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <a href="javascript:;" class="weui-btn weui-btn_primary" @click="goLog">查看预约记录</a>
        </p>
      </div>
    </div>
  </div>

</template>
<script>
  export default{
      data(){
          return{

          }
      },
      methods:{
          goLog(){
              this.$router.push({
                   path:"/my/myRegistration"
              })
          }
      }
  }
</script>
<style>

</style>
