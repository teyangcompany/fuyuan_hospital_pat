<template>
    <div id="onlinepage">
        <top title="我的挂号" class="noflex">
            <i slot="back"></i>
        </top>
        <scroll :height="scrollHeight" :data="registerNumList" @scrollToEnd="scrollToEnd" :pullup="pullup">
            <div class="wrap">
                <div class="content" v-for="item in registerNumList">
                    <div class="registrationDetail">
                        <p>{{ item.hyrq.substr(0,4) }}-{{ item.hyrq.substr(4,2) }}-{{ item.hyrq.substr(6) }}&nbsp;&nbsp;{{ item.yylx == 1 ? '上午':'下午' }}<span class="current" >实时挂号</span></p>
                        <p>医院 : {{ item.yymc }}</p>
                        <p>科室 : {{ item.ksmc }}</p>
                        <p>医生 : {{ item.ysxm }}</p>
                        <p>预估就诊时间 : {{ item.hysj.substr(0,2) }}:{{ item.hysj.substr(2) }}</p>
                        <p>支付方式 : 线下支付</p>
                        <p>挂号费 : {{ item.ghf }}</p>
                        <p>取号密码 : {{ item.qhmm }}</p>
                    </div>
                    <div class="patDetail">
                        <p>患者 : {{ item.patname }}</p>
                        <p>身份证号 : {{ item.zjhm }}</p>
                        <p>手机号 : {{ item.sjh }}</p>
                    </div>
                    <div class="state" >
                        <a v-if="item.ddzt == 0" @click="cancelBook(item)">取消预约</a>
                        <a v-if="item.ddzt == 3">已取消</a>
                    </div>

                </div>
                <div class="loadMore" v-if="loadingStatus">
                    <span class="pullMore">
                       <img src="../../../../static/img/loading.gif" alt="">
                       数据加载中...
                    </span>
                </div>
            </div>
        </scroll>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../components/app-header.vue'
    import api from '../../../lib/bookApi'
    import http from '../../../lib/http'
    import scroll from '../../../base/scroll.vue'
    export default{
        components: {
            top,
            scroll
        },
        filters:{
        },
        data(){
            return {
                patId:'',
                list:[],
                loadingStatus:true,
                listPage:1,
                pullup:true,
                scrollHeight:"",
                patId:"",
                registerNumList:""
            }
        },
        created(){
            console.log(localStorage.getItem('token'))
            http("smarthos.user.pat.get",{
                  token:localStorage.getItem('token')
            }).then((data)=>{
                if(data.code == 0){
                  this.patId = data.obj.commpat.patId
                  console.log(this.patId)
                  api("smarthos.yygh.apiOrderService.orderXx",{
                    token:localStorage.getItem('token'),
                    patid:this.patId,
                    pageNum:"1",
                    pageSize:"10"
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
            setTimeout(()=>{
                this.scrollHeight = window.innerHeight-45
            },50)
        },
        methods:{
          cancelBook(item){
              console.log(item)
             api("smarthos.yygh.apiOrderService.cancel",{
               orderid:item.ddid,
               pass:item.qhmm
             }).then((data)=>{
                 location.reload()
             })
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
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        font-size: 32px;
    }

    .wrap{
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      .loadMore{
        display: flex;
        justify-content: center;
        align-items: center;
        span.pullMore{
          display: flex;
          align-items: center;
          font-size: 12px;
          img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
      }
    }

    .registrationDetail{
        border-bottom: 1px dashed gainsboro;
        padding: 10px ;
    }
    .content{
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 15px;
        border-top: 1px solid gainsboro;
        color: gray;
        box-sizing: border-box;
        background: white;
        overflow: hidden;
    }
    .patDetail{
        padding: 10px ;
        box-sizing: border-box;
    }
    .state{
        float: right;
        box-sizing: border-box;
        padding-right: 15px;
        color: #0BB20C;
    }
    .current{
        display: inline-block;
        float: right;
    }
</style>
