<template>
  <div class="page">
    <app-header class="noflex" title="我的医生" ref="header">
      <div class="right absolute" slot="right">找医生</div>
    </app-header>
    <scroll :height="scrollHeight" :data="list">
        <div class="wrapper">
          <div class="nav">
            <ul>
              <li v-for="item in nav" :class="[item.name]" @click="goPath(item.path)">
                <div class="icon"></div>
                <div class="text">{{item.value}}</div>
              </li>
            </ul>
          </div>
          <div class="title">最新消息</div>
          <div class="list">
            <ul>
              <li v-if="list.length>0"  v-for="item in list" @click="goDocChat(item.followMessage.followId)">
                <div class="ava">
                  <img v-if="item.userDoc.docAvatar"
                          :src="item.userDoc.docAvatar"
                          alt="">
                  <img src="../../../static/img/doctorM.png" alt="" v-else>
                </div>
                <div class="info">
                  <h3 v-if="item.userDoc">
                    <div class="name">{{item.userDoc.docName}}</div>
                    <div class="dept">{{item.userDoc.docTitle}}</div>
                    <div class="time">{{item.followMessage.createTime | Todate}}</div>
                  </h3>
                  <div class="content" v-if="item.userDoc">
                   <span v-if="item.followMessage.msgType=='ARTICLE'">[文章]</span>
                   <span v-else-if="item.followMessage.msgType=='TEXT'">{{ item.followMessage.msgContent }}</span>
                  <span v-else-if="item.followMessage.msgType=='PIC'">[图片]</span>
                  <span v-else-if="item.followMessage.msgType=='AUDIO'">[语音消息]</span>
                  <span v-else-if="item.followMessage.msgType=='VEDIO'">[视频消息]</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </scroll>

    <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import AppFooter from "../../components/app-footer.vue"
  import AppHeader from "../../components/app-header.vue"
  import {mainHeightMixin} from "../../lib/mixin"
  import config from "../../lib/config"
  import api from '../../lib/http'
  import {Todate} from '../../lib/filter'
  import scroll from '../../base/scroll.vue'

  export default {
    data() {
      return {
        currentNav: 1,
        nav: config.my_doc_nav,
        token:localStorage.getItem('token'),
        list:[],
        scrollHeight:""
      };
    },
    filters:{
      Todate
    },
    created(){
      this.scrollHeight = window.innerHeight-60-45;
      console.log(this.scrollHeight,99999)
    },
    computed: {},
    components: {
      AppFooter,
      AppHeader,
      scroll
    },
    mounted() {
      this.getData()
    },
    beforeDestroy() {

    },
    methods: {
      goDocChat(id,docId){
        this.$router.push('docChat/'+id)
      },
      scrollToEnd(){
        console.log(21212121)
      },
      getData(){
        api('smarthos.follow.message.last.list',{
          token:this.token,

        }).then(res=>{
          console.log(res,2222222);
          if(res.succ){
            this.list = res.list;
          }else {
            alert(res.msg)
          }
        })
      },
      goPath(path){
        this.$router.push(path)
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .nav {
    ul {
      background-color: white;
      display: flex;
      li:nth-child(2) {
        @include border(left);
      }
      li {
        height: 120px;
        flex: 0 0 auto;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        @each $i in follow, circle {
          &.#{$i} {
            .icon {
              background-image: url("../../../static/img/my-doc/#{$i}.png");
            }
          }
        }

        .icon {
          width: 66px;
          height: 66px;
          background-size: 100%;
        }
        .text {
          font-size: 16px; /*no*/
          margin-left: 20px;
        }
      }
    }
  }

  .title {
    @include h_lh(60px);
    padding-left: $commonSpace;
    color: #888888;
    font-size: 16px; /*no*/
  }

  .list {
    background-color: white;
    ul {
      li + li {
        @include border(top);
      }
      li {
        padding: 34px $commonSpace;
        display: flex;
        %a {
          $imgWid: 90px;
          width: $imgWid;
          height: $imgWid;
        }
        .ava {
          flex: 0 0 auto;
          border-radius: 50%;
          overflow: hidden;
          @extend %a;
          img {
            @extend %a;
          }
        }
        .info {
          flex: 1 1 auto;
          max-width: 570px;
          margin-left: $commonSpace;
          h3 {
            @include h_lh(40px);
            display: flex;
            .name, .time {
              flex: 0 0 auto;
            }
            .name {
              color: #333333;
            }
            .time, .dept {
              font-size: 12px; /*no*/
              color: #b2b2b2;
            }
            .dept {
              margin-left: $commonSpace;
              flex: 1 1 auto;
            }
          }
          .content {
            @extend .ellipsis;
            color: #666666;
            padding-top: 20px;
          }
        }
      }
    }
  }
</style>
