<template>
  <div class="page">
    <div class="wrapper" ref="main">
      <div class="teamImg">
        <div class="myHeader">
          <span class="back" @click="goBack">
              <img src="../../../static/img/back.png" alt="">
          </span>
          <span class="headerImg" @click="share">
             <img src="../../../static/img/share.png" alt="">
             <span class="mfw">
                   分享
             </span>
           </span>
          <span class="headerImg" v-if="!isFollow" @click="attention">
            <img src="../../../static/img/guan.png" alt="">
            <span class="mfw">
            关注  &nbsp;&nbsp;
            </span>
          </span>
          <span class="headerImg" v-else  @click="attention">
            <img src="../../../static/img/爱心2.png" alt="">
            <span class="mfw">
            取消  &nbsp;&nbsp;
            </span>
          </span>
        </div>
        <div class="teamDetail">
          <ul>
            <li class="row">
              <img class="myImg" :src="doc.docAvatar" alt="" v-if="doc.docAvatar">
              <img class="myImg" src="../../../static/img/doctorM.png" alt="" v-else>
            </li>
            <li class="row">
              <span class="mfw">{{doc.docName}}</span>
              <span class="famous" v-show="doc.famous">名医</span>
            </li>
            <li class="row">
                            <span class="mfw">
                                {{doc.hosName}} &nbsp;&nbsp;&nbsp; {{doc.deptName}}&nbsp;&nbsp; {{doc.docTitle}}
                            </span>
            </li>
            <li class="row">
                            <span class="mfw">
                                粉丝&nbsp;&nbsp; {{ doc.fansNum }}&nbsp;&nbsp;&nbsp;&nbsp; 服务&nbsp;&nbsp; {{ doc.serveNum
                              }}
                                &nbsp;&nbsp;&nbsp;&nbsp;评分&nbsp;&nbsp;{{ doc.docScoure }} >
                            </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar">
        <router-link :to="{name:item.router}" class="mfb pub menu"  v-for="(item,index) in bar" :key="item.id">
          <span class="styleline">
               <span > {{item.value}}  </span><img :src="item.value1" alt="" class="hideImg">
          </span>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
    <div ref="footer" class="btn">
      <div @click="book">
        <img src="../../../static/img/预约挂号.png" alt="">
        <p>预约挂号</p>
      </div>
      <div v-for="item in docServeList" @click="showService">
        <img :src="`./static/img/${item.serveName}.png`" alt="">
        <p>{{ item.serveName }}</p>
      </div>
      <!--<div class="mfw registration">-->
        <!--预约挂号-->
      <!--</div>-->
      <!--<div class="mfw onLine" >-->
        <!--在线问诊-->
      <!--</div>-->
      <!--<div class="mfw patient">-->
        <!--<span @click="attention" v-if="!isFollow">关注医生</span>-->
        <!--<span @click="attention" v-else>取消关注</span>-->
      <!--</div>-->
    </div>
    <div class="alertArea" v-if="showAndroid || showIos">
      <img src="../../../static/img/安卓引导.png" alt="" @click="hidePic" v-if="showAndroid">
      <img src="../../../static/img/ios引导.png" alt="" @click="hidePic" v-if="showIos">
    </div>
    <div class="popService" v-if="maskFlag" @click="hideMask">
      <v-mask ></v-mask>
    </div>
    <seivice :docId="docId" ref="ser"></seivice>

    <div v-if="showQrcode" class="ercode">
      <div class="mask" @click.stop="showQrcode=false"></div>
      <div class="mainbox">
        <div class="info flex">
          <div class="ava">
            <img class="myImg" :src="doc.docAvatar" alt="" v-if="doc.docAvatar">
            <img class="myImg" src="../../../static/img/doctorM.png" alt="" v-else></div>
          <div class="text">
            <div class="h3">{{doc.docName}} 名医</div>
            <div class="dept">{{doc.hosName}} &nbsp;&nbsp;&nbsp; {{doc.deptName}}&nbsp;&nbsp; {{doc.docTitle}}</div>
          </div>
        </div>
        <div class="er">
          <img :src="doc.docQrcode" alt="">
        </div>
      </div>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/app-header.vue'
  import seivice from '../../base/seivice.vue'
  import {mainHeightMixin, isBindMixin, jssdkMixin} from '../../lib/mixin'
  import config from '../../lib/config'
  import api from '../../lib/http'
  import Toast from '../../base/toast.vue'
  import mask from '../../base/mask.vue'
  import {debug, getShareLink, getParamsFromUrl} from "../../lib/util"

  export default {
    components: {
      top,
      seivice,
      Toast,
      "VMask":mask
    },
    mixins: [mainHeightMixin, isBindMixin, jssdkMixin],
    data() {
      return {
        bar: config.doc_bar,
        num: 0,
        flag: false,
        docId: "",
        token: localStorage.getItem('token'),
        serveList:[
          {serveName:'电话问诊'},
          {serveName:'视频问诊'},
          {serveName:'图文问诊'},
          {serveName:'团队问诊'},
          {serveName:'预约挂号'},
        ],
        doc: {},
        docServeList: "",
        isFollow: false,
        showQrcode: false,
        showAndroid: false,
        showIos: false,
        docRestNotice: "",
        showToast:false,
        maskFlag:false
      }
    },
    created() {
      this.docId = this.$route.params.id;
      this._isBind().then((res) => {
        if (res === false) {
          fromCache.set(this.$route.fullPath);
          this.$router.push("/login")
        }
      });
    },
    mounted() {

      sessionStorage.setItem('docId', this.$route.params.id);

//            console.log(this.docId,3333)
      this.getData()
      this.getRestInfo()
    },
    methods: {
      __shareInit() {
        let doc = this.doc;
        debug("医生信息", this.doc, getShareLink(location.href));
        let conf = {
          title: doc.docName,
          link: getShareLink(location.href),
          imgUrl: doc.docAvatar, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          },

          desc: doc.docResume, // 分享描述
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        }
        wx.ready(() => {
          wx.onMenuShareTimeline(conf);
          wx.onMenuShareAppMessage(conf);
        })
      },
      hidePic() {
        this.showIos = false
        this.showAndroid = false
      },
      share() {
        let UA = window.navigator.userAgent.toLocaleLowerCase();
        if (/iphone/.test(UA)) {
          window.device = "iphone";
        }
        if (/android/.test(UA)) {
          window.device = "android";
        }
        if (window.device == "iphone") {
          this.showIos = true
        } else {
          this.showAndroid = true
        }

      },
//      share() {
//        this.$router.push({
//          path: "/share"
//        })
//      },
      goBack() {
        this.$router.go(-1)
      },
      book(){
//        let urlParams = getParamsFromUrl(location.href);
//        debug("ppp", urlParams)
//        if (urlParams.query && urlParams.query.comefrom == "share") {
//          this.showQrcode = true
//          return;
//        }
//        this.$router.push({
//             path:"/home/server/book/famousPage",
//             query:{bookDocId:this.doc.id,hosid:'058101',hosName:"义乌復元医院"}
//        })
      },
      attention() {
        let urlParams = getParamsFromUrl(location.href);
        debug("ppp", urlParams)
        if (urlParams.query && urlParams.query.comefrom == "share") {
          this.showQrcode = true
          return;
        }
        if (!(this.isFollow)) {
          api('smarthos.follow.docpat.add', {
            token: this.token,
            docId: this.docId
          }).then(res => {
//                    console.log(res,88888);
            if (res.succ) {
              this.isFollow = true
              weui.toast("关注成功")
            } else {
              weui.alert(res.msg)
            }
          })
        } else {
          api('smarthos.follow.docpat.delete', {
            token: this.token,
            docId: this.docId
          }).then(res => {
//                    console.log(res,88888);
            if (res.succ) {
              this.isFollow = false
              weui.toast("已取消关注")
            } else {
              weui.alert(res.msg)
            }
          })
        }
      },
      getData() {
          this.showToast = true
        api('smarthos.user.doc.card.get', {
          docId: this.docId
        }).then(res => {
          console.log(res,1111)
          this.showToast = false
          if (res.succ) {
            this.doc = res.obj.doc;
            this.docServeList = res.obj.docServeList
            sessionStorage.setItem('docName', res.obj.doc.docName)
            this.$store.commit('increment', res.obj.doc)
            if (res.obj.followDocpat) {
              this.isFollow = true
            }
            this.__shareInit();
          } else {
            if (res.msg == '医患关系不存在') {

            } else {
              alert(res.msg)
            }
          }
        })
      },
      getRestInfo() {
        api('smarthos.user.doc.notice.get', {
          token: this.token,
          docId: this.docId
        }).then(res => {
          console.log(res, 66666);
          if (res.succ) {
            res.obj.docRestNotice ? this.docRestNotice = res.obj.docRestNotice : this.docRestNotice = null
            if(this.docRestNotice && this.docRestNotice.content){
                this.bar[0].value1 = ''
                this.bar[1].value1 = ''
                this.bar[2].value1 = './static/img/stop.png'
               document.getElementsByClassName('hideImg')[0].style.display='none'
              document.getElementsByClassName('hideImg')[1].style.display='none'
              document.getElementsByClassName('hideImg')[2].style.display='block'
            }else{
              this.bar[0].value1 = ''
              this.bar[1].value1 = ''
              this.bar[2].value1 = ''
              document.getElementsByClassName('hideImg')[0].style.display='none'
              document.getElementsByClassName('hideImg')[1].style.display='none'
              document.getElementsByClassName('hideImg')[2].style.display='none'
            }
          } else {
            weui.alert(res.msg)
          }
        })
      },
      selItem(index, item) {
        this.num = index;
        console.log(item)
        this.$router.push({
          name: item.router
        })
      },
      hideMask(){
        this.maskFlag = false
        this.$refs.ser.flag = false
      },
      showService() {
        let urlParams = getParamsFromUrl(location.href);
        debug("ppp", urlParams)
        if (urlParams.query && urlParams.query.comefrom == "share") {
          this.showQrcode = true
          return;
        }


        if (this.docServeList.length != 0) {
         this.$refs.ser.flag = true
          this.maskFlag = this.$refs.ser.flag
        } else {
          weui.alert("该医生尚未开通此服务")
        }
      },
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../common/common.scss';

  .page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
    background: white;
  }

  .alertArea {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    z-index: 10000;
    img {
      position: absolute;
      top: 0;
      z-index: 10000;
      width: 100%;
      height: 100%;
    }
  }

  .wrapper {
    overflow: scroll;
  }

  .myHeader {
    width: 100%;
    padding: 0px 30px;
    position: absolute;
    z-index: 0;
    top: 30px;;
  }

  .famous {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    background: orange;
    color: white;
    font-size: 24px;
    text-align: center;
    margin-left: 30px;
    border-radius: 5px;
  }

  .headerImg {
    float: right;
    img {
      width: 30px;
      height: 30px;
    }
  }

  .back {
    width: 25px;
    height: 40px;
    img {
      width: 25px;
      height: 40px;
    }
  }

  .teamImg {
    position: relative;
    width: 100%;
    height: 520px;
    z-index: 0;
    background-image: url("../../../static/img/docBac.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .teamBottom {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 240px;
    background-image: url("../../../static/img/teamBottom.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .teamDetail {
    /*margin-top: 80px;*/
    padding-top: 130px;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
  }

  .navbar {
    width: 690px;
    display: flex;
    /*flex-direction: row;*/
    /*justify-content: space-around;*/
    align-items: center;
    /*padding: 10px 0;*/
    margin:0 auto;
    margin-top: 15px;
    .menu{
      flex:1;
      height:80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .router-link-exact-active{
        border-bottom: 4px solid $mainColor;

    }
      img{
        width:40px;
        margin-left: 5px;
      }
       span{
          text-align: center;
       }
  }

  .bar {
    padding-bottom: 20px;
    border-bottom: 1px solid #2772ff;
    color: #2772ff;
  }

  .sel {
    border-right: 1px solid gainsboro;
    border-left: 1px solid gainsboro;
    padding: 0 88px;
  }

  .btn {
    width: 100%;
    /*height: 100px;*/
    /*display: flex;*/
    /*line-height: 100px;*/
    display: flex;
    justify-content: space-around;
    /*text-align: center;*/
    background-color: $boederCol;
    >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 20px;
        img{
          width: 72px;
          height:72px;
          margin-bottom: 10px;
        }
        p{
           font-size: 30px;
          color: #333333;
        }
    }
  }
  /*.popService{*/
      /*position: fixed;*/
    /*height:500px;*/
      /*bottom:100px;*/
    /*left:0;*/
    /*right:0;*/
  /*}*/
  .myImg {
    width: 180px;
    height: 180px;
    border-radius: 90px;
    margin-bottom: 30px;
  }

  .patient {
    background: #ffc750;
    width: 33.3333%;
    float: left;
  }

  .registration {
    background: #f58377;
    width: 33.3333%;
    float: left;
  }

  .onLine {
    background: #2772ff;
    width: 33.3333%;
    float: left;
  }

  .ercode {
    .mask {
      position: fixed;
      @include t_r_b_l();
      z-index: 1000;
      background-color: rgba(0, 0, 0, .5);
    }
    .mainbox {
      z-index: 3000;
      background-color: white;
      position: fixed;
      top: 200px;
      bottom: 200px;
      left: 100px;
      right: 100px;
      padding: 20px;
      .info {
        .ava {
          margin-right: 15px;
          .myImg {
            margin-bottom: 0px;
          }
        }
        .h3 {
          font-size: 16px; /*no*/
        }
        .desc {
          font-size: 12px; /*no*/
          color: #999999;
        }
      }
      .er {
        img {
          width: 100%;
        }
      }
    }
  }
</style>
