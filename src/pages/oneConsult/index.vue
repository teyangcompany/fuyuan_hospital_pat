<template>
  <div class="chat">
    <div ref="header">
      <v-header :title="title" :rightTitle="overTitle" :waitImg="waitImg" v-if="consultInfo.consultStatus=='3'" @on-docCard="finishConsult"></v-header>
      <v-header :title="title" :rightTitle="rightTitle" :waitImg="waitImg" v-else></v-header>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>
                                <span  class="bf">患者资料： {{consultInfo.consulterName}}
                                    {{consultInfo.consulterGender == 'M'?'男':'女'}}
                                    {{consultInfo.consulterAge}}
                                </span>
            </p>
          </div>
          <div class="weui-cell__ft bfc"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>
            <span class="bf">
                疾病名称：{{consultInfo.illnessName}}
            </span>
            </p>
          </div>
          <div class="weui-cell__ft bfc"></div>
        </a>

      </div>
      <div class="contain">
        <div>
          <span class="bf">{{consultInfo.consultContent}}</span>
        </div>
        <div class="patImg">
          <img v-for="item in attaList"  :src="item.attaFileUrl" alt="" @click="bigImg(item.attaFileUrl)">
        </div>
        <div class="createDiv">
          <span class="mfc create"> <img :src="userPat.patAvatar" alt=""> <span>{{consultInfo.consulterName}} 创建</span></span>
          <span class="date">{{consultInfo.createTime | goodTime}}创建 |
              <span v-if="consultInfo.replyCount">{{consultInfo.replyCount}}条回复</span>
              <span v-else>暂无回复</span>
          </span>
        </div>
      </div>
    </div>
    <scroll class="conversation" :data="aboutReplyMessage" @click="goDown()" ref="main"
            :listen-scroll="listenScroll" :probe-type="probeType">
      <section class="conversationList" ref="slideList" @touchstart.prevent="hideKeyBoard()">
        <ul>
          <li v-for="item in aboutReplyMessage" ref="chatLi">
            <div class="other" :class="{mysay:item.consultMessage.replierType == 'PAT'}">
              <img :src="item.userPat.patAvatar" alt="" v-if="item.consultMessage.replierType == 'PAT'">
              <img :src="waitImg" alt="" v-if="item.consultMessage.replierType == 'DOC'">
              <span class="msgTime">{{item.consultMessage.createTime | Todate}} </span>
              <div class="whatsay">
                <!--<p class="msgTime">{{item.createTime | Todate}}</p>-->
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                  </svg>
                </div>
                <div class="whatsay_text" v-if="item.consultMessage.replyContentType == 'TEXT'">
                  {{ item.consultMessage.replyContent}}
                </div>
                <div class="whatsay_text articleSection" v-if="item.consultMessage.replyContentType == 'ARTICLE'" @click="goArticle(JSON.parse(item.msgContent).articleId)">
                  <div>
                    <span>文章标题：{{ JSON.parse(item.consultMessage.replyContent).title }}</span><br/>
                    <span>作者： {{ JSON.parse(item.consultMessage.replyContent).author }}</span>
                  </div>
                  <span>  <img class="checkMore" src="../../../static/img/icon/arrow-right-grow.png" alt="">  </span>

                </div>
                <div class="whatsay_text" v-else-if="item.consultMessage.replyContentType == 'AUDIO'">
                  <audio autoplay="autoplay" controls="controls" :src="item.consultMessage.replyContent" alt=""></audio>
                </div>
                <div class="whatsay_text" v-else-if="item.consultMessage.replyContentType == 'PIC'" @click="makeLarge(item.msgContent)">
                  <img :src="item.consultMessage.replyContent" alt="">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="assistScroll">

        </div>
      </section>

    </scroll>
    <footer class="payButton"  v-if="!(consultInfo.payStatus)">
      <div class="payWrap border-1px-top">
        <span class="border-1px-right" @click="cancelApply()">取消申请</span>
        <span class="pay" @click="goPay">付款¥{{ consultInfo.payFee }}</span>
      </div>
    </footer>
    <footer class="payButton"  v-else-if="consultInfo.consultStatus == '4'">
      <div class="payWrap border-1px-top">
        <span class="border-1px-right" >再次咨询</span>
        <span class="pay">评价</span>
      </div>
    </footer>
    <footer :class="{footshow:seeMore}" ref="footer" v-else>
      <section class="foot_top">
        <div class="picture">
          <input type="file" name="picture" id="upPicture" ref="picture" @change="onFileChange">
          <img src="../../../static/img/图片.png" alt="" @click="selectImg()">
        </div>
        <div class="chatInput">
          <input type="text" id="forInput" maxlength="100" @blur="blured" @focus="focus()" ref="inputFocus"
                 v-model="inputInfo" @input="whatInput">
        </div>
        <div class="chatSend">
          <div class="send" @click.prevent="send()" v-if="light">
            <span>发送</span>
          </div>
          <div v-else @click="upMore()" class="addmore">
            <span>发送</span>
            <!--<img src="../../../../static/img/聊天界面-添加.png" alt="">-->
          </div>
        </div>
      </section>
      <!--<section class="foot_bottom">-->
      <!--</section>-->
    </footer>
    <div class="largePicArea" v-if="showLargePic">
      <img :src="largePic" alt="" @click="makeSmall">
    </div>
    <v-dialog @on-cancel="over" @on-download="overConsult" v-if="showOverConsult"
              :dialogTitle="dialogOverTitle"
              :dialogMain="dialogOverMain"
              :dialogLeftFoot="dialogOverLeft"
              :dialogRightFoot="dialogOverRight"
    ></v-dialog>
    <v-mask v-if="showMask"></v-mask>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../../base/header'
  import Scroll from '../../base/scroll'
  import http from '../../lib/http'
    import dialog from '../../base/dialog'
  import Toast from '../../base/toast'
  import {Todate,goodTime} from '../../lib/filter'
  import mask from '../../base/mask.vue'
  import {mainHeightMixin} from '../../lib/mixin'
  //  import consultPatAva from "../../../utils/consultPatAva"


  export default {
    data() {
      return {
        title: "",
        rightTitle: "",
        overTitle:"结束咨询",
        waitImg: "",
        seeMore: false,
        light: false,
        inputInfo: "",
        chatText: [],
        previewImg: [],
        consultId: "",
        aboutReplyMessage: [],
        attachImg: "",
        sendContent: "",
        attaFileUrl:"",
//        推送时得到的
        pushConsultId: "",
        returnInfo: "",
        showLargePic: false,
        largePic: "",
        showToast: false,
        messageLength: "",
        inter: "",
        aboutUserInfo:"",
        docId:"",
//        vipStatus:"",
        showMask:false,
        consultInfo:"",
        attaList:[],
        userPat:"",
        dialogOverTitle: "结束咨询",
        dialogOverMain: "结束咨询后双方都无法继续回复。请酌情使用该功能",
        dialogOverLeft: "取消",
        dialogOverRight: "确定结束",
        showOverConsult: false,
      }
    },
    filters:{
      Todate,
      goodTime
    },
    components: {
      "VHeader": header,
      "VDialog": dialog,
      Scroll,
      Toast,
      'VMask':mask
    },
    created() {

      this.listenScroll = true
      this.probeType = 3
      this.consultId = this.$route.params.id
      this.showToast = true
      this.$nextTick(() => {
           this.getInitData()
      })
    },
    mounted() {
//      let o = document.getElementsByClassName("chat")[0];
//      let h = o.offsetHeight;  //高度
//      let content = h
//      console.log(o)
//      setTimeout(() => {
//        if (this.$refs.slideList.offsetHeight > content - 10) {
////                     console.log(that.$refs.slideList.offsetHeight)
//          console.log("医生回复你了")
//          this.$refs.main.scrollTo(0, content - this.$refs.slideList.offsetHeight - 80)
//        }
//      }, 10)
    },
    watch: {

    },
    methods: {
      getInitData(){
        http("smarthos.consult.details", {
          token: localStorage.getItem('token'),
          consultId:this.consultId
        }).then((data) => {
          console.log(data,7777)
//          this.messageLength = data.obj.messageList.length
          this.showToast = false
          if (data.code == 0) {
            this.$nextTick(() => {
              this.userPat = data.obj.userPat;
              this.attaList = data.obj.attaList;
              this.consultInfo = data.obj.consultInfo
              this.aboutUserInfo = data.obj
              this.aboutReplyMessage = data.obj.consultMessage
              this.title = data.obj.userDocVo.docName
              this.waitImg = data.obj.userDocVo.docAvatar
//              this.vipStatus = data.obj.followDocpat.vipStatus

//              this.docId = data.obj.userDocVO.id
//              this.attachImg = data.obj.attaList
//              this.title = this.aboutConsult.docName
//              this.waitImg = this.aboutConsult.docAvatar ? this.aboutConsult.docAvatar : './static/img/doctor.m.png'

              let o = document.getElementsByClassName("chat")[0];
              let h = o.offsetHeight;  //高度
              let content = h
              console.log(o,6666)
              console.log(h)

              setTimeout(() => {
                if (this.$refs.slideList.offsetHeight > content - 10) {
                  this.$refs.main.scrollTo(0, content - this.$refs.slideList.offsetHeight-390)
                  console.log(this.$refs.slideList.offsetHeight)
//                  console.log(content)
                }
              }, 300)


            })
          } else if (!(data.msg)) {
            weui.alert("网络错误，请稍后重试")
            console.log("错误的data")
            console.log(data)
            console.log("上面是错误的data")
          } else {
            weui.alert(data.msg)
          }
//          console.log(this.attachImg)
        })
      },
      goArticle(id){
        this.$router.push({
          path:"/articleDetail",
          query:{articleId:id}
        })
      },
      over() {
        this.showOverConsult = false
      },
      overConsult(){
        this.showOverConsult = false
         http("smarthos.consult.one2one.pic.complete",{
             token:localStorage.getItem('token'),
             consultId:this.consultId
         }).then((data)=>{
             if(data.code == 0){
                 this.getInitData()
             }else{
                 weui.alert(data.msg)
             }
         })
      },
      finishConsult(){
          this.showOverConsult = true
      },
//      goDocCard(){
//        this.$router.push('/docCard/'+this.docId)
//      },
      goDown() {
        this.seeMore = false
      },
      goCancel() {
        this.showDialog = true
      },
      goAllCancel() {
        this.showAllDialog = true
      },
      goOverConsult() {
        this.showOverConsult = true
      },
      close() {
        this.showDialog = false
      },
      over() {
        this.showOverConsult = false
      },
      makePatientBig(item, index) {
        console.log(item)
        this.largePic = item.url
        this.showLargePic = true
      },
      makeLarge(url) {
        this.largePic = url
        this.showMask = true
        this.showLargePic = true
      },
      makeSmall() {
        this.showLargePic = false
        this.showMask = false
      },



      closeAll() {
        this.showAllDialog = false
      },
      cancelApply(){
          http("smarthos.consult.one2one.pic.complete",{
            token:localStorage.getItem('token'),
            consultId:this.consultId
          }).then((data)=>{
              if(data.code == 0){
                  console.log(data)
              }else{
                  weui.alert(data.msg)
              }
          })
      },
      goPay(){
        this.$router.push('/pay/'+this.consultId)
      },
      whatInput() {
        if (this.inputInfo.replace(/\s+/g, "") == '') {
          this.light = false
        } else {
          this.light = true
        }
        this.inter = setInterval(() => {
          document.getElementsByClassName("foot_top")[0].scrollIntoView()
        }, 500)
      },
//      enterThing() {
//        if (this.light) {
//          this.send()
//        }
//      },
      send() {
        http("smarthos.consult.one2one.pic.reply", {
          token: localStorage.getItem('token'),
          consultId: this.consultId,
          replyContentType:"TEXT",
          replyContent: this.inputInfo,
//          attaIdList:this.attaId
        }).then((data) => {

          this.getInitData()

          console.log(data,11111)
//          this.seeMore = false
          this.$nextTick(() => {
//            this.aboutReplyMessage.push(data.obj)
//            console.log(this.aboutReplyMessage)
            let o = document.getElementsByClassName("chat")[0];
            let h = o.offsetHeight;  //高度
            let content = h
            console.log(o)
            setTimeout(() => {
              if (this.$refs.slideList.offsetHeight > content - 10) {
                console.log(this.$refs.slideList.offsetHeight)
                this.$refs.main.scrollTo(0, content - this.$refs.slideList.offsetHeight - 80)
              }
            }, 300)
          })
        })
        this.inputInfo = ''
        this.light = false
      },
      selectImg(e) {
        this.$refs.picture.click()
      },
      onFileChange(e) {
        console.log(e)
        var file = e.target.files[0]
        this.createImage(file)
        this.seeMore = false
      },
      createImage(file) {
        if (typeof FileReader === "undefined") {
          weui.alert("您的浏览器不支持图片上传，请升级您的浏览器")
          return false
        }
        let that = this
        let fileName = file.name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          that.previewImg.push(this.result)
          http("smarthos.system.file.upload.image.base64", {
            module:"FOLLOW",
            fileType:"IMAGE",
            base64: this.result,
            fileName: fileName
          }).then((data) => {
            console.log(data)
            that.attaFileUrl = data.obj.attaFileUrl
            http("smarthos.follow.message.add", {
              token: localStorage.getItem('token'),
              followId: that.followId,
              msgContent: that.attaFileUrl,
              msgType: "PIC"
            }).then((data) => {

              console.log(data)
//              location.reload()
              if (data.code == 0) {
//                location.reload()


                http("smarthos.follow.message.detail.list", {
                  token: localStorage.getItem('token'),
                  followId: that.followId,
                }).then((data) => {
                  console.log(data)
                  that.showToast = false
                  if (data.code == 0) {
                    that.$nextTick(() => {

                      that.aboutReplyMessage = data.list

                      console.log(this.aboutReplyMessage)


                      let o = document.getElementsByClassName("chat")[0];
                      let h = o.offsetHeight;  //高度
                      let content = h
                      console.log(o)


                      setTimeout(() => {
                        if (that.$refs.slideList.offsetHeight > content - 10) {
                          that.$refs.main.scrollTo(0, content - that.$refs.slideList.offsetHeight - 80)
                          console.log(that.$refs.slideList.offsetHeight)
                          console.log(content)
                        }
                      }, 300)


                    })
                  } else if (!(data.msg)) {
                    weui.alert("网络错误，请稍后重试")
                    console.log("错误的data")
                    console.log(data)
                    console.log("上面是错误的data")
                  } else {
                    weui.alert(data.msg)
                  }
//          console.log(this.attachImg)
                })


              } else {
                weui.alert(data.msg)
              }
            })
          })
        }
      },
      hideKeyBoard() {
        this.seeMore = false
        document.getElementById('forInput').blur()
      },
      upMore() {
//        this.seeMore = !this.seeMore
      },
      focus() {
//        this.seeMore = false

//
        this.inter = setInterval(() => {
          document.getElementsByClassName("foot_top")[0].scrollIntoView()
        }, 500)

      },
      blured() {
//          this.$refs.footer.style.bottom=-160 + 'px'
        clearInterval(this.inter)
      },
//      consultPatAva
    },
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';

  .chat {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .largePicArea {
      position: fixed;
      top: 0px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;

      /*background-color: #999999;*/
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        z-index: 2000;
      }
    }
  }









  .evaluate{
    display: inline-block;
    width: 49%;
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
  .bor{
    border-right: 1px solid gainsboro;
  }

  .replyImg{
    width: 150px;
    height: 150px;
    margin: 10px;
  }
  .btn{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    display: flex;
    align-items: center;

  }
  .reply{
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
  .page{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 88px;
    bottom:100px;

  }
  .step {
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
    font-size: 16px;/*no*/
  }
  .weui-cells{
    margin-top: 0;
  }
  .contain{
    background: white;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;
    border-bottom: 1px solid gainsboro;
    .patImg{
        img{
          width:160px;
          height:160px;
          margin-right: 17px;
        }
    }
    .createDiv{
      display: flex;
      justify-content: space-between;
      .create{
        width:200px;
        display: flex;
        align-items: center;
        img{
          width:40px;
          height:40px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }
  }
  .conversation {
    width: 100%;
    /*padding-top: 50px;*/
    /*overflow: auto;*/
    /*height: 500px;*/
    /*position: absolute;*/
    /*top: 718px;*/
    /*bottom: 80px;*/
    flex: 1;
    overflow: hidden;
    /*overflow: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: auto;*/
    background-color: white;
    /*ul{*/
    /*padding:0;*/
    /*margin:0;*/
    /*margin-top: 10px;*/
    /*}*/
  }
  .assistScroll{
    height:65px;
  }
  .conversationList {
    width: 100%;
    /*overflow: auto;*/
    /*position: relative;*/
    .loadTip {
      width: 100%;
      span.pullMore {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
    li {
      .other {
        width: 690px;
        display: flex;
        margin:0 auto;
        margin-top: 60px;
        justify-content: flex-start;
        /*padding-top: 25px;*/
        /*margin-bottom: 25px;*/
        /*align-items: top;*/
        position: relative;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: inline-block;
          /*margin-left: 30px;*/
        }
        .msgTime{
          position: absolute;
          top:-45px;
          left:265px;
          color: #999999;
        }
        .whatsay {
          position: relative;
          /*margin-top: 0.4rem;*/
          /*<!--.onlyThis{-->*/
          /*<!--height: 50px;-->*/
          /*<!--width:280px;-->*/
          /*<!--&gt;div{-->*/
          /*<!--position: absolute;-->*/
          /*<!--left: 210px;-->*/
          /*<!--}-->*/
          /*<!--}-->*/
          .whatsay_svg {
            width: 0.4266666667rem;
            height: 0.64rem;
            position: absolute;
            top: .5546667rem;
            left: .63rem;
            z-index: 2;
            svg {
              display: block;
              width: 0.4266666667rem;
              height: 0.64rem;
            }
          }
          .whatsay_text {
            margin-left: 20px;
            max-width: 490px;
            background: #f5f5f5;
            padding: 0.15rem 0.184rem;
            border-radius: 10px;
            font-size: 28px;
            line-height: 48px;
            color: #333333;
            word-break: break-all;
            .checkMore{
              height: 24px;
              width:16px;
            }
            audio{
              width:200px;
            }
            img {
              border-radius: 0;
              margin-left: 0;
              margin-right: 5px;
              width: 110px;
              height: 110px;
            }
          }
          .articleSection{
            display: flex;
            align-items: center;
            div{
              margin-right: 40px;
            }
          }
        }
      }
      .mysay {
        display: flex;
        margin-top: 60px;
        flex-direction: row-reverse;
        .msgTime{
          width:217px;
          /*text-align: right;*/
          position: absolute;
          top:-45px;
          right:265px;
          color: #999999;
        }
        .say-time {
          left: 8.8rem;
        }
        .whatsay {
          .onlySquare {
            p {
              font-size: 32px;
            }
            span {
              font-size: 28px;
              color: #666666;
            }
          }
          .whatsay_svg {
            right: 0rem;
            left: auto;
          }
          .whatsay_text {
            margin-right: 0.15rem;
            margin-left: 0;
            background: #9fe658;
            .checkMore{
              height: 24px;
              width:16px;
            }
          }
          .articleSection{
            display: flex;
            align-items: center;
            div{
              margin-right: 40px;
            }
          }
        }
      }
    }
  }

  footer.payButton {
    margin-bottom: 10px;
    width: 100%;
    div.payWrap {
      width: 690px;
      margin: 0 auto;
      span{
        display: inline-block;
        width:340px;
        height:80px;
        line-height: 80px;
        text-align: center;
        font-size: 32px;
      }
      button {
        width: 690px;
        height: 80px;
        border: none;
        outline: medium;
        font-size: 32px;
        color: white;
        border-radius: 7px;
        background-color: $mainColor;
      }
    }
    .assistScroll {
      height: 200px;
    }
  }

  footer {
    width: 100%;
    /*height: 200px;*/
    /*position: absolute;*/
    /*bottom: 0;*/
    -webkit-user-select: auto;
    background-color: white;
    .foot_top {
      display: flex;
      .picture {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 20px;
        /*<!--margin-top: 60px;-->*/
        img {
          width: 65px;
          height: 65px;
          display: block;
          margin-bottom: 15px;
        }

        /*<!--span{-->*/
        /*<!--font-size: 28px;-->*/
        /*<!--color:#666666-->*/
        /*<!--}-->*/
        /*<!--span.red{-->*/
        /*<!--margin-top: 5px;-->*/
        /*<!--color: red;-->*/
        /*<!--}-->*/
      }
      .picture {
        > input {
          display: none;
        }
      }
      .chatInput {
        width: 520px;
        margin-left: 30px;
        text-align: center;
        input {
          width: 520px;
          height: 64px;
          border: none;
          font-size: 32px;
          outline: medium;
          border-radius: 7px;
          background-color: rgb(243, 243, 243);
          border-bottom: 1px solid #e0e0e0;
        }
        .greenBorder {
          border-bottom: 1px solid #19ad17;
          /*border-color:#19ad17;*/
        }
      }
      .chatSend {
        width: 110px;
        height: 70px;
        margin-left: 10px;
        /*background-color: dodgerblue;*/
        text-align: center;
        .send {
          width: 110px;
          height: 70px;
          background: #16af17;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            display: block;
            color: white;
          }
        }
        .addmore {
          span {
            color: #666666;
          }
          /*<!--img{-->*/
          /*<!--width: 58px;-->*/
          /*<!--height: 58px;-->*/
          /*<!--}-->*/
        }
      }
    }
  }

  .footshow {
    bottom: 0;
    transition: all .2s;
  }
</style>













































<!--<template>-->
<!--<div class="page">-->
<!--<app-header class="noflex" title="李冰" ref="header">-->
<!--<i slot="back"></i>-->
<!--&lt;!&ndash;<div class="right absolute" slot="right">找医生</div>&ndash;&gt;-->
<!--</app-header>-->

<!--<div class="wraps">-->
<!--<chat :chatObj="chatObj" :chatList='chatList' @send="send"></chat>-->
<!--</div>-->


<!--</div>-->
<!--</template>-->
<!--<script type="text/ecmascript-6">-->
<!--import appHeader from '../../components/app-header.vue'-->
<!--import chat from '../../business/chat.vue'-->
<!--import api from '../../lib/http'-->
<!--export default{-->
<!--components: {-->
<!--appHeader,-->
<!--chat,-->
<!--},-->
<!--data(){-->
<!--return {-->
<!--followId:"",-->
<!--token:localStorage.getItem('token'),-->
<!--chatObj:{},-->
<!--chatList:[],-->
<!--scrollHeight:'',-->
<!--msgContent:"",-->
<!--msgType:""-->
<!--}-->
<!--},-->

<!--mounted(){-->
<!--this.followId = this.$route.params.id;-->
<!--this.getData();-->
<!--//            window.addEventListener('resize', function () {-->
<!--//                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {-->
<!--//                    window.setTimeout(function () {-->
<!--//                        document.activeElement.scrollIntoViewIfNeeded();-->
<!--//                    }, 800);-->
<!--//                }-->
<!--//            });-->
<!--},-->
<!--methods:{-->
<!--send(value){-->
<!--console.log(value,33333);-->
<!--if(value.url){-->
<!--this.msgContent = value.url;-->
<!--this.msgType = value.msgType;-->
<!--}else {-->
<!--this.msgContent = value;-->
<!--this.msgType = "TEXT";-->
<!--}-->
<!--api('smarthos.follow.message.add',{-->
<!--"token": this.token,-->
<!--"followId": this.followId,-->
<!--"msgContent":this.msgContent,-->
<!--"msgType": this.msgType-->
<!--}).then(res=>{-->
<!--console.log(res,444444);-->
<!--if(res.succ){-->
<!--this.getData()-->
<!--}else {-->
<!--alert(res.msg)-->
<!--}-->
<!--})-->
<!--},-->
<!--getData(){-->
<!--api('smarthos.follow.message.detail.list',{-->
<!--token:this.token,-->
<!--followId:this.followId-->
<!--}).then(res=>{-->
<!--console.log(res,55555);-->
<!--if(res.succ){-->
<!--this.chatObj = res.obj;-->
<!--this.chatList = res.list;-->
<!--}else {-->
<!--alert(res.msg)-->
<!--}-->
<!--})-->
<!--},-->
<!--over(){-->
<!--this.$router.push({-->
<!--name:'myPatient'-->
<!--})-->
<!--},-->

<!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped  lang='scss'>-->
<!--@import '../../common/common.scss';-->
<!--.page{-->
<!--display: flex;-->
<!--flex-direction: column;-->
<!--overflow: hidden;-->
<!--flex: 1;-->
<!--}-->
<!--.wraps{-->
<!--display: flex;-->
<!--flex: 1;-->
<!--overflow: scroll;-->
<!--}-->
<!--.step {-->
<!--padding-right: 5px;-->
<!--color: #3CC51F;-->
<!--box-sizing: border-box;-->
<!--}-->
<!--</style>-->




































































































































<!--<template>-->
    <!--<div>-->
        <!--<top class="noflex" :title="title" ref="header">-->
            <!--<i slot="back"></i>-->
            <!--<div @click="finishConsult(consultInfo.consultStatus)" slot="right" class="right absolute" v-show="consultMessage.length>0&&(consultInfo.consultStatus=='3'||consultInfo.consultStatus=='4')">-->
                <!--{{consultInfo.consultStatus=='3'?'结束咨询':'去评价'}}-->
            <!--</div>-->
        <!--</top>-->

        <!--<div class="state" v-if="consultInfo.consultStatus=='3'&&consultMessage.length==0">-->
            <!--等待医生回复-->
        <!--</div>-->
        <!--<div class="state" v-else>-->
            <!--{{consultInfo.consultStatus | state}}-->
        <!--</div>-->
        <!--&lt;!&ndash;<div class="state" v-show="consultInfo.consultStatus=='1'||consultInfo.consultStatus=='2'">&ndash;&gt;-->
            <!--&lt;!&ndash;{{consultInfo.consultStatus=='1'?'待受理':'待处理'}}&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="state" v-show="consultInfo.consultStatus=='3'||consultInfo.consultStatus=='4'">&ndash;&gt;-->
            <!--&lt;!&ndash;{{consultInfo.consultStatus=='3'?'进行中':'待评价'}}&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="state" v-show="consultInfo.consultStatus=='6'">&ndash;&gt;-->
            <!--&lt;!&ndash;已结束&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<chat :chatObj="consultInfo" :chatList="consultMessage" :attaList="attaList" :userObj="userObj" @send="send"></chat>-->
        <!--<div class="btns" @click="goPay" v-show="consultInfo.consultStatus=='0'">-->
            <!--去付款-->
        <!--</div>-->
        <!--<div class="finish" v-show="consultInfo.consultStatus=='4'||consultInfo.consultStatus=='6'">-->
            <!--<p class="mfc">该咨询已经结束，无法追问</p>-->
            <!--<p class="mfc" style="color: blue">申请成为他的患者</p>-->
        <!--</div>-->

    <!--</div>-->
<!--</template>-->
<!--<script type="text/ecmascript-6">-->
    <!--import top from '../../components/app-header.vue'-->
    <!--import {mainHeightMixin} from '../../lib/mixin'-->
    <!--import config from '../../lib/config'-->
    <!--import api from '../../lib/http'-->
    <!--import scroll from '../../base/scroll.vue'-->
    <!--import chat from '../../business/onChat.vue'-->
    <!--import {state} from '../../lib/filter'-->
    <!--export default{-->
        <!--components: {-->
            <!--top,-->
            <!--scroll,-->
            <!--chat-->
        <!--},-->
        <!--filters:{-->
          <!--state-->
        <!--},-->
        <!--data(){-->
            <!--return {-->
                <!--consultId:"",-->
                <!--token:localStorage.getItem('token'),-->
                <!--chatObj:{},-->
                <!--scrollHeight:'',-->
                <!--userObj:{},-->
                <!--consultInfo:{},-->
                <!--attaList:[],-->
                <!--title:'',-->
                <!--consultMessage:[],-->
                <!--replyContentType:"TEXT",-->
                <!--replyContent:""-->

            <!--}-->
        <!--},-->
        <!--created(){-->
          <!--this.scrollHeight = window.innerHeight-45-40-40-->
        <!--},-->
        <!--mounted(){-->
            <!--this.consultId = this.$route.params.id-->
            <!--this.getData()-->
        <!--},-->
        <!--methods:{-->
            <!--finishConsult(state){-->
                <!--if(state=='3'){-->
                    <!--api('smarthos.consult.one2one.pic.complete',{-->
                        <!--token:this.token,-->
                        <!--consultId:this.consultId-->
                    <!--}).then(res=>{-->
                        <!--console.log(res,258963);-->
                        <!--if(res.succ){-->
                            <!--this.getData()-->
                        <!--}else {-->
                            <!--alert(res.msg)-->
                        <!--}-->
                    <!--})-->
                <!--}else {-->
                    <!--this.$router.push('/evaluate/'+this.consultId)-->
                <!--}-->

            <!--},-->
            <!--getData(){-->
                <!--api('smarthos.consult.details',{-->
                    <!--token:this.token,-->
                    <!--consultId:this.consultId-->
                <!--}).then(res=>{-->
                    <!--console.log(res,55555);-->
                    <!--if(res.succ){-->
                        <!--this.chatObj = res.obj;-->
                        <!--this.userObj = res.obj.userPat-->
                        <!--this.consultInfo = res.obj.consultInfo-->
                        <!--this.attaList = res.obj.attaList-->
                        <!--this.title = res.obj.userDocVo.docName;-->
                        <!--res.obj.consultMessage?this.consultMessage = res.obj.consultMessage:this.consultMessage=[]-->
                    <!--}else {-->
                        <!--alert(res.msg)-->
                    <!--}-->
                <!--})-->
            <!--},-->
            <!--send(value){-->
                <!--if(value.msgType){-->
                    <!--this.replyContentType=value.msgType-->
                    <!--this.replyContent = value.url-->
                <!--}else {-->
                    <!--this.replyContent = value-->
                <!--}-->
                <!--api('smarthos.consult.one2one.pic.reply',{-->
                    <!--token:this.token,-->
                    <!--consultId:this.consultId,-->
                    <!--replyContent:this.replyContent,-->
                    <!--replyContentType:this.replyContentType-->
                <!--}).then(res=>{-->
                    <!--console.log(res,8888);-->
                    <!--if(res.succ){-->
                        <!--this.getData()-->
                    <!--}else {-->
                        <!--alert(res.msg)-->
                    <!--}-->
                <!--})-->
            <!--},-->
            <!--goPay(){-->
                <!--this.$router.push('/pay/'+this.consultId)-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style scoped lang='scss'>-->
    <!--@import '../../common/common.scss';-->
<!--.btns{-->
    <!--position: fixed;-->
    <!--left: 0;-->
    <!--bottom: 0;-->
    <!--width: 100%;-->
    <!--height: 80px;-->
    <!--line-height: 80px;-->
    <!--text-align: center;-->
    <!--background: indianred;-->
    <!--color: white;-->
<!--}-->
    <!--.state{-->
        <!--width: 100%;-->
        <!--height: 80px;-->
        <!--line-height: 80px;-->
        <!--text-align: center;-->
        <!--background: gainsboro;-->
    <!--}-->
    <!--.titles{-->
        <!--width: 80px;-->
        <!--height: 80px;-->
        <!--box-sizing: border-box;-->
        <!--border-radius: 40px;-->
    <!--}-->

<!--.talk{-->
    <!--margin-top: 20px;-->
<!--}-->



    <!--.com {-->
        <!--width: 400px;-->
        <!--min-height: 50px;-->
        <!--line-height: 50px;-->
        <!--height: auto;-->
        <!--position: relative;-->
        <!--background: lawngreen;-->
        <!--border-radius: 10px;-->
        <!--float: right;-->
        <!--word-wrap:break-word;-->
        <!--word-break:break-all;-->
        <!--padding: 14px 10px;-->
        <!--box-sizing: border-box;-->

    <!--}-->

    <!--.patImg{-->
        <!--width: 120px;-->
        <!--height: 120px;-->
        <!--padding: 3px 5px;-->
    <!--}-->

    <!--.com:after {-->
        <!--content: '';-->
        <!--width: 0;-->
        <!--height: 0;-->
        <!--position: absolute;-->
        <!--top: 10px;-->
        <!--right: 24px;-->
        <!--border: solid 16px;-->
        <!--border-color:  transparent lawngreen transparent transparent;-->
        <!--font-size: 0;-->
    <!--}-->


    <!--.rightMsg{-->
        <!--overflow: hidden;-->
    <!--}-->

    <!--.floatRight{-->
        <!--float: right;-->
        <!--height: auto;-->
        <!--margin-bottom: 20px;-->
        <!--margin-left: 5px;-->
    <!--}-->

    <!--.floatImg{-->
        <!--float: right;-->
    <!--}-->

<!--.finish{-->
    <!--position: fixed;-->
    <!--left: 0;-->
    <!--bottom: 0;-->
    <!--width: 100%;-->
    <!--padding: 20px;-->
    <!--text-align: center;-->
    <!--background: white;-->
<!--}-->





<!--</style>-->
