<template>
     <div>
        <div class="topNav">
          <p>找医生</p>
          <p>精选</p>
          <p>我的</p>
        </div>
        <div class="searchArea">
           <div class="inputWrap">
             <input type="text" placeholder="搜索医院、科室、医生、疾病">
           </div>
          <img src="../../../../../static/img/放大镜.png" alt="">
        </div>
       <div class="tab border-1px">
         <div class="tab-item">
           <div class="tab_item_container" @click="chooseType('displaySort')">
             <span>全部科室</span>
           </div>
         </div>
         <div class="tab-item">
           <div class="tab_item_container" @click="chooseType('displayType')">
             <div class="tab_item_border">
               <span>全部问诊形式</span>
             </div>
           </div>
         </div>
         <div  class="tab-item" >
           <div class="tab_item_container" @click="chooseType('displayDefault')">
             <div class="sort_item_border">
               <span>默认排序</span>
             </div>
           </div>
         </div>
       </div>
       <transition name="showlist">
         <div class="dropType allRoom" v-show="sortBy == 'displaySort'" >
           <div class="wrapWhole" >
             <div class="wrapMenu" ref="wrapMenu">
               <ul>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
                 <li>一级科室</li>
               </ul>
             </div>
             <div class="wrapContent" ref="wrapContent">
               <ul>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>
                 <li>xxx科室</li>

               </ul>
             </div>
           </div>
         </div>
       </transition>
       <transition name="showlist">
         <div class="dropType" v-show="sortBy == 'displayType'">
           <ul >
             <li>全部问诊形式</li>
             <li>视频问诊</li>
             <li>图文问诊</li>
           </ul>

         </div>
       </transition>
       <transition name="showlist">
         <div class="dropType" v-show="sortBy == 'displayDefault'">

           <ul >
             <li>默认排序</li>
             <li>按好评排</li>
           </ul>
         </div>
       </transition>
       <div class="teamList">
         <ul class="border-1px" >
           <router-link tag="div" to="/">
             <li class="teamLi">
               <div class="cancelImg">
                 <img src="../../../../../static/img/test.jpg" alt="">
               </div>
               <div class="cancelIntro">
                 <div>
                   <p><span><span class="followName">华立</span> <span class="myDoctor">团队成员</span></span><span class="commentValue">9.5分</span> </p>
                   <p>眼科 主任医生</p>
                   <p>浙江大学附属第二医院</p>
                 </div>
               </div>
             </li>
             <li class="goodAt">
                <section>
                  <p>擅长：ghtrpighsdgljfdshnbigfshf9ohgdfhgfhgdfhgfdhgfdhgfhjgfjhgfjgfjghfjgfhfgdgdfgffffffsadfsadfsafsafsafsafsafsfsafsa</p>
                </section>
                <section>
                  <div>
                    <p>图文120元</p>
                  </div>
                  <div>
                    <p>电话150元</p>
                  </div>
                  <div>
                    <p>视频300元</p>
                  </div>
                  <div>
                    <p>团队50元</p>
                  </div>
                </section>
             </li>
           </router-link>
         </ul>
       </div>
       <div class="directConsult border-1px-top">
            <p>直接咨询科室</p>
       </div>
     </div>
</template>
<script>
  import BScroll from 'better-scroll'
 export default{
        data(){
            return{
              sortBy:'',
              followList:[
                {
                  docAvatar:"http://img.25pp.com/uploadfile/app/icon/20160901/1472663211278834.jpg",
                  docName:"丁聪华",
                  docTitle:"眼科",
                  hosName:"XXX社区服务中心",
                  deptName:"全科"
                }
              ],
            }
        },
         mounted(){
//           this.$nextTick(() => {
//             this._initScroll();
//           });
         },
         methods:{
//           _initScroll(){
//             this.doctorScroll = new BScroll(this.$refs.doctor,{
//               click:true
//             })
//           },
           _initWrapMenu(){
             if(this.displaySort = true){
               this.wrapWholeScroll = new BScroll(this.$refs.wrapMenu,{
                 click:true
               })
             }else{
               return
             }
           },
           _initWrapContent(){
             if(this.displaySort = true){
               this.wrapWholeScroll = new BScroll(this.$refs.wrapContent,{
                 click:true
               })
             }else{
               return
             }
           },
           chooseType(type){
             if(this.sortBy !== type){
               this.sortBy = type
               if(type == 'displaySort'){
                 this.$nextTick(() => {
                   this._initWrapMenu()
                   this._initWrapContent()
                 });
               }
             }else{
               this.sortBy = ''
             }
           },
           hideCover(){
             this.sortBy = ''
           }
         }
 }
</script>
<style scoped lang="scss">
  @import '../../../../common/common';
  .showlist-enter-active,.showlist-leave-active{
    transition: all 0.2s ease-out;
  }
  .showlist-enter,.showlist-leave-active{
    transform: translateY(-100%)
  }
.topNav{
  width:100%;
  height: 90px;
  display: flex;
  position: relative;
  z-index:100;
  background-color: #ffffff;
  p{
    flex:1;
    height: 90px;
    display: flex;
    font-size: 32px;
    color: #333333;
    align-items: center;
    justify-content: center;
  }
}
  .searchArea{
    width:100%;
    height: 100px;
    position: relative;
    z-index: 100;
    background-color: $bgColor;
    .inputWrap{
      width: 690px;
      margin:0 auto;
      input{
        width: 690px;
        height: 60px;
        font-size: 32px;
        margin-top: 15px;
        margin-bottom: 15px;
        border-radius: 7px;
        text-align: center;
      }
    }
    img{
      position: absolute;
      width: 30px;
      top:110px;
      left: 130px;
    }
  }
  .tab{
    display: flex;
    width:100%;
    height: 80px;
    position: fixed;
    top: 180px;
    z-index:100;
    line-height: 80px;
    background-color: #ffffff;
    .tab-item{
      flex:1;
      text-align: center;
      span{
        display: block;
        font-size: 32px;
        color: rgb(77,85,93);
      }
    }
    .tab-item:last-child{
      border-right: none;
    }
  }
  .dropType{
    position: fixed;
    z-index:70;
    top: 270px;
    width:100%;
    text-align: center;
    /*background-color: #0BB20C;*/
    background-color: rgb(249,249,249);
    li{
      list-style-type: none;
      height: 80px;
      line-height: 80px;
    }
  }
  .allRoom{
    height: 400px;
    overflow: hidden;
    /*background-color: #04BE02;*/
    .wrapWhole{
      display: flex;
      .wrapMenu{
        flex:1;
        height: 400px;
        overflow: hidden;
      }
      .wrapContent{
        flex:2;
        height: 400px;
        overflow: hidden;
      }
    }
  }
  .teamList{
    position: fixed;
    top: 260px;
    bottom:0;
    right:0;
    left:0;
    ul{
      padding:0;
      margin:0;
      /*height: 180px;*/
      background-color: #ffffff;
      /*border-bottom: 1px solid rgb(205,205,205);*/
      .teamLi{
        list-style-type: none;
        height: 180px;
        display: flex;
        .cancelImg{
          width: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cancelIntro{
          flex:2;
          display: flex;
          align-items: center;
          /*line-height: 25px;*/
          >div{
            .followName{
              font-size: 32px;
              color: #333333;
            }
            .myDoctor{
              font-size: 28px;
              color: #999999;
              /*line-height: 18px;*/
              text-align: center;
            }
            p{
              margin:0;
              padding:0;
              color: #999999;
              font-size: 28px;
            }
            p:nth-child(1){
              width: 570px;
              display: flex;
              justify-content: space-between;
              .commentValue{
                padding-right: 30px;
                color: #000;
              }
            }
          }
        }
        img{
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
      .goodAt{
        width: 100%;
        height: 170px;
        margin:0 auto;
        background-color: #ffffff;
        section{
          width: 690px;
          margin:0 auto;
        }
        section:nth-child(1){
           p{
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
             overflow: hidden;
             word-break: break-all;
             font-size: 28px;
             color: #666666;
           }
        }
        section:nth-child(2){
          margin-top: 15px;
          display: flex;
          >div{
            flex:1;
            p{
              width: 160px;
              border:1px solid #999999;
              color: #999999;
              display: flex;
              font-size: 30px;
              border-radius: 7px;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
  .directConsult{
    position: fixed;
    bottom: 0px;
    left:0;
    right:0;
    p{
      width: 100%;
      margin:0 auto;
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      background-color: #ffffff;
    }
  }
</style>
