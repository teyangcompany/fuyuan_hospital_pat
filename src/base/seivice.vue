<template>
  <transition name="fade">
    <div class="page" v-show="flag" @click.stop="close">
      <div class="wrap">

      </div>

      <div class="contain">
        <div class="mfb">选择你需要的服务</div>
        <div class="serviceType">
          <div class="imageText" :class="{active:test==index}" v-for="(item,index) in serviceList"
               @click.stop="getText(index)">
            <p class="mf">{{item.serveName}}</p>
            <p class="col">{{item.servePrice | consultPrice}}</p>
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
      console.log(this.id, 99999);

      api('smarthos.user.doc.serve.list', {
//                token:this.token,

                docId:this.id
            }).then(res=>{
                console.log(res,11111);
                if(res.succ){
                    var obj = res.obj;
                    obj.appointmentOutpatientConsultServe.serveName?this.serviceList.push(obj.appointmentOutpatientConsultServe):"";
                    obj.bookServe.serveName?this.serviceList.push(obj.bookServe):"";
                    obj.phoneConsultServe.serveName?this.serviceList.push(obj.phoneConsultServe):"";
                    obj.picConsultServe.serveName?this.serviceList.push(obj.picConsultServe):"";
                    obj.videoConsultServe.serveName?this.serviceList.push(obj.videoConsultServe):"";
                    console.log(this.serviceList,123456789)
                }else {
                    alert(res.msg)
                }

            })
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
    color: blue;
    background: beige;
  }

  .agree {
    width: 100%;
    font-size: 24px;
    color: grey;
    background: gainsboro;
    text-align: left;
    margin: 10px 0;
    padding-left: 10px;
  }

  .col {
    color: orange;
    font-size: 24px;
  }

  .serviceType {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    flex-wrap: wrap;
  }

  .imageText {
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    width: 170px;
  }

  .page {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: grey;
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
    .contain {
      transform: translateY(100%);
    }

  }

  .fade-enter-active {
    transition: all 0.6s ease;
    .contain {
      transition: all 0.6s ease;
    }

  }

  .fade-leave-active {
    transition: all 0.6s ease;
    .contain {
      transition: all 0.6s ease;
    }
  }

  .fade-leave-to {
    opacity: 0;
    .contain {
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
