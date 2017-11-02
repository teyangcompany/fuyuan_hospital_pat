<template>
  <transition name="fade">
   <div class="wholeWrap" v-show="flag">
     <div class="page"  @click.stop="close">
       <div class="wrap">

       </div>

       <div class="contain">
         <div class="mfb">选择你需要的服务</div>
         <div class="serviceType">
           <div class="imageText" :class="{active:test==index}" v-for="(item,index) in serviceList"
                @click.stop="getText(index)">
             <p class="mf">{{item.serveName}}</p>
             <p class="col">{{item.servePrice | consultPrice}}元</p>
           </div>
         </div>
         <!--<div v-if="serviceList.length>0">-->
         <!--<p class="mfc">-->
         <!--{{serviceList[test].serveReadme}}-->
         <!--</p>-->
         <!--</div>-->
         <div class="agree">
           <div v-for="(item,index) in serviceList"
                v-if="(item.serveName == '图文问诊' || item.serveName == '图文咨询') && test==index">
             <span>1.您将支付{{ item.servePrice | consultPrice }}元，向医生发起一个图文咨询。</span><br/>
             <span>2.为珍惜您的咨询机会，请全部围绕病情进行沟通，避免无关内容。</span><br/>
             <span>3.医生工作繁忙，可能无法及时回复您的咨询，若医生48小时未回复，我们会为您自动退款。</span>
           </div>
           <!--<span style="color: blue">-->
           <!--浙二网络医学中心服务协议-->
           <!--</span>-->
         </div>
         <div class="goNext mfb" @click.stop="goNext">
           下一步
         </div>
       </div>
     </div>
   </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import config from '../lib/config'
  import api from '../lib/http'
  import {consultPrice} from "../lib/filter"

  export default {
    components: {},
    props: ['docId'],
    filters: {consultPrice},
    data() {
      return {
        flag: false,
        list: config.basic_service,
        textList: config.basic_text,
        test: 0,
        token: localStorage.getItem('token'),
        serviceList: [],
        id: this.docId
      }
    },

    mounted() {
      api('smarthos.user.doc.card.get',{
        token:this.token,
        docId:this.docId
      }).then(res=>{
                  console.log(res,22222);
        if(res.succ){
          this.serviceList = res.obj.docServeList
          console.log(this.serviceList)
        }else {
          alert(res.msg)
        }
      })
//      api('smarthos.user.doc.serve.list', {
////                token:this.token,
//                docId:this.id
//            }).then(res=>{
//                console.log(res,11111);
//                if(res.succ){
//                    var obj = res.obj;
//                    obj.appointmentOutpatientConsultServe.serveName?this.serviceList.push(obj.appointmentOutpatientConsultServe):"";
//                    obj.bookServe.serveName?this.serviceList.push(obj.bookServe):"";
//                    obj.phoneConsultServe.serveName?this.serviceList.push(obj.phoneConsultServe):"";
//                    obj.picConsultServe.serveName?this.serviceList.push(obj.picConsultServe):"";
//                    obj.videoConsultServe.serveName?this.serviceList.push(obj.videoConsultServe):"";
////                    console.log(this.serviceList,123456789)
//                }else {
//                    alert(res.msg)
//                }
//
//            })
        },
        methods:{
            close(){
                this.flag = false
            },
            getText(index){
                this.test = index
            },
            goNext(){
                console.log(this.serviceList[this.test].serveName)
                if(this.serviceList[this.test].serveName == '图文问诊' || this.serviceList[this.test].serveName == '图文咨询'){
                  this.$router.push({
                    name:'imageInquiry',
                    query:{fee:this.serviceList[this.test].servePrice}
                  })
                }
            }

//        docId: this.id
//      }).then(res => {
//        console.log(res, 11111);
//        if (res.succ) {
//          var obj = res.obj;
//          obj.appointmentOutpatientConsultServe.serveName ? this.serviceList.push(obj.appointmentOutpatientConsultServe) : "";
//          obj.bookServe.serveName ? this.serviceList.push(obj.bookServe) : "";
//          obj.phoneConsultServe.serveName ? this.serviceList.push(obj.phoneConsultServe) : "";
//          obj.picConsultServe.serveName ? this.serviceList.push(obj.picConsultServe) : "";
//          obj.videoConsultServe.serveName ? this.serviceList.push(obj.videoConsultServe) : "";
//          console.log(this.serviceList, 123456789)
//        } else {
//          alert(res.msg)
//        }
//
//      })
    },
//    methods: {
//      close() {
//        this.flag = false
//      },
//      getText(index) {
//        this.test = index
//      },
//      goNext() {
//        console.log(this.serviceList[this.test].serveName)
//        if (this.serviceList[this.test].serveName == '图文问诊') {
//          this.$router.push({
//            name: 'imageInquiry'
//          })
//
//        }
//      }
//    }
  }
</script>
<style scoped lang='scss'>
  @import '../common/common.scss';

  .goNext {
    width: 100%;
    padding: 15px;
    text-align: center;
    color: white;
    background: $mainColor;
    border-radius: 10px;
  }

  .agree {
    width: 100%;
    font-size: 24px;
    color: #666666;
    background: #f5f5f5;
    text-align: left;
    margin: 0px 0;
    margin-bottom: 15px;
    padding: 15px 5px 15px 15px;
  }

  .col {
    color: orange;
    font-size: 24px;
  }

  .serviceType {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    flex-wrap: wrap;
  }

  .imageText {
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    width: 170px;
  }
  .wholeWrap{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height:500px;
    z-index:1000;
  }
  .page {
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*height:500px;*/
    /*opacity: 0.6;*/
  }

  .wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .contain {
    width: 100%;
    height: auto;
    background: white;
    padding: 30px;

  }

  .fade-enter {
    opacity: 0;
    .page {
      transform: translateY(100%);
    }

  }

  .fade-enter-active {
    transition: all 0.6s ease;
    .page {
      transition: all 0.6s ease;
    }

  }

  .fade-leave-active {
    transition: all 0.6s ease;
    .page {
      transition: all 0.6s ease;
    }
  }

  .fade-leave-to {
    opacity: 0;
    .page {
      transform: translateY(100%);
    }
  }

  /*.fade-enter-to{*/
  /*transform: translateY(0);*/
  /*}*/
  .active {
    border: 1px solid orange;
  }
</style>
