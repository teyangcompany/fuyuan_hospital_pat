<template>
    <div class="page">
        <app-header title="修改绑定手机号" class="noflex">
            <i slot="back"></i>
        </app-header>
      <div class="wrap">
        <div class="title">

        </div>
        <div class="text">
          修改成功
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="goNext">立即登录</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../components/app-header.vue'
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped lang="scss">
  @import '../../../common/common.scss';
  .page{
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .title{
    margin-top: 160px;
    width: 260px;
    height: 260px;
    background: #ff9999;
  }
  .wrap{
    margin: 0 auto;
  }
  .text{
    width: 100%;
    text-align: center;
    font-size: 36px;
    margin: 100px 0 160px 0;
  }
  .btn{
    box-sizing: border-box;
    text-align: center;
    margin:  0 auto;
    width: 670px;
  }
  .weui-btn_primary{
    background: #0aace9;
  }
</style>
