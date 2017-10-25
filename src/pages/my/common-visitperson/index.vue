<template>
    <div class="page">
        <app-header title="常用就诊人" ref="header" class="noflex">
            <i slot="back"></i>
            <div slot="right" class="right absolute" @click="addUser">
                添加
            </div>
        </app-header>
        <div class="wrapper list" ref="main">
            <left-del displacement="0" tag="ul" class="part" :key="1"  v-for="item in list" >
                <ul class="flex">
                    <li class="left-part flex0 info" @click="goEditUser(item.id,item)">
                        <dl class="flex">
                            <dt class="flex0">{{item.commpatName}} {{item.commpatGender=='M'?'男':'女'}} {{ JSON.stringify(new Date()).substr(1,4)- item.commpatIdcard.substr(6,4)  }}岁 </dt>
                        </dl>
                        <dl class="flex">
                          <dt class="flex0">手机号:</dt>
                          <dd class="flex1">{{item.commpatMobile}}</dd>
                        </dl>
                        <dl class="flex">
                            <dt class="flex0">身份证:</dt>
                            <dd class="flex1">{{item.commpatIdcard}}</dd>
                        </dl>
                        <dl class="flex">
                          <dt class="flex0">病案号:</dt>
                          <dd class="flex1" v-if="item.userCommonPatRecords.length != 0">{{item.userCommonPatRecords[0].compatRecord}}</dd>
                          <dd class="flex1" v-else>暂未绑定病案号</dd>
                        </dl>
                    </li>
                    <li class="del-part flex0 del" @click="del(item.id)"></li>
                </ul>
            </left-del>
        </div>
      <v-dialog :dialogTitle="dialogTitle"
                :dialogMain="dialogMain"
                :dialogLeftFoot="dialogLeftFoot"
                :dialogRightFoot="dialogRightFoot"
                v-if="showDialog"
                @on-cancel="cancelDialog" @on-download="confirmDelete"></v-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import AppHeader from "../../../components/app-header.vue"
    import {mainHeightMixin} from "../../../lib/mixin"
    import LeftDel from "../../../base/left-del.vue"
    import api from '../../../lib/http'
    import dialog from '../../../base/dialog.vue'

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                token:localStorage.getItem('token'),
                list:[],
              patId:"",
              showDialog:false,
              dialogTitle:"",
              dialogMain:"确定删除此就诊人",
              dialogLeftFoot:"取消",
              dialogRightFoot:"确定",
            };
        },
        computed: {},
        components: {
            AppHeader,
            LeftDel,
            "VDialog":dialog
        },
        mounted() {
         this.getData()
        },
        beforeDestroy() {

        },
        methods: {
            goEditUser(id,item){
                console.log(212121)
                this.$router.push({
                    name:'editUser',
                    query:{
                        id:id,
                        item:JSON.stringify(item)
                    }
                })
            },
            addUser(){
               if(this.list.length == 5){
                    weui.alert("最多可以绑定5个就诊人")
               }else{
                 this.$router.push({
                   name:'addUser'
                 })
               }
            },
            getData(){
                api('smarthos.user.commpat.list',{
                    token:this.token
                }).then(res=>{
                    console.log(res,66666);
                    if(res.succ){
                        this.list = res.list;
                    }else {
                        this.$weui.alert(res.msg)
                    }
                })
            },
            cancelDialog(){
              this.showDialog = false
            },
            confirmDelete(){
                this.showDialog = false
                api('smarthos.user.commpat.delete',{
                  token:this.token,
                  commpatId:this.patId
                }).then(res=>{
                  console.log(res,66666);
                  if(res.succ){
                    this.$weui.toast('删除成功',3000);
                    this.getData()
                  }else {
                    this.$weui.alert(res.msg)
                  }
                })
            },
            del(patId){
                this.showDialog = true
                this.patId = patId
            },
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common.scss";

    .page {
        background-color: white;
    }

    $hei: 260px;
    .list {
        padding-top: 20px;
        .part + .part {
            margin-top: 20px;
        }
        .part {
            margin: 0 $commonSpace;
            @include w_h(750px - $commonSpace*2, $hei);
            ul {
                transition: all 0.3s;
                @include w_h(750px - $commonSpace*2 + 20px + 100px, $hei)
            }
        }

    }

    .info {
        background-color: #f5fbfb;
        @include w_h(750px - $commonSpace*6.7, $hei);
        border-radius: 20px;
        padding: 30px;
        background-image: url("../../../../static/img/delete.png");
        /*background-image: url("../../../../static/img/icon/arrow-right-grow.png");*/
        @include backgroundImageSet(18px, 30px, 750px - $commonSpace*2 -30px - 18px);
        dl + dl {
            /*margin-top: 20px;*/
        }
        dl {
            dt {
                font-size: 32px;
                color: #333333;
            }
            dd {
                font-size: 28px;
                color: #666666;
                margin-left: 20px;
            }
        }
    }

    .del {
        margin-left: 20px;
        @include w_h(100px, $hei);
        /*background-color: #f4888c;*/
        background-color: #f5fbfb;
        background-image: url(../../../../static/img/delete.png);
        @include backgroundImageSet(46px, 46px);
        border-radius: 20px;
    }
</style>
