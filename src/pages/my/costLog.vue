<template>
  <div id="onlinepage">
    <top>
      <div class="middle big bf">消费记录</div>
    </top>

    <scroll class="contentWrap" ref="contentWrap" :pullup="pullup" @scrollToEnd="scrollToEnd" :data="list">
      <div>
        <div class="content" style="display: block">
          <div  class="border-1px"  v-for="(item,index) in list">
            <div  class="border-1px">
              <div class="cancelImg" v-if="item.docAvatar">
                <img :src="item.docAvatar" alt="">
              </div>
              <div class="cancelImg" v-else>
                <img src="../../../static/img/doctorM.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor" v-if="item.docName && item.payContent != '住院预交金充值'">{{item.docName}}</span>
                  <span class="chatDoctor" v-else-if="!(item.docName) && item.payContent == '住院预交金充值'">住院预缴金充值</span>
                  <span class="chatDoctor" v-else-if="!(item.docName) && item.payContent != '住院预交金充值'">科室咨询</span>
                  <p class="oneLine">{{ item.createTime | Getdate }}</p>
                  <p style="color: #333333;">{{ item.paySubject }}</p>
                </div>
              </div>
              <div class="cancelTime specialCancel">
                <div >
                  <p v-if="item.payType == 'PAY'">支付</p>
                  <p v-else>退款</p>
                  <p style="color: #FAAC79;"> {{ item.payFee/100 }}元 </p>
                </div>
                <!--<img src="../../../../static/img/查看更多.png" alt="">-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <!--<scroll v-show="!flag" class="page" :pullup="pullup" @scrollToEnd="scrollToEnd" :data="list">-->
      <!--<div class="wrap">-->
        <!--<div class="detail" v-for="item in list">-->
          <!--<div class="patImg" v-if="item.docAvatar">-->
            <!--<img :src="item.docAvatar" alt="">-->
          <!--</div>-->
          <!--<div class="patImg" v-else>-->
            <!--&lt;!&ndash;<img src="../../../../static/img/医生男.jpg" alt="">&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="patName">-->
            <!--<ul>-->
              <!--<li class="bf"> <span>{{ item.docName }}</span> <span style="color: #666666;">{{item.createTime | Getdate}}</span></li>-->
              <!--<li class="bf"> {{item.paySubject}}</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<div class="state bf">-->
            <!--<span style="color: #2AB6B3" v-show="item.payType=='PAY'||item.payType=='CASHOUT'">{{item.payType=='PAY'?'支付':'支付'}}</span>-->
            <!--<span style="color: #FAAC79;" v-show="item.payType=='REFUND'">退款</span>-->
            <!--<span>-->
                            <!--¥{{item.payFee/100}}-->
                        <!--</span>-->

          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</scroll>-->
    <!--<loading v-show="flag"></loading>-->
    <toast v-if="showToast"></toast>
    <div v-show="!flag&&list.length==0" class="test">暂无消费记录</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../business/app-header.vue'
  import scroll from '../../base/scroll.vue'
  import http from '../../lib/http'
  import {Getdate} from '../../lib/filter'
  import BScroll from 'better-scroll'
  import Toast from '../../base/toast.vue'
//  import loading from '../../../base/loading/loading.vue'
//  import {tokenCache} from '../../../lib/cache'
  export default{
    components: {
      top,
      scroll,
      Toast
//      loading
    },
    filters:{
      Getdate
    },
    data(){
      return {
        list:[],
        token:localStorage.getItem('token'),
        pageNo:1,
        pageSize:10,
        flag:true,
        pullup:true,
        showToast:false
      }
    },
    mounted(){
      this.getDate()
    },
    methods:{
      getDate(){
          this.showToast = true
        http('smarthos.pay.order.list',{
          token:this.token,
          pageNo:this.pageNo,
          pageSize:this.pageSize
        }).then(res=>{
          this.showToast = false
          console.log(res)
          if(res.succ){
            this.list = res.list;
            this.flag = false
          }else {
            alert(res.msg)
          }
          console.log(res,7686)
        })
      },
      scrollToEnd(){
        this.pageSize+=10;
        this.getDate()
        console.log(2121)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/common.scss";

  #onlinepage{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .contentWrap{
      position: fixed;
      top: 88px;
      left:0;
      right:0;
      bottom:0;
      background-color: #FFFFFF;
      >div{
        .content{
          >div{
            >div{
              height: 180px;
              display: flex;
              .cancelImg{
                width: 160px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  width: 110px;
                  height: 110px;
                  border-radius: 50%;
                }
                img.avartarImg{
                  border-radius: 0px;
                }
              }
              .cancelIntro{
                flex:2;
                display: flex;
                align-items: center;
                p{
                  /*display: -webkit-box;*/
                  /*-webkit-box-orient: vertical;*/
                  /*-webkit-line-clamp:1;*/
                  /*overflow: hidden;*/
                  margin:0;
                  color: #999999;
                  font-size: 28px;
                }
                span.chatDoctor{
                  font-size: 32px;
                  color: #333333;
                }
                span.doctorTitle{
                  font-size: 28px;
                  color: #666666;
                }
              }
              .cancelTime{
                flex:1;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-right: 20px;
                >div{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  img{
                    width:16px;
                    height:24px;
                  }
                  span.year{
                    font-size: 28px;
                    color: $mainColor;
                    margin-right: 5px;
                  }
                  .specialMoney{
                    min-width:170px;
                    height:60px;
                    color: white;
                    font-size: 32px;
                    margin-right: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 7px;
                    background-color: $mainColor;
                  }
                  span.gray{
                    color: #999999;
                    margin-right: 5px;
                  }
                }
              }
              .specialCancel{
                >div{
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  /*<!--margin-right: 10px;-->*/
                  p:nth-child(1){
                    height:60px;
                    margin-bottom: 10px;
                    font-size: 32px;
                  }
                  p:nth-child(2){
                    /*<!--color: $assistWordBrown;-->*/
                    font-size: 32px;
                  }
                }
                img{
                  width:16px;
                  height:24px;
                }
              }
            }
          }
        }
      }
    }
  }
  .page{
    position: fixed;
    left: 0;
    top: 65px;
    right: 0;
    bottom: 0;
  }
  .wrap{
    overflow: auto;
    /*-webkit-overflow-scrolling: touch;*/
    margin-top: 10px;
    box-sizing: border-box;
    padding-bottom: 10px;
    border-top: 1px solid gainsboro;
  }
  .test{
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .detail{
    height:200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: white;
    /*box-sizing: border-box;*/
    padding: 10px 0;
    border-bottom: 1px solid gainsboro;
    .state{
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }

  .patImg img{
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }

</style>
