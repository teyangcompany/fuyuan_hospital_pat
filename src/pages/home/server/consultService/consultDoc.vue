<template>
  <div>
    <!--<div class="topNav">-->
      <!--<p class="listP" style="border-bottom: 2px solid blue">找医生</p>-->
      <!--<p class="listP">精选</p>-->
      <!--<router-link tag="p" to="/my/home/server/consultService/myConsult" class="listP">我的</router-link>-->
    <!--</div>-->
    <div class="toggle" style="display: block;">
      <div class="searchArea">
        <div class="inputWrap">
          <input type="text" placeholder="搜索医院、科室、医生、疾病">
        </div>
        <img src="../../../../../static/img/big.png" alt="">
      </div>
      <div class="tab border-1px">
        <div class="tab-item">
          <div class="tab_item_container" @click="chooseType('displaySort')">
            <span v-if="sortPick == ''">全部科室</span>
            <span v-else>{{ sortPick }}</span>
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
      <transition name="showcover">
        <div class="back_cover" v-show="sortBy" @click="hideCover"></div>
      </transition>
      <div class="teamList">
        <ul class="border-1px" v-for="item in followList">
          <div @click="goDocCard(item.id)">
            <li class="teamLi">
              <div class="cancelImg" v-if="item.docAvatar">
                <img :src="item.docAvatar" alt="">
              </div>
              <div class="cancelImg" v-else>
                <img src="../../../../../static/img/man.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <p><span><span class="followName">{{ item.docName }}</span> <span class="myDoctor">团队成员</span></span><span class="commentValue">{{ item.docScoure }}分</span> </p>
                  <p>{{ item.deptName }} {{ item.docTitle }}</p>
                  <p>{{ item.hosName }}</p>
                </div>
              </div>
            </li>
            <li class="goodAt">
              <section>
                <p>擅长：{{ item.docSkill }}</p>
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
          </div>
        </ul>
      </div>
      <div class="directConsult border-1px-top" @click="goOffice">
        <p>直接咨询科室</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import http from '../../../../lib/http'
  export default{
    data(){
      return{
        sortBy:'',
        followList:[],
        parentLevel:"",
        childDetail:null,
        clickIndex:0,
        arrow:[],
        deptId:"",
        sortPick:"",
        allRoom:[
          {
            deptName:"全部科室",
          }
        ],
      }
    },
    created(){
         http("smarthos.user.doc.search",{
         }).then((data)=>{
           console.log(data,66666)
             if(data.code == 0){
                 this.followList = data.userDocList
             }else{
                 weui.alert(data.msg)
             }
         })
         http("smarthos.system.stddeptgb.list",{
           hasDept:true,
           hasDoc:true,
           deptLevel:2
         }).then((data)=>{
             if(data.code == 0){
               this.parentLevel = data.obj
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
             console.log(this.parentLevel)
         })
    },
    mounted(){
//           this.$nextTick(() => {
//             this._initScroll();
//           });
//      this.$nextTick(()=>{
//          var top = document.getElementsByClassName('listP')
//          var toggle = document.getElementsByClassName('toggle')
//          var lastIndex = 0;
//          for(var i=0; i<top.length;i++){
//            top[i].index = i
//            top[i].onclick = function(){
//                top[lastIndex].style.borderBottom = ''
//                this.style.borderBottom = '2px solid blue'
//                toggle[lastIndex].style.display = 'none'
//                toggle[this.index].style.display = 'block'
//                lastIndex = this.index;
//            }
//          }
//      })
    },
    methods:{
//           _initScroll(){
//             this.doctorScroll = new BScroll(this.$refs.doctor,{
//               click:true
//             })
//           },
      goOffice(){
        this.$router.push('/officeConsult')
      },
      goDocCard(id){
        console.log(id,88888)
        this.$router.push('/docCard/'+id)
      },
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
      },
      selectParent(item,index){
        this.clickIndex = index
        this.childDetail = this.parentLevel[this.clickIndex].subDeptList
          console.log(item)
        if(this.arrow[index] == 0){
            this.deptId = item.deptCode
            this.sortPick = item.deptName
            this.sortBy = ''
            http("smarthos.user.doc.search",{
              deptId:this.deptId
            }).then((data)=>{
                console.log(data)
              if(data.code == 0){
                this.followList = data.userDocList
              }else{
                  weui.alert(data.msg)
              }
            })
        }
      },
      selectChild(index,item){
        this.deptId = item.deptCode
        this.sortPick = item.deptName
          http("smarthos.user.doc.search",{
            deptId:this.deptId
          }).then((data)=>{
            if(data.code == 0){
              this.followList = data.userDocList
            }else{
                weui.alert(data.msg)
            }
//            console.log(data)
          })
      }
    },
    watch:{
      childDetail(){
          this.$nextTick(()=>{
              setTimeout(()=>{
                this._initWrapContent()
              },20)
          })
      },
      sortPick(){
        this.sortBy = ''
      },
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common.scss';
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
    /*display: none;*/
    .wrapMy{
        position: absolute;
        top:180px;
        left:0;
        right:0;
        bottom:0;
        overflow: auto;
      ul {
        /*margin-top: 10px;*/
        /*padding-bottom: 5px;*/
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
              font-size: 32px;
              color: gray;
            }
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
              }
            }
            p {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              font-size: 28px;
              color: gray;
              padding-top: 5px;
              /*background-color: #E64340;*/
            }
          }
          div.ConsultRelate {
            margin-top: 5px;
            span.name {
              font-size: 28px;
              color: gray;
              .circle {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-color: red;
                border-radius: 50%;
              }
            }
            span.money {
              font-size: 28px;
              color: #999999;
            }
          }
        }
        li:nth-child(1){
          padding-top: 5px;
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
