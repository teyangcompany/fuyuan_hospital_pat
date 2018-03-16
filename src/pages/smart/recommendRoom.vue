<template>
    <div>
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" @click="goBook(item)" v-for="item in recommendList">
              <div class="weui-cell__bd">
                <p>{{ item.deptName }}</p>
              </div>
              <div class="weui-cell__ft">挂号</div>
            </a>
          </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import http from '../../lib/http'
  export default{
       data(){
          return{
              title:"推荐科室",
             rightTitle:"",
            detailId:[],
            recommendList:[]
          }
       },
       created(){
             this.detailId = JSON.parse(localStorage.getItem('picked'))
             http('smarthos.appointment.part.dept',{
               detailId:this.detailId
             }).then((data)=>{
                 if(data.code == 0){
                     this.recommendList = data.list
                     console.log(data)
                 }else{
                     weui.alert(data.msg)
                 }

             })
       },
        methods:{
            goBook(item){
              this.$router.push({
                path:"/home/server/room",
                query:{symId:item.stdDeptId}
              })
            }
        },
       components:{
           "VHeader":header
       }
  }
</script>
<style scoped lang="scss">
  .weui-cells{
      margin-top: 0;
  }
</style>
