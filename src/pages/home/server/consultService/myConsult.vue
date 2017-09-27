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
            <span v-if="sortPick == ''">全部问诊</span>
            <span v-else>{{ sortPick }}</span>
          </div>
        </div>
        <div class="tab-item">
          <div class="tab_item_container" @click="chooseType('displayType')">
            <div class="tab_item_border">
              <span>全部状态</span>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapMy">
        <ul class="border-1px">
          <li >
            <div>
              <span class="picConsult">团队咨询 <span>¥50</span></span>
              <span class="consultTim">待付款</span>
            </div>
            <div class="mainContent">
              <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
              <div @click="makeLarge()">
                <img src="" alt="">

              </div>
            </div>
            <div class="ConsultRelate">

              <span class="name"><span class="number">华立</span><span>回答</span>  </span>
              <span class="money">1小时前创建 | 3条回复</span>
            </div>
          </li>
        </ul>
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
//        var top = document.getElementsByClassName('listP')
//        var toggle = document.getElementsByClassName('toggle')
//        var lastIndex = 0;
//        for(var i=0; i<top.length;i++){
//          top[i].index = i
//          top[i].onclick = function(){
//            top[lastIndex].style.borderBottom = ''
//            this.style.borderBottom = '2px solid blue'
//            toggle[lastIndex].style.display = 'none'
//            toggle[this.index].style.display = 'block'
//            lastIndex = this.index;
//          }
//        }
//      })
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
