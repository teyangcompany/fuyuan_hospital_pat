<template>
    <div>
        <top class="noflex" :title="title" ref="header">
            <i slot="back"></i>
            <div @click="finishConsult(consultInfo.consultStatus)" slot="right" class="right absolute" v-show="consultMessage.length>0&&(consultInfo.consultStatus=='3'||consultInfo.consultStatus=='4')">
                {{consultInfo.consultStatus=='3'?'结束咨询':'去评价'}}
            </div>
        </top>

        <div class="state" v-if="consultInfo.consultStatus=='3'&&consultMessage.length==0">
            等待医生回复
        </div>
        <div class="state" v-else>
            {{consultInfo.consultStatus | state}}
        </div>
        <!--<div class="state" v-show="consultInfo.consultStatus=='1'||consultInfo.consultStatus=='2'">-->
            <!--{{consultInfo.consultStatus=='1'?'待受理':'待处理'}}-->
        <!--</div>-->
        <!--<div class="state" v-show="consultInfo.consultStatus=='3'||consultInfo.consultStatus=='4'">-->
            <!--{{consultInfo.consultStatus=='3'?'进行中':'待评价'}}-->
        <!--</div>-->
        <!--<div class="state" v-show="consultInfo.consultStatus=='6'">-->
            <!--已结束-->
        <!--</div>-->
        <chat :chatObj="consultInfo" :chatList="consultMessage" :attaList="attaList" :userObj="userObj" @send="send"></chat>
        <div class="btns" @click="goPay" v-show="consultInfo.consultStatus=='0'">
            去付款
        </div>
        <div class="finish" v-show="consultInfo.consultStatus=='4'||consultInfo.consultStatus=='6'">
            <p class="mfc">该咨询已经结束，无法追问</p>
            <p class="mfc" style="color: blue">申请成为他的患者</p>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import scroll from '../../base/scroll.vue'
    import chat from '../../business/onChat.vue'
    import {state} from '../../lib/filter'
    export default{
        components: {
            top,
            scroll,
            chat
        },
        filters:{
          state
        },
        data(){
            return {
                consultId:"",
                token:localStorage.getItem('token'),
                chatObj:{},
                scrollHeight:'',
                userObj:{},
                consultInfo:{},
                attaList:[],
                title:'',
                consultMessage:[],
                replyContentType:"TEXT",
                replyContent:""

            }
        },
        created(){
          this.scrollHeight = window.innerHeight-45-40-40
        },
        mounted(){
            this.consultId = this.$route.params.id
            this.getData()
        },
        methods:{
            finishConsult(state){
                if(state=='3'){
                    api('smarthos.consult.one2one.pic.complete',{
                        token:this.token,
                        consultId:this.consultId
                    }).then(res=>{
                        console.log(res,258963);
                        if(res.succ){
                            this.getData()
                        }else {
                            alert(res.msg)
                        }
                    })
                }else {
                    this.$router.push('/evaluate/'+this.consultId)
                }

            },
            getData(){
                api('smarthos.consult.details',{
                    token:this.token,
                    consultId:this.consultId
                }).then(res=>{
                    console.log(res,55555);
                    if(res.succ){
                        this.chatObj = res.obj;
                        this.userObj = res.obj.userPat
                        this.consultInfo = res.obj.consultInfo
                        this.attaList = res.obj.attaList
                        this.title = res.obj.userDocVo.docName;
                        res.obj.consultMessage?this.consultMessage = res.obj.consultMessage:this.consultMessage=[]
                    }else {
                        alert(res.msg)
                    }
                })
            },
            send(value){
                if(value.msgType){
                    this.replyContentType=value.msgType
                    this.replyContent = value.url
                }else {
                    this.replyContent = value
                }
                api('smarthos.consult.one2one.pic.reply',{
                    token:this.token,
                    consultId:this.consultId,
                    replyContent:this.replyContent,
                    replyContentType:this.replyContentType
                }).then(res=>{
                    console.log(res,8888);
                    if(res.succ){
                        this.getData()
                    }else {
                        alert(res.msg)
                    }
                })
            },
            goPay(){
                this.$router.push('/pay/'+this.consultId)
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.btns{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: indianred;
    color: white;
}
    .state{
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background: gainsboro;
    }
    .titles{
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        border-radius: 40px;
    }

.talk{
    margin-top: 20px;
}



    .com {
        width: 400px;
        min-height: 50px;
        line-height: 50px;
        height: auto;
        position: relative;
        background: lawngreen;
        border-radius: 10px;
        float: right;
        word-wrap:break-word;
        word-break:break-all;
        padding: 14px 10px;
        box-sizing: border-box;

    }

    .patImg{
        width: 120px;
        height: 120px;
        padding: 3px 5px;
    }

    .com:after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 10px;
        right: 24px;
        border: solid 16px;
        border-color:  transparent lawngreen transparent transparent;
        font-size: 0;
    }


    .rightMsg{
        overflow: hidden;
    }

    .floatRight{
        float: right;
        height: auto;
        margin-bottom: 20px;
        margin-left: 5px;
    }

    .floatImg{
        float: right;
    }

.finish{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px;
    text-align: center;
    background: white;
}





</style>
