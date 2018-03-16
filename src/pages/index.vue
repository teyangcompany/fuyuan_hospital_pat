<template>

    <div class="page index">
        <div class="wrapper" ref="wrapY">
           <div>
             <div class="banner swiper-container" ref="swiper">
               <div class="swiper-wrapper">
                 <div class="swiper-slide" v-if="ad.userType=='PAT'" v-for="ad in adsettings">
                   <img :src="ad.adUrl" alt="">
                 </div>
               </div>
               <div class="swiper-pagination"></div>
               <!--<div class="search">-->
               <!--<i></i><span>搜索医生</span>-->
               <!--</div>-->
               <!--<div class="message">-->
             </div>
             <div class="fastnav">
               <ul>
                 <li>
                   <img src="../../static/img/clickArrow.png" alt="" @click="goDoctor">
                 </li>
                 <!--<li :class="[item.name]" v-for="item in fastNav" @click="goMyRouter(item)">-->

                 <!--<li :class="[item.name]" v-for="(item,index) in fastNav" @click="go(index)">-->

                 <!--<div class="name">{{item.value}}</div>-->
                 <!--<div class="text">{{item.text}}</div>-->
                 <!--<div class="btn">-->
                 <!--<span>{{item.btn}}</span>-->
                 <!--</div>-->
                 <!--</li>-->
               </ul>
             </div>
             <div class="indexnav">
               <ul>
                 <li @click="goPage(item)" v-for="item in nav" :class="[item.name]">
                   <div class="icon"></div>
                   <div class="text">{{item.value}}</div>
                 </li>
               </ul>
             </div>
             <div class="wrapY">
                 <div class="hotDoc">
                   <div>
                     <p>热门医生</p>
                     <p @click="seeMoreDoc" style="color: #999999;"> <span>查看更多</span><img src="../../static/img/leftMore.png" alt=""></p>
                   </div>
                 </div>
                 <div class="menu" ref="menu">
                   <ul ref="wrapWidth" class="border-1px">
                     <li class=" arrangeTime"   v-for="(item,index) in docList" @click="seeDocDetail(item)">
                       <div>
                         <img :src="item.docAvatar" alt="" v-if="item.docAvatar">
                         <img src="../../static/img/doctorM.png" alt="" v-else>
                         <p class="docName">{{ item.docName }}</p>
                         <p class="deptName">{{ item.deptName }} {{ item.docTitle }}</p>
                         <p class="thirdLine">服务<span>{{ item.serveNum }}</span> | 评价 <span v-if="item.docScoure" class="scoure">{{ item.docScoure }}</span> <span v-else>暂无</span> </p>
                       </div>
                     </li>
                   </ul>
                 </div>
             </div>
             <div class="notice">
               <ul>
                 <li v-for="i in 3">

                   <!--<div class="icon">-->
                   <!--<i></i>-->
                   <!--</div>-->
                   <!--<div class="info">-->
                   <!--<div class="title">预约挂号</div>-->
                   <!--<div class="time">10:09</div>-->
                   <!--<div class="content">-->
                   <!--您在浙二医院预约挂号成功-->
                   <!--</div>-->
                   <!--<div class="sub">浙二医院</div>-->
                   <!--</div>-->
                 </li>
               </ul>
             </div>
           </div>
        </div>
        <div class="bottomBtn">
          <app-footer class="noflex" ref="footer"></app-footer>
        </div>
        <loading ref="loading"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
    import config from "../lib/config"
    import http from "../lib/http"
    import Loading from "../base/loading.vue";
    import BScroll from 'better-scroll'
    import AppFooter from "../components/app-footer.vue"

    import {mainHeightMixin} from "../lib/mixin"


    export default {
//        mixins: [mainHeightMixin],
        data() {
            return {
                adsettings: [],
                fastNav: config.index_fast_nav,
                nav: config.index_nav,
                token: localStorage.getItem('token'),
                docList:[]
            };
        },
        computed: {},
        components: {
            Loading,
            AppFooter
        },
        created() {
            this.swiper = null;
        },
        mounted() {
            this.__init();
        },
        beforeDestroy() {

        },
        watch: {
          docList(){
            this.$nextTick(()=>{
              this._initTitleScroll()
              this._initScrollY()
            })
          }
        },
        methods: {
          _initTitleScroll(){
            let itemWidth = 150
            let margin = 0
            let width = (itemWidth + margin)*this.docList.length - margin
            this.$refs.wrapWidth.style.width = width + 'px'
            this.$nextTick(()=>{
              this.titleScroll = new BScroll(this.$refs.menu,{
                scrollX:true,
//                eventPassthrough: 'vertical'
              })
            })
          },
          _initScrollY(){
              this.$nextTick(()=>{
                this.scrollY = new BScroll(this.$refs.wrapY,{
                  click:true
                })
                console.log(this.scrollY)
              })
          },
            __init() {
                this.$refs.loading.show();

                http("smarthos.user.pat.index", {
                    token: this.token
                })
                    .then((res) => {
                        this.$refs.loading.hide();
                        console.log(res, 88888);
                        if (res.code == 0) {
                            let obj = res.obj;
                            this.adsettings = obj.adsettings;
                            this.docList = obj.docList
                          this._swiper();
                        }
                    });
            },
            _swiper() {
                setTimeout((res) => {
                    this.swiper = new Swiper(this.$refs.swiper, {
                        loop: true,
                        autoplay: 5000,
                        pagination: '.swiper-pagination',
                    });
                }, 20)
            },
//      go(index){
//         if(index == 0){
//             this.$router.push('/home/server/quickConsult/index')
//         }
//      },
            goPage(item) {
                console.log(item)
                if(item.name == 'guide'){
                    weui.alert("该功能正在建设中")
                }else{
                  item.path && this.$router.push(item.path);
                }
            },
            seeMoreDoc(){
                this.$router.push({
                    path:"/my/consultService/consultDoc"
                })
            },
            goDoctor(){
                this.$router.push({
                  path:"my/consultService/consultDoc"
                })
            },
            seeDocDetail(item){
              this.$router.push("/docCard/"+item.id)
            },
            goMyRouter(item) {

                this.$router.push(item.route)
            }
        }
    };
</script>

<style lang="scss">
    @import "../common/common.scss";
    .index {
        $wrapperPadding: 12px;
        .wrapper {
          position: absolute;
          top:0;
          left:0;
          right:0;
          bottom: 150px;
            .message {
                position: absolute;
                right: $commonSpace;
                top: 52px;
                width: 66px;
                height: 66px;
                background-image: url(../../static/img/index/icon-message.png);
                background-size: 45px;
                background-position: right center;
                background-repeat: no-repeat;
                z-index: 100;
                span {
                    @extend .message-tip;
                }
            }
            .search {
                position: absolute;
                top: 52px;
                width: 560px;
                left: 50%;
                margin-left: -280px;
                z-index: 100;
                @include h_lh(66px);
                background-color: rgba(255, 255, 255, .4);
                border-radius: 33px;
                text-align: center;
                color: white;
                i {
                    width: 25px;
                    height: 25px;
                    margin-right: 5px;
                    background-image: url(../../static/img/index/search.png);
                    background-size: 100% 100%;
                }
                i, span {
                    display: inline-block;
                }
            }
            .fastnav {
                ul {
                    display: flex;
                    li {
                        box-sizing: border-box;
                        height: 180px;
                        background-size: 100% 100%;
                        flex: 0 0 auto;
                        background-color: white;
                        /*padding-top: 20px;*/
                        /*<!--padding-left: $commonSpace;-->*/
                        /*width: 50%;*/
                        width:100%;
                        text-align: center;
                        img{
                          width:714px;
                          margin-top: 30px;
                          /*box-shadow: 5px 5px 20px #888888;*/
                        }
                        .name {
                            font-size: 16px; /*no*/
                        }
                        .text {
                            margin-top: 10px;
                        }
                        .btn {
                            margin-top: 14px;
                            span {
                                color: #fb791f;
                                border: 1px #fb791f solid; /*no*/
                                border-radius: 5px;
                                padding: 6px;
                            }
                        }
                        @each $i in ask-doc, fast-consult {
                            &.#{$i} {
                                background-image: url("../../static/img/index/#{$i}.png");
                            }
                        }
                    }
                }
            }
            .indexnav {
                /*<!--margin-top: $wrapperPadding;-->*/
                ul {
                    background-color: white;
                    overflow: hidden;
                    li {
                        text-align: center;
                        float: left;
                        width: 25%;
                        padding-top: 25px;
                        padding-bottom: 25px;
                        @each $i in guide, book, queuing, payment, report, steward, help, more {
                            &.#{$i} {
                                .icon {
                                    background-image: url("../../static/img/index/#{$i}.png");
                                }
                            }
                        }
                        .icon {
                            background-size: 100% 100%;
                            width: 80px;
                            height: 80px;
                            margin: 0 auto;
                        }
                    }
                }
            }
          .wrapY{
            /*position: absolute;*/
            /*top:860px;*/
            /*left:0;*/
            /*right:0;*/
            /*bottom:140px;*/
            /*overflow: hidden;*/
            /*background-color: #E64340;*/
          }
          .hotDoc{
            width: 100%;
            height:80px;
            margin-top: 10px;
            /*margin-bottom: 10px;*/
            background-color: white;
            div{
              width: 690px;
              height:80px;
              line-height: 80px;
              margin: 0 auto;
              padding-top: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              p{
                height: 80px;
                line-height: 80px;
                display: flex;
                font-size: 30px;
                align-items: center;
                img{
                  width: 21px;
                  height: 28px;
                }
              }
              p:nth-child(2){
                  display: flex;
                  align-items: center;
                  span{
                      margin-right: 8px;
                  }
              }
            }
          }
          .menu{
            /*position: fixed;*/
            /*left:0;*/
            /*right:0;*/
            /*top:50px;*/
            /*z-index:100;*/
            ul{
              width:100%;
              display: flex;
              height: 360px;
              background-color:white;
              li{
                list-style-type: none;
                flex:1;
                font-size: 32px;
                text-align: center;
                height: 340px;
                /*margin-right: 20px;*/
                padding:30px 10px 30px 10px;
                >div{
                  flex:1;
                  background-color: $bgColor;
                  padding:30px 10px 30px 10px;
                   img{
                     width: 120px;
                     height:120px;
                     border-radius: 50%;
                   }
                    p{
                       margin-top: 5px;
                    }
                    .docName{
                        font-size: 30px;
                        color: #333333;
                    }
                     .deptName{
                         font-size: 24px;
                       color: #666666;
                     }
                     .thirdLine{
                        font-size: 20px;
                       display: flex;
                       color: #666666;
                       justify-content: center;
                       span:nth-child(1){
                         color: rgb(124,177,250);
                         margin-left: 10px;
                         margin-right: 10px;
                       }
                       .scoure{
                         color: rgb(250,190,0);
                         margin-left: 10px;
                       }
                     }
                }
              }
            }
          }
            .notice {
                /*<!--ul {-->*/
                    /*<!--padding-top: $wrapperPadding;-->*/
                    /*<!--li + li {-->*/
                        /*<!--margin-top: $wrapperPadding;-->*/
                    /*<!--}-->*/
                    /*<!--li {-->*/
                        /*<!--padding: 30px $commonSpace;-->*/
                        /*<!--display: flex;-->*/
                        /*<!--background-color: white;-->*/
                        /*<!--.icon {-->*/
                            /*<!--$iconWid: 60px;-->*/
                            /*<!--flex: 0 0 auto;-->*/
                            /*<!--width: $iconWid;-->*/
                            /*<!--i {-->*/
                                /*<!--display: inline-block;-->*/
                                /*<!--width: $iconWid;-->*/
                                /*<!--height: $iconWid;-->*/
                                /*<!--background-image: url(../../static/img/index/icon-book.png);-->*/
                                /*<!--background-size: 100% 100%;-->*/
                            /*<!--}-->*/
                        /*<!--}-->*/
                        /*<!--.info {-->*/
                            /*<!--max-width: 610px;-->*/
                            /*<!--margin-left: 20px;-->*/
                            /*<!--.time, .title {-->*/
                                /*<!--color: #999999;-->*/
                                /*<!--font-size: 12px; !*no*!-->*/
                            /*<!--}-->*/
                        /*<!--}-->*/
                        /*<!--.content {-->*/
                            /*<!--padding-top: 30px;-->*/
                            /*<!--font-size: 16px; !*no*!-->*/
                            /*<!--color: #666;-->*/
                        /*<!--}-->*/
                        /*<!--.sub {-->*/
                            /*<!--padding-top: 20px;-->*/
                            /*<!--color: #999999;-->*/
                        /*<!--}-->*/
                    /*<!--}-->*/
                /*<!--}-->*/
            }
            .banner {
                $bannerHei: 350px;
                height: $bannerHei;
                overflow: hidden;
                .swiper-slide {
                    height: $bannerHei;
                    > img {
                        width: 100%;
                        height: $bannerHei;
                    }
                }
                .swiper-pagination {
                    text-align: right;
                    span {
                        background-color: white;
                        opacity: 0.8;
                        &.swiper-pagination-bullet-active {
                            background-color: $mainColor;
                        }
                    }
                }
            }
        }
        .bottomBtn{
           position: fixed;
          bottom:0;
          left:0;
          right:0;
        }
    }


</style>
