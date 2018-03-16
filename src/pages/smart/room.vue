<template>
    <div>
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="wrapDept">
            <div class="weui-cells">
              <a class="weui-cell weui-cell_access" @click="goBook(item)" v-for="item in roomList">
                <div class="weui-cell__bd">
                  <p>復元医院（{{item.ksmc}}）</p>
                </div>
                <div class="weui-cell__ft">挂号</div>
              </a>
            </div>
          </div>
         <v-toast v-if="showToast"></v-toast>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import http from '../../lib/http'
  import Toast from '../../base/toast.vue'
  export default{
      data(){
          return{
              title:"科室",
              rightTitle:"",
              roomList:[],
            showToast:false
          }
      },
      created(){
          this.symId = this.$route.query.symId
          this.showToast = true
          http("smarthos.yygh.ApiDepartmentService.departmentList",{
            deptcode:this.symId
          }).then((data)=>{
            this.showToast = false
              if(data.code == 0){
                  this.roomList = data.list
                  console.log(data)
              }else{
                  weui.alert(data.msg)
              }
          })
      },
      methods:{
        goBook(item){
          this.$router.push({
            path:'/home/server/book/doc/expert',
            query:{depid:item.ksid,hosid:item.yyid,selected:item.ksmc,hosName:"復元医院"}
          })
        }
      },
      components:{
           "VHeader":header,
           "VToast":Toast
      }
  }
</script>
<style scoped lang="scss">
  .wrapDept{
       position: absolute;
    top: 98px;
    left:0;
    right:0;
    bottom:0;
    overflow: auto;
  }
.weui-cells{
  margin-top: 0;
}
</style>
