<template>
  <header >
        <div class="left" >
          <slot name="left">
            <span @click="back">&#xe600;</span>
          </slot>
         </div>
        <slot class=""> </slot>
      <div class="right ">
        <slot name="right"></slot>
      </div>
  </header>
</template>


<script type="text/ecmascript-6">

  export default {
    props: {},
    data() {
      return {
        path:"",
      };
    },
    computed: {},

    mounted() {
      this.path = this.$route.path
    },
    beforeDestroy() {

    },
    watch:{
      "$route":function(){
        this.path = this.$route.path
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      goBack(){
          this.$emit("on-back")
      }
    }

  };
</script>

<style scoped lang="scss">
  @import "../common/common.scss";
  @font-face {
    font-family: 'iconfont';  /* project id 326803 */
    src: url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.eot');
    src: url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.woff') format('woff'),
    url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.svg#iconfont') format('svg');
  }
  span{
    font-family: 'iconfont';
    font-size: 18px; /*no*/
  }



  header{
    position: relative;
    height:88px;
    line-height: 88px;
    background-color: white;
    width: 100%;
    text-align: center;
    border-bottom:1px solid gainsboro;
    z-index:888;
  }




.left{
  position: absolute;
  top:0px;
  left: 10px;
  height: 88px;
  line-height: 88px;
  z-index: 911;
}
  .right{
    position: absolute;
    top: 0px;
    right: 15px;
    height: 88px;
    line-height: 88px;
    z-index: 911;
  }

</style>
