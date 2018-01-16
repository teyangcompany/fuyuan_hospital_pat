<template>
  <div class="comment">
    <div class="myTitle">
      评价列表
    </div>
    <div class="docInfo">
      <div class="aboutDoc">
        <img :src="docInfo.docAvatar" alt="" v-if="docInfo.docAvatar">
        <img src="../../../static/img/doctorM.png" alt="" v-else>
        <p>{{  docInfo.docName }}</p>
      </div>
      <div class="aboutScore">
        <div class="star" v-if="docInfo.docScoure">
          <star :size="size" :score="docInfo.docScoure"></star>
        </div>
        <div class="star" v-else>
          <star :size="size" :score="emptyScore"></star>
        </div>
        <p v-if="docInfo.docScoure">{{ docInfo.docScoure }}分</p>
        <p v-else>暂无评价</p>
      </div>
    </div>
    <scroll class="commentList" :data="commentList" :pullup="pullup" @scrollToEnd="scrollToEnd">
      <div>
        <ul class="border-1px" v-for="item in commentList">
          <li >
            <div class="title">
              <span class="picConsult">  <star :size="24" :score="item.sysComment.score"></star> <span>{{ item.sysComment.score }}</span></span>
              <span class="consultTim">{{ item.sysComment.moduleDiyStr == 'PLATFORMPIC' ? '科室咨询' : '在线咨询'}}</span>
            </div>
            <div class="mainContent">
              <p>{{ item.sysComment.content }}</p>
            </div>
            <div class="ConsultRelate">

              <span class="name"></span>
              <span class="money">
                   <img :src="item.userPat.patAvatar" alt="" v-if="item.userPat.patAvatar" onerror="javascript:this.src='./static/img/pat-m.png'">
                    <img src="../../../static/img/pat-m.png" alt="" v-else>
                   <span class="number">{{ item.userPat.patName.substr(0,1) }}**</span>&nbsp;|&nbsp;<span>{{ item.sysComment.createTime | exactTime }}</span></span>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
  import header from '../../base/header.vue'
  import {goodTime,exactTime} from '../../lib/filter'
  import star from '../../base/star/star.vue'
  import scroll from '../../base/scroll.vue'
  import Toast from '../../base/toast.vue'
  import http from '../../lib/http'
  export default{
    data(){
      return{
        title:"评价列表",
        rightTitle:"",
        id:"",
        docInfo:"",
        commentList:[],
        showToast:false,
        size:36,
        docScore:0,
        emptyScore:0,
        pullup:true,
        listPage:1,
        dataLength:"",
        totalPages:""
      }
    },
    filters:{
      goodTime,
      exactTime
    },
    created(){
//      this.getDocInfo()
      this.id = this.$route.query.id
      this.docInfo = JSON.parse(localStorage.getItem('docInfo'))
      console.log(this.docInfo)
      this.getCommentList()
//          this.getCommentList()
    },
    methods:{
      getDocInfo(){
        http("smarthos.user.doc.get",{
          token:localStorage.getItem('token')
        }).then((data)=>{
          if(data.code == 0){
            console.log(data,111)
            this.id = data.obj.doc.id
            this.docInfo = data.obj.doc
            this.docScore = data.obj.doc.docScoure

          }else{
            this.$weui.alert(data.msg)
          }
        })
      },
      getCommentList(){
        this.showToast = true
        http("smarthos.system.comment.list.page",{
          commenteeId:this.id,
          commenteeType:'DOC',
          pageNum:1,
          pageSize:10
        }).then((data)=>{
          console.log(data,11)
          if(data.code == 0){
            this.showToast = false
            this.commentList = data.list
            this.totalPages = data.page.pages
          }else{
            this.$weui.alert(data.msg)
          }
        })
      },
      scrollToEnd(){
        if (this.preventRepeatRequest || this.commentList.length <10 || this.listPage >= this.totalPages) {
          return
        }
        this.preventRepeatRequest = true;
        this.listPage +=1;
        let that = this
        this.showToast = true
        http("smarthos.system.comment.list.page",{
          commenteeId:that.id,
          commenteeType:'DOC',
          pageNum:that.listPage,
          pageSize:"10",
        }).then((data)=>{
          this.showToast = false
          console.log(data,22)
          if(data.code == 0){
            for(var i=0;i<data.list.length; i++){
              this.commentList.push(data.list[i])
            }
            that.dataLength = data.list.length
            if(data.list.length >= 10){
              this.preventRepeatRequest = false;
            }
          } else{
            this.$weui.alert(data.msg)
          }
        })
      },
    },
    components:{
      "VHeader":header,
      star,
      scroll,
      Toast
    }
  }
</script>
<style scoped lang="scss">
  .comment{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-image: url("../../../static/img/背景.png");
    background-repeat: no-repeat;
    background-size: 750px 313px;
    .myTitle{
      height: 98px;
      line-height: 98px;
      padding-top: 25px;
      text-align: center;
      font-size: 36px;
      color: white;
    }
    .docInfo{
      width: 690px;
      height: 120px;
      margin:50px auto 0;
      display: flex;
      justify-content: space-between;
      .aboutDoc{
        flex:300px;
        display: flex;
        align-items: center;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }
        p{
          font-size: 32px;
          color: white;
        }
      }
      .aboutScore{
        width: 390px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .star{
          margin:16px 0 5px 0;
        }
        p{
          font-size: 32px;
          color: white;
          padding-right: 12px;
        }
      }
    }
    .commentList{
      width: 100%;
      /*margin: 60px auto 0;*/
      position: absolute;
      top:325px;
      left:0;
      right:0;
      bottom:0;
      overflow: hidden;
      background-color:white;
      ul {
        /*margin-top: 10px;*/
        /*margin-bottom: 10px;*/
        li {
          width: 690px;
          min-height: 200px;
          border-radius: 7px;
          list-style-type: none;
          margin: 0 auto;
          padding: 8px 8px 8px 8px;
          div.title {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            span.picConsult {
              font-size: 28px;
              color: #999999;
              display: flex;
              justify-content: space-between;
              span{
                margin-left: 15px;
              }
            }
            span.consultTim {
              font-size: 28px;
              color: #999999;
            }
          }
          div.mainContent {
            margin-top: 15px;
            margin-bottom: 15px;
            p {
              /*display: -webkit-box;*/
              /*-webkit-box-orient: vertical;*/
              /*-webkit-line-clamp: 2;*/
              /*overflow: hidden;*/
              font-size: 32px;
              color: #333333;
              min-height:80px;
              /*height: 52px;*/
              /*padding-top: 5px;*/
              word-break: break-all;
              /*background-color: #E64340;*/
            }
          }
          div.ConsultRelate {
            margin-top: 5px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span.name {
              font-size: 14px;
              color: gray;
            }
            span.money {
              font-size: 24px;
              color: #999999;
              display: flex;
              align-items: center;
              img{
                width: 40px;
                height: 40px;
                margin-right: 10px;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
</style>
