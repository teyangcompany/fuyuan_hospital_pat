<template>
    <div class="share">
      <div class="downloadCenter">
        <div class="tips">
          <p>点击右上角分享到朋友圈</p>
          <div class="nav"></div>
        </div>
      </div>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
  .share{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-image: url("../../../static/img/中转下载页1.png");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .downloadCenter{
      width:690px;
      margin: 0 auto;
      .tips{
        width:690px;
        height:80px;
        font-size: 32px;
        margin-top: 20px;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        border:1px solid #999999;
        border-radius: 20px;
        background: white;
        animation:move 2s infinite;
        p{
          display: flex;
          height:80px;
          align-items: center;
          img{
            width:50px;
            height:50px;
          }
        }
        .nav {
          position   :absolute;
          top    :-8px;
          right    :20px;
          overflow   :hidden;
          width    :27px;
          height   :27px;
          background  :white;
          border-left  :1px solid #999999;
          border-top  :1px solid #999999;
          -webkit-transform :rotate(45deg);
          -moz-transform :rotate(45deg);
          -o-transform  :rotate(45deg);
          transform   :rotate(45deg);
        }
        @keyframes move {
          0%{
            transform: translateY(0);
          }
          25%{
            transform: translateY(5px);
          }
          50%{
            transform: translateY(0px);
          }
          75%{
            transform: translateY(-5px);
          }
          100%{
            transform: translateY(0px);
          }
        }
      }
    }
  }
</style>
