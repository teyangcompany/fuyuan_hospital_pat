<template>
    <div class="page">
        <app-header title="健康档案" class="noflex">
            <i slot="back"></i>
        </app-header>
        <scroll class="wrapper" :height="scrollHeight" :data="list" ref="wrapper">
            <div>
                <div class="patinfo flex">
                    <div class="ava flex0">
                        <img :src="patAvatar" alt="">
                    </div>
                    <div class="info flex1">
                        <h3>{{commpat.commpatName}}</h3>
                        <div>姓名：&nbsp; {{commpat.commpatName}}</div>
                        <p>{{commpat.commpatGender=='M'?'男':'女'}} &nbsp;&nbsp;&nbsp;23</p>
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
                        <li v-for="(item,i) in list" @click="goCaseDetail(item)">
                            <h3>{{item.medicalHistory.createTime | Getdate}}</h3>
                            <div class="content">{{item.medicalHistory.medContent}}</div>
                            <ol :class="['img',item.attaList?'img'+item.attaList.length:'']">
                                <li v-for="imgSrc of item.attaList">
                                    <img @load="$refs.wrapper.refresh()"
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
    </div>
</template>

<script type="text/ecmascript-6">
    import AppHeader from "../../../components/app-header.vue"
    import config from "../../../lib/config"
    import api from "../../../lib/http"
    import Scroll from "../../../base/scroll.vue"
    import {Getdate} from '../../../lib/filter'
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
                commpat:JSON.parse(localStorage.getItem('commpat')),
                list:[],
                healthDetail:{},
                patAvatar:localStorage.getItem('patAvatar')
            };
        },
        filters:{
            Getdate
        },
        computed: {},
        components: {
            Scroll,
            AppHeader
        },
        created() {
            this.scrollHeight = window.innerHeight - 45 - (window.rem2px * (0.94 + 0.3 + 0.3));
        },
        mounted() {
            this.getData();
            this.record();
        },
        beforeDestroy() {

        },
        methods: {
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
                this.$router.push({
                    name:'caseDetail',
                    params:{
                        caseObj:item
                    }
                })
            },
            getData(){
                api('smarthos.medical.info.detail',{
                    token:this.token
                }).then(res=>{
                    console.log(res,6666)
                if(res.succ){
                    this.$set(this.$data,'healthDetail',res.obj);

                }else {
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
                    margin-top: 20px;
                    color: #666666;
                    font-size: 28px;
                }
                ol {
                    overflow: hidden;
                    li {
                        padding-top: 20px;
                        float: left;
                    }
                    &.img.img1 {
                        img {
                            @include w_h(300px, 300px);
                        }
                    }
                    &.img.img2 {
                        li + li {
                            margin-left: 30px;
                        }
                        img {
                            @include w_h(250px, 250px);
                        }
                    }
                    &.img {
                        li:nth-child(3n+2),li:nth-child(3n+3){
                            margin-left: 20px;
                        }
                        img {
                            @include w_h(218px, 218px);
                        }
                    }
                }
            }
        }
    }
</style>
