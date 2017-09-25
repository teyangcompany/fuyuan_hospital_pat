<template>
    <div class="page">
        <app-header class="noflex" title="李冰" ref="header">
            <i slot="back"></i>
            <!--<div class="right absolute" slot="right">找医生</div>-->
        </app-header>

            <div class="wraps">
                <chat :chatObj="chatObj" :chatList='chatList' @send="send"></chat>
            </div>


    </div>
</template>
<script type="text/ecmascript-6">
    import appHeader from '../../components/app-header.vue'
    import chat from '../../business/chat.vue'
    import api from '../../lib/http'
    export default{
        components: {
            appHeader,
            chat,
        },
        data(){
            return {
                followId:"",
                token:localStorage.getItem('token'),
                chatObj:{},
                chatList:[],
                scrollHeight:'',
                msgContent:"",
                msgType:""
            }
        },

        mounted(){
            this.followId = this.$route.params.id;
            this.getData()
        },
        methods:{
            send(value){
                console.log(value,33333);
                if(value.url){
                    this.msgContent = value.url;
                    this.msgType = value.msgType;
                }else {
                    this.msgContent = value;
                    this.msgType = "TEXT";
                }
                api('smarthos.follow.message.add',{
                    "token": this.token,
                    "followId": this.followId,
                    "msgContent":this.msgContent,
                    "msgType": this.msgType
                }).then(res=>{
                    console.log(res,444444);
                    if(res.succ){
                        this.getData()
                    }else {
                        alert(res.msg)
                    }
                })
            },
            getData(){
                api('smarthos.follow.message.detail.list',{
                    token:this.token,
                    followId:this.followId
                }).then(res=>{
                    console.log(res,55555);
                    if(res.succ){
                        this.chatObj = res.obj;
                        this.chatList = res.list;
                    }else {
                        alert(res.msg)
                    }
                })
            },
            over(){
                this.$router.push({
                    name:'myPatient'
                })
            },

        }
    }
</script>
<style scoped  lang='scss'>
    @import '../../common/common.scss';
.page{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
}
    .wraps{
        display: flex;
        flex: 1;
        overflow: scroll;
    }
    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
</style>
