<template>
    <div id="onlinepage">
        <!--<top title="我的挂号" class="noflex">-->
            <!--<i slot="back"></i>-->
        <!--</top>-->
      <v-header :title="title" :rightTitle="rightTitle"></v-header>

      <scroll class="menu" ref="menu" :data="registerNumList" :pullup="pullup"  @scrollToEnd="scrollToEnd()">
        <div>
          <div class="wrapMenu" v-for="(item,index) in registerNumList">
            <div class="wrapP" @click="goDetail(item)">
              <p v-if="item.regid">
                <span>{{ item.numdate.substr(0,4) }}-{{ item.numdate.substr(4,2) }}-{{ item.numdate.substr(6) }}  {{ item.ampm == 1 ? '上午':'下午' }} {{ item.numno }}号</span>
                <span v-if="item.orderState == 0" class="statusSpan" style="color: #FABE00;">待支付</span>
                <span v-else-if="item.orderState == 1" class="statusSpan" style="color: #3d9bff;">挂号成功</span>
                <span v-else-if="item.orderState == 2" class="statusSpan">已就诊</span>
                <span v-else-if="item.orderState == 3" class="statusSpan" style="color: #2AB6B3;">未就诊</span>
                <span v-else-if="item.orderState == 4" class="statusSpan" style="color: #F37575;">已退号</span>
                <span v-else-if="item.orderState == 5" class="statusSpan">挂号失败</span>
                <span v-else-if="item.orderState == -1" class="statusSpan">已取消</span>
              </p>
              <p v-else>
                <span>{{ item.numdate.substr(0,4) }}-{{ item.numdate.substr(4,2) }}-{{ item.numdate.substr(6) }}  {{ item.ampm == 1 ? '上午':'下午' }} {{ item.numno }}号</span>
                <span v-if="item.orderState == -1" class="statusSpan" style="color: #F37575;">已退号</span>
                <span v-if="item.orderState == 1" class="statusSpan">已就诊</span>
                <span v-if="item.orderState == 2" class="statusSpan" style="color: #2AB6B3;">未就诊</span>
                <span v-if="item.orderState == 0" class="statusSpan" style="color: #3d9bff;">预约成功</span>
              </p>
              <p>{{ item.deptname }} {{ item.docname ? item.docname : '普通号' }} ¥{{ item.treatfee }}</p>
              <p>{{ item.hospitalname }}</p>
              <p class="border-1px">就诊人：{{ item.patname }}</p>
            </div>
            <div class="status" v-if="!item.regid">
              <span class="statusP" v-if="item.orderState == 0" @click="cancelBook(item)">取消预约</span>
              <span class="statusP againColor" v-if="item.orderState == 1" @click="bookAgain(item)" style="color: #2AB6B3;">再次预约</span>
              <span class="statusP againColor" v-if="item.orderState == -1" @click="bookAgain(item)" style="color: #2AB6B3;">再次预约</span>
              <span class="statusP againColor" v-if="item.orderState == 2" @click="bookAgain(item)" style="color: #2AB6B3;">再次预约</span>
            </div>
            <div class="status" v-else>
                <span class="statusP againColor special" v-if="item.orderState == 0 &&  item.remainTime > 0" style="color: #2AB6B3;" @click="paySucc(item)">立即支付 <span style="color: #FABE00;">{{ convertTime }}</span></span>
            </div>
          </div>
          <div style="height: 20px;">
          </div>
        </div>
        <!--<p class="forBtn" v-if="item.orderState == 0" @click="cancelBook(item)">取消预约</p>-->
        <!--<p class="forBtn" v-if="item.orderState == -1" >已取消</p>-->
        <!--<p class="forBtn" v-if="item.orderState == 1">已就诊</p>-->
        <!--<p class="forBtn" v-if="item.orderState == 2" @click="cancelBook(item)">未就诊</p>-->


        <!--<div ref="wrapWidth" class="border-1px wrapWidth">-->
          <!--<div class="arrangeTime"  v-for="(item,index) in registerNumList">-->
            <!--<div class="whole">-->
                <!--<div class="lineWord border-1px">-->
                     <!--<p>患者</p>-->
                     <!--<p>{{ item.patname }}</p>-->
                <!--</div>-->
                <!--<div class="lineWord border-1px">-->
                  <!--<p>手机号</p>-->
                  <!--<p>{{ item.sjh }}</p>-->
                <!--</div>-->
                <!--<div class="lineWord border-1px">-->
                  <!--<p>身份证号</p>-->
                  <!--<p>{{ item.zjhm }}</p>-->
                <!--</div>-->
                <!--<div class="lineWord border-1px">-->
                  <!--<p>{{ item.numdate.substr(0,4) }}-{{ item.numdate.substr(4,2) }}-{{ item.numdate.substr(6) }}  {{ item.ampm == 1 ? '上午':'下午' }}</p>-->
                  <!--<p></p>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>医院</span>-->
                    <!--<p>{{ item.yymc }}</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>科室</span>-->
                    <!--<p>{{ item.deptname }}</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>医生</span>-->
                    <!--<p v-if="item.docname">{{ item.docname  }}</p>-->
                    <!--<p v-else>普通号</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>预计就诊时间</span>-->
                    <!--<p>{{ item.visittime }} <span style="color: #999999;">(以医院实际情况为准)</span></p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>支付方式</span>-->
                    <!--<p>线下支付</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>挂号费</span>-->
                    <!--<p>{{ item.regfee }}</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                  <!--<div class="attachName">-->
                    <!--<span>取号密码</span>-->
                    <!--<p>{{ item.qhmm }}</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="lineWord lineAttach border-1px">-->
                    <!--<p></p>-->
                  <!--<p class="forBtn" v-if="item.orderState == 0" @click="cancelBook(item)">取消预约</p>-->
                  <!--<p class="forBtn" v-if="item.orderState == -1" >已取消</p>-->
                  <!--<p class="forBtn" v-if="item.orderState == 1">已就诊</p>-->
                  <!--<p class="forBtn" v-if="item.orderState == 2" @click="cancelBook(item)">未就诊</p>-->
                <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </scroll>
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
                pages:"",
                convertTime:"",
                countTime:"",
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
            this.getList()
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
            this.registerNumList.forEach((item)=>{
               let interA =  setInterval(()=>{
                   if(item.remainTime && item.remainTime >= 0){
                     item.remainTime--
                     if(item.remainTime == 0){
                       this.countTime = item.remainTime
                     }
                     let m = Math.floor( item.remainTime / 60)
                     let s = Math.floor((item.remainTime ) - m*60)
                     let myM
                     m == 0 ? myM = '' : myM = m + "分"
                     this.convertTime =  myM  + s + '秒'
                   }
                },1000)
            })
          },
          countTime(){
                if(this.countTime == 0){
                  setTimeout(()=>{
                    this.getList()
                  },1000)
                }
          }
        },
        methods:{
          bookAgain(item){
              if(item.docname){
                  this.$router.push({
                     path:"/home/server/book/famousPage",
                    query:{hosName:item.hospitalname,bookDocId:item.docid,hosid:item.orgid}
                  })
              }else{
                this.$router.push({
                  path:"/home/server/book/commonDetail",
                  query:{hosName:item.hospitalname,ksid:item.deptid,hosid:item.orgid}
                })
              }
          },
          getList(){
            http("smarthos.user.pat.get",{
              token:localStorage.getItem('token')
            }).then((data)=>{
              console.log(data,123456)
              if(data.code == 0){
                this.patId = data.obj.userCommonPatVo.patId
                console.log(this.patId)
                this.showToast = true
                api("smarthos.yygh.apiOrderService.ghBespeakList",{
                  token:localStorage.getItem('token'),
                  hzid:this.patId,
                  pageNum:"1",
                  pageSize:'10'
                }).then((data)=>{
                  this.loadingStatus = false
                  this.showToast = false
                  if(data.code == 0){
                    this.registerNumList = data.list
                    this.pages = data.page.pagesCount
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
          goDetail(item){
              this.$router.push({
                   path:'/my/registerDetail',
                   query:{patId:this.patId,orgid:item.orgid,orderid:item.orderid,id:item.id}
              })
             localStorage.setItem('registerDetail',JSON.stringify(item))
          },
//          _initTitleScroll(){
//            let itemWidth = 350
//            let margin = 35
//            let width = (itemWidth + margin)*this.registerNumList.length
//            this.$refs.wrapWidth.style.width = width + 'px'
//            this.$nextTick(()=>{
//              this.titleScroll = new BScroll(this.$refs.menu,{
//                scrollX:true,
//                eventPassthrough: 'vertical'
//              })
//            })
//          },
          cancelDialog(){
            this.showDialog = false
          },
          confirmCancel(){
            this.showDialog = false
            this.showToast = true
            let time = this.item.numdate.substr(0,4) + this.item.numdate.substr(5,2) + this.item.numdate.substr(8,2)
            console.log(time)
            console.log()
            console.log()
            api("smarthos.yygh.apiOrderService.cancel",{
              orderid:this.item.orderid,
              pass:this.item.qhmm,
              visitdate:time,
              orgid:this.item.orgid
            }).then((data)=>{
              this.showToast = false
                if(data.code == 0){
                  this.getList()
                  console.log(data)
                }else{
                    weui.alert(data.msg)
                }
            })
          },
          paySucc(item) {
            api('smarthos.yygh.ApiyGHpaymentService.ghPayment', {
              orgid: item.orgid,
              ddid:item.id,
              paymode:"2"
            }).then(res => {
              if (res.code == 0 && res.keyword) {
                this.returnInfo = JSON.parse(res.keyword)
                console.log(this.returnInfo)
                let conf = {
                  "appId": this.returnInfo.appid,     //公众号名称，由商户传入
                  "timeStamp": this.returnInfo.time_stamp,         //时间戳，自1970年以来的秒数
                  "nonceStr": this.returnInfo.nonce_str, //随机串
                  "package": `prepay_id=${this.returnInfo.prepay_id}`,
                  "signType": "MD5",         //微信签名方式：
                  "paySign": this.returnInfo.pay_sign //微信签名
                }
//                alert(JSON.stringify(conf))
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest',
                  conf,
                  (res) => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                       weui.toast("支付成功")
                      this.getList()
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                      console.log("支付过程中用户取消")
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                      console.log("支付失败")
                      weui.alert(JSON.stringify(res))
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  }
                );
              }
              else {
                weui.alert(res.msg)
              }
            })
          },
          cancelBook(item){
              this.showDialog = true
              this.item = item
              console.log(item,555)
          },
          scrollToEnd(){
            this.listPage +=1;
            if (this.registerNumList.length <10 || this.listPage > this.pages) {
              return
            }
            this.loadingStatus = true
            this.preventRepeatRequest = true;
            let that = this
            http("smarthos.yygh.apiOrderService.ghBespeakList",{
              token:localStorage.getItem('token'),
              hzid:this.patId,
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
        /*z-index:10;*/
        background-color:#C7DDF4;
        .wrapMenu{
          width: 690px;
          /*height:310px;*/
          margin:20px auto 0;
          background-color: white;
          border-radius: 15px;
          .wrapP{
            p:nth-child(1){
              font-size: 32px;
              color: #333333;
              font-weight: bold;
              padding: 20px 15px 10px 15px;
              display: flex;
              justify-content: space-between;
              .statusSpan{
                /*color: #999999;*/
              }
            }
            p:nth-child(2){
              font-size: 30px;
              color: #333333;
              padding: 10px 15px 10px 15px;
            }
            p:nth-child(3),p:nth-child(4){
              font-size: 30px;
              color: #999999;
              padding: 5px 15px 5px 15px;
            }
            p:nth-child(4){
              padding: 5px 15px 25px 15px;
            }
          }
          .status{
              display: flex;
              justify-content: flex-end;
              align-items: center;
              height:60px;
              margin-top: 27px;
              padding-bottom: 27px;
              .statusP{
                height: 60px;
                width: 170px;
                margin-right: 20px;
                font-size: 24px;
                line-height: 60px;
                text-align: center;
                border:1px solid  #999999;
                border-radius: 10px;
              }
             .special{
               min-width: 200px;
             }
              .againColor{
                border:1px solid  #2AB6B3;
              }
          }
          .todayStatus{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height:60px;
            margin-top: 20px;
            padding-bottom: 20px;
            >div{
                 span{
                   height: 45px;
                   width: 140px;
                   font-size: 24px;
                   line-height: 45px;
                   text-align: center;
                   border:1px solid  #999999;
                 }
            }
          }
        }
        /*<!--.wrapWidth{-->*/
          /*<!--!*width:100%;*!-->*/
          /*<!--display: flex;-->*/
          /*<!--!*height: 80px;*!-->*/
          /*<!--!*height:100%;*!-->*/
          /*<!--padding-top: 12px;-->*/
          /*<!--padding-bottom: 72px;-->*/
          /*<!--background-color:#C7DDF4;-->*/
          /*<!--.arrangeTime{-->*/
            /*<!--flex:1;-->*/
            /*<!--font-size: 32px;-->*/
            /*<!--text-align: center;-->*/
            /*<!--!*height: 80px;*!-->*/
            /*<!--!*height:100%;*!-->*/
            /*<!--.whole{-->*/
              /*<!--height:100%;-->*/
              /*<!--!*height: 80px;*!-->*/
              /*<!--width:670px;-->*/
              /*<!--margin:0 auto;-->*/
              /*<!--font-size: 32px;-->*/
              /*<!--color: #333333;-->*/
              /*<!--!*line-height: 80px;*!-->*/
              /*<!--background-color: white;-->*/
              /*<!--border-radius: 20px;-->*/
              /*<!--.lineWord{-->*/
                /*<!--width:600px;-->*/
                /*<!--height:80px;-->*/
                /*<!--margin:0 auto;-->*/
                /*<!--!*margin-top: 50px;*!-->*/
                /*<!--background-color: #FFFFFF;-->*/
                /*<!--display: flex;-->*/
                /*<!--justify-content: space-between;-->*/
                /*<!--align-items: center;-->*/
                /*<!--.forBtn{-->*/
                  /*<!--border:1px solid $mainColor;-->*/
                  /*<!--color: $mainColor;-->*/
                  /*<!--width: 180px;-->*/
                  /*<!--height: 60px;-->*/
                  /*<!--line-height: 50px;-->*/
                  /*<!--border-radius: 30px;-->*/
                /*<!--}-->*/
                /*<!--.attachName{-->*/
                  /*<!--text-align: left;-->*/
                  /*<!--span{-->*/
                    /*<!--font-size: 24px;-->*/
                    /*<!--color: #999999;-->*/
                    /*<!--margin-bottom: 10px;-->*/
                  /*<!--}-->*/

                /*<!--}-->*/
              /*<!--}-->*/
              /*<!--.lineAttach{-->*/
                /*<!--height:95px;-->*/
              /*<!--}-->*/
            /*<!--}-->*/
          /*<!--}-->*/
          /*<!--!*&lt;!&ndash;li.picked{&ndash;&gt;*!-->*/
          /*<!--!*&lt;!&ndash;p{&ndash;&gt;*!-->*/
          /*<!--!*&lt;!&ndash;border-bottom: 4px solid $mainColor;&ndash;&gt;*!-->*/
          /*<!--!*&lt;!&ndash;background-color:$bgColor;&ndash;&gt;*!-->*/
          /*<!--!*&lt;!&ndash;}&ndash;&gt;*!-->*/
          /*<!--!*&lt;!&ndash;}&ndash;&gt;*!-->*/
        /*<!--}-->*/
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
