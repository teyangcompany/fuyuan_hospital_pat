<template>
  <div class="page">
    <!--<top class="noflex" title="" ref="header">-->
      <!--&lt;!&ndash;<i slot="back" @click="goBack"></i>&ndash;&gt;-->
      <!--<div slot="right" class="right absolute" v-if="consultInfo.consultStatus=='3'" @click="closeConsult">结束咨询</div>-->
    <!--</top>-->
    <v-header :title="title" :rightTitle="rightOverTitle" v-if="consultInfo.consultStatus=='3'" @on-docCard="closeConsult"></v-header>
    <v-header :title="title" :rightTitle="rightTitle" v-else></v-header>
    <div class="wrapper" ref="Scroll" @click="closeCheckList">
      <div>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>
                <span class="bf">患者资料： {{consultInfo.consulterName}}
                    {{consultInfo.consulterGender = 'M' ? '男' : '女'}}
                  {{consultInfo.consulterAge}}
                </span>
              </p>
            </div>
            <!--<div class="weui-cell__ft bfc"></div>-->
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>
                <span class="bf">
                    疾病名称：{{consultInfo.illnessName}}
                </span>
              </p>
            </div>
            <!--<div class="weui-cell__ft bfc"></div>-->
          </a>

        </div>
        <div class="contain">
          <div class="wrapCon">
            <span class="bf mainCon">{{consultInfo.consultContent}}</span>
          </div>
          <div class="patImg">
            <div v-for="item in attaList" class="thumb">
              <img :src="item.attaFileUrl" alt="" @touchend.prevent="bigImg(item.attaFileUrl)">
            </div>
          </div>
          <div class="createDiv">
                        <span class="mfc create">
                          <img :src="userPat.patAvatar" alt="" v-if="userPat.patAvatar">
                          <img src="../../../static/img/pat.f.jpg" alt=""
                               v-else-if="!(userPat.patAvatar) && userPat.patGender != 'M'">
                          <img src="../../../static/img/pat.m.jpg" alt="" v-else>
                          <span v-if="consultInfo.consulterName">{{consultInfo.consulterName}}</span>
                        </span>
            <span class="date">{{consultInfo.createTime | exactTime}} |
                          <span v-if="consultInfo.replyCount">{{consultInfo.replyCount}}条回复</span>
                          <span v-else>暂无回复</span>
                        </span>
          </div>
        </div>
        <div class="answerList" v-for="(item,index) in arr" ref="lastItem" @click="play(item,index)">
          <div class="patAnswer" v-if="item.consultMessage.replierType == 'DOC'">
            <div class="docImg">
              <img :src="item.userDocVo.docAvatar" alt="" v-if="item.userDocVo.docAvatar">
              <img src="../../../static/img/doctorM.png" alt="" v-else>
            </div>
            <div class="docMsg">
              <p>
                <span class="mf">{{item.userDocVo.docName}}</span>
                <span class="mfc">{{item.userDocVo.docTitle}} {{ item.userDocVo.deptName }}</span>
              </p>
              <p>
                <span class="mfc fromTime">{{item.consultMessage.createTime | exactTime}}</span>
              </p>
            </div>
          </div>
          <div v-else class="patAnswer">
            <div class="docImg">
              <img :src="item.userPat.patAvatar" alt="" v-if="item.userPat.patAvatar">
              <img src="../../../static/img/pat.m.jpg" alt=""
                   v-else-if="!(item.userPat.patAvatar) && item.userPat.patGender == 'M'">
              <img src="../../../static/img/pat.f.jpg" alt="" v-else>
            </div>
            <div class="docMsg">
              <p>
                <span class="mf" v-if="item.userPat.patName">{{item.userPat.patName}}</span>
                <!--<span class="mfc">&nbsp;&nbsp;&nbsp;{{item.userPat.patTitle}}</span>-->
              </p>
              <p>
                <span class="mfc fromTime">{{item.consultMessage.createTime | exactTime}}</span>
              </p>
            </div>
          </div>
          <div v-if="item.consultMessage.replyContentType=='TEXT'" class="replyCon">
            <span class="bf">
                {{item.consultMessage.replyContent}}
            </span>
          </div>
          <div v-else-if="item.consultMessage.replyContentType=='ARTICLE'" class="replyCon"
               @click="goArticleDetail(JSON.parse(item.consultMessage.replyContent).articleId)">
            <div class="jcItem border-1px-white">
              <p>标题：{{ JSON.parse(item.consultMessage.replyContent).title}}</p>
              <p>作者：{{ JSON.parse(item.consultMessage.replyContent).author}}</p>
            </div>
            <div class="seeJcDetail">
              <p>查看详情</p>
            </div>
          </div>
          <div v-else-if="item.consultMessage.replyContentType=='PIC'" class="replyCon">
            <img class="replyImg" :src="item.consultMessage.replyContent" alt=""
                 @touchend.stop="makeLarge(item.consultMessage.replyContent)">
          </div>
          <div v-else-if="item.consultMessage.replyContentType=='AUDIO'" class="replyCon playerArea">
            <audio :src="item.consultMessage.replyContent"></audio>
            <div class="playAnimation voicePlay" ref="animate"></div>
            <span>{{ item.consultMessage.duration | convertms}} </span>
          </div>
          <div @click="goItemDetail(item.consultMessage.newContent)" v-else-if="item.consultMessage.replyContentType=='CHECK'" class="replyCon">
            <div class="jcItem border-1px-white">
              <p>{{ item.consultMessage.newContent.type == 'CHECK' ? '检查单' : '检验单' }}</p>
              <p>{{ item.consultMessage.newContent.inspectionTypeName }}</p>
              <p>{{ item.consultMessage.newContent.inspectionItemName }}</p>
            </div>
            <div class="seeJcDetail">
              <p>查看详情</p>
            </div>
          </div>
          <div @click="goItemDetail(item.consultMessage.newContent)" v-else-if="item.consultMessage.replyContentType=='INSPECT'" class="replyCon">
            <div class="jcItem border-1px-white">
              <p>{{ item.consultMessage.newContent.type == 'CHECK' ? '检查单' : '检验单' }}</p>
              <p>{{ item.consultMessage.newContent.inspectionTypeName }}</p>
              <p>{{ item.consultMessage.newContent.inspectionItemName }}</p>
            </div>
            <div class="seeJcDetail">
              <p>查看详情</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="consultInfo.consultStatus=='3'"  ref="footer" class="bottom footer">

      <section class="foot_top">
        <div class="picture">
          <input type="file" name="picture" id="upPicture" ref="picture" @change="upLoad">
          <img src="../../../static/img/图片.png" alt="" @click="selectImg()">
        </div>
        <div class="chatInput">
          <input type="text" id="inputArea" maxlength="100" @blur="blured" @focus="focus()" ref="inputFocus"
                 v-model="text" @input="whatInput" class="input-text">
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


      <!--<div class="robot-room-wirte yk-box yk-cell">-->
        <!--&lt;!&ndash;<div class="talkImg">&ndash;&gt;-->
        <!--&lt;!&ndash;<img src="../../../static/img/talk.png" alt="" @click="setType">&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="audioInput mfc" v-show="type=='audio'" ref="recordButton">&ndash;&gt;-->
        <!--&lt;!&ndash;{{msg}}&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<div class="yk-cell-bd mr10">-->
          <!--<input :message="clean" v-model="text"  class="input-text"/>-->
        <!--</div>-->
        <!--<div v-if="text == ''" class="showJia" @click="showCheckList">-->
          <!--<span class="jia">+</span>-->
        <!--</div>-->
        <!--<button v-if="text != ''" class="send-btn" @click="send">发送</button>-->
      <!--</div>-->
      <!--<div class="checkList" v-show="checkList">-->
        <!--<div class="upload">-->
          <!--<label for="upload_img" class="label_img">图片</label>-->
          <!--<input type="file" id="upload_img" @change="upLoad">-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="btn" v-show="consultInfo.consultStatus=='1' || consultInfo.consultStatus=='2'">
      <p class="mfb reply">请等待医生回复，48小时未回复自动退款</p>
    </div>
    <div class="cancel" v-show="consultInfo.consultStatus=='-1'">
        <p class="">问诊已取消</p>
        <p class="">如有退款将在7~10个工作日返回您的支付账户</p>
    </div>
    <div class="btn" v-show="consultInfo.consultStatus=='0'">
      <span class="mfb evaluate bor" @click="cancelConsult">取消申请</span>
      <span class="mfb evaluate" @click="goPay">付款{{ consultInfo.payFee | consultPrice}}元</span>
    </div>
    <div class="btn" v-show="consultInfo.consultStatus=='4'">
      <span class="mfb evaluate bor" @click="consultAgain">再次咨询</span>
      <span class="mfb evaluate" @click="comment">评价</span>
    </div>
    <div class="btn" v-show="consultInfo.consultStatus=='6'" @click="consultAgain">
      <p class="mfb reply ">再次咨询</p>
    </div>
    <toast v-if="showToast"></toast>
    <v-dialog @on-cancel="over" @on-download="overConsult" v-if="showOverConsult"
              :dialogTitle="dialogOverTitle"
              :dialogMain="dialogOverMain"
              :dialogLeftFoot="dialogOverLeft"
              :dialogRightFoot="dialogOverRight"
    ></v-dialog>
    <v-dialog :dialogTitle="dialogTitle"
              :dialogMain="dialogMain"
              :dialogLeftFoot="dialogLeftFoot"
              :dialogRightFoot="dialogRightFoot"
              v-if="showDialog"
              @on-cancel="cancelDialog" @on-download="cancelApply"></v-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/app-header.vue'
  import BScroll from 'better-scroll'
  import header from '../../base/header.vue'
  import editDiv from '../../components/editDiv.vue'
  import api from '../../lib/http'
  import {goodTime, Getdate,exactTime,consultPrice,convertms} from '../../lib/filter'
  import ajax from '../../lib/ajax'
  import dialog from '../../base/dialog.vue'
  import Toast from '../../base/toast.vue'
  export default {
    components: {
      top,
      editDiv,
      Toast,
      "VDialog": dialog,
      "VHeader":header
    },
    data() {
      return {
        title:"科室咨询",
        rightTitle:"",
        rightOverTitle:"结束咨询",
        showToast:false,
        flag: true,
        text: '',
        clean: false,
        light: false,
        inter:"",
        checkList: false,
        type: "text",
        time: '',
        msg: '按住说话',
        arr: [],
        consultId: "",
        token: localStorage.getItem('token'),
        attaList: [],
        consultInfo: {},
        userPat: {},
        picURL:"",
        docId:"",
        noReadReplyCount: Number,
        replyContentType: "TEXT",
        showOverConsult: false,
        dialogOverTitle: "结束咨询",
        dialogOverMain: "结束咨询后双方都无法继续回复。请酌情使用该功能",
        dialogOverLeft: "取消",
        dialogOverRight: "确定结束",
        dialogTitle: "取消申请",
        dialogMain: "确定取消申请",
        dialogLeftFoot: "取消",
        dialogRightFoot: "确定",
        showDialog: false
      }
    },
    filters: {
      goodTime,
      Getdate,
      exactTime,
      consultPrice,
      convertms
    },
    mounted() {
      this.consultId = this.$route.params.id;
      this.getData()
      this.getInitChat()
//            this.$refs.recordButton.addEventListener("touchstart",this.startRecord);
//            this.$refs.recordButton.addEventListener("touchend",this.stopRecord);
//      this.scroll = new BScroll(this.$refs.Scroll, {
//        click: true,
//        probeType: 1,
//        bounce: true
//      });
    },
    watch: {
        arr(){
          setTimeout(() => {
            this.scroll = new BScroll(this.$refs.Scroll, {
              click: true,
              probeType: 1,
              bounce: true
            });
          }, 500)
        }
    },
    methods: {
      play(item,index){
//        wx.ready(() => {

          for(var i=0;i<this.arr.length;i++){
            if(document.getElementsByClassName('answerList')[i].getElementsByClassName('playerArea')[0]){
              document.getElementsByClassName('answerList')[i].getElementsByClassName('playerArea')[0].
              getElementsByTagName('div')[0].style.animationDuration = 0 + 's'
              this.$refs.lastItem[i].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].pause()
            }
          }
          if(this.$refs.lastItem[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].paused){
            this.$refs.lastItem[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].play()
            document.getElementsByClassName('answerList')[index].getElementsByClassName('playerArea')[0].
            getElementsByTagName('div')[0].style.animationDuration = 1 + 's'
          }else{
            this.$refs.lastItem[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].pause()
            document.getElementsByClassName('answerList')[index].getElementsByClassName('playerArea')[0].
            getElementsByTagName('div')[0].style.animationDuration = 0 + 's'
          }
          this.$refs.lastItem[index].getElementsByClassName('playerArea')[0].getElementsByTagName('audio')[0].onended = function(){
            document.getElementsByClassName('answerList')[index].getElementsByClassName('playerArea')[0].
            getElementsByTagName('div')[0].style.animationDuration = 0 + 's'
          }

//        })
      },
      goArticleDetail(id) {
        console.log(id)
        api('smarthos.user.doc.article.get',{
          token:localStorage.getItem('token'),
          id:id
        }).then((data)=>{
          console.log(data)
          if(data.code == 0){
            this.$router.push({
              path: '/articleDetail',
              query:{articleId:id}
            })
          }else{
            weui.alert("该文章已被删除，无法查看！")
            return
          }
        })
      },
      goItemDetail(item){
        console.log(item)
        if(item.type == 'CHECK'){
          this.$router.push({
            path:"/displayJc",
            query:{id:item.id,patId:this.userPat.id}
          })
        }else{
          this.$router.push({
            path:"/displayJy",
            query:{id:item.id,patId:this.userPat.id}
          })
        }
      },
      //显示大图
      bigImg(img) {
        console.log("12")
        let urls = [];
        this.attaList.forEach((res) => {
          urls.push(res.attaFileUrl)
        });
        wx.previewImage({
          current: img,
          urls: urls
        })
//                this.$weui.gallery(url, {
//                    onDelete: function(){
//
//                    }
//                });
      },
//            一张一张的显示大图
      makeLarge(url) {
          console.log("123")
        wx.previewImage({
          current: url,
          urls: [url]
        })
      },
      //上传图片
      upLoad(e) {
        var file = e.target.files[0];
        var fileName = e.target.files[0].name;
        ajax('smarthos.system.file.upload', file, 'IMAGE', fileName, "PAT").then(res => {
          if (res.succ) {
            this.picURL = res.obj.attaFileUrl;
            console.log(res.obj.attaFileUrl, 7777)

            api('smarthos.consult.platform.pic.reply', {
              token: this.token,
              consultId: this.consultId,
              replyContent: this.picURL,
              replyContentType: "PIC"
            }).then(res => {
              if (res.succ) {
                console.log(res, 598976);
                this.getData();
                this.getInitChat()
                this.$set(this.$data, 'clean', !this.clean);
                this.text = ''
              } else {
                alert(res.msg)
              }
            })






          } else {
            alert(res.msg)
          }
        })
      },
      //结束咨询
      closeConsult() {
        this.showOverConsult = true
      },
      over() {
        this.showOverConsult = false
      },
      overConsult() {
        this.showOverConsult = false
        api("smarthos.consult.platform.pic.complete", {
          token: this.token,
          consultId: this.consultId
        }).then((data) => {
          if (data.code == 0) {
            this.getData()
            this.$router.push({
              path: "/evaluate/" + this.consultId,
              query: {consultType: this.consultInfo.consultType}
            })
          } else {
            weui.alert(data.msg)
          }
          console.log(data)
        })
      },
      //再次咨询
      consultAgain() {
        this.$router.push('/docCard/'+this.docId)
      },
      //评价
      comment() {
        this.$router.push({
          path: "/evaluate/" + this.consultId,
          query: {consultType: this.consultInfo.consultType}
        })
      },
      //付款
      goPay() {
        this.$router.push({
          path: '/pay/' + this.consultId,
          query: {paySort: 'dept', fee: this.consultInfo.payFee}
        })
      },
      //取消申请
      cancelConsult() {
        this.showDialog = true
      },
      cancelDialog() {
        this.showDialog = false
      },
      cancelApply() {
        this.showDialog = false
        api("smarthos.consult.pic.cancel", {
          token: localStorage.getItem('token'),
          consultId: this.consultId
        }).then((data) => {
          if (data.code == 0) {
            this.getData()
          } else {
            weui.alert(data.msg)
          }
          console.log(data)
        })
      },
      getInitChat() {
        api("smarthos.consult.message.list.page", {
          token: localStorage.getItem('token'),
          consultId: this.consultId,
          pageSize: 1000
        }).then((data) => {
          if (data.code == 0) {
            this.arr = data.list
            this.arr.forEach((item)=>{
              if(item.consultMessage.replyContentType == 'INSPECT' || item.consultMessage.replyContentType == 'CHECK'){
                item.consultMessage.newContent =  JSON.parse(item.consultMessage.replyContent)
              }
            })
            console.log(data)
          } else {
            weui.alert(data.msg)
          }
        })
      },
      getData() {
          this.showToast = true
        api('smarthos.consult.details', {
          token: this.token,
          consultId: this.consultId
        }).then(res => {
          this.showToast = false
          console.log(res, 352679);
          if (res.succ) {
            this.attaList = res.obj.attaList;
            this.consultInfo = res.obj.consultInfo;
            this.userPat = res.obj.userPat;
            this.noReadReplyCount = res.obj.noReadReplyCount;
            res.obj.consultMessage ? this.arr = res.obj.consultMessage : "";
            res.obj.userDocVo ? this.docId = res.obj.userDocVo.id : this.docId = '';

            setTimeout(() => {
              this.scroll = new BScroll(this.$refs.Scroll, {
                click: true,
                probeType: 1,
                bounce: true
              });
//                          this.scroll.scrollToElement(this.$refs.lastItem[this.$refs.lastItem.length-1])

            }, 300)
          } else {
            alert(res.msg)
          }
        })
      },
      goBack() {
        this.$router.push({
          path: "/my/consultService/myConsult"
        })
      },
      selectImg(e) {
        this.$refs.picture.click()
      },
      blured() {
        clearInterval(this.inter)
      },
      focus() {
        this.inter = setInterval(() => {
          document.getElementsByClassName("foot_top")[0].scrollIntoView()
        }, 500)
      },
      whatInput() {
        if (this.text.replace(/\s+/g, "") == '') {
          this.light = false
        } else {
          this.light = true
        }
        this.inter = setInterval(() => {
          document.getElementsByClassName("foot_top")[0].scrollIntoView()
        }, 500)
      },
      send() {
        console.log(this.text, 22222);
//        this.text.indexOf('http') == '-1' ? this.replyContentType = 'TEXT' : this.replyContentType = 'PIC';
        api('smarthos.consult.platform.pic.reply', {
          token: this.token,
          consultId: this.consultId,
          replyContent: this.text,
          replyContentType: "TEXT"
        }).then(res => {
          if (res.succ) {
            console.log(res, 598976);
            this.getData();
            this.getInitChat()
            this.$set(this.$data, 'clean', !this.clean);
            this.text = ''
          } else {
            alert(res.msg)
          }
        })


      },

//            startRecord(){
//                this.time= new Date();
//                this.$set(this.$data,'msg','松开结束')
//                this.$refs.recordButton.style.background = 'gainsboro'
//
//            },
//            stopRecord(){
//                this.$set(this.$data,'msg','按住录音');
//                this.$refs.recordButton.style.background = 'white'
//                var interval = new Date()-this.time  ;
//                if (interval<500){
//                   alert("录制时间过短");
//                    return;
//                }
//
//            },
//            setType(event){
//                console.log(event.target,9999);
//                if(this.type=='text'){
//                    this.type='audio';
//                    event.target.src=' ./static/img/chat.png'
//                }else {
//                    this.type='text';
//                    event.target.src='./static/img/talk.png'
//                }
//
//            },
      showCheckList() {
        this.checkList = !this.checkList
//                this.$set(this.$data,'checkList',true)
      },
      closeCheckList() {
        this.$set(this.$data, 'checkList', false)
      },

    }
  }
</script>
<style scoped lang='scss'>
  @import '../../common/common.scss';

  .evaluate {
    display: inline-block;
    width: 49%;
    text-align: center;
    height: 80px;
    line-height: 80px;
  }

  .bor {
    border-right: 1px solid gainsboro;
  }

  .replyImg {
    width: 150px;
    height: 150px;
    margin: 10px;
  }
  .cancel{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height:90px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p{
      color: #333333;
      font-size: 32px;
    }
  }
  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height:90px;
    background: white;
    display: flex;
    align-items: center;
    .cancelStatus{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height:90px;
      p{
        line-height:35px;
        text-align: center;
        font-size: 26px;
        color: #666666;
        padding-top: 5px;
      }
    }
  }

  .footer {
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

  .reply {
    text-align: center;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
  }

  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 88px;
    bottom: 100px;

  }

  .step {
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
    font-size: 16px; /*no*/
  }

  .weui-cells {
    margin-top: 0;
  }

  .contain {
    background: white;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    .wrapCon{
       .mainCon{
           font-size: 30px;
           color: #333333;
       }
    }
    .createDiv {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .create {
        width: 200px;
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }
  }

  .print {
    float: right;
    color: orange;
  }

  .patImg {
    .thumb {
      overflow: hidden;
      display: inline-block;
      height: 160px;
      margin-right: 10px;
      margin-top: 10px;
    }
    img {
      width: 160px;
    }
  }

  .date {
    display: inline-block;
    float: right;
    font-size: 14px; /*no*/
    color: grey;
  }

  .answerList {
    padding: 20px;
    box-sizing: border-box;
    background: white;
    margin-top: 20px;
    .fromTime{
      margin-top: 5px;
      display: inline-block;
    }
    .replyCon{
      width: 500px;
      margin-top: 20px;
      margin-left: 100px;
      .playAnimation{
        position: absolute;
        left:50px;
        top: 15px;
        width: 44px;
        height: 44px;
        /*margin-left: 30px;*/
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
      span{
        font-size: 32px;
        color: #333333;
      }
      .jcItem{
        margin-left: 0;
        width:300px;
        background-color: #3d9bff;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        p{
          padding:15px 15px 5px 15px;
          font-size: 30px;
          color: #333333;
          color: #ffffff;
        }
      }
      .seeJcDetail{
        width:300px;
        margin-left: 0;
        background-color: #3d9bff;
        text-align: center;
        height:60px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        p{
          color: #ffffff;
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
  }

  .patAnswer {
    display: flex;
    align-items: center;

  }

  .docImg {
    img {
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 40px;
      margin: 0 20px 0 0;

    }
  }

  .patMusic {
    position: relative;
    margin-left: 80px;
    margin-top: 20px;
    width: 400px;
    height: 80px;
    img {
      display: inline-block;
      width: 400px;
      height: 80px;
    }
  }

  #music {
    display: none;
  }

  .musicDate {
    color: white;
    position: absolute;
    top: 0;
    right: 30px;
    height: 80px;
    line-height: 80px;
  }

  .musicImg {
    position: absolute;
    top: 12px;
    left: 30px;
    height: 80px;
    line-height: 80px;
    img {
      height: 48px;
      width: 40px;
    }
  }

  .bottom {
    height: auto;
    position: fixed;
    width: 100%;
    z-index: 998;
    left: 0;
    bottom: 0;
    background: white;
  }

  .mr10 {
    margin-right: 20px;
    width: 100%;
  }

  .audioInput {
    margin-right: 20px;
    width: 100%;
    text-align: center;
    border: 1px solid gainsboro;
    padding: 8px 10px;
    line-height: 42px;
    background: white;
    box-shadow: inset 0 0 18px #ddd;
  }

  .yk-cell {
    display: flex;
    align-items: center;
  }

  .yk-box {
    padding: 20px 30px
  }

  .robot-room-wirte {
    background: #eee;
    box-sizing: border-box;
    border-top: 1px solid #dedede;
  }

  .talkImg {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    img {
      display: inline-block;
      width: 60px;
      height: 60px;
      margin-right: 15px;
    }
  }

  .robot-room-wirte .input-text {
    display: block;
    border: none;
    outline: none;
    width: 100%;
    border: 1px solid #ddd;
    box-shadow: inset 0 0 18px #ddd;
    border-radius: 6px;
    resize: none;
    background: #fff;
    word-break: break-all;
    max-height: 180px;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 8px 10px;
    line-height: 42px;
    font-size: 28px;
  }

  .robot-room-wirte .input-text::-webkit-scrollbar {
    /*width: 0;*/
    /*opacity: 0;*/
    display: none;
  }

  .robot-room-wirte .showJia {
    width: 64px;
    height: 64px;
    line-height: 54px;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    border-radius: 32px;
    color: #454545;
    display: block;
    font-size: 32px;
    min-width: 64px;
    max-width: 64px;
    background: white;
    border: 1px solid #ddd;
    outline: none;
  }

  .robot-room-wirte .send-btn {
    width: 116px;
    height: 64px;
    line-height: 64px;
    box-sizing: border-box;
    background: #3d9bff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    color: white;
    display: block;
    font-size: 28px;
    min-width: 150px;
    /*max-width: 100px;*/
    background: #3d9bff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    outline: none;
    align-self: flex-end
  }

  .robot-room-wirte .send-btn:active {
    opacity: 0.6;
  }

  .checkList {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 40px;
  }

  .upload {
    display: flex;
    align-items: center;
  }

  #upload_img {
    display: none;
  }

  .label_img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    line-height: 100px;
    text-align: center;
    border: 1px solid darkgray;
  }
</style>
