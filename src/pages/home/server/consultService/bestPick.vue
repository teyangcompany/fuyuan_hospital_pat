<template>
  <div>
    <!--<div class="topNav">-->
    <!--<p class="listP" style="border-bottom: 2px solid blue">找医生</p>-->
    <!--<p class="listP">精选</p>-->
    <!--<router-link tag="p" to="/my/home/server/consultService/myConsult" class="listP">我的</router-link>-->
    <!--</div>-->
    <div class="toggle">
      <div class="tab border-1px myTab">
        <div class="tab-item">
          <div class="tab_item_container" @click="chooseType('displaySort')">
            <span>全部科室</span>
          </div>
        </div>
        <div class="tab-item">
          <div class="tab_item_container" @click="chooseType('displayType')">
            <div class="tab_item_border">
              <span>全部病种</span>
            </div>
          </div>
        </div>
        <div class="tab-item">
          <div class="tab_item_container" @click="chooseType('displayType')">
            <div class="tab_item_border">
              <span>默认排序</span>
            </div>
          </div>
        </div>
      </div>
      <scroll class="wrapMy" :data="aboutConsult" :pullup="pullup"  @scrollToEnd="scrollToEnd()">
        <div>
          <ul class="border-1px" v-for="item in aboutConsult" :key="item.id">
            <li >
              <div class="border-1px-dashed dashedPlace">
                <p class="picConsult" ><span v-if="item.userDocVo">{{ item.userDocVo.deptName }}</span> <span>{{ item.consultInfo.illnessName }}</span></p>
              </div>
              <router-link tag="div" :to="{path:'/bestPickDetail',query:{id:item.consultInfo.id}}" class="mainContent">
                <p>{{ item.consultInfo.consultContent }}</p>
                <div>
                  <img :src="secondItem.attaFileUrl" alt="" v-for="secondItem in item.attaList">
                </div>
              </router-link>
              <div class="ConsultRelate">

                <span class="name"><span class="number"><img :src="item.userDocVo.docAvatar" alt="">{{item.userDocVo.docName}}回答</span></span>
                <span class="money"> <span>看过</span>&nbsp;
                  <span v-if="item.consultInfo.readCount">{{ item.consultInfo.readCount }} </span>
                  <span v-else>0</span>&nbsp;

                  |
                  &nbsp;
                  <img src="../../../../../static/img/zan_off.png" alt="" @click="upvote(item.consultInfo.id)">&nbsp;
                  <span v-if="item.consultInfo.praiseCount">{{ item.consultInfo.praiseCount }}</span>
                  <span v-else>0</span>
                </span>
              </div>
            </li>
          </ul>
          <div class="loadMore" v-if="loadingStatus">
            <span class="pullMore">
               <img src="../../../../../static/img/loading.gif" alt="">
               数据加载中...
            </span>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '../../../../base/scroll'
  import http from '../../../../lib/http'
  import {Getdate} from '../../../../lib/filter'
  export default{
    data(){
      return{
        aboutConsult:[],
        pullup:true,
        loadingStatus:true,
        listPage:1,
      }
    },
    filters:{
      Getdate
    },
    created(){
      http("smarthos.consult.all.list.page",{
        token:localStorage.getItem('token'),
        isChoice:true,
        pageSize:"10",
        pageNum:"1"
      }).then((data)=>{
        this.loadingStatus = false
        if(data.code == 0){
          this.aboutConsult = data.list
        }else{
          weui.alert(data.msg)
        }
        console.log(data)
      })
    },
    mounted(){
//      this.getDate()
    },
    methods:{
      scrollToEnd(){
        if (this.preventRepeatRequest) {
          return
        }
        this.loadingStatus = true
        this.preventRepeatRequest = true;
        this.listPage +=1;
        let that = this
        http("smarthos.consult.all.list.page",{
          token:localStorage.getItem('token'),
          isChoice:true,
          pageNum:that.listPage,
          pageSize:"10"
        }).then((data)=>{
           console.log(data)
          if(data.code == 0){
            for(var i=0;i<data.list.length; i++){
              this.aboutConsult.push(data.list[i])
//              this.createTime.push(formatDate(new Date(data.list[i].createTime)))
            }
            this.loadingStatus = false
            if(data.list.length >= 10){
              this.preventRepeatRequest = false;
            }
          }else if(!(data.msg)){
            this.loadingStatus = false
            weui.alert("网络错误，请稍后重试")
          }else{
            this.loadingStatus = false
            weui.alert(data.msg)
          }
        })
      },
      upvote(id){
          console.log(id)
          http("smarthos.consult.praise",{
             token:localStorage.getItem('token'),
            consultId:id
          }).then((data)=>{
              console.log(data)
          })
      }
    },
    components:{
      Scroll
    },
    watch:{

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
  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }
  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }
  .toggle{
    .wrapMy{
      position: absolute;
      top:170px;
      left:0;
      right:0;
      bottom:0;
      background-color: white;
      overflow: hidden;
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
            p.picConsult {
              font-size: 32px;
              span{
                border:1px dashed #999999;
              }
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
              img{
                width:40px;
                border-radius: 50%;
              }
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
      .loadMore{
        display: flex;
        justify-content: center;
        align-items: center;
        span.pullMore{
          display: flex;
          align-items: center;
          font-size: 12px;
          img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .back_cover{
    position: fixed;
    width:100%;
    height:100%;
    z-index: 3;
    opacity: 0.3;
    background-color: rgb(0,0,0);
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
  .myTab{
    top:90px;
  }
  .dropType{
    position: fixed;
    z-index:70;
    top: 260px;
    width:100%;
    text-align: center;
    /*background-color: #0BB20C;*/
    background-color: white;
    li{
      list-style-type: none;
      height: 80px;
      line-height: 80px;
    }
  }
  .allRoom{
    height: 800px;
    overflow: hidden;
    /*background-color: #04BE02;*/
    .wrapWhole{
      display: flex;
      .wrapMenu{
        flex:1;
        height: 800px;
        overflow: hidden;
        background-color:#F0F5F5 ;
        .category_active{
          background-color: white!important;
          span{
            color:#2AB6B3 ;
          }
        }
        ul{
          li{
            list-style-type: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              padding-left:30px;
              font-size: 32px;
              color: #333333;
            }
            img{
              width: 16px;
              height:24px;
            }
          }
        }
      }
      .wrapContent{
        flex:2;
        height: 500px;
        overflow: hidden;
        text-align: left;
        .weuiMargin{
          margin-top:0;
          p{
            height:70px;
            color: #333333;
            font-size: 30px;
            line-height: 70px;
            padding-left: 30px;
          }
        }
      }
    }
  }
  .teamList{
    position: fixed;
    top: 260px;
    bottom:0;
    right:0;
    left:0;
    overflow: auto;
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
