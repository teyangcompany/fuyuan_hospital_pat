<template>
    <div>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;" v-for="item in organList" @click="goSymptom(item)">
          <div class="weui-cell__bd">
            <p>{{ item.partName }}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>
    </div>
</template>
<script>
  import http from '../../lib/http'
  export default{
       data(){
           return{
             organList:[],
             gender:""
           }
       },
       created(){
          this.gender = localStorage.getItem('gender')
           console.log(this.gender,11)
            http("smarthos.appointment.part.list",{
              partSex:this.gender
            }).then((data)=>{
                if(data.code == 0){
                  this.organList = data.list
                  console.log(data)
                }else{
                   weui.alert(data.msg)
                }
            })
       },
       methods:{
         goSymptom(item){
               this.$router.push({
                    path:"/home/server/symptom",
                   query:{
                       illName:item.partName,
                       id:item.id,
                       partSex:item.partSex
                   }
               })
         }
       }
  }
</script>
<style scoped lang="scss">
.weui-cells{
     margin-top: 0;
}
</style>
