<template>
    <div class="page">
        <div class="wrapper" ref="main">
            <div class="teamImg">
                <div class="myHeader">
                    <span class="back" @click="goBack">
                        <img src="../../../static/img/back.png" alt="">
                    </span>
                   <span class="headerImg">
                       <img src="../../../static/img/share.png" alt="">
                       <span class="mfw">
                             分享
                       </span>

                   </span>

                    <span class="headerImg">
                       <img src="../../../static/img/guan.png" alt="" @click="attention">

                       <span class="mfw">
                           关注  &nbsp;&nbsp;
                       </span>
                   </span>
                </div>
                <div class="teamDetail">
                        <ul>
                            <li class="row">
                                <img class="myImg" :src="doc.docAvatar" alt="">
                            </li>
                            <li class="row">
                                <span class="mfw">{{doc.docName}}</span>
                                <span class="famous" v-show="doc.famous">名医</span>
                            </li>
                            <li class="row">
                            <span class="mfw">
                                {{doc.hosName}} &nbsp;&nbsp;&nbsp; {{doc.deptName}}&nbsp;&nbsp; {{doc.docTitle}}
                            </span>
                            </li>
                            <li class="row">
                            <span class="mfw">
                                粉丝&nbsp;&nbsp; 555&nbsp;&nbsp;&nbsp;&nbsp; 患者&nbsp;&nbsp; 9
                                &nbsp;&nbsp;&nbsp;&nbsp;评分&nbsp;&nbsp;8.5 >
                            </span>
                            </li>
                        </ul>
                    </div>
            </div>
            <div class="navbar">
                <div class="mfb pub" :class="item.name" v-for="(item,index) of bar" @click="selItem(index,item)">
                    <span :class="{bar:index==num}">{{item.value}}</span>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <div ref="footer" class="btn">
            <div class="mfw registration">
                预约挂号
            </div>
            <div class="mfw onLine" @click="showService">
                在线问诊
            </div>
            <div class="mfw patient">
                患者报道
            </div>
        </div>
        <seivice ref="ser"></seivice>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import seivice from '../../base/seivice.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    export default{
        components: {
            top,
            seivice
        },
        mixins: ['mainHeightMixin'],
        data(){
            return {
                bar:config.doc_bar,
                num:0,
                flag:false,
                docId:"",
                token:localStorage.getItem('token'),
                doc:{}
            }
        },
        mounted(){
            this.docId = this.$route.params.id;
            sessionStorage.setItem('docId',this.$route.params.id)
            this.getData()
        },
        methods:{
            goBack(){
              this.$router.go(-1)
            },
            attention(){
                api('smarthos.follow.docpat.add',{
                    token:this.token,
                    docId:this.docId
                }).then(res=>{
                    console.log(res,88888);
                    if(res.succ){
                        alert('关注成功')
                    }else {
                        alert(res.msg)
                    }
                })
            },
            getData(){
              api('smarthos.user.doc.card.get',{
                  token:this.token,
                  docId:this.docId
              }).then(res=>{
                  console.log(res,22222);
                  if(res.succ){
                      this.doc = res.obj.doc;
                      console.log(this.$store.state.docObj,66666);
                      this.$store.commit('increment',res.obj.doc)
                  }else {
                      alert(res.msg)
                  }
              })
            },
            selItem(index,item){
                this.num=index;
                this.$router.push({
                    name:item.router
                })
            },
            showService(){
                this.$refs.ser.flag=true
            },
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .page{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
        background: white;
    }
    .wrapper{
        overflow: scroll;
    }
    .myHeader{
        width: 100%;
        padding: 0px 30px;
        position: absolute;
        top: 30px;;
    }
    .famous{
        display: inline-block;
        width: 70px;
        height: 30px;
        line-height: 30px;
        background: orange;
        color: white;
        font-size: 24px;
        text-align: center;
        margin-left: 30px;
        border-radius: 5px;
    }
    .headerImg{
        float: right;
    img{
        width: 30px;
        height: 30px;
    }
    }
    .back{
        width: 25px;
        height: 40px;
    img{
        width: 25px;
        height: 40px;
    }
    }
    .teamImg{
        position: relative;
        width: 100%;
        height: 520px;
        background-image: url("../../../static/img/docBac.png");
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .teamBottom{
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 240px;
        background-image: url("../../../static/img/teamBottom.png");
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .teamDetail{
        /*margin-top: 80px;*/
        padding-top: 130px;
    }
    .row{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
    }
    .navbar{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;

    }
    .bar{
        padding-bottom: 20px;
        border-bottom: 1px solid #2772ff;
        color: #2772ff;
    }
    .sel{
        border-right: 1px solid gainsboro;
        border-left: 1px solid gainsboro;
        padding: 0 88px;
    }
    .btn{
        width: 100%;
        height: 100px;
       /*display: flex;*/
       line-height: 100px;
        text-align: center;
    }
    .myImg{
        width: 180px;
        height: 180px;
        border-radius: 90px;
        margin-bottom: 30px;
    }
    .patient{
        background: #ffc750;
        width: 33.3333%;
        float: left;
    }
    .registration{
        background: #f58377;
        width: 33.3333%;
        float: left;
    }
    .onLine{
        background: #2772ff;
        width: 33.3333%;
        float: left;
    }
</style>
