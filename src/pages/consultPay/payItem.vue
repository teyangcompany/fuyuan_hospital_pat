<template>
    <div>
        <v-header :title="hosName" :rightTitle="rightTitle" @on-select="goSelect"></v-header>
        <div class="navBar">
            <router-link to="/payItem/waitPay" class="waitPay">
                <p>待支付</p>
            </router-link>
            <router-link to="/payItem/payed" class="payed">
                <p>已支付</p>
            </router-link>
        </div>
        <div class="itemDetail">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  export default{
      data(){
          return{
              title:"",
              rightTitle:"",
            previousInfo:""
          }
      },
      created(){
          this.previousInfo =  JSON.parse(localStorage.getItem('attachContent'))
          this.hosName = this.previousInfo.hosName
      },
       methods:{
         goSelect(){
              this.$router.replace({
                  path:"/consultPay"
              })
         }
       },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
.navBar{
  width:100%;
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  .waitPay,.payed{
    width: 375px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    p{
       font-size: 90px;
       width: 200px;
       margin:0 auto;
       font-size: 30px;
       color: #999999;
      text-align: center;
    }
  }
  .router-link-exact-active{
       p{
          border-bottom: 4px solid #3d9bff;
          color: #3d9bff;
       }
  }
}
  .itemDetail{
     position: absolute;
    top: 190px;
    left:0;
    right:0;
    bottom:0;
    overflow: auto;
  }
</style>
