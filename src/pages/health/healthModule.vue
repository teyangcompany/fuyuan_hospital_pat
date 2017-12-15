<template>
  <div class="healthIndex">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="menu" ref="menu">
      <ul ref="wrapWidth" class="border-1px">
        <li class=" arrangeTime" :class="{picked:selected == index}"  v-for="(item,index) in infoTitle" @click="selectTitle(index)">
          <p>{{item.moduleName}}</p>
        </li>
      </ul>
    </div>
    <div class="wrapList">
      <div v-for="item in healthList"  class="healthList border-1px"  :key="item.id" @click="goDetail(item)">
        <div>
          <div class="imgWrap">
            <img :src="item.titleCoverImg" alt="">
          </div>
          <div>
            <p>{{ item.title }}</p>
            <p>{{ item.sourceName }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--<nav-bar :tagNames="onlineNames" ></nav-bar>-->
  </div>
</template>
<script>
  import header from '../../base/header'
//  import navBar from '../../base/navBar'
  import BScroll from 'better-scroll'
  import http from '../../lib/http'
  export default{
    data(){
      return{
        title:'健康资讯',
        rightTitle:'',
        tellPath:"",
        infoTitle:"",
        selected:0,
        healthList:""
      }
    },
    methods:{
      _initTitleScroll(){
        let itemWidth = 170
        let margin = 0
        let width = (itemWidth + margin)*4 - margin
        this.$refs.wrapWidth.style.width = width + 'px'
        this.$nextTick(()=>{
          this.titleScroll = new BScroll(this.$refs.menu,{
            scrollX:true,
            eventPassthrough: 'vertical'
          })
        })
      },
      goDetail(item){
        this.$router.push({
          path:"/healthInfoDetail",
          query:{newId:item.id,title:item.title}
        })
        console.log(item)
      },
      selectTitle(index){
        console.log(index)
        this.selected = index
        this.titleScroll.scrollTo(-60*index,0,1000)
        console.log(this.titleScroll)
        http("smarthos.information.news.page",{
          moduleId:this.infoTitle[this.selected].id,
          pageSize:1000
        }).then((data)=>{
          this.healthList = data.list
          console.log(data)
        })
      }
    },
    created(){
      http("smarthos.information.news.module.list",{
      }).then((data)=>{
        if(data.code == 0){
          this.infoTitle = data.list
          console.log(this.infoTitle)
          http("smarthos.information.news.page",{
            moduleId:this.infoTitle[this.selected].id,
            pageSize:1000
          }).then((data)=>{
              console.log(data)
            this.healthList = data.list
          })
        }
      })
    },
    mounted(){
      this.$nextTick(()=>{
        this.tellPath = this.$route.path
      })
    },
    components:{
      'VHeader':header,
//      navBar
    },
    watch:{
      "$route":function(){
        this.tellPath = this.$route.path
      },
      infoTitle(){
        this.$nextTick(()=>{
          this._initTitleScroll()
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common';
  .healthIndex{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:white;
    .menu{
      position: fixed;
      left:0;
      right:0;
      top: 100px;
      z-index:100;
      ul{
        width:100%;
        display: flex;
        height: 80px;
        background-color:white;
        li{
          list-style-type: none;
          flex:1;
          font-size: 32px;
          text-align: center;
          height: 80px;
          p{
            height: 80px;
            font-size: 32px;
            color: #333333;
            line-height: 80px;
          }
        }
        li.picked{
          p{
            border-bottom: 4px solid $mainColor;
            background-color:$bgColor;
          }
        }
      }
    }
    .wrapList{
      position: fixed;
      top: 180px;
      left:0;
      right:0;
      bottom:0;
      .healthList{
        width:100%;
        >div{
          width: 690px;
          height: 180px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          >div{
            height:135px;
            img{
              width:180px;
              height:135px;
              margin-right: 32px;
            }
            p:nth-child(1){
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              font-size: 32px;
              font-family: PingFang-SC-Regular;
              color: #333333;
              line-height: 46px;
              word-break: break-all;
            }
            p:nth-child(2){
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              font-size: 28px;
              color: #999999;
              line-height: 46px;
              word-break: break-all;
            }
          }
          .imgWrap{
            height:135px;
            width:200px;
          }
        }
      }
    }
  }
</style>
