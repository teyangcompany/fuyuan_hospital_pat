<template>
    <div>
       <div class="wrapBody" v-if="showMan">
         <img src="../../../static/img/man_fore.png" alt="" usemap="#MyfirstMap" class="body" v-if="showThis">
         <img src="../../../static/img/man_rear.png" alt="" usemap="#backBody" class="body" v-else>
         <map id="MyfirestMap" name="MyfirstMap">
           <area shape="poly" coords="242,250,266,370,72,666,28,632,242,250" @click="goArm('上肢')" />
           <area shape="poly" coords="482,248,696,658,646,658,470,364,482,248" @click="goArm('上肢')" />
           <area shape="circle" coords="342,104,14" @click="goArm('眼')" />
           <area shape="circle" coords="386,106,14" @click="goArm('眼')" />
           <area shape="rect" coords="362,110,374,132" @click="goArm('鼻')" />
           <area shape="rect" coords="346,148,386,158," @click="goArm('口')" />
           <area shape="rect" coords="308,116,322,144" @click="goArm('耳')" />
           <area shape="poly" coords="318,28,319,184,368,184,418,184,418,28,318,128" @click="goArm('头部')" />
           <area shape="rect" coords="332,190,400,232" @click="goArm('颈部')" />
           <area shape="rect" coords="274,244,456,386" @click="goArm('胸部')" />
           <area shape="rect" coords="292,420,456,552" @click="goArm('腹部')" />
           <area shape="poly" coords="264,592,182,1230,230,1260,350,668,264,592" @click="goArm('下肢')" />
           <area shape="poly" coords="388,638,498,1248,556,1246,474,614,388,638" @click="goArm('下肢')" />
           <area shape="circle" coords="370,596,32" @click="goArm('生殖部位（男）')" />
         </map>
         <map id="backBody" name="backBody">
            <area shape="rect" coords="310,234,442,388" @click="goArm('背部')" />
            <area shape="rect" coords="282,428,438,470" @click="goArm('腰部')" />
            <area shape="rect" coords="348,522,370,602" @click="goArm('男性股沟')" />
            <area shape="rect" coords="274,496,462,598" @click="goArm('臀部')" />
         </map>
       </div>
       <div class="wrapBody" v-else>
         <img src="../../../static/img/women_fore.png" alt="" usemap="#womanFront" class="body" v-if="showThis">
         <img src="../../../static/img/women_rear.png" alt="" usemap="#womanBack" class="body" v-else>
         <map id="womanFront" name="womanFront">
           <area shape="rect" coords="248,242,116,652," @click="goArm('上肢')" />
           <area shape="rect" coords="466,244,578,652" @click="goArm('上肢')" />
           <area shape="circle" coords="330,98,14" @click="goArm('眼')" />
           <area shape="circle" coords="370,198,14" @click="goArm('眼')" />
           <area shape="rect" coords="350,106,350,126" @click="goArm('鼻')" />
           <area shape="rect" coords="346,148,386,158," @click="goArm('口')" />
           <area shape="rect" coords="308,116,322,144" @click="goArm('耳')" />
           <area shape="poly" coords="318,28,319,184,368,184,418,184,418,28,318,128" @click="goArm('头部')" />
           <area shape="rect" coords="332,190,400,232" @click="goArm('颈部')" />
           <area shape="rect" coords="274,244,456,386" @click="goArm('胸部')" />
           <area shape="rect" coords="292,420,456,552" @click="goArm('腹部')" />
           <area shape="poly" coords="264,592,182,1230,230,1260,350,668,264,592" @click="goArm('下肢')" />
           <area shape="poly" coords="388,638,498,1248,556,1246,474,614,388,638" @click="goArm('下肢')" />
           <area shape="circle" coords="356,582,32" @click="goArm('生殖部位（女）')" />
         </map>
         <map id="womanBack" name="womanBack">
           <area shape="rect" coords="310,234,442,388" @click="goArm('背部')" />
           <area shape="rect" coords="290,392,428,470" @click="goArm('腰部')" />
           <area shape="rect" coords="348,522,370,602" @click="goArm('女性盆腔')" />
           <area shape="rect" coords="274,496,462,598" @click="goArm('臀部')" />
         </map>
       </div>
      <img src="../../../static/img/rollback_press_false.png" alt="" class="roll" @click="roll">
      <img src="../../../static/img/pat_sex_cut.png" alt="" class="toggleGender" @click="toggleGender">
    </div>
</template>
<script>
    import http from '../../lib/http'
    import mask from '../../base/mask.vue'
    import inputDialog from '../../base/inputDialog.vue'
    export default{
        data(){
            return{
                 list:[],
              showThis:true,
              showMan:true,
              showMask:true,
              age:"",
            }
        },
        created(){
             this.getList()
        },
        watch:{
          showMan(){
            this.getList()
          },
          dialogMain(){
              console.log(this.dialogMain)
          }
        },
        components:{
            "VMask":mask,
            inputDialog
        },
        methods:{
          roll(){
              this.showThis = !this.showThis
          },
          toggleGender(){
              this.showMan = !this.showMan
          },
          getList(){
            http("smarthos.appointment.part.list",{
              partSex:this.showMan ? "M":"F"
            }).then((data)=>{
              if(data.code == 0){
                this.list = data.list
                localStorage.removeItem('gender')
                this.showMan ? localStorage.setItem('gender','M') : localStorage.setItem('gender','F')
                console.log(data)
              }else{
                weui.alert(data.msg)
              }
            })
          },
          goArm(type){
            console.log(type)
            this.list.forEach((item)=>{
                if(item.partName == type){
                  this.$router.push({
                    path:"/home/server/age",
                    query:{
                      illName:item.partName,
                      id:item.id,
                      partSex:item.partSex
                    }
                  })
                }
            })
          }
        },
    }
</script>
<style scoped lang="scss">
   div{
     position: absolute;
     left:0;
     right:0;
     top:0px;
     bottom:0;
     overflow: auto;
     .wrapBody{
       padding-top: 200px;
       display: flex;
       align-items: center;
       justify-content: center;
       .body{
         transform: scale(0.45);
       }
     }
     .roll{
       position: absolute;
       left: 20px;
       bottom: 80px;
       width: 200px;
     }
     .toggleGender{
       position: absolute;
       right: 60px;
       top: 80px;
       width: 100px;
     }


   }
</style>
