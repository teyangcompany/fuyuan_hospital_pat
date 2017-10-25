<template>
    <div class="page">
        <app-header title="健康档案" class="noflex">
            <i slot="back"></i>
        </app-header>
        <scroll class="wrapper" :height="scrollHeight" :data="list" ref="wrapper">
            <div>
                <div class="patinfo flex">
                    <div class="ava flex0" v-if="patAvatar">
                        <img :src="patAvatar" alt="">
                    </div>
                    <div class="ava flex0" v-else>
                      <img src="../../../../static/img/pat.m.jpg" alt="" v-if="commpat.commpatGender=='M'">
                      <img src="../../../../static/img/pat.f.jpg" alt="" v-else>
                    </div>
                    <div class="info flex1">
                        <h3>{{commpat.commpatName}}</h3>
                        <div>姓名：{{commpat.commpatName}}</div>
                        <p v-if="commpat">{{commpat.commpatGender=='M'?'男':'女'}} {{ JSON.stringify(new Date()).substr(1,4)- commpat.commpatIdcard.substr(6,4) }}岁</p>
                    </div>
                </div>

                <div class="title">
                    基本情况
                </div>

                <div class="basic-situation">
                    <ul>
                        <li v-for="item in basicSituation" class="flex" @click="goDetail(item.name)">
                            <div class="label flex0">{{item.value}}</div>
                            <div class="text flex1 right">
                                {{healthDetail[item.name]||"无"}}
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="title">
                    诊疗记录
                </div>

                <div class="record">
                    <ul>
                        <li v-for="(item,i) in list">
                            <h3>{{item.medicalHistory.createTime | getDay}}</h3>
                            <div class="content" @click="goCaseDetail(item)">{{item.medicalHistory.medContent}}</div>
                            <ol :class="['img',item.attaList?'img'+item.attaList.length:'']">
                                <li v-for="imgSrc in item.attaList">
                                    <img @load="$refs.wrapper.refresh()"
                                          @click="makeLarge(imgSrc)"
                                            :src="imgSrc.attaFileUrl"
                                            alt="">
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <div class="add-medical-record noflex">
            <router-link tag="a" to="/my/archives/save-record/add" class="block">添加诊疗记录</router-link>
        </div>
        <div class="largePic" v-if="showLarge">
          <img :src="largePicUrl" alt="" @click="makeSmall">
        </div>
        <v-mask v-if="showLarge"></v-mask>
    </div>
</template>

<script type="text/ecmascript-6">
    import AppHeader from "../../../components/app-header.vue"
    import config from "../../../lib/config"
    import api from "../../../lib/http"
    import mask from '../../../base/mask.vue'
    import Scroll from "../../../base/scroll.vue"
    import {getDay} from '../../../lib/filter'
    import { tokenCache } from '../../../lib/cache'
    export default {
        data() {
            return {
                form:{
                    a:1,b:2
                },
                basicSituation: config.basic_situation,
                scrollHeight: 0,
                basicSituationForm: {},
                token:localStorage.getItem('token'),
                commpat:"",
                list:[],
                healthDetail:{},
                largePicUrl:"",
                showLarge:false,
                patAvatar:""
            };
        },
        filters:{
          getDay
        },
        computed: {},
        components: {
            Scroll,
            AppHeader,
            "VMask":mask
        },
        created() {
            this.scrollHeight = window.innerHeight - 45 - (window.rem2px * (0.94 + 0.3 + 0.3));
        },
        mounted() {
            this.getData();
            this.record();
            this.getPersonInfo()
        },
        beforeDestroy() {

        },
        methods: {
            makeLarge(imgSrc){
                this.showLarge = true
                this.largePicUrl = imgSrc.attaFileUrl
                console.log(imgSrc)
            },
            makeSmall(){
                this.showLarge = false
            },
            goDetail(name){
                console.log(name,7777)
                this.$router.push({
                    name:name,
                    params:{
                        str:this.healthDetail[name]
                    }
                })
            },
            goCaseDetail(item){
                console.log(item)
                this.$router.push({
                    name:'caseDetail',
                    params:{
                        caseObj:item
                    }
                })
            },
            getPersonInfo(){
                api("smarthos.user.pat.get",{
                    token:tokenCache.get()
                }).then((data)=>{
                    this.patAvatar = data.obj.pat.patAvatar
                    this.commpat = data.obj.commpat
                    console.log(this.commpat,4444)
                })
            },
            getData(){
                api('smarthos.medical.info.detail',{
                    token:tokenCache.get()
                }).then(res=>{
                if(res.succ && res.obj){
                    this.$set(this.$data,'healthDetail',res.obj);
                }else if(res.succ){

                }else{
                    this.$weui.alert(res.msg)
                }
            })
            },
            record(){
                api("smarthos.medical.history.list.page",{
                    token:this.token,
                }).then(res=>{
                    console.log(res,888888)
                    if(res.succ){
                        this.$set(this.$data,'list',res.list);
                    }else {
                        this.$weui.alert(res.msg)
                    }
                })
            },
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common";

    .wrapper {
        overflow: hidden;
    }
    .largePic{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index:10000;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width:100%;
      }
    }
    .add-medical-record {
        padding: (750px - 690px)/2 0;
        a {
            border-radius: 10px;
            text-align: center;
            color: white;
            margin: 0 auto;
            @include w_h(690px, 94px);
            line-height: 94px;
            background-color: $mainColor;
        }
    }

    .patinfo {
        padding: $commonSpace;
        background-color: white;
        $avaWid: 134px;
        %ava {
            @include w_h($avaWid, $avaWid);
        }
        .ava {
            @extend %ava;
            border-radius: $avaWid/2;
            overflow: hidden;
            img {
                @extend %ava;
            }
        }
        .info {
            margin-left: 30px;
            h3 {
                font-size: 32px;
                color: #333333;
            }
            div, p {
                margin-top: 20px;
                font-size: 26px;
                color: #999999;
            }
        }
    }

    .title {
        @include h_lh(80px);
        padding: 0 $commonSpace;
        color: #666666;
        font-size: 28px;
    }

    .basic-situation {
        ul {
            li + li {
                @include border(top);
            }
            li {
                padding: 0 $commonSpace;
                background-color: white;
                @include h_lh(90px);
                .label {
                    color: #333333;
                    font-size: 32px;
                }
                .text {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    padding-right: 18px + 20px;
                    background-image: url(../../../../static/img/icon/arrow-right-grow.png);
                    @include backgroundImageSet(18px, 30px, right);
                    color: #666666;
                }
            }
        }
    }

    .record {
        background-color: white;
        padding: 30px $commonSpace;
        ul {
            > li + li {
                margin-top: 30px;
            }
            > li {
                h3 {
                    font-size: 32px;
                    color: #333;
                }
                .content {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                   word-break: break-all;
                    margin-top: 20px;
                    color: #666666;
                    font-size: 28px;
                }
                ol {
                    /*height:180px;*/
                    overflow: hidden;
                    li {
                        padding-top: 20px;
                        float: left;
                        text-align: center;
                        img{
                           width: 160px!important;
                           height:160px;
                           margin-right: 5px;
                           margin-left: 7px;
                        }
                    }
                    /*<!--&.img.img1 {-->*/
                        /*<!--img {-->*/
                            /*<!--@include w_h(300px, 300px);-->*/
                        /*<!--}-->*/
                    /*<!--}-->*/
                    /*<!--&.img.img2 {-->*/
                        /*<!--li + li {-->*/
                            /*<!--margin-left: 30px;-->*/
                        /*<!--}-->*/
                        /*<!--img {-->*/
                            /*<!--@include w_h(250px, 250px);-->*/
                        /*<!--}-->*/
                    /*<!--}-->*/
                    /*<!--&.img {-->*/
                        /*<!--li:nth-child(3n+2),li:nth-child(3n+3){-->*/
                            /*<!--margin-left: 20px;-->*/
                        /*<!--}-->*/
                        /*<!--img {-->*/
                            /*<!--@include w_h(218px, 218px);-->*/
                        /*<!--}-->*/
                    /*<!--}-->*/
                }
            }
        }
    }
</style>
