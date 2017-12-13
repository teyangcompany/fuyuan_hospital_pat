<template>
    <div>
      <div class="illness border-1px">
        <div>
          患者资料:李俊基 男 25岁
          <div>
            <span>更多</span>
            <img src="../../../../../static/img/icon/arrow-right-grow.png" alt="">
          </div>
        </div>
      </div>
      <div class="illness border-1px">
        <div>
          疾病名称:视网膜中央动脉阻塞
        </div>
      </div>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
  .illness{
    width: 100%;
    height: 90px;
    background-color: white;
    >div{
      width: 690px;
      height: 90px;
      font-family: PingFangSC;
      font-size: 32px;
      color: #333333;
      margin:0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      >div{
        span{
          font-size: 32px;
          color: #666666;
          font-family: PingFangSC;
          display: inline-block;
          margin:0;
        }
        img{
          width:16px;
        }
      }
    }
  }
</style>
