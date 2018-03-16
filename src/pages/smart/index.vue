<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="navBar">
             <div>
               <router-link tag="p" to="/home/server/smart/bodyImg">人体图像</router-link>
               <router-link tag="p" to="/home/server/smart/bodyList">部位列表</router-link>
             </div>
         </div>
         <div class="wrapImg">
            <!--<img src="../../../static/img/man_fore.png" alt="">-->
           <router-view></router-view>
         </div>
    </div>
</template>
<script>
    import header from '../../base/header.vue'
    export default{
         data(){
             return{
                 title:"智能导诊",
                 rightTitle:""
             }
         },
         methods:{
           getMousePos(event){

             alert("绝对坐标："+event.pageX+","+event.pageY);
           }
         },
         components:{
             "VHeader":header
         }
    }
</script>
<style scoped lang="scss">
.navBar{
  height:80px;
  width:100%;
  background-color: #FFFFFF;
  >div{
    width: 400px;
    height: 80px;
    margin:0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      width:200px;
      height: 60px;
      line-height: 60px;
      font-size: 32px;
      color: #333333;
      text-align: center;
      border:1px solid #3d9bff;
    }
    .router-link-exact-active{
         background-color: #3d9bff;
         color: white;
    }
  }
}
.wrapImg{
  position: absolute;
  top: 180px;
  left:0;
  right:0;
  bottom:0;
  overflow: auto;
  img{
    width:100%;
  }
}
</style>
