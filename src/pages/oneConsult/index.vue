<template>
    <div>
        <top class="noflex" :title="title" ref="header">
            <i slot="back"></i>
        </top>
        <div class="state">
            {{chatObj.consultStatusDescription}}
        </div>
       <scroll :height="scrollHeight">
           <div>
               <div class="talk">
                   <div class="rightMsg" >
                       <div class="floatImg">
                           <img class="titles" :src="userObj.patAvatar" alt="">
                       </div>
                       <div class="floatRight">
                           <div class="com">
                               <p>
                                   {{consultInfo.consultContent}}
                               </p>
                                <p class="imgList">
                                    <img class="patImg" v-for="item of attaList" :src="item.attaFileUrl" alt="" @click="showBig(item.attaFileUrl)">
                                </p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </scroll>
        <div class="btns">
            去付款
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import scroll from '../../base/scroll.vue'
    export default{
        components: {
            top,
            scroll
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
                title:''

            }
        },
        created(){
          this.scrollHeight = window.innerHeight-45-40-40
        },
        mounted(){
            this.consultId = this.$route.params.id
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
                    this.title = res.obj.userDocVo.docName
                }else {
                    alert(res.msg)
                }
            })
        },
        methods:{
            showBig(url){
                this.$weui.gallery(url, {
                    onDelete: function(){
                    }
                });
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.btns{
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
        float: left;
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
        left: -24px;
        border: solid 16px;
        border-color:  transparent lawngreen transparent transparent;
        font-size: 0;
    }


    .rightMsg{
        overflow: hidden;
    }

    .floatRight{
        float: left;
        height: auto;
        margin-bottom: 20px;
        margin-left: 5px;
    }

    .floatImg{
        float: left;
    }







</style>
