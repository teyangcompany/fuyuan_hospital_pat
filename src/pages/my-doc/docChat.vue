<template>
  <div class="chat">
    <v-header :title="title" :rightTitle="rightTitle" :waitImg="waitImg" @on-docCard="goDocCard()"
              :showMy="vipStatus"></v-header>
    <scroll class="conversation" :data="aboutReplyMessage" @click="goDown()" ref="conversation"
            :listen-scroll="listenScroll" :probe-type="probeType">
      <section class="conversationList" ref="slideList" @touchstart.prevent="hideKeyBoard()">
        <ul>
          <li v-for="(item,index) in aboutReplyMessage" ref="chatLi">
            <div class="other" :class="{mysay:item.msgSenderType == 'PAT'}">
              <img :src="aboutUserInfo.userPat.patAvatar" alt="" v-if="item.msgSenderType == 'PAT' && aboutUserInfo.userPat.patAvatar">
              <img src="../../../static/img/pat-m.png" alt="" v-else-if="item.msgSenderType == 'PAT' && !aboutUserInfo.userPat.patAvatar">
              <img :src="aboutUserInfo.userDocVO.docAvatar" alt=""
                   v-else-if="item.msgSenderType != 'PAT' && aboutUserInfo.userDocVO.docAvatar">
              <img src="../../../static/img/doctorM.png" alt=""
                   v-else-if="item.msgSenderType != 'PAT' && aboutUserInfo.userDocVO.docAvatar == ''">
              <img src="../../../static/img/doctorM.png" alt=""
                   v-else-if="item.msgSenderType != 'PAT' && !(aboutUserInfo.userDocVO.docAvatar)">
              <span class="msgTime">{{item.createTime | Todate}} </span>
              <div class="whatsay" ref="playaudio" @click="play(item,index)">
                <!--<p class="msgTime">{{item.createTime | Todate}}</p>-->
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                  </svg>
                </div>
                <div class="whatsay_text" v-if="item.msgType == 'TEXT'">
                  {{ item.msgContent}}
                </div>
                <div class="whatsay_text articleSection" v-if="item.msgType == 'ARTICLE'"
                     @click="goArticle(JSON.parse(item.msgContent).articleId)">
                  <div>
                    <span>文章标题：{{ JSON.parse(item.msgContent).title }}</span><br/>
                    <span>作者： {{ JSON.parse(item.msgContent).author }}</span>
                  </div>
                  <span>  <img class="checkMore" src="../../../static/img/icon/arrow-right-grow.png" alt="">  </span>

                </div>
                <div class="whatsay_text playerArea" v-else-if="item.msgType == 'AUDIO'">
                  <audio  :src="item.msgContent" alt=""></audio>
                  <div class="playAnimation voicePlay" ref="animate"></div>
                  <span>{{ item.duration | convertms}} </span>
                </div>
                <div class="whatsay_text" v-else-if="item.msgType == 'PIC'" @click="makeLarge(item.msgContent)">
                  <img :src="item.msgContent" alt="">
                </div>
                <div @click="goItemDetail(JSON.parse(item.msgContent))" v-else-if="item.msgType=='CHECK'" class="whatsay_text">
                  <div class="jcItem border-1px">
                    <p>{{ JSON.parse(item.msgContent).type == 'CHECK' ? '检查单' : '检验单' }}</p>
                    <p>{{ JSON.parse(item.msgContent).inspectionTypeName }}</p>
                    <p>{{ JSON.parse(item.msgContent).inspectionItemName }}</p>
                  </div>
                  <div class="seeJcDetail">
                    <p>查看详情</p>
                  </div>
                </div>
                <div @click="goItemDetail(JSON.parse(item.msgContent))" v-else-if="item.msgType=='INSPECT'" class="whatsay_text">
                  <div class="jcItem border-1px">
                    <p>{{ JSON.parse(item.msgContent).type == 'CHECK' ? '检查单' : '检验单' }}</p>
                    <p>{{ JSON.parse(item.msgContent).inspectionTypeName }}</p>
                    <p>{{ JSON.parse(item.msgContent).inspectionItemName }}</p>
                  </div>
                  <div class="seeJcDetail">
                    <p>查看详情</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="assistScroll">

        </div>
      </section>

    </scroll>
    <footer v-if="vipStatus == false" class="payButton" @click="goDocCard()">
      <div class="payWrap">
        <button>咨询医生</button>
      </div>
    </footer>
    <footer :class="{footshow:seeMore}" ref="footer" v-else>
      <section class="foot_top">
        <div class="picture">
          <input type="file" name="picture" id="upPicture" ref="picture" @change="onFileChange">
          <img src="../../../static/img/图片.png" alt="" @click="selectImg()">
        </div>
        <div class="chatInput">
          <textarea type="text" id="forInput"  maxlength="200" @blur="blured" @focus="focus()" ref="inputFocus"
                    v-model="inputInfo" @input="whatInput"></textarea>
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
    <v-mask v-if="showMask"></v-mask>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../../base/header'
  import Scroll from '../../base/scroll'
  import http from '../../lib/http'
  import {convertms} from '../../lib/filter'
  //  import dialog from '../../../base/dialog'
  import Toast from '../../base/toast'
  import {Todate} from '../../lib/filter'
  import mask from '../../base/mask.vue'
  //  import consultPatAva from "../../../utils/consultPatAva"
  import {jssdkMixin} from "../../lib/mixin"

  export default {
    data() {
      return {
        title: "",
        rightTitle: "医生名片",
        waitImg: "",
        followId: "",
        seeMore: false,
        light: false,
        inputInfo: "",
        chatText: [],
        previewImg: [],
        consultId: "",
        aboutReplyMessage: [],
        attachImg: "",
        sendContent: "",
        attaFileUrl: "",
//        推送时得到的
        pushConsultId: "",
        returnInfo: "",
        showLargePic: false,
        largePic: "",
        showToast: false,
        messageLength: "",
        inter: "",
        aboutUserInfo: "",
        docId: "",
        vipStatus: "",
        showMask: false,
      }
    },
    mixins: [jssdkMixin],
    filters: {
      Todate,
      convertms
    },
    components: {
      "VHeader": header,
//      "VDialog": dialog,
      Scroll,
      Toast,
      'VMask': mask
    },
    created() {
      this.listenScroll = true
      this.probeType = 3
      this.followId = this.$route.params.id
      this.showToast = true
      this.$nextTick(() => {
           this.getInitChat()
      })

    },
    mounted() {
      let o = document.getElementsByClassName("chat")[0];
      let h = o.offsetHeight;  //高度
      let content = h
      setTimeout(() => {
        if (this.$refs.slideList.offsetHeight > content - 10) {
//                     console.log(that.$refs.slideList.offsetHeight)
          console.log("医生回复你了")
          this.$refs.conversation.scrollTo(0, content - this.$refs.slideList.offsetHeight - 80)
        }
      }, 10)

      setInterval(()=>{
        http("smarthos.follow.message.detail.list", {
          token: localStorage.getItem('token'),
          followId: this.followId,
          pageSize:1000
        }).then((data) => {
          console.log(data)
          this.showToast = false
          if (data.code == 0) {
             if(this.messageLength != data.list.length){
               this.$nextTick(() => {
                 this.aboutUserInfo = data.obj
                 this.aboutReplyMessage = data.list
                 this.title = data.obj.userDocVO.docName
                 this.waitImg = data.obj.userDocVO.docAvatar
                 this.vipStatus = data.obj.followDocpat.vipStatus

                 this.docId = data.obj.userDocVO.id
//              this.attachImg = data.obj.attaList
//              this.title = this.aboutConsult.docName
//              this.waitImg = this.aboutConsult.docAvatar ? this.aboutConsult.docAvatar : './static/img/doctor.m.png'

                 let o = document.getElementsByClassName("chat")[0];
                 let h = o.offsetHeight;  //高度
                 let content = h
                 console.log(o)


                 setTimeout(() => {
                   if (this.$refs.slideList.offsetHeight > content - 10) {
                     this.$refs.conversation.scrollTo(0, content - this.$refs.slideList.offsetHeight - 80)
                     console.log(this.$refs.slideList.offsetHeight)
                     console.log(content)
                   }
                 }, 300)
                 this.messageLength = data.list.length

               })
             }


          } else if (!(data.msg)) {
            weui.alert("网络错误，请稍后重试")
            console.log("错误的data")
            console.log(data)
            console.log("上面是错误的data")
          } else {
            if(data.msg == '医患关系不存在'){

            }else{
              weui.alert(data.msg)
            }
          }
        })
      },3000)




    },
    watch: {
      light(){
        clearInterval(this.inter)
      }
    },
    methods: {
      play(item,index){
        wx.ready(() => {

          for(var i=0;i<this.aboutReplyMessage.length;i++){
            if(document.getElementsByClassName('other')[i].getElementsByClassName('whatsay')[0].getElementsByClassName('playerArea')[0]){
              document.getElementsByClassName('other')[i].getElementsByClassName('whatsay')[0].getElementsByClassName('playerArea')[0].
              getElementsByTagName('div')[0].style.animationDuration = 0 + 's'
              this.$refs.playaudio[i].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].pause()
            }
          }
          if(this.$refs.playaudio[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].paused){
            this.$refs.playaudio[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].play()
            document.getElementsByClassName('other')[index].getElementsByClassName('whatsay')[0].getElementsByClassName('playerArea')[0].
            getElementsByTagName('div')[0].style.animationDuration = 1 + 's'
          }else{
            this.$refs.playaudio[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].pause()
            document.getElementsByClassName('other')[index].getElementsByClassName('whatsay')[0].getElementsByClassName('playerArea')[0].
            getElementsByTagName('div')[0].style.animationDuration = 0 + 's'
          }
          this.$refs.playaudio[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].onended = function(){
            document.getElementsByClassName('other')[index].getElementsByClassName('whatsay')[0].getElementsByClassName('playerArea')[0].
            getElementsByTagName('div')[0].style.animationDuration = 0 + 's'
          }

        })
      },
      goItemDetail(item){
        console.log(item)
        if(item.type == 'CHECK'){
          this.$router.push({
            path:"/displayJc",
            query:{id:item.id,patId:this.aboutUserInfo.userPat.id}
          })
        }else{
          this.$router.push({
            path:"/displayJy",
            query:{id:item.id,patId:this.aboutUserInfo.userPat.id}
          })
        }
      },
      goArticle(id) {
        console.log(id)
        http('smarthos.user.doc.article.get',{
          token:localStorage.getItem('token'),
          id:id
        }).then((data)=>{
            console.log(data)
            if(data.code == 0){
              this.$router.push({
                path: '/articleDetail',
                query:{articleId:id,docId:this.docId}
              })
            }else{
              weui.alert("该文章已被删除，无法查看！")
              return
            }
        })
      },
      getInitChat(){
        http("smarthos.follow.message.detail.list", {
          token: localStorage.getItem('token'),
          followId: this.followId,
          pageSize:1000
        }).then((data) => {
          console.log(data)
          this.showToast = false
          if (data.code == 0) {
            this.messageLength = data.list.length
            this.$nextTick(() => {
              this.aboutUserInfo = data.obj
              this.aboutReplyMessage = data.list
              this.title = data.obj.userDocVO.docName
              this.waitImg = data.obj.userDocVO.docAvatar
              this.vipStatus = data.obj.followDocpat.vipStatus

              this.docId = data.obj.userDocVO.id
//              this.attachImg = data.obj.attaList
//              this.title = this.aboutConsult.docName
//              this.waitImg = this.aboutConsult.docAvatar ? this.aboutConsult.docAvatar : './static/img/doctor.m.png'

              let o = document.getElementsByClassName("chat")[0];
              let h = o.offsetHeight;  //高度
              let content = h
              console.log(o)


              setTimeout(() => {
                if (this.$refs.slideList.offsetHeight > content - 10) {
                  this.$refs.conversation.scrollTo(0, content - this.$refs.slideList.offsetHeight - 80)
                  console.log(this.$refs.slideList.offsetHeight)
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
            if(data.msg == '医患关系不存在'){

            }else{
              weui.alert(data.msg)
            }
          }
        })
      },
      goDocCard() {
        this.$router.push('/docCard/' + this.docId)
      },
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
      makeLarge(img) {
        wx.previewImage({
          current: img,
          urls: [img]
        })
      },
      makeSmall() {
        this.showLargePic = false
        this.showMask = false
      },
      closeAll() {
        this.showAllDialog = false
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
      send() {
        http("smarthos.follow.message.add", {
          token: localStorage.getItem('token'),
          followId: this.followId,
          msgType: "TEXT",
          msgContent: this.inputInfo,
//          attaIdList:this.attaId
        }).then((data) => {
          console.log(data)
          this.seeMore = false
          this.$nextTick(() => {
            this.aboutReplyMessage.push(data.obj)
            console.log(this.aboutReplyMessage)
            let o = document.getElementsByClassName("chat")[0];
            let h = o.offsetHeight;  //高度
            let content = h
            console.log(o)
            setTimeout(() => {
              if (this.$refs.slideList.offsetHeight > content - 10) {
                console.log(this.$refs.slideList.offsetHeight)
                this.$refs.conversation.scrollTo(0, content - this.$refs.slideList.offsetHeight - 80)
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
            module: "FOLLOW",
            fileType: "IMAGE",
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
                          that.$refs.conversation.scrollTo(0, content - that.$refs.slideList.offsetHeight - 80)
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

  .conversation {
    width: 100%;
    /*padding-top: 50px;*/
    /*overflow: auto;*/
    /*height: 500px;*/
    position: absolute;
    top: 88px;
    bottom: 90px;
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

  .assistScroll {
    height: 65px;
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
        margin: 0 auto;
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
        .msgTime {
          position: absolute;
          top: -45px;
          left: 265px;
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
            .checkMore {
              height: 24px;
              width: 16px;
            }
            audio {
              width: 200px;
            }
            .playAnimation{
              /*position: absolute;*/
              /*left:50px;*/
              /*top: 20px;*/
              width: 44px;
              height: 44px;
              margin-left: 30px;
              background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=)  right 0 no-repeat;
              z-index:100;
            }
            .voicePlay{
              animation-name: voice;
              /*animation-duration: 1s;*/
              animation-direction: normal;
              animation-iteration-count: infinite;
              animation-timing-function: steps(3);
            }
            @keyframes voice {
              0% {
                background-position: 0;
              }
              100% {
                background-position: 100%;
              }
            }
            img {
              border-radius: 0;
              margin-left: 0;
              margin-right: 5px;
              width: 110px;
              height: 110px;
            }
            .jcItem{
              margin-left: 0;
              width:300px;
              background-color:#ffffff;
              border-top-right-radius: 20px;
              border-top-left-radius: 20px;
              p{
                padding:15px 15px 5px 15px;
                font-size: 30px;
                color: #333333;
              }
            }
            .seeJcDetail{
              width:300px;
              margin-left: 0;
              background-color: #ffffff;
              text-align: center;
              height:60px;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 20px;
              p{
                color: #3d9bff;
                font-size: 32px;
                height: 60px;
                line-height: 60px;
              }
            }
          }
          .playerArea{
            position: relative;
            width: 304px;
            height:80px;
            background-color: white;
            background-image: url("../../../static/img/player.png");
            background-size: 304px 80px;
            span{
              position: absolute;
              color: white;
              top:17px;
              right:50px;
            }
          }
          .articleSection {
            display: flex;
            align-items: center;
            div {
              margin-right: 40px;
            }
          }
        }
      }
      .mysay {
        display: flex;
        margin-top: 60px;
        flex-direction: row-reverse;
        .msgTime {
          width: 217px;
          /*text-align: right;*/
          position: absolute;
          top: -45px;
          right: 265px;
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
            .playAnimation{
              /*position: absolute;*/
              /*left:50px;*/
              /*top: 20px;*/
              width: 44px;
              height: 44px;
              margin-left: 30px;
              background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=)  right 0 no-repeat;
              z-index:100;
            }
            .voicePlay{
              animation-name: voice;
              /*animation-duration: 1s;*/
              animation-direction: normal;
              animation-iteration-count: infinite;
              animation-timing-function: steps(3);
            }
            @keyframes voice {
              0% {
                background-position: 0;
              }
              100% {
                background-position: 100%;
              }
            }
            .checkMore {
              height: 24px;
              width: 16px;
            }
          }
          .playerArea{
            position: relative;
            width: 304px;
            height:80px;
            background-color: white;
            background-image: url("../../../static/img/player.png");
            background-size: 304px 80px;
            span{
              position: absolute;
              color: white;
              top:17px;
              right:50px;
            }
          }
          .articleSection {
            display: flex;
            align-items: center;
            div {
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
    position: absolute;
    bottom: 0;
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
          width: 75px;
          height: 75px;
          display: block;
          padding-top: 13px;
          /*margin-bottom: 5px;*/
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
        width: 480px;
        margin-left: 20px;
        text-align: center;
        textarea {
          width: 480px;
          min-height: 34px;
          border: none;
          font-size: 32px;
          outline: medium;
          word-break: break-all;
          word-wrap: break-word;
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
        padding-left: 20px;
        /*background-color: dodgerblue;*/
        text-align: center;
        .send {
          width: 110px;
          height: 70px;
          margin-right: 5px;
          margin-top: 8px;
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
          width: 110px;
          height: 75px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
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
