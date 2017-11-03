<template>
  <div class="date">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="contentWrap" ref="contentWrap">
        <div>
          <div class="content" v-for="item in waitNumList">
              <div  class="border-1px infoArea">
                <div class="cancelImg" v-if="item.docid">
                  <img src="../../../static/img/doctorM.png" alt="">
                </div>
                <div class="cancelImg" v-else>
                  <img src="../../../static/img/common.png" alt="">
                </div>
                <div class="cancelIntro">
                  <div>
                    <span class="chatDoctor">{{ item.docname }}</span> <span class="doctorTitle"> {{ item.deptname }} </span>
                    <p class="oneLine">{{ item.visitdate.substr(0,10) }} {{ item.visittype == 1 ? '上午':'下午' }}</p>
                    <p > {{ item.docid ? '专家号' : '普通号' }} {{ item.ghnumber }}号</p>
                  </div>
                </div>
                <div class="cancelTime specialCancel">
                  <div >
                    <p>当前叫号</p>
                    <p>{{ item.newnumber}}</p>
                  </div>
                  <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                </div>
              </div>
              <div class="weui-cells">
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <p>前面还有</p>
                  </div>
                  <div class="weui-cell__ft">{{ item.beforenum }} 个号</div>
                </div>
              </div>
              <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_switch">
                  <div class="weui-cell__bd">提醒</div> <span class="advancedCount">提前10个号提醒</span>
                  <div class="weui-cell__ft" @click.stop="getWhich(item)">
                    <input class="weui-switch" type="checkbox" v-model="text" placeholder="提前 个叫号提醒"/>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
  import header from '../../base/header.vue'
  import Toast from '../../base/toast'
  import BScroll from 'better-scroll'
  import api from '../../lib/bookApi'
  export default{
    data(){
      return{
           showToast:false,
           title:"排队叫号",
           rightTitle:"",
           hosId:"",
           patCard:"",
           userId:"",
           visitdate:"",
            ghnumber:"",
            deptid:"",
           waitNumList:"",
           text:""
      }
    },
    created(){
         this.hosId  = this.$route.query.hosId
         this.patCard = this.$route.query.patCard
         this.userId = this.$route.query.userId
         this.getNumList()
    },
    methods:{
      getNumList(){
          this.showToast = true
          api("smarthos.yygh.ApiWfCallService.myCall",{
            hosId:this.hosId,
            idcard:this.patCard,
          }).then((data)=>{
            this.showToast = false
              console.log(data)
              if(data.code == 0){
                  this.waitNumList = data.list
              }else{
                  weui.alert(data.msg)
              }
          })
      },
      getWhich(item){
         console.log(item,111)
        console.log(this.text,222)
        this.visitdate = item.visitdate
        this.ghnumber = item.ghnumber
        this.deptid = item.deptid




      },
      _initDateList(){
        this.dateList = new BScroll(this.$refs.contentWrap,{
          click:true
        })
        console.log(this.dateList)
      }
    },
    components:{
      Toast,
      "VHeader":header
    },
    watch:{
      waitNumList(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initDateList()
          },100)
        })
      },
      text(){
        api("smarthos.yygh.ApiWfCallService.callRemind",{
          idcard:this.patCard,
          userid:this.text ? this.userId : null,
          visitdate:this.text ? this.visitdate: null,
          ghnumber:this.text ? this.ghnumber: null,
          hosid:this.hosId,
          deptid:this.deptid,
          type:this.text ? 1: 2
        }).then((data)=>{
          if(data.code == 0){
            weui.alert(data.msg)
          }else{
            weui.alert(data.msg)
          }
          console.log(data)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';
  .date{
    position: absolute;
    top: 0;
    left:0;
    right:0;
    bottom:0;
      .smallBlank{
        width:100%;
        height: 10px;
        background-color: rgb(245,245,245);
      }
      .blank{
        width:100%;
        height: 20px;
        background-color: rgb(245,245,245);
      }
      .contentWrap{
        position: fixed;
        top:100px;
        left:0;
        right:0;
        bottom:0;
        >div{
          .content{
             margin-top: 10px;
             border-top-right-radius: 15px;
             border-top-left-radius: 15px;
             background-color: white;
              .infoArea{
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
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:1;
                    overflow: hidden;
                    margin:0;
                    color: #999999;
                    font-size: 28px;
                    margin-top: 8px;
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
                  width:135px;
                  >div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: $mainColor;
                    border-radius: 10px;
                    img{
                      width:16px;
                      height:24px;
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
                    p{
                      color: #FFFFFF;
                      padding: 15px 21px 15px 21px;
                    }
                    p:nth-child(1){
                       font-size: 28px;
                    }
                    p:nth-child(2){
                      font-size: 34px;
                    }
                  }
                  img{
                    width:16px;
                    height:24px;
                  }
                }
              }
              .weui-cells{
                margin:0;
                .advancedCount{
                    font-size: 32px;
                    color: #999999;
                   margin-right: 30px;
                }
              }
          }
        }
      }

  }
</style>
