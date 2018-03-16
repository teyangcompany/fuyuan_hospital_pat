<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="wrap">
             <p class="recommend">推荐科室</p>
             <div class="weui-cells" v-for="item in roomList" @click="goRoom(item)">
               <a class="weui-cell weui-cell_access" href="javascript:;">
                 <div class="weui-cell__bd">
                   <p>復元医院（{{item.deptName}}）</p>
                 </div>
                 <div class="weui-cell__ft">挂号</div>
               </a>
             </div>
             <p class="recommend">您是否有以下症状或者条件</p>
             <div class="weui-cells weui-cells_checkbox">
               <label class="weui-cell weui-check__label"  v-for="item in sympList">
                 <div class="weui-cell__hd">
                   <input type="checkbox" class="weui-check" name="checkbox1" :value="item.id" v-model="picked"/>
                   <i class="weui-icon-checked"></i>
                 </div>
                 <div class="weui-cell__bd">
                   <p class="description">{{ item.description }}</p>
                 </div>
               </label>
             </div>
         </div>
          <div class="nextStep" @click="goNext">
            下一步
          </div>
    </div>
</template>
<script>
  import header from '../../base/header.vue'
  import http from '../../lib/http'
  export default{
      data(){
          return{
              title:"",
              rightTitle:"",
              sympList:[],
              roomList:[],
              picked:[]
          }
      },
      created(){
          this.title = this.$route.query.illName
          this.symId = this.$route.query.symId
          this.partId = this.$route.query.id
          this.getRoom()
           http("smarthos.appointment.part.symptom.detail",{
             partId:this.partId,
             symId:this.symId
           }).then((data)=>{
              if(data.code == 0){
                  this.sympList = data.list
                  console.log(data)
              }else{
                  weui.alert(data.msg)
              }
           })
      },
      watch:{
        picked(){
            console.log(this.picked)
        }
      },
      methods:{
           getRoom(){
               http("smarthos.appointment.part.dept",{
                 symId:this.symId
               }).then((data)=>{
                   if(data.code == 0){
                         this.roomList = data.list
                         console.log(data)
                   }else{
                       weui.alert(data.msg)
                   }
               })
           },
           goNext(){
               this.$router.push({
                   path:"/home/server/recommendRoom",
               })
               localStorage.setItem('picked',JSON.stringify(this.picked))
           },
           goRoom(item){
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
.wrap{
  position: absolute;
  top: 98px;
  left:0;
  right:0;
  bottom:90px;
  overflow: auto;
  .recommend{
    width: 690px;
    height: 60px;
    line-height: 60px;
    margin:0 auto;
    font-size: 30px;
    color: #3d9bff;
  }
  .weui-cells{
    margin-top: 0;
  }
  .description{
      font-size: 28px;
  }
}
.nextStep{
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: white;
  font-size: 32px;
  background-color: #3d9bff;
}
</style>
