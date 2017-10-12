<template>
    <div class="wrapPick">
       <div class="topInfo border-1px">
            <p>患者资料: <span v-if="detailInfo.userPat">{{ detailInfo.userPat.patName }}</span> <span v-if="detailInfo.userPat">{{ detailInfo.userPat.patGender == 'M'? '男':'女' }}</span> </p>
       </div>
       <div class="topInfo border-1px">
           <p>疾病名称: <span v-if="detailInfo.consultInfo">{{ detailInfo.consultInfo.illnessName }}</span> </p>
       </div>
       <div class="detailList">
         <ul class="border-1px">
           <li >
             <!--<div class="border-1px-dashed dashedPlace">-->
               <!--<p class="picConsult" ><span v-if="item.userDocVo">{{ item.userDocVo.deptName }}</span> <span>{{ item.consultInfo.illnessName }}</span></p>-->
             <!--</div>-->
             <div class="mainContent">
               <p v-if="detailInfo.consultInfo">{{ detailInfo.consultInfo.consultContent }}</p>
               <div >
                 <img :src="secondItem.attaFileUrl" alt="" v-for="secondItem in detailInfo.attaList">
               </div>
             </div>
             <div class="ConsultRelate">

               <span class="name"><span class="number"><img :src="detailInfo.userDocVo.docAvatar" alt="" v-if="detailInfo.userDocVo"> <span v-if="detailInfo.userDocVo">{{ detailInfo.userDocVo.docName }}</span></span></span>
               <!--<span class="money">看过&nbsp;-->
                  <!--|-->
                  <!--&nbsp;-->
                  <!--<img src="../../../../../static/img/zan_off.png" alt="">&nbsp;-->
                <!--</span>-->
             </div>
           </li>
         </ul>
       </div>
       <div class="bottom">
          <div class="leftBottom border-1px-right" v-if="detailInfo.consultInfo">
            <span class="money">看过&nbsp; <span v-if="detailInfo.consultInfo.readCount">{{ detailInfo.consultInfo.readCount }}</span>
              <span v-else>0</span>
            |
            &nbsp;
            <img src="../../../../../static/img/zan_off.png" alt="">&nbsp;
             <span v-if="detailInfo.consultInfo.praiseCount">{{ detailInfo.consultInfo.praiseCount }}</span>
              <span v-else>0</span>
            </span>
          </div>
          <div class="rightBottom" @click="goDocCard(detailInfo.userDocVo.id)">
                问这个医生
          </div>
       </div>
    </div>
</template>
<script>
  import http from '../../../../lib/http'
  export default{
      data(){
          return{
            consultId:"",
            detailInfo:""
          }
      },
      created(){
          this.consultId = this.$route.query.id
          console.log(this.consultId)
          http("smarthos.consult.details",{
            token:localStorage.getItem('token'),
            consultId:this.consultId
          }).then((data)=>{
              if(data.code == 0){
                console.log(data)
                this.detailInfo = data.obj
              }else{
                  weui.alert(data.msg)
              }

          })
      },
      methods:{
        goDocCard(id){
          console.log(id,88888)
          this.$router.push('/docCard/'+id)
        },
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common';
   .wrapPick{
     width:100%;
     background-color: #FFFFFF;
     .topInfo{
       width: 690px;
       margin:0 auto;
       height: 80px;
       line-height: 80px;
       background-color: #FFFFFF;
       p{
         font-size: 32px;
       }
     }
     .detailList{
       ul {
         margin-top: 5px;
         li {
           width: 690px;
           /*height: 166px;*/
           border-radius: 7px;
           background-color:white;
           list-style-type: none;
           margin: 0 auto;
           padding: 0px 8px 8px 8px;
           >div {
             display: flex;
             justify-content: space-between;
             span.picConsult {
               font-size: 32px;
             }
             span.consultTim {
               font-size: 28px;
               color: #F07818;
             }
           }
           .dashedPlace{
             margin-top: 5px;
             padding-bottom: 10px;
           }
           div.mainContent {
             display: flex;
             flex-direction: column;
             justify-content: center;
             >div{
               margin-top: 10px;
               img{
                 width: 22.5%;
                 height: 120px;
                 margin-left: 15px;
               }
             }
             p {
               display: -webkit-box;
               -webkit-box-orient: vertical;
               -webkit-line-clamp: 2;
               overflow: hidden;
               font-size: 30px;
               color: #888888;
               padding-top: 5px;
               /*background-color: #E64340;*/
             }
           }
           div.ConsultRelate {
             margin-top: 5px;
             span.name {
               font-size: 28px;
               color: #999999;
               .circle {
                 display: inline-block;
                 width: 10px;
                 height: 10px;
                 margin-right: 3px;
                 background-color: red;
                 border-radius: 50%;
               }
               .number{
                 display: flex;
                 align-items: center;
                 img{
                   width: 34px;
                   height: 34px;
                   border-radius: 50%;
                   margin-right: 5px;
                 }
               }
             }
             span.money {
               font-size: 26px;
               color: #999999;
               display: flex;
               align-items: center;
               img{
                 width: 36px;
               }
             }
           }
         }
         li:nth-child(1){
           padding-top: 5px;
         }
       }
     }
     .bottom{
       position: fixed;
       bottom:0;
       left:0;
       right:0;
       height: 80px;
       background-color: #FFFFFF;
       display: flex;
       .leftBottom{
         flex:1;
         display: flex;
         align-items: center;
         justify-content: center;
         span{
           font-size: 32px;
         }
         img{
           width: 36px;
         }
       }
       .rightBottom{
         flex:1;
         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 32px;
       }
     }
   }
</style>
