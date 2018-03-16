<template>
    <div>
        <v-header :title="title" :rightTitle="rightTitle" @on-docCard="goSymptom"></v-header>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="number" v-model="age" placeholder="请输入您的年龄"/>
            </div>
          </div>
        </div>

    </div>
</template>
<script>
  import header from '../../base/header.vue'
  export default{
      data(){
          return{
              title:"请填写你的年龄",
              rightTitle:"确定",
              age:""
          }
      },
      created(){
          this.illName = this.$route.query.illName
        this.id = this.$route.query.id
        this.partSex = this.$route.query.partSex
      },
      methods:{
        goSymptom(){
            if(this.age == ''){
               weui.alert("年龄不可为空")
               return
            }
            this.$router.push({
              path:"/home/server/symptom",
              query:{
                illName:this.illName,
                id:this.id,
                partSex:this.partSex,
                age:this.age
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
