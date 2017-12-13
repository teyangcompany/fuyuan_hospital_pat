<template>
    <div id="onlinepage">
        <!--<top title="我的挂号" class="noflex">-->
            <!--<i slot="back"></i>-->
        <!--</top>-->
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="menu" ref="menu">
        <div ref="wrapWidth" class="border-1px wrapWidth">
          <div class="arrangeTime"  v-for="(item,index) in registerNumList">
            <div class="whole">
                <div class="lineWord border-1px">
                     <p>患者</p>
                     <p>{{ item.patname }}</p>
                </div>
                <div class="lineWord border-1px">
                  <p>手机号</p>
                  <p>{{ item.sjh }}</p>
                </div>
                <div class="lineWord border-1px">
                  <p>身份证号</p>
                  <p>{{ item.zjhm }}</p>
                </div>
                <div class="lineWord border-1px">
                  <p>{{ item.hyrq.substr(0,4) }}-{{ item.hyrq.substr(4,2) }}-{{ item.hyrq.substr(6) }}  {{ item.yylx == 1 ? '上午':'下午' }}</p>
                  <p></p>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>医院</span>
                    <p>{{ item.yymc }}</p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>科室</span>
                    <p>{{ item.ksmc }}</p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>医生</span>
                    <p v-if="item.ysxm">{{ item.ysxm  }}</p>
                    <p v-else>普通号</p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>预计就诊时间</span>
                    <p>{{ item.hysj }} <span style="color: #999999;">(以医院实际情况为准)</span></p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>支付方式</span>
                    <p>线下支付</p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>挂号费</span>
                    <p>{{ item.ghf }}</p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                  <div class="attachName">
                    <span>取号密码</span>
                    <p>{{ item.qhmm }}</p>
                  </div>
                </div>
                <div class="lineWord lineAttach border-1px">
                    <p></p>
                  <p class="forBtn" v-if="item.ddzt == 0" @click="cancelBook(item)">取消预约</p>
                  <p class="forBtn" v-if="item.ddzt == 3" >已取消</p>
                  <p class="forBtn" v-if="item.ddzt == 5">已就诊</p>
                  <p class="forBtn" v-if="item.ddzt == 6" @click="cancelBook(item)">未就诊</p>
                </div>
            </div>
          </div>
        </div>
      </div>
   <!--/*     <scroll :height="scrollHeight" :data="registerNumList" @scrollToEnd="scrollToEnd" :pullup="pullup">-->
            <!--<div class="wrap">-->
                <!--<div class="content" v-for="item in registerNumList">-->
                    <!--<div class="registrationDetail">-->
                        <!--<p>{{ item.hyrq.substr(0,4) }}-{{ item.hyrq.substr(4,2) }}-{{ item.hyrq.substr(6) }}&nbsp;&nbsp;{{ item.yylx == 1 ? '上午':'下午' }}<span class="current" ></span></p>-->
                        <!--<p>医院 : {{ item.yymc }}</p>-->
                        <!--<p>科室 : {{ item.ksmc }}</p>-->
                        <!--<p v-if="item.ysxm ">医生 : {{item.ysxm }}</p>-->
                        <!--<p v-else>医生 : 普通号</p>-->
                        <!--<p>预估就诊时间 : {{ item.hysj }} <span style="color: #999999;">(以医院实际情况为准)</span></p>-->
                        <!--<p>支付方式 : 线下支付</p>-->
                        <!--<p>挂号费 : {{ item.ghf }}</p>-->
                        <!--<p>取号密码 : {{ item.qhmm }}</p>-->
                    <!--</div>-->
                    <!--<div class="patDetail">-->
                        <!--<p>患者 : {{ item.patname }}</p>-->
                        <!--<p>身份证号 : {{ item.zjhm }}</p>-->
                        <!--<p>手机号 : {{ item.sjh }}</p>-->
                    <!--</div>-->
                    <!--<div class="state" >-->
                        <!--<a v-if="item.ddzt == 0" @click="cancelBook(item)">取消预约</a>-->
                        <!--<a v-if="item.ddzt == 3" >已取消</a>-->
                        <!--<a v-if="item.ddzt == 5" >已就诊</a>-->
                        <!--<a v-if="item.ddzt == 6" @click="cancelBook(item)">未就诊</a>-->
                    <!--</div>-->

                <!--</div>-->
                <!--<div class="loadMore" v-if="loadingStatus">-->
                    <!--<span class="pullMore">-->
                       <!--<img src="../../../../static/img/loading.gif" alt="">-->
                       <!--数据加载中...-->
                    <!--</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</scroll> */-->
       <toast v-if="showToast"></toast>
       <v-dialog :dialogTitle="dialogTitle"
                :dialogMain="dialogMain"
                :dialogLeftFoot="dialogLeftFoot"
                :dialogRightFoot="dialogRightFoot"
                v-if="showDialog"
                @on-cancel="cancelDialog" @on-download="confirmCancel"></v-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../components/app-header.vue'
    import api from '../../../lib/bookApi'
    import http from '../../../lib/http'
    import Toast from '../../../base/toast.vue'
    import dialog from '../../../base/dialog.vue'
    import scroll from '../../../base/scroll.vue'
    import header from '../../../base/header.vue'
    import BScroll from 'better-scroll'
    export default{
        components: {
            top,
            scroll,
            Toast,
            "VHeader":header,
            "VDialog":dialog
        },
        filters:{
        },
        data(){
            return {
                patId:'',
                list:[],
                title:"我的挂号",
                rightTitle:"",
                loadingStatus:true,
                listPage:1,
                pullup:true,
                scrollHeight:"",
                patId:"",
                item:"",
                registerNumList:"",
                dialogTitle:"",
                dialogMain:"确定取消此预约",
                dialogLeftFoot:"取消",
                dialogRightFoot:"确定",
                showDialog:false,
                showToast:false,
                token:localStorage.getItem('token')
            }
        },
        created(){
            console.log(this.token)
            http("smarthos.user.pat.get",{
                  token:localStorage.getItem('token')
            }).then((data)=>{
                console.log(data,123456)
                if(data.code == 0){
                  this.patId = data.obj.userCommonPatVo.patId
                  console.log(this.patId)
                  api("smarthos.yygh.apiOrderService.orderXx",{
                    token:localStorage.getItem('token'),
                    patid:this.patId,
                    pageNum:"1",
                    pageSize:'1000'
                  }).then((data)=>{
                    this.loadingStatus = false
                    if(data.code == 0){
                      this.registerNumList = data.list
                      console.log(data)
                    }else{
                      weui.alert(data.msg)
                    }
                  })
                }else{
                    weui.alert(data.msg)
                }
            })
        },
        mounted(){
//            this.$nextTick(()=>{
//              setTimeout(()=>{
//                this.scrollHeight = window.innerHeight-45
//
//              },50)
//            })
        },
        watch:{
          registerNumList(){
            this.$nextTick(()=>{
              setTimeout(()=>{
                this._initTitleScroll()
              },200)
            })
          }
        },
        methods:{
          _initTitleScroll(){
            let itemWidth = 350
            let margin = 35
            let width = (itemWidth + margin)*this.registerNumList.length
            this.$refs.wrapWidth.style.width = width + 'px'
            this.$nextTick(()=>{
              this.titleScroll = new BScroll(this.$refs.menu,{
                scrollX:true,
                eventPassthrough: 'vertical'
              })
            })
          },
          cancelDialog(){
            this.showDialog = false
          },
          confirmCancel(){
            this.showDialog = false
            this.showToast = true
            api("smarthos.yygh.apiOrderService.cancel",{
              orderid:this.item.ddid,
              pass:this.item.qhmm
            }).then((data)=>{
              this.showToast = false
                if(data.code == 0){
                  location.reload()
                }else{
                    weui.alert(data.msg)
                }
            })
          },
          cancelBook(item){
              this.showDialog = true
              this.item = item
//              console.log(item)
          },
          scrollToEnd(){
            if (this.preventRepeatRequest) {
              return
            }
            this.loadingStatus = true
            this.preventRepeatRequest = true;
            this.listPage +=1;
            let that = this
            http("smarthos.yygh.apiOrderService.orderXx",{
              token:localStorage.getItem('token'),
              patid:this.patId,
              pageNum:that.listPage,
              pageSize:"10"
            }).then((data)=>{
              console.log(data)
              this.loadingStatus = false
              if(data.code == 0){
                for(var i=0;i<data.list.length; i++){
                  this.registerNumList.push(data.list[i])
//              this.createTime.push(formatDate(new Date(data.list[i].createTime)))
                }
                this.loadingStatus = false
                if(data.list.length >= 10){
                  this.preventRepeatRequest = false;
                }
              }else if(!(data.msg)){
                this.loadingStatus = false
                weui.alert("网络错误，请稍后重试")
              }else{
                this.loadingStatus = false
                weui.alert(data.msg)
              }
            })
          },
        }
    }
</script>
<style scoped lang="scss">
@import "../../../common/common.scss";
    #onlinepage{
        /*flex: 1;*/
        /*overflow: auto;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*font-size: 32px;*/
      .menu{
        position: fixed;
        left:0px;
        right:0px;
        top: 90px;
        bottom:0;
        z-index:100;
        background-color:#C7DDF4;
        .wrapWidth{
          /*width:100%;*/
          display: flex;
          /*height: 80px;*/
          /*height:100%;*/
          padding-top: 12px;
          padding-bottom: 72px;
          background-color:#C7DDF4;
          .arrangeTime{
            flex:1;
            font-size: 32px;
            text-align: center;
            /*height: 80px;*/
            /*height:100%;*/
            .whole{
              height:100%;
              /*height: 80px;*/
              width:670px;
              margin:0 auto;
              font-size: 32px;
              color: #333333;
              /*line-height: 80px;*/
              background-color: white;
              border-radius: 20px;
              .lineWord{
                width:600px;
                height:80px;
                margin:0 auto;
                /*margin-top: 50px;*/
                background-color: #FFFFFF;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .forBtn{
                  border:1px solid $mainColor;
                  color: $mainColor;
                  width: 180px;
                  height: 60px;
                  line-height: 50px;
                  border-radius: 30px;
                }
                .attachName{
                  text-align: left;
                  span{
                    font-size: 24px;
                    color: #999999;
                    margin-bottom: 10px;
                  }

                }
              }
              .lineAttach{
                height:95px;
              }
            }
          }
          /*<!--li.picked{-->*/
          /*<!--p{-->*/
          /*<!--border-bottom: 4px solid $mainColor;-->*/
          /*<!--background-color:$bgColor;-->*/
          /*<!--}-->*/
          /*<!--}-->*/
        }
      }
    }
    /*.wrap{*/
        /*-webkit-overflow-scrolling: touch;*/
        /*overflow: auto;*/
      /*.loadMore{*/
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*span.pullMore{*/
          /*display: flex;*/
          /*align-items: center;*/
          /*font-size: 12px;*/
          /*img{*/
            /*width: 16px;*/
            /*height: 16px;*/
            /*margin-right: 5px;*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/

    /*.registrationDetail{*/
        /*border-bottom: 1px dashed gainsboro;*/
        /*padding: 10px ;*/
    /*}*/
    /*.content{*/
        /*box-sizing: border-box;*/
        /*padding: 10px;*/
        /*margin-bottom: 15px;*/
        /*border-top: 1px solid gainsboro;*/
        /*color: #333333;*/
        /*box-sizing: border-box;*/
        /*background: white;*/
        /*overflow: hidden;*/
    /*}*/
    /*.patDetail{*/
        /*padding: 10px ;*/
        /*box-sizing: border-box;*/
    /*}*/
    /*.state{*/
        /*float: right;*/
        /*box-sizing: border-box;*/
        /*padding-right: 15px;*/
        /*color: #0BB20C;*/
    /*}*/
    /*.current{*/
        /*display: inline-block;*/
        /*float: right;*/
    /*}*/
</style>
