<template>
  <div>
    <!--<div class="topNav">-->
    <!--<p class="listP" style="border-bottom: 2px solid blue">找医生</p>-->
    <!--<p class="listP">精选</p>-->
    <!--<router-link tag="p" to="/my/home/server/consultService/myConsult" class="listP">我的</router-link>-->
    <!--</div>-->
    <div class="toggle">
      <div class="tab border-1px myTab">
        <div class="tab-item" :class="{choose_type:sortBy == 'all'}">
          <div class="tab_item_container" @click="chooseType('all')">
            <span>全部</span>
          </div>
        </div>
        <div class="tab-item" :class="{choose_type:sortBy == 'waitPay'}">
          <div class="tab_item_container" @click="chooseType('waitPay')">
            <div class="tab_item_border">
              <span>待付款{{ waitPayLength }}</span>
            </div>
          </div>
        </div>
        <div class="tab-item" :class="{choose_type:sortBy == 'doing'}">
          <div class="tab_item_container" @click="chooseType('doing')">
            <div class="tab_item_border">
              <span>进行中{{ doingLength }}</span>
            </div>
          </div>
        </div>
        <div class="tab-item" :class="{choose_type:sortBy == 'waitComment'}">
          <div class="tab_item_container" @click="chooseType('waitComment')">
            <div class="tab_item_border">
              <span>待评价{{ waitCommentLength }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapMy" v-if="aboutConsult.length != 0">
        <ul class="border-1px" key="item" v-for="item in aboutConsult"
            @click="goDetail(item.consultInfo.consultType,item.consultInfo.id)">
          <li>
            <div>
              <p class="picConsult" v-if="item.consultInfo.consultType == 'ONE2ONEPIC'">医生咨询<span> ¥{{ item.consultInfo.payFee }}</span></p>
              <p class="picConsult" v-else-if="item.consultInfo.consultType == 'PLATFORMPIC'">科室咨询<span> ¥{{ item.consultInfo.payFee }}</span></p>
              <span class="consultTim" v-if="item.consultInfo.consultStatus == 0">待付款</span>
              <span class="consultTim" v-else-if="item.consultInfo.consultStatus == 1"
                    style="color: #2772FF;">待受理</span>
              <span class="consultTim" v-else-if="item.consultInfo.consultStatus == 2"
                    style="color: #2772FF;">待处理</span>
              <span class="consultTim" v-else-if="item.consultInfo.consultStatus == 3"
                    style="color: #2772FF;">进行中</span>
              <span class="consultTim" v-else-if="item.consultInfo.consultStatus == 4"
                    style="color: #2772FF;">待评价</span>
              <span class="consultTim" v-else-if="item.consultInfo.consultStatus == 6"
                    style="color: #999999;">已结束</span>
              <span class="consultTim" v-else-if="item.consultInfo.consultStatus == -1"
                    style="color: #999999;">已取消</span>
            </div>
            <div class="mainContent">
              <p>{{ item.consultInfo.consultContent }}</p>
              <div>
                <img :src="secondItem.attaFileUrl" alt="" v-for="secondItem in item.attaList">
              </div>
            </div>
            <div class="ConsultRelate">
              <span class="name">
                <span class="number" v-if="item.userDocVo">
                  <img :src="item.userDocVo.docAvatar" alt="">
                  <span>{{ item.userDocVo.docName }}</span>回答
                </span>
                <span class="number" v-else>
                     暂无医生回答
                </span>
              </span>
              <span class="money" v-if="item.consultInfo.replyCount">{{ item.consultInfo.createTime | goodTime}}创建 | {{ item.consultInfo.replyCount }}条回复</span>
              <span class="money" v-else>{{ item.consultInfo.createTime | goodTime}}创建 | 0条回复</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="emptyHistory" v-else>
            <span>暂无咨询记录</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import http from '../../../../lib/http'
  import {tokenCache} from '../../../../lib/cache'
  import {Getdate,goodTime} from '../../../../lib/filter'
  export default{
    data(){
      return{
          aboutConsult:[],
          sortBy:"all",
          waitPayLength:"",
          doingLength:"",
          waitCommentLength:""
      }
    },
    filters:{
      Getdate,
      goodTime
    },
    created(){
         this.chooseType(this.sortBy)
         http("smarthos.consult.my.list.page",{
           token:tokenCache.get()
         }).then((data)=>{
             console.log(data)
             if(data.code == 0){
               this.aboutConsult = data.list
             }else{
                 weui.alert(data.msg)
             }
         })
        http("smarthos.consult.my.list.page",{
          token:tokenCache.get(),
          statusList:['0']
        }).then((data)=>{
          if(data.code == 0){
            this.waitPayLength = data.list.length
//            this.aboutConsult = data.list
          }else{
            weui.alert(data.msg)
          }
        })
        http("smarthos.consult.my.list.page",{
          token:tokenCache.get(),
          statusList:['3']
        }).then((data)=>{
          if(data.code == 0){
            this.doingLength = data.list.length
//            this.aboutConsult = data.list
          }else{
            weui.alert(data.msg)
          }
        })
        http("smarthos.consult.my.list.page",{
          token:tokenCache.get(),
          statusList:['4']
        }).then((data)=>{
          if(data.code == 0){
            this.waitCommentLength = data.list.length
//            this.aboutConsult = data.list
        } else {
          weui.alert(data.msg)
        }
      })
    },
    mounted() {
//      this.getDate()
    },
    methods: {
      goDetail(type, id) {
        if (type == 'PLATFORMPIC') {
          this.$router.push({
            path:'/consuitDetail/' + id,
            query:{sortBy:this.sortBy}
          })
        } else {
          this.$router.push('/oneConsult/' + id)
        }
      },
      chooseType(type) {
        if (type == 'all') {
          this.sortBy = 'all'
          http("smarthos.consult.my.list.page", {
            token: localStorage.getItem('token')
          }).then((data) => {
            if (data.code == 0) {
              this.aboutConsult = data.list
            } else {
              weui.alert(data.msg)
            }
          })
        } else if (type == 'waitPay') {
          this.sortBy = 'waitPay'
          http("smarthos.consult.my.list.page", {
            token: localStorage.getItem('token'),
            statusList: ['0']
          }).then((data) => {
            if (data.code == 0) {
              this.waitPayLength = data.list.length
              this.aboutConsult = data.list
            } else {
              weui.alert(data.msg)
            }
          })
        } else if (type == 'doing') {
          this.sortBy = 'doing'
          http("smarthos.consult.my.list.page", {
            token: localStorage.getItem('token'),
            statusList: ['3']
          }).then((data) => {
            if (data.code == 0) {
              this.doingLength = data.list.length
              this.aboutConsult = data.list
            } else {
              weui.alert(data.msg)
            }
          })
        } else if (type == 'waitComment') {
          this.sortBy = 'waitComment'
          http("smarthos.consult.my.list.page", {
            token: localStorage.getItem('token'),
            statusList: ['4']
          }).then((data) => {
            console.log(data)
            if (data.code == 0) {
              this.waitCommentLength = data.list.length
              this.aboutConsult = data.list
            } else {
              weui.alert(data.msg)
            }
          })
        }
      }
    },
    watch: {}
  }
</script>
<style scoped lang="scss">
  @import '../../../../common/common.scss';

  .showlist-enter-active, .showlist-leave-active {
    transition: all 0.2s ease-out;
  }

  .showlist-enter, .showlist-leave-active {
    transform: translateY(-100%)
  }

  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }

  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }

  .toggle {
    .emptyHistory{
      position: absolute;
      top: 170px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      span{
        font-size: 32px;
      }
    }
    .wrapMy {
      position: absolute;
      top: 170px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      overflow: auto;
      ul {
        margin-top: 5px;
        li {
          width: 690px;
          /*height: 166px;*/
          border-radius: 7px;
          background-color: white;
          list-style-type: none;
          margin: 0 auto;
          padding: 0px 8px 8px 8px;
          > div {
            display: flex;
            justify-content: space-between;
            p.picConsult {
              font-size: 32px;
              span {
                color: #F07818;
              }
            }
            span.consultTim {
              font-size: 28px;
              color: #F07818;
            }
          }
          div.mainContent {
            min-height:200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            > div {
              margin-top: 10px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;

              img {
                width: 22.5%;
                height: 120px;
                margin-left: 15px;
              }
            }
            p {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              word-break: break-all;
              font-size: 30px;
              color: #888888;
              padding-top: 5px;
              /*background-color: #E64340;*/
            }
          }
          div.ConsultRelate {
            margin-top: 5px;
            span.name {
              font-size: 28px;
              color: #999999;
              .circle {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-color: red;
                border-radius: 50%;
              }
              .number {
                display: flex;
                align-items: center;
                img {
                  width: 34px;
                  height: 34px;
                  border-radius: 50%;
                  margin-right: 5px;
                }
              }
            }
            span.money {
              font-size: 26px;
              color: #999999;
            }
          }
        }
        li:nth-child(1) {
          padding-top: 5px;
        }
      }
    }
  }

  .back_cover {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
    opacity: 0.3;
    background-color: rgb(0, 0, 0);
  }

  .topNav {
    width: 100%;
    height: 90px;
    display: flex;
    position: relative;
    z-index: 100;
    background-color: #ffffff;
    p {
      flex: 1;
      height: 90px;
      display: flex;
      font-size: 32px;
      color: #333333;
      align-items: center;
      justify-content: center;
    }
  }

  .searchArea {
    width: 100%;
    height: 100px;
    position: relative;
    z-index: 100;
    background-color: $bgColor;
    .inputWrap {
      width: 690px;
      margin: 0 auto;
      input {
        width: 690px;
        height: 60px;
        font-size: 32px;
        margin-top: 15px;
        margin-bottom: 15px;
        border-radius: 7px;
        text-align: center;
      }
    }
    img {
      position: absolute;
      width: 30px;
      top: 110px;
      left: 130px;
    }
  }

  .tab {
    display: flex;
    width: 100%;
    height: 80px;
    position: absolute;
    top: 180px;
    z-index: 100;
    line-height: 80px;
    background-color: #ffffff;
    .tab-item {
      flex: 1;
      text-align: center;
      span {
        display: block;
        font-size: 32px;
        color: rgb(77, 85, 93);
      }
    }
    .choose_type {
      span {
        color: $mainColor;
      }
    }
    .tab-item:last-child {
      border-right: none;
    }
  }

  .myTab {
    top: 90px;
  }

  .dropType {
    position: fixed;
    z-index: 70;
    top: 260px;
    width: 100%;
    text-align: center;
    /*background-color: #0BB20C;*/
    background-color: white;
    li {
      list-style-type: none;
      height: 80px;
      line-height: 80px;
    }
  }

  .allRoom {
    height: 800px;
    overflow: hidden;
    /*background-color: #04BE02;*/
    .wrapWhole {
      display: flex;
      .wrapMenu {
        flex: 1;
        height: 800px;
        overflow: hidden;
        background-color: #F0F5F5;
        .category_active {
          background-color: white !important;
          span {
            color: #2AB6B3;
          }
        }
        ul {
          li {
            list-style-type: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              padding-left: 30px;
              font-size: 32px;
              color: #333333;
            }
            img {
              width: 16px;
              height: 24px;
            }
          }
        }
      }
      .wrapContent {
        flex: 2;
        height: 500px;
        overflow: hidden;
        text-align: left;
        .weuiMargin {
          margin-top: 0;
          p {
            height: 70px;
            color: #333333;
            font-size: 30px;
            line-height: 70px;
            padding-left: 30px;
          }
        }
      }
    }
  }

  .teamList {
    position: fixed;
    top: 260px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    ul {
      padding: 0;
      margin: 0;
      /*height: 180px;*/
      background-color: #ffffff;
      /*border-bottom: 1px solid rgb(205,205,205);*/
      .teamLi {
        list-style-type: none;
        height: 180px;
        display: flex;
        .cancelImg {
          width: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cancelIntro {
          flex: 2;
          display: flex;
          align-items: center;
          /*line-height: 25px;*/
          > div {
            .followName {
              font-size: 32px;
              color: #333333;
            }
            .myDoctor {
              font-size: 28px;
              color: #999999;
              /*line-height: 18px;*/
              text-align: center;
            }
            p {
              margin: 0;
              padding: 0;
              color: #999999;
              font-size: 28px;
            }
            p:nth-child(1) {
              width: 570px;
              display: flex;
              justify-content: space-between;
              .commentValue {
                padding-right: 30px;
                color: #000;
              }
            }
          }
        }
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
      .goodAt {
        width: 100%;
        height: 170px;
        margin: 0 auto;
        background-color: #ffffff;
        section {
          width: 690px;
          margin: 0 auto;
        }
        section:nth-child(1) {
          p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break: break-all;
            font-size: 28px;
            color: #666666;
          }
        }
        section:nth-child(2) {
          margin-top: 15px;
          display: flex;
          > div {
            flex: 1;
            p {
              width: 160px;
              border: 1px solid #999999;
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

  .directConsult {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    p {
      width: 100%;
      margin: 0 auto;
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      background-color: #ffffff;
    }
  }
</style>
