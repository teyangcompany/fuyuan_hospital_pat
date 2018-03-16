<template>
  <div>
    <div>
      <p @click="removeStorage">点击清楚</p>
    </div>
    <div>
      <p>缓存的openid：{{ myOpenid }}</p>
    </div>
  </div>
</template>
<script>
  import {openidCache} from "../lib/cache"
   export default{
       data(){
           return{
                myOpenid:""
           }
       },
       mounted(){
         this.myOpenid = openidCache.get()
         console.log(this.myOpenid)
       },
        methods:{
          removeStorage(){
               localStorage.clear()
               sessionStorage.clear()
              console.log(localStorage.getItem('*'))
               weui.toast("已清除")
          }
        }
   }
</script>
<style scoped lang="scss">
    p{
      width: 120px;
      height:60px;
      background-color: #3CC51F;
    }
</style>
