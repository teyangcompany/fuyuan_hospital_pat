<template>
    <div>
        <v-header :title="title" :rightTitle="rightTitle"></v-header>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;" v-for="item in symptom" @click="goSymptom(item)">
            <div class="weui-cell__bd">
              <p>{{ item.symName }}</p>
            </div>
            <div class="weui-cell__ft">
            </div>
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
            title:"",
            rightTitle:"",
            gender:"",
            partId:"",
            symptom:[]
          }
      },
      created(){
          this.title = this.$route.query.illName
          this.gender = this.$route.query.partSex
          this.partId = this.$route.query.id
          this.age = this.$route.query.age
          http("smarthos.appointment.part.symptom",{
            partId:this.partId,
            gender:this.gender,
            age:this.age
          }).then((data)=>{
              if(data.code == 0){
                 this.symptom = data.list
                console.log(data)
              }else{
                  weui.alert(data.msg)
              }
          })
      },
      methods:{
        goSymptom(item){
          this.$router.push({
            path:"/home/server/sympDetail",
            query:{
              illName:item.symName,
              id:item.partId,
              partSex:this.gender,
              symId:item.id
            }
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
