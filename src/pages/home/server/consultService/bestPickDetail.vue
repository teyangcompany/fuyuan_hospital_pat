<template>
    <div class="wrapPick">
      <scroll class="relateList" :data="arr"  ref="main">
         <div>
           <div class="topInfo border-1px">
             <p>患者资料: <span v-if="detailInfo.consultInfo">{{ detailInfo.consultInfo.consulterGender == 'M'? '男':'女' }}</span> <span v-if="detailInfo.consultInfo">{{ detailInfo.consultInfo.consulterAge  }}</span> </p>
           </div>
           <div class="topIllName border-1px">
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
                   <div>
                     <img :src="secondItem.attaFileUrl" alt="" v-for="secondItem in detailInfo.attaList" @click="makeLarge(secondItem.attaFileUrl)">
                   </div>
                 </div>
                 <div class="ConsultRelate">

                   <span class="name">
                     <span class="number" v-if="detailInfo.userPat">
                       <img :src="detailInfo.userPat.patAvatar" alt="" v-if="detailInfo.userPat.patAvatar">
                       <img src="../../../../../static/img/pat.f.jpg" alt="" v-else-if="!(detailInfo.userPat.patAvatar) && detailInfo.userPat.patGender != 'M'">
                       <img src="../../../../../static/img/pat.m.jpg" alt="" v-else>
                       <span v-if="detailInfo.consultInfo">{{ detailInfo.consultInfo.consulterName.substr(0,1) }}**</span>
                     </span>
                   </span>
                   <span class="money" v-if="detailInfo.consultInfo">{{ detailInfo.consultInfo.createTime | goodTime }}&nbsp;
                |
                &nbsp;
                <span v-if="detailInfo.consultInfo.replyCount">{{ detailInfo.consultInfo.replyCount }}条回复</span>
                <span v-else>0条回复</span>
              </span>
                 </div>
               </li>
             </ul>
           </div>
           <div class="answerList" v-for="item in arr" ref="lastItem">
             <div class="patAnswer" v-if="item.consultMessage.replierType=='DOC'">
               <div class="docImg">
                 <img :src="item.userDocVo.docAvatar" alt="" v-if="item.userDocVo.docAvatar">
                 <img src="../../../../../static/img/doctorM.png" alt="" v-if="!(item.userDocVo.docAvatar) || item.userDocVo.docAvatar == ''">
               </div>
               <div class="docMsg">
                 <p>
                   <span class="mf">{{item.userDocVo.docName}}</span>
                   <span class="mfc">{{item.userDocVo.docTitle}} {{ item.userDocVo.deptName }}</span>
                 </p>
                 <p>
                   <span class="mfc">{{item.consultMessage.createTime | goodTime}}</span>
                 </p>
               </div>
             </div>
             <div v-else class="patAnswer">
               <div class="docImg" v-if="item.userPat.patAvatar">
                 <img :src="item.userPat.patAvatar" alt="" >
               </div>
               <div class="docImg" v-else>
                 <img src="../../../../../static/img/pat.m.jpg" alt="" v-if="item.userPat.patGender == 'M'">
                 <img src="../../../../../static/img/pat.f.jpg" alt="" v-else>
               </div>
               <div class="docMsg">
                 <p>
                   <span class="mf">{{item.userPat.patName.substr(0,1)}}**</span>
                   <span class="mfc">&nbsp;&nbsp;&nbsp;{{item.userPat.patTitle}}</span>
                 </p>
                 <p>
                   <span class="mfc">{{item.consultMessage.createTime | goodTime}}</span>
                 </p>
               </div>
             </div>
             <div v-if="item.consultMessage.replyContentType=='TEXT'">
                        <span class="bf" >
                            {{item.consultMessage.replyContent}}
                        </span>
             </div>
             <div v-else-if="item.consultMessage.replyContentType=='PIC'">
               <img class="replyImg" :src="item.consultMessage.replyContent" alt="" @click="makeLarge(item.consultMessage.replyContent)">
             </div>
             <div v-else-if="item.consultMessage.replyContentType=='AUDIO'">
               <span> </span>
               <audio controls :src="item.consultMessage.replyContent"></audio>
             </div>
           </div>
         </div>
       </scroll>
       <div class="bottom" ref="footer">
          <div class="leftBottom border-1px-right" v-if="detailInfo.consultInfo">
            <span class="money">看过&nbsp; <span v-if="detailInfo.consultInfo.readCount">{{ detailInfo.consultInfo.readCount }}</span>
              <span v-else>0</span>
            |
            &nbsp;
            <img src="../../../../../static/img/zan.png" alt="" v-if="detailInfo.praiseRecord">
            <img src="../../../../../static/img/zan_off.png" alt="" v-else  @click="upvote(detailInfo)">&nbsp;
             <span v-if="detailInfo.consultInfo.praiseCount">{{ detailInfo.consultInfo.praiseCount }}</span>
              <span v-else>0</span>
            </span>
          </div>
          <div class="rightBottom" @click="goDocCard(detailInfo.userDocVo.id)">
                问这个医生
          </div>
       </div>
        <div class="largePic" v-if="showLargePic" @click="makeSmall">
          <img :src="largePicUrl" alt="">
        </div>
    </div>
</template>
<script>
  import http from '../../../../lib/http'
  import {tokenCache} from '../../../../lib/cache'
  import Scroll from '../../../../base/scroll.vue'
//  import {mainHeightMixin} from '../../../../lib/mixin'
  import {Getdate,goodTime} from '../../../../lib/filter'
  export default{
      data(){
          return{
            consultId:"",
            detailInfo:"",
            largePicUrl:"",
            showLargePic:false,
            arr:[]
          }
      },

      filters:{
        Getdate,
        goodTime
      },
      components:{
        Scroll
      },
      created(){
          this.consultId = this.$route.query.id
          console.log(this.consultId)
          this.getInitChat()
          this.getConsultDetail()
      },
      methods:{
        getConsultDetail(){
          http("smarthos.consult.details",{
            token:tokenCache.get(),
            consultId:this.consultId
          }).then((data)=>{
            if(data.code == 0){
              console.log(data,333)
              this.detailInfo = data.obj
//                this.arr =  data.obj.consultMessage
            }else{
              weui.alert(data.msg)
            }

          })
        },
        getInitChat(){
             http("smarthos.consult.message.list.page",{
                  token:localStorage.getItem('token'),
                  consultId:this.consultId
             }).then((data)=>{
                 if(data.code == 0){
                   this.arr =  data.list
                 }else{
                     weui.alert(data.msg)
                 }
                 console.log(data,444)
             })
        },
        upvote(detailInfo){
          console.log(detailInfo)
          http("smarthos.consult.praise",{
            token:localStorage.getItem('token'),
            consultId:detailInfo.consultInfo.id
          }).then((data)=>{
            if(data.code == 0){
              this.getConsultDetail()
              weui.alert("点赞成功")
            }else{
              weui.alert(data.msg)
            }
            console.log(data)
          })
        },
        goDocCard(id){
          console.log(id,88888)
          this.$router.push('/docCard/'+id)
        },
        makeLarge(url){
          this.showLargePic= true
          this.largePicUrl = url
       },
        makeSmall(){
          this.showLargePic= false
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common';
   .wrapPick{
     width:100%;
     /*overflow: auto;*/
     /*background-color: #FFFFFF;*/
     .largePic{
       position: absolute;
       top:0;
       bottom:0;
       left:0;
       right:0;
       display: flex;
       align-items: center;
       justify-content: center;
       img{
         width:100%;
       }
     }
     .replyImg{
       width: 150px;
       height: 150px;
       margin: 10px;
     }
     .relateList{
       position: fixed;
       top:0px;
       bottom:100px;
       left:0;
       right:0;
       background-color: #FFFFFF;
       overflow: hidden;
       div{
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
         .topIllName{
           width: 690px;
           margin:0 auto;
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
                   /*display: -webkit-box;*/
                   /*-webkit-box-orient: vertical;*/
                   /*-webkit-line-clamp: 2;*/
                   /*overflow: hidden;*/
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
         .answerList{
           padding: 20px;
           box-sizing: border-box;
           background: white;
           border-bottom: 1px solid gainsboro;
           margin-top: 10px;
           .patAnswer{
             display: flex;
             align-items: center;

           }
           .docImg{
             img{
               display: inline-block;
               width: 80px;
               height: 80px;
               border-radius: 40px;
               margin: 0 20px 0 0;

             }
           }
           .patMusic{
             position: relative;
             margin-left: 80px;
             margin-top: 20px;
             width: 400px;
             height: 80px;
             img{
               display: inline-block;
               width: 400px;
               height: 80px;
             }
           }
           #music{
             display: none;
           }
           .musicDate{
             color: white;
             position: absolute;
             top:0;
             right: 30px;
             height: 80px;
             line-height: 80px;
           }
           .musicImg{
             position: absolute;
             top:12px;
             left: 30px;
             height: 80px;
             line-height: 80px;
             img{
               height: 48px;
               width: 40px;
             }
           }
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
