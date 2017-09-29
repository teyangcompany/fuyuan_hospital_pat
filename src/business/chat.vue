<template>
    <div class="pages" ref="pages">
      <scroll :height="scrollHeight" :data="chatList" ref="wrapper">
      <div  ref="talking"  class="wrap talk-detail" @click="cancel" >
          <div v-for="item of chatList" ref="item">
            <div class="leftMsg" v-if="item.msgSenderType=='PAT'" >
              <div class="otherImg">
                <img class="otherTitle" :src="patImg" alt="">
              </div>
              <div class="floatLeft">
                <div class="comment" v-show="item.msgType=='TEXT'">
                  {{item.msgContent}}
                </div>
                <div class="comment commentImg" v-show="item.msgType=='PIC'">
                  <img :src="item.msgContent" alt="" @load="getHeight" @click="bigImg(item.msgContent)">
                </div>
              </div>
            </div>
            <div class="rightMsg" v-else-if="item.msgSenderType=='DOC'">
              <div class="floatImg">
                <img class="titles" :src="docImg" alt="">
              </div>
              <div class="floatRight">
                <div class="com" v-show="item.msgType=='TEXT'">
                  {{item.msgContent}}
                </div>
                <div class="com commentImg" v-show="item.msgType=='PIC'" @load="getHeight" @click="bigImg(item.msgContent)">
                  <img :src="item.msgContent" alt="">
                </div>
              </div>
            </div>
          </div>
      </div >
        </scroll>
      <div  class="bottom" ref="bottomss">
        <div class="robot-room-wirte yk-box yk-cell">
          <div class="talkImg">
            <img src="../../static/img/talk.png" alt="" @click="setType">
          </div>
          <div class="audioInput mfc" v-show="type=='audio'" ref="recordButton">
            {{msg}}
          </div>
          <div class="yk-cell-bd mr10" v-show="type=='text'">
            <p  @input="changeText" @focus = getKeys  contenteditable="true" message="clean"  id="inputArea" class="input-text" ></p>
          </div>
          <div v-show="!text.length" class="showJia" @click="showCheckList"><span class="jia">+</span></div>
          <button v-show="text.length" class="send-btn" @click="send">发送</button>
        </div>
        <div  class="checkList" v-show="checkList">
          <div class="upload">
            <label for="upload_img" class="label_img">图片</label>
            <input  type="file" id="upload_img" @change="change"  accept="image/*">
          </div>
          <div class="upload" style="margin-left: 20px">
            <label  class="label_img">相机</label>
          </div>
        </div>
      </div>
    </div>


</template>
<script type="text/ecmascript-6">
  import editDiv from './editDiv.vue'
  import scroll from '../base/scroll.vue'
  import ajax from '../lib/ajax'
  export default{
    props:['chatObj','chatList'],
    components: {
      top,
      editDiv,
      scroll
    },
    data(){
      return {
        scrollHeight:"",
        talkObj:this.message,
        arr1:[],
        index:Number,
        consultId:'',
        consult:{},
        text:'',
        talkList:[],
        checkList:false,
        clean:true,
        attaList:[],
        attaIdList:[],
        pagesHeight:Number,
        type:"text",
        time:'',
        msg:'按住说话',
        arr:[],
        patImg:'',
        docImg:"",
      }
    },
    watch:{
      chatObj(){
        console.log(this.chatObj,666);
        this.patImg = this.chatObj.userPat.patAvatar
        this.docImg = this.chatObj.userDocVO.docAvatar
      },
      chatList(){
        console.log(7777);
        setTimeout(()=>{
          this.$refs.wrapper.scrollToElement(this.$refs.item[this.$refs.item.length-1]);
        },500)

      }
    },
    created(){
//      this.scrollHeight = window.innerHeight-45-40
    },
    mounted(){

      if(this.$route.params.val){
        this.arr1.push(this.$route.params.val)
      }
      console.log( this.arr1,88888)
//      this.$refs.btn.scrollIntoView(false);
      this.$refs.recordButton.addEventListener("touchstart",this.startRecord);
      this.$refs.recordButton.addEventListener("touchend",this.stopRecord);
      setTimeout(()=>{
        console.log(this.$refs.wrapper.$refs.wrapper.clientHeight,999999);
        console.log()
      },500)
    },
      beforeDestroy(){
          document.body.removeEventListener('touchmove', this.preventScroll,false);
      },
    methods:{
      //解决ios下键盘的问题
      getKeys(){
        this.$refs.bottom.scrollIntoView(true)
      },
      //放大图片
      bigImg(url){
        this.$weui.gallery(url, {
          className: 'custom-classname',
          onDelete: function(){
//            if(confirm('确定删除该图片？')){ console.log('删除'); }
//            gallery.hide(function() {
//              console.log('`gallery` has been hidden');
//            });
          }
        });
      },
      //图片加载完重新计算高度
      getHeight(){
        this.$refs.wrapper.refresh()
      },
      changeText(){
        console.log(document.getElementById('inputArea').innerText,333333)
        this.text = document.getElementById('inputArea').innerText;
      },
      goText(){
        this.$router.push({
          name:'articleText'
        })
      },

      send(){
        console.log(this.text,22222);
        this.$emit('send',this.text);
        this.arr1 = [];
        this.arr.push(this.text);
        this.$set(this.$data,'clean',!this.clean);
        document.getElementById('inputArea').innerText = "";
        this.text = ""
      },
      cancel(){
        console.log(21212)
        this.$set(this.$data,'checkList',false)
      },
      subscribeService(){
        this.$router.push({
          name:"subscribeService"
        })
      },
      startRecord(){
        this.time= new Date();
        this.$set(this.$data,'msg','松开结束')
        this.$refs.recordButton.style.background = 'gainsboro'

      },
      stopRecord(){
        this.$set(this.$data,'msg','按住录音');
        this.$refs.recordButton.style.background = 'white'
        var interval = new Date()-this.time  ;
        if (interval<500){
          alert("录制时间过短");
          return;
        }

      },
      setType(event){
        console.log(event.target,9999);
        if(this.type=='text'){
          this.type='audio';
          event.target.src=' ./static/img/chat.png'
        }else {
          this.type='text';
          event.target.src=' ./static/img/talk.png'
        }

      },
      showCheckList(){
        this.$set(this.$data,'checkList',true)
      },
      closeCheckList(){
        this.$set(this.$data,'checkList',false)
      },
      //发送图片
      change(e){
        console.log(e);
        var file = e.target.files[0];
        var fileName = e.target.files[0].name;
        ajax('smarthos.system.file.upload',file,'IMAGE',fileName,"PAT").then(res=>{
          console.log(res,7777);
          if(res.succ){
            this.$emit('send',{
              url:res.obj.attaFileUrl,
              msgType:"PIC"
            })
          }else {
            alert(res.msg)
          }
        })
      },
      getDetail(){
        this.$router.push({
          name:'arrangeDetail'
        })
      }
      
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/common.scss";
  .commentImg{
    img{
      width: 100%;
      height: auto;
      padding: 5px;
    }
  }
  .talkImg{
    width: 60px;
    height: 60px;
    margin-right: 15px;
  img{
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
  }
  .audioInput{
    margin-right: 20px;
    width: 100%;
    text-align: center;
    border: 1px solid gainsboro;
    padding: 8px 10px;
    line-height: 42px;
    background: white;
    box-shadow: inset 0 0 18px #ddd;
  }
.apply{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.applyLeft{
  height: 100%;
}
.applyRight{
  height: 100%;
}
.pages{
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;

}
  .contain{
    margin-top: 40px;
    box-sizing: border-box;
    padding: 20px;
  }
  .name{
    width: 120px;
    height: 120px;
    line-height: 120px;
    border-radius: 60px;
    text-align: center;
    background: white;
    float: right;
    margin-left: 10px;
  }
  .comment {
    width: 400px;
    min-height: 50px;
    position: relative;
    background: white;
    border-radius: 10px;
    float: right;
    line-height: 50px;
    max-height: 350px;
    word-wrap:break-word;
    word-break:break-all;
    padding: 14px 10px;
    box-sizing: border-box;

  }
  .DocinquiryImg{
    width: 92px;
    height: 92px;
    display: block;
  }

  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 10px;
    right: -24px;
    border: solid 16px;
    border-color: transparent transparent transparent white;
    font-size: 0;
  }
  .ImgBox{
    float: left;
    width: 92px;
    height: 92px;
  }
  .inquiryImg{
    width: 92px;
    height: 92px;
    display: block;
  }
  .com {
    width: 400px;
    min-height: 50px;
    line-height: 50px;
    height: auto;
    position: relative;
    background: lawngreen;
    border-radius: 10px;
    float: left;
    word-wrap:break-word;
    word-break:break-all;
    padding: 14px 10px;
    box-sizing: border-box;

  }

  .com:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 10px;
    left: -24px;
    border: solid 16px;
    border-color:  transparent lawngreen transparent transparent;
    font-size: 0;
  }
  .btn{
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    z-index: 666;
  }

  .wrap{
    flex:1;
    overflow: auto;
    padding-top: 30px;
    padding-bottom: 120px;
    -webkit-overflow-scrolling: touch;

  }
  .talk-detail{
    margin-bottom: 2px;
  }


  .rightMsg{
    overflow: hidden;
  }
  .leftMsg{
    overflow: hidden;
  }
  .floatRight{
    float: left;
    height: auto;
    margin-bottom: 20px;
    margin-left: 5px;
  }
  .floatLeft{
    float: right;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .floatImg{
    float: left;
  }
  .otherImg{
    float: right;
  }
  .title{
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border-radius: 40px;
    /*padding-left: 5*2px;*/
  }
  .otherTitle{
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border-radius: 40px;
    /*padding-right: 5*2px;*/
  }
  .titles{
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border-radius: 40px;
  }

  .input-msg input{
    height: 46px;
    width: 92%;
    margin-top: -24px;
    outline: none;
    border: none;
  }
  .input-msg a{
    text-decoration: none;
    width: 100px;
  }
  .input-msg a span{
    display: inline-block;
    background: greenyellow;
    width: 80px;
    text-align: center;
  }


  .mr10 {
    margin-right: 20px;
    width: 100%;
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
  .robot-room-wirte .input-text {
    -webkit-user-select: auto;
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
  .robot-room-wirte .showJia{
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
    width: 76px;
    height: 64px;
    line-height: 64px;
    box-sizing: border-box;
    background: greenyellow;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    color: #454545;
    display: block;
    font-size: 28px;
    min-width: 100px;
    max-width: 100px;
    background: greenyellow;
    border: 1px solid #ddd;
    box-sizing: border-box;
    outline: none;
    align-self: flex-end
  }
  .robot-room-wirte .send-btn:active {
    opacity: 0.6;
  }

  .checkList{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 40px;
  }
  .upload{
    display: flex;
    align-items: center;
  }
  #upload_img{
    display: none;
  }
  .label_img{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    line-height: 100px;
    text-align: center;
    border: 1px solid darkgray;
  }
.bottom{
  height: auto;
  /*position: fixed;*/
  /*width: 100%;*/
  /*z-index: 998;*/
  /*left: 0;*/
  /*bottom: 0;*/
  background: white;
}


.checkList{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 40px;
}
.upload{
  display: flex;
  align-items: center;
}
#upload_img{
  display: none;
}
.label_img{
  width: 100px;
  height: 100px;
  border-radius: 10px;
  line-height: 100px;
  text-align: center;
  border: 1px solid darkgray;
}
</style>
