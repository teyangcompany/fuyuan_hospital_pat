<template>
  <div>
    <div class="toggle" style="display: block;">
      <div class="searchArea">
        <div class="inputWrap">
          <input type="text" @focus="focus()" @blur="blur()" ref="inputContent" v-model="searchContent" placeholder="搜索医院、科室、医生、疾病">
          <button @click="searchList">搜索</button>
        </div>
        <img src="../../../../../static/img/big.png" alt="" ref="searchIcon">
      </div>
      <div class="tab border-1px">
        <div class="tab-item" :class="{choose_type:sortBy == 'displaySort'}">
          <div class="tab_item_container" @click="chooseType('displaySort')">
            <span v-if="sortPick == ''">全部科室
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
            <span v-else>{{ sortPick }}
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="tab-item" :class="{choose_type:sortBy == 'displayType'}">
          <div class="tab_item_container" @click="chooseType('displayType')">
            <div class="tab_item_border">
              <!--<span>全部问诊形式</span>-->
              <span v-if="typePick == ''">全部问诊形式
                  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                    <polygon points="0,3 10,3 5,8"/>
                  </svg>
              </span>
              <span v-else>{{ sortName }}
                  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                    <polygon points="0,3 10,3 5,8"/>
                  </svg>
              </span>
            </div>
          </div>
        </div>
        <div  class="tab-item" :class="{choose_type:sortBy == 'displayDefault'}">
          <div class="tab_item_container" @click="chooseType('displayDefault')">
            <div class="sort_item_border">
              <!--<span>默认排序</span>-->
              <span v-if="defaultPick == ''">默认排序
                  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                    <polygon points="0,3 10,3 5,8"/>
                  </svg>
              </span>
              <span v-else>{{ defaultPick }}
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
        <div class="dropType" v-show="sortBy == 'displayType'">
          <ul >
            <div class="weui-cells weui-cells_radio weuiMargin">
              <label class="weui-cell weui-check__label" for="x31">
                <div class="weui-cell__bd">
                  <p>全部问诊形式</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" class="weui-check" name="radio3" id="x31" value="" v-model="typePick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x32">
                <div class="weui-cell__bd">
                  <p>图文问诊</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio3" class="weui-check" id="x32" value="CONSULT_PIC" v-model="typePick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x33">
                <div class="weui-cell__bd">
                  <p>电话问诊</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio3" class="weui-check" id="x33" value="CONSULT_PHONE" v-model="typePick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x34">
                <div class="weui-cell__bd">
                  <p>视频问诊</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio3" class="weui-check" id="x34" value="CONSULT_VIDEO" v-model="typePick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <!--<label class="weui-cell weui-check__label" for="x35">-->
                <!--<div class="weui-cell__bd">-->
                  <!--<p>团队问诊</p>-->
                <!--</div>-->
                <!--<div class="weui-cell__ft">-->
                  <!--<input type="radio" name="radio3" class="weui-check" id="x35" value="团队问诊" v-model="typePick"/>-->
                  <!--<span class="weui-icon-checked"></span>-->
                <!--</div>-->
              <!--</label>-->
            </div>
            <!--<li>全部问诊形式</li>-->
            <!--<li>视频问诊</li>-->
            <!--<li>图文问诊</li>-->
          </ul>

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
                  <p>按好评排序</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio4" class="weui-check" id="x42" value="按好评排序" v-model="defaultPick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x43">
                <div class="weui-cell__bd">
                  <p>按服务次数排序</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio4" class="weui-check" id="x43" value="按服务次数排序" v-model="defaultPick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x44">
                <div class="weui-cell__bd">
                  <p>按职称排序</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio4" class="weui-check" id="x44" value="按职称排序" v-model="defaultPick"/>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
            </div>
          </ul>
        </div>
      </transition>
      <transition name="showcover">
        <div class="back_cover" v-show="sortBy" @click="hideCover"></div>
      </transition>
      <scroll class="teamList" :data="followList" :pullup="pullup"  @scrollToEnd="scrollToEnd()" v-if="followList.length != 0">
        <div >
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
                    <p>
                      <span>
                        <span class="followName">{{ item.docName }}</span>
                        <span class="myDoctor"></span>
                      </span>
                      <span class="commentValue" v-if="item.docScoure">{{ item.docScoure }}分</span>
                      <span class="commentValue" v-else>暂无评价</span>
                    </p>
                    <p>{{ item.deptName }} {{ item.docTitle }}</p>
                    <p>{{ item.hosName }}</p>
                  </div>
                </div>
              </li>
              <li class="goodAt">
                <section>
                  <p>擅长：{{ item.docSkill }}</p>
                </section>
                <section v-if="item.userDocServes">
                  <div v-for="subItem in item.userDocServes">
                    <p >{{ subItem.serveName }}{{ subItem.servePrice | consultPrice }}元</p>
                  </div>
                </section>
              </li>
            </div>
          </ul>
          <div class="loadMore" v-if="loadingStatus">
            <span class="pullMore">
               <img src="../../../../../static/img/loading.gif" alt="">
               数据加载中...
            </span>
          </div>
        </div>
      </scroll>
      <div v-else-if=" isComplete && followList.length == 0" class="emptyHistory">
        <span>暂未搜索到相关结果</span>
      </div>
      <div class="directConsult border-1px-top" @click="goOffice">
        <p> <span>直接咨询科室</span> <span>{{ roomPrice | consultPrice }}元</span></p>
      </div>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Scroll from '../../../../base/scroll'
  import {tokenCache} from '../../../../lib/cache'
  import http from '../../../../lib/http'
  import Toast from '../../../../base/toast.vue'
  import { consultPrice } from '../../../../lib/filter'
  export default{
    data(){
      return{
        sortBy:'',
        typePick:"",
        sortName:"",
        defaultPick:"",
        followList:[],
        parentLevel:"",
        childDetail:null,
        clickIndex:0,
        arrow:[],
        deptId:"",
        sortPick:"",
        loadingStatus:true,
        pullup:true,
        listPage:1,
        preventRepeatRequest:false,
        searchContent:"",
        orderByScore:false,
        orderByNum:false,
        orderByDocTitle:false,
        showToast:false,
        isComplete:false,
        roomPrice:"",
        pages:"",
        allRoom:[
          {
            deptName:"全部科室",
          }
        ],
      }
    },
    filters:{
      consultPrice
    },
    created(){
        this.showToast = true
         http("smarthos.user.doc.search",{
           pageSize:10,
           pageNum:1
         }).then((data)=>{
           this.loadingStatus = false
           this.showToast = false
           this.isComplete = true
           console.log(this.pages,111)
            console.log(data)
             if(data.code == 0){
               this.pages = data.page.pages
                 this.followList = data.list
             }else{
                 weui.alert(data.msg)
             }
         })
         http("smarthos.system.stddept.list",{
           hasDept:true,
           hasDoc:true,
           deptLevel:2
         }).then((data)=>{
             if(data.code == 0){
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
         this.getPrice()
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
      scrollToEnd(){
        this.listPage +=1;
        if (this.followList.length <10 || this.listPage > this.pages ) {
          return
        }
        this.loadingStatus = true
        this.preventRepeatRequest = true;
        let that = this
        http("smarthos.user.doc.search",{
          deptId:this.deptId,
          keyWord:this.searchContent,
          consultType:this.typePick,
          orderByScore:this.orderByScore,
          orderByNum:this.orderByNum,
          orderByDocTitle:this.orderByDocTitle,
          pageNum:that.listPage,
          pageSize:"10"
        }).then((data)=>{
           console.log(data,333)
          if(data.code == 0){

            for(var i=0;i<data.list.length; i++){
              this.followList.push(data.list[i])
//              this.createTime.push(formatDate(new Date(data.list[i].createTime)))
            }
            this.loadingStatus = false
//            if(data.list.length > 10){
//              this.preventRepeatRequest = false;
//            }
          }else if(!(data.msg)){
            this.loadingStatus = false
            weui.alert("网络错误，请稍后重试")
          }else{
            this.loadingStatus = false
            weui.alert(data.msg)
          }
        })
      },
      getPrice(){
           http("smarthos.consult.platform.price",{
               token:localStorage.getItem("token"),
           }).then((data)=>{
               if(data.code == 0){
                   this.roomPrice = data.obj
               }else{
                   weui.alert(data.msg)
               }
           })
      },
      goOffice(){
        this.$router.push({
          path:'/officeConsult',
          query:{roomPrice:this.roomPrice}
        })
      },
      searchList(){
        this.sortBy = ''
        http("smarthos.user.doc.search",{
          deptId:this.deptId,
          keyWord:this.searchContent,
          consultType:this.typePick,
          orderByScore:this.orderByScore,
          orderByNum:this.orderByNum,
          orderByDocTitle:this.orderByDocTitle,
          pageSize:1000,
//          pageNum:1
        }).then((data)=>{
          console.log(data,66666)
          console.log(this.pages,111)
          this.loadingStatus = false
          if(data.code == 0){
            this.pages = data.page.pages
            this.followList = data.list
          }else{
            weui.alert(data.msg)
          }
        })
      },
      focus(){
        this.$refs.inputContent.style.textAlign = 'left'
        this.$refs.searchIcon.style.display = 'none'
      },
      blur(){
        this.$refs.inputContent.style.textAlign = 'center'
        this.$refs.searchIcon.style.display = 'block'
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
            this.deptId = item.id
            this.sortPick = item.deptName
            this.sortBy = ''
            http("smarthos.user.doc.search",{
              deptId:this.deptId,
              keyWord:this.searchContent,
              consultType:this.typePick,
              orderByScore:this.orderByScore,
              orderByNum:this.orderByNum,
              orderByDocTitle:this.orderByDocTitle,
              pageSize:1000,
//              pageNum:1
            }).then((data)=>{
                console.log(data,12121)
              if(data.code == 0){
                this.pages = data.page.pages
                this.followList = data.list
              }else{
                  weui.alert(data.msg)
              }
            })
        }
      },
      selectChild(index,item){
       console.log(item)
        this.deptId = item.id
        console.log(this.deptId)
        this.sortPick = item.deptName
          http("smarthos.user.doc.search",{
            deptId:this.deptId,
            keyWord:this.searchContent,
            consultType:this.typePick,
            orderByScore:this.orderByScore,
            orderByNum:this.orderByNum,
            orderByDocTitle:this.orderByDocTitle,
//            pageSize:10,
//            pageNum:1,
          }).then((data)=>{
           console.log(data,2222)
            if(data.code == 0){
              this.pages = data.page.pages
              this.followList = data.list
            }else{
                weui.alert(data.msg)
            }
//            console.log(data)
          })
      }
    },
    components:{
      Scroll,
      Toast
    },
    watch:{
      searchContent(){
          if(this.searchContent == ''){
            http("smarthos.user.doc.search",{
              pageSize:1000,
//              pageNum:1
            }).then((data)=>{
              console.log(data,66666)
              this.loadingStatus = false
              if(data.code == 0){
                this.pages = data.page.pages
                this.followList = data.list
              }else{
                weui.alert(data.msg)
              }
            })
          }
      },
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
      typePick(){
        this.sortBy = ''
        this.searchList()
        if(this.typePick == 'CONSULT_PHONE'){
           this.sortName = "电话问诊"
        }else if(this.typePick == 'CONSULT_PIC'){
          this.sortName = "图文问诊"
        }else if(this.typePick == 'CONSULT_VIDEO'){
          this.sortName = "视频问诊"
        }else if(this.typePick == ''){
          this.sortName = "全部问诊形式"
        }
      },
      defaultPick(){
        this.sortBy = ''
        if(this.defaultPick == "默认排序"){
          this.orderByScore = false
          this.orderByNum = false
          this.orderByDocTitle = false
          this.searchList()
        }else if(this.defaultPick == "按好评排序"){
              this.orderByScore = true
              this.orderByNum = false
              this.orderByDocTitle = false
              this.searchList()
        }else if(this.defaultPick == "按服务次数排序"){
              this.orderByNum = true
              this.orderByScore = false
              this.orderByDocTitle = false
          this.searchList()
        }else if(this.defaultPick == "按职称排序"){
              this.orderByDocTitle = true
              this.orderByNum = false
              this.orderByScore = false
          this.searchList()
        }
      }
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
      display: flex;
      align-items: center;
      input{
        width: 600px;
        height: 60px;
        font-size: 32px;
        margin-top: 15px;
        margin-bottom: 15px;
        border-radius: 7px;
        text-align: center;
      }
      button{
        border:none;
        outline: medium;
        width:120px;
        height: 60px;
        margin-left: 20px;
        font-size: 28px;
        color: $mainColor;
        background-color: #FFFFFF;
      }
    }
    img{
      position: absolute;
      width: 30px;
      top:30px;
      left: 60px;
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
      .sort_icon{
        transition: 0.3s;
        fill:#666;
      }
    }
    .tab-item:last-child{
      border-right: none;
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
    top: 260px;
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
  .emptyHistory{
    position: absolute;
    top: 0px;
    bottom:90px;
    right:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      font-size: 36px;
    }
  }
  .teamList{
    position: fixed;
    top: 260px;
    bottom:90px;
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
        /*height: 0px;*/
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
          /*display: flex;*/
          width:690px;
          word-wrap: break-word;
          word-break: break-all;
          >div{
            /*flex:1;*/
            /*border:1px solid #999999;*/
            margin-left: 15px;
            margin-bottom: 15px;
            display: inline-block;
            word-wrap: break-word;
            word-break: break-all;
            p{
              /*width: 280px;*/
              border:1px solid #999999;
              color: #999999;
              /*display: flex;*/
              font-size: 30px;
              padding:5px 8px 5px 8px;
              /*border-radius: 7px;*/
              /*align-items: center;*/
              /*justify-content: center;*/
            }
          }
        }
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
