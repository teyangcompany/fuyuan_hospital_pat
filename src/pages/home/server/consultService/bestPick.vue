<template>
  <div>
    <!--<div class="topNav">-->
    <!--<p class="listP" style="border-bottom: 2px solid blue">找医生</p>-->
    <!--<p class="listP">精选</p>-->
    <!--<router-link tag="p" to="/my/home/server/consultService/myConsult" class="listP">我的</router-link>-->
    <!--</div>-->
    <div class="toggle">
      <div class="tab border-1px myTab">
        <div class="tab-item" :class="{choose_type:sortBy == 'displaySort'}">
          <div class="tab_item_container" @click="chooseType('displaySort')">
            <span v-if="sortPick == ''">全部科室
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
            <span  v-else>{{ sortPick }}
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
          </span>
          </div>
        </div>
        <div class="tab-item" :class="{choose_type:sortBy == 'displayType'}">
          <div class="tab_item_container">
            <div class="tab_item_border">
              <span @click="chooseType('displayType')" v-if="typePick == ''">全部病种
                <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                  <polygon points="0,3 10,3 5,8"/>
                </svg>
              </span>
              <span @click="chooseType('displayType')" v-else>{{ typePick }}
                <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                  <polygon points="0,3 10,3 5,8"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div class="tab-item" :class="{choose_type:sortBy == 'displayDefault'}">
          <div class="tab_item_container">
            <div class="tab_item_border">
              <span @click="chooseType('displayDefault')" v-if="defaultPick == ''">默认排序
                <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                  <polygon points="0,3 10,3 5,8"/>
                </svg>
              </span>
              <span @click="chooseType('displayDefault')" v-else>{{ defaultPick }}
                <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                  <polygon points="0,3 10,3 5,8"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <transition name="showlist">
        <div class="dropType allRoom" v-show="sortBy == 'displaySort'" >
          <div class="wrapWhole" >
            <div class="wrapMenu" ref="wrapMenu">
              <ul>
                <li v-for="(item,index) in parentLevel" @click="selectParent(item,index)" :class="{category_active:clickIndex == index}">
                  <span> {{ item.deptName }}</span>
                  <img v-if="arrow[index] == '1'" src="../../../../../static/img/icon/arrow-right-grow.png" alt="">
                </li>
              </ul>
            </div>
            <div class="wrapContent" ref="wrapContent">
              <ul>
                <div class="weui-cells weui-cells_radio weuiMargin" >
                  <label class="weui-cell weui-check__label"  v-for="(item,index) in childDetail" @touchend="selectChild(index,item)">
                    <div class="weui-cell__bd">
                      <p>{{ item.deptName }}</p>
                    </div>
                    <div class="weui-cell__ft">
                      <input type="radio" class="weui-check" name="radio1"  :value="item.deptName " v-model="sortPick"/>
                      <span class="weui-icon-checked"></span>
                    </div>
                  </label>
                </div>
                <!--<li v-for="item in childDetail">{{ item.deptName }}</li>-->
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="showlist">
        <div class="dropType allIllName" v-show="sortBy == 'displayType'">
          <div ref="allIll" class="illWhole">
              <ul >
                <div class="weui-cells weui-cells_radio weuiMargin">
                  <label class="weui-cell weui-check__label">
                    <div class="weui-cell__bd">
                      <p>全部病种</p>
                    </div>
                    <div class="weui-cell__ft">
                      <input type="radio" class="weui-check" name="radio3"  value="" v-model="typePick"/>
                      <span class="weui-icon-checked"></span>
                    </div>
                  </label>
                  <label class="weui-cell weui-check__label" v-for="item in illNameList" v-if="illNameList.length != 0">
                    <div class="weui-cell__bd">
                      <p v-if="item.illnessName" class="illNameList">{{item.illnessName}}</p>
                    </div>
                    <div class="weui-cell__ft">
                      <input type="radio" name="radio3" class="weui-check"  :value="item.illnessName" v-model="typePick"/>
                      <span class="weui-icon-checked"></span>
                    </div>
                  </label>
                </div>
              </ul>
          </div>
        </div>
      </transition>
      <transition name="showlist">
        <div class="dropType" v-show="sortBy == 'displayDefault'">
          <ul >
            <!--<li>默认排序</li>-->
            <!--<li>按好评排</li>-->
            <div class="weui-cells weui-cells_radio weuiMargin">
              <label class="weui-cell weui-check__label" for="x41">
                <div class="weui-cell__bd">
                  <p>默认排序</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" class="weui-check" name="radio4" id="x41" value="默认排序" v-model="defaultPick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x42">
                <div class="weui-cell__bd">
                  <p>按点赞排序</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio4" class="weui-check" id="x42" value="按点赞排序" v-model="defaultPick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x43">
                <div class="weui-cell__bd">
                  <p>按浏览次数排序</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio4" class="weui-check" id="x43" value="按浏览次数排序" v-model="defaultPick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <!--<label class="weui-cell weui-check__label" for="x44">-->
                <!--<div class="weui-cell__bd">-->
                  <!--<p>按职称排序</p>-->
                <!--</div>-->
                <!--<div class="weui-cell__ft">-->
                  <!--<input type="radio" name="radio4" class="weui-check" id="x44" value="按职称排序" v-model="defaultPick"/>-->
                  <!--<span class="weui-icon-checked"></span>-->
                <!--</div>-->
              <!--</label>-->
            </div>
          </ul>
        </div>
      </transition>
      <transition name="showcover">
        <div class="back_cover" v-show="sortBy" @click="hideCover"></div>
      </transition>
      <scroll class="wrapMy" :data="aboutConsult" :pullup="pullup"  @scrollToEnd="scrollToEnd()">
        <div>
          <ul class="border-1px" v-for="(item,index) in aboutConsult" :key="item.id">
            <li >
              <router-link tag="div" :to="{path:'/bestPickDetail',query:{id:item.consultInfo.id}}" class="border-1px-dashed dashedPlace">
                <p class="picConsult" ><span v-if="item.userDocVo">{{ item.userDocVo.deptName }}</span> <span>{{ item.consultInfo.illnessName }}</span></p>
              </router-link>
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
                  <img src="../../../../../static/img/zan.png" alt=""  v-if="item.praiseRecord">
                  <img src="../../../../../static/img/zan_off.png" alt="" @click="upvote(item)" v-else>
                  &nbsp;
                  <!--<img src="../../../../../static/img/zan.png" alt="">-->
                  <span v-if="item.consultInfo.praiseCount">
                    <span>{{ item.consultInfo.praiseCount }}</span>
                  </span>
                  <span v-else>
                    <span>{{ clickLikes }}</span>
                  </span>
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
  import {tokenCache} from '../../../../lib/cache'
  import {Getdate} from '../../../../lib/filter'
  export default{
    data(){
      return{
        aboutConsult:[],
        pullup:true,
        loadingStatus:true,
        listPage:1,
        createTime:"",
        praiseStatus:false,
        clickLikes:0,
        parentLevel:"",
        childDetail:null,
        arrow:[],
        sortBy:'',
        typePick:"",
        sortPick:"",
        defaultPick:"",
        sortName:"",
        clickIndex:0,
        illNameList:[],
        allRoom:[
          {
            deptName:"全部科室",
          }
        ],
      }
    },
    filters:{
      Getdate
    },
    created(){
      http("smarthos.consult.all.list.page",{
//        token:localStorage.getItem('token'),
        token:localStorage.getItem('token'),
//        token:"OPENID_PAT_oDrfHwrOF-p6DYrFhoeBiOKwKBlw",
        isChoice:true,
        stdDeptId:this.deptId == '' ? null : this.deptId,
        illnessName:this.typePick == '' ? null : this.typePick,
        sort:this.sortName == '' ? null : this.sortName,
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
//      ***********************************************************************************
      http("smarthos.system.choice.stddept.list",{
        hasDept:true,
        hasDoc:true,
        deptLevel:2
      }).then((data)=>{
        if(data.code == 0){
          console.log(data,9999)
          this.parentLevel = data.list
          this.parentLevel = this.allRoom.concat(this.parentLevel)
          this.childDetail = this.parentLevel[this.clickIndex].subDeptList
          this.parentLevel.forEach(item =>{
            if (item.hasOwnProperty("subDeptList")) {
              this.arrow.push('1')
            }else{
              this.arrow.push('0')
            }
          })
        }else{
          weui.alert(data.msg)
        }

      })



    },
    mounted(){
//      this.getDate()
    },
    methods:{
      scrollToEnd(){
        if (this.preventRepeatRequest || this.aboutConsult.length <10) {
          return
        }
        this.loadingStatus = true
        this.preventRepeatRequest = true;
        this.listPage +=1;
        let that = this
        http("smarthos.consult.all.list.page",{
          token:tokenCache.get(),
          isChoice:true,
          stdDeptId:this.deptId == '' ? null : this.deptId,
          illnessName:this.typePick == '' ? null : this.typePick,
          sort:this.sortName == '' ? null : this.sortName,
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
      sort(){
        http("smarthos.consult.all.list.page",{
          token:localStorage.getItem('token'),
          isChoice:true,
          stdDeptId:this.deptId == '' ? null : this.deptId,
          illnessName:this.typePick == '' ? null : this.typePick,
          sort:this.sortName == '' ? null : this.sortName,
          pageSize:10,
          pageNum:1,
        }).then((data)=>{
          console.log(data)
          if(data.code == 0){
            this.aboutConsult = data.list
          }else{
            weui.alert(data.msg)
          }
//            console.log(data)
        })
      },
      upvote(item){
          console.log(item)
          http("smarthos.consult.praise",{
             token:localStorage.getItem('token'),
             consultId:item.consultInfo.id
          }).then((data)=>{
              if(data.code == 0){
                  this.sort()
                weui.alert("点赞成功")
//                  if(item.consultInfo.hasOwnProperty('praiseCount')){
//                      this.clickLikes = parseInt(item.consultInfo.praiseCount) + 1
//                  }else{
//                    this.clickLikes += 1
//                  }
              }else{
                  weui.alert(data.msg)
              }
              console.log(data)
          })
      },
      _initWrapMenu(){
//        if(this.displaySort == true){
          this.wrapWholeScroll = new BScroll(this.$refs.wrapMenu,{
            click:true
          })
          console.log(this.wrapWholeScroll)
//        }else{
//          return
//        }
      },
      _initWrapContent(){
//        if(this.displaySort == true){
          this.wrapWholeScroll = new BScroll(this.$refs.wrapContent,{
            click:true
          })
//        }else{
//          return
//        }
      },
      illWrap(){
//          if(this.displayType == true){
            this.$nextTick(()=>{
              setTimeout(()=>{
                this.illScroll = new BScroll(this.$refs.allIll,{
                  click:true
                })
                console.log(this.illScroll)
              },200)
            })
//          }
      },
      hideCover(){
        this.sortBy = ''
      },
      chooseType(type){
        if(this.sortBy !== type){
          this.sortBy = type
          if(type == 'displaySort'){
            this.$nextTick(() => {
              this._initWrapMenu()
              this._initWrapContent()
            });
          }else if(type == 'displayType'){
//              if(this.illNameList.length == 0){
//                  weui.alert("无可选疾病")
//              }
          }
        }else{
          this.sortBy = ''
        }
      },
      selectParent(item,index){
        this.clickIndex = index
        this.childDetail = this.parentLevel[this.clickIndex].subDeptList
        console.log(item,123456)
        console.log(index,123456)
        console.log(this.arrow[0],123456)
        console.log(item.id,56789)
        if(this.arrow[index] == 0){
          this.deptId = item.id
          this.sortPick = item.deptName
          this.sortBy = ''

          http("smarthos.consult.choice.illness",{
            stdDeptId:this.deptId
          }).then((data)=>{
            this.illNameList = data.list
            console.log(data)
          })
        }
      },
      selectChild(index,item){
        console.log(item)
        this.deptId = item.id
        console.log(this.deptId)
        this.sortPick = item.deptName
        http("smarthos.consult.choice.illness",{
          stdDeptId:this.deptId
        }).then((data)=>{
            if(data.code == 0){
//              this._initWrapMenu()
              this.illNameList = data.list
              this.sort()
            }else{
              weui.alert(data.msg)
            }
            console.log(data)
        })
      }
    },
    components:{
      Scroll
    },
    watch:{
      childDetail(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initWrapContent()
          },20)
        })
      },
      typePick(){
        this.sortBy = ''
//        this.illWrap()
        this.sort()
      },
      illNameList(){

      },
      defaultPick(){
        this.sortBy = ''
           if(this.defaultPick == '默认排序'){
               this.sortName = ""
               this.sort()
           }else if(this.defaultPick == '按点赞排序'){
               this.sortName = "PRAISE_COUNT.DESC"
               this.sort()
           }else if(this.defaultPick == '按浏览次数排序'){
               this.sortName = "READ_COUNT.DESC"
               this.sort()
           }
      },
      sortPick(){
        this.sortBy = ''
        this.sort()
      },
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
              margin-top: 5px;
              span{
                border:1px solid #29AB91;/*no*/
                padding:5px 10px 5px 10px;
                border-radius: 6px;
                color: #29AB91;
                margin-top: 5px;
                line-height: 65px;
              }
            }
            span.consultTim {
              font-size: 28px;
              color: #F07818;
            }
          }
          .dashedPlace{
            margin-top: 5px;
            padding-bottom: 20px;
          }
          div.mainContent {
            min-height: 150px;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            >div{
              margin-top: 20px;
              margin-bottom: 20px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              word-break: break-all;
              img{
                width: 22.5%;
                height: 130px;
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
          font-size: 24px;
          img{
            width: 40px;
            height: 40px;
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
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 32px;
        color: rgb(77,85,93);
      }
    }
    .tab-item:last-child{
      border-right: none;
    }
    .sort_icon{
    fill:#666;
    }
    .choose_type{
      span{
        color: $mainColor;
      }
      .sort_icon{
        transform: rotate(180deg);
        transition: 0.3s;
        fill:$mainColor;
      }
    }
  }
  .myTab{
    top:90px;
  }
  .dropType{
    position: fixed;
    z-index:70;
    top: 170px;
    width:100%;
    text-align: center;
    /*background-color: #0BB20C;*/
    background-color: white;
    .weuiMargin{
      margin: 0;
      p{
        font-size: 32px;
        height: 70px;
        line-height: 70px;
        color: #333333;
      }
    }
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
        background-color:#f5f5f5;
        .category_active{
          background-color: white!important;
          span{
            color:$mainColor;
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
  .allIllName{
      height: 300px;
      overflow: auto;
      .illWhole{
        height: 300px;
        overflow: auto;
        .illNameList{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
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
