<template>
  <div class="date">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="contentWrap" ref="contentWrap">
        <div>
          <!--<div class="weui-cells weui-cells_form">-->
              <div class="content"   v-for="(item,index) in waitNumList">
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
                    <div class="weui-cell" v-if="item.beforenum > 0">
                        <div class="weui-cell__bd">
                          <p>前面还有</p>
                        </div>
                        <div class="weui-cell__ft remain">{{ item.beforenum }} 个号</div>
                    </div>
                    <div class="weui-cell" v-else-if="item.beforenum == 0">
                      <div class="weui-cell__bd">
                        <p style="color:  #3d9bff;">您已到号，请尽快就诊</p>
                      </div>
                      <div class="weui-cell__ft remain"></div>
                    </div>
                    <div class="weui-cell" v-else>
                      <div class="weui-cell__bd">
                        <p style="color: #F07818;">您已过号，请及时就诊</p>
                      </div>
                      <div class="weui-cell__ft remain"></div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_switch" v-if="item.beforenum > 0">
                  <div class="weui-cell__bd">提醒</div>
                  <span class="advancedCount" v-if="item.remindnum">提前{{ item.remindnum }}个号提醒</span>
                  <span class="advancedCount" v-else>开启叫号提醒</span>
                  <div class="weui-cell__ft" v-if="item.remindnum">
                    <input class="weui-switch" ref="input" type="checkbox" checked  @touchend.prevent="getcancel(item,index)"/>
                  </div>
                  <div class="weui-cell__ft" v-else>
                    <input class="weui-switch" ref="input" :name="index" type="checkbox" :id="index" v-model="item.id" :value="index"   @touchend.prevent="getWhich(item,index)"/>
                  </div>
                </div>
              </div>
          <!--</div>-->
        </div>

      </div>
      <div v-if="waitNumList == ''" class="emptyStatus">
        <img src="../../../static/img/形状-8.png" alt="">
        <p>您当前暂无叫号</p>
      </div>
    <toast v-if="showToast"></toast>
    <v-dialog :dialogTitle="dialogTitle"
              :dialogMain="dialogMain"
              :dialogLeftFoot="dialogLeftFoot"
              :dialogRightFoot="dialogRightFoot"
              v-if="showDialog"
              @on-cancel="cancelDialog" @on-download="confirmCancel"></v-dialog>
    <alert  :secondLine="secondLine" :bottomLine="bottomLine" v-if="showAlert" @on-iKnow="iKnow"></alert>
  </div>
</template>
<script>
  import header from '../../base/header.vue'
  import Toast from '../../base/toast'
  import BScroll from 'better-scroll'
  import api from '../../lib/bookApi'
  import Alert from '../../base/alert.vue'
  import dialog from '../../base/dialog.vue'
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
           waitNumList:'',
           text:"",
           index:"",
           isChanged:false,
           changedGhNum:"",
        secondLine:"",
        bottomLine:"知道了",
        showAlert:"",
        dialogTitle:"",
        dialogMain:"确定取消该叫号",
        dialogLeftFoot:"取消",
        dialogRightFoot:"确定",
        showDialog:false,
      }
    },
    created(){
         this.hosId  = this.$route.query.hosId
         this.patCard = this.$route.query.patCard
         this.userId = this.$route.query.userId
         this.getNumList()
    },
    methods:{
      cancelDialog(){
          this.showDialog = false
      },
      confirmCancel(){
        this.showDialog = false
        this.remind()
      },
      iKnow(){
          this.showAlert = false
          this.getNumList()
          location.reload()
      },
      getNumList(){
          this.showToast = true
          api("smarthos.yygh.ApiWfCallService.myCall",{
            hosId:this.hosId,
            idcard:this.patCard,
          }).then((data)=>{
            this.showToast = false
              console.log(data,444)
              if(data.code == 0){
                if(data.list){
                  this.waitNumList = data.list
                }
                console.log("123")
              }else{
                  weui.alert(data.msg)
              }
          })
      },
      getcancel(item,index){
        this.index = index
        this.visitdate = item.visitdate
        this.ghnumber = item.ghnumber
        this.deptid = item.deptid
        this.showDialog = true
      },
      getWhich(item,index){
        this.index = index
        this.visitdate = item.visitdate
        this.ghnumber = item.ghnumber
        this.deptid = item.deptid
        this.docid = item.docid
        if(!this.$refs.input[index].checked){
          var hours = [{
            label:'提前',
            value:"1"
          }]
          var minutes = [{
            label:"个叫号提醒",
            value:"A"
          }]
          var symbol = []
          if(!symbol.length){
            for(var j=1;j<=this.waitNumList[this.index].beforenum-1;j++){
              var symbols_item = {}
              symbols_item.label = j
              symbols_item.value = j
              symbol.push(symbols_item)
            }
          }
          console.log(symbol)
          let that = this
          weui.picker(hours,symbol, minutes,{
            defaultValue: ['1', 'A'],
            onConfirm: function (result) {
              that.changedGhNum = result[1].label
              that.remind()
            },
            id: 'multiPickerBtn'
          })
        }
      },
      _initDateList(){
        this.dateList = new BScroll(this.$refs.contentWrap,{
          click:true
        })
//        console.log(this.dateList)
      },
//      selectNum(index){
//
//      },
      remind(){
        api("smarthos.yygh.ApiWfCallService.callRemind",{
          idcard:this.patCard,
          userid:this.$refs.input[this.index].checked ?  null : this.userId ,
          remind:this.changedGhNum,
          visitdate:this.$refs.input[this.index].checked ?  null : this.visitdate  ,
          ghnumber:this.$refs.input[this.index].checked ?  null : this.ghnumber  ,
          hosid:this.hosId,
          docid:this.docid,
          deptid:this.deptid,
          type:this.$refs.input[this.index].checked ? 2: 1
        }).then((data)=>{
          if(data.code == 0){
//            weui.alert(data.msg)
            this.secondLine = data.msg
            this.showAlert = true
//            location.reload()
          }else{
            weui.alert(data.err)
          }
        })
      }
    },
    components:{
      Toast,
      "VHeader":header,
      Alert,
      "VDialog":dialog,
    },
    watch:{
      waitNumList(){
           this.$nextTick(()=>{
             setTimeout(()=>{
               this._initDateList()
             },100)
           })
      },
//      index(){
//         console.log(this.index,111)
//      },
//      text(){
//          console.log(this.textValue,333)
//          console.log(this.visitdate,7777)
//          console.log(this.ghnumber,8888)
//      }
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
    .emptyStatus{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
          width: 566px;
          height: 715px;
        }
        p{
           margin-top: 30px;
           font-size: 32px;
           color: #666666;
        }
    }
  }


</style>
