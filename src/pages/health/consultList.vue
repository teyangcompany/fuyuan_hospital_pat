<template>
    <div>
        <top class="noflex" title="健康咨询" ref="header">
            <i slot="back"></i>
        </top>
        <scroll :height="heightX" :scrollX="flag" class="contain">
                <ul class="tabs">
                    <li class="mfb tabsValue" :class="{sel:num==index}" v-for="item,index of moduleList" @click="selModule(item,index)">{{item.moduleName}}</li>
                </ul>
        </scroll>
        <scroll :height="heightY" :data="list">
            <div>
               <div class="listItem" v-for="item of list" @click="goDetail(item.informationNews.id)">
                   <div class="itemImg">
                       <img :src="item.informationNews.titleCoverImg" alt="">
                   </div>
                   <div>
                       <p>{{item.informationNews.title}}</p>
                       <p>
                           <!--<span class="smc zan">{{item.informationNews.viewCount}}阅读</span>-->
                           <!--<span class="smc zan">{{item.informationNews.likesCount}}赞</span>-->
                           <!--<span class="smc zan">{{item.informationNews.createTime}}</span>-->
                       </p>
                   </div>
               </div>
            </div>
        </scroll>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import scroll from '../../base/scroll.vue'
    import api from '../../lib/http'
    export default{
        components: {
            top,
            scroll
        },
        mixins: [mainHeightMixin],
        data(){
            return {
                heightX:50,
                flag:true,
                moduleList:[],
                num:0,
                heightY:Number,
                token:localStorage.getItem('token'),
                list:[]
            }
        },
        created(){
          this.heightY = window.innerHeight-45-50
        },
        mounted(){
            api('smarthos.information.news.module.list',{
            }).then(res=>{
                console.log(res,6666)
                if(res.succ){
                    this.moduleList = res.list;
                    this.getData(res.list[0].id)
                }else {
                    alert(res.msg)
                }
            })
        },
        methods:{
            goDetail(id){
                this.$router.push('/consultDetail/'+id)
            },
            selModule(item,index){
                this.num = index;
                this.getData(item.id)
            },
            getData(id){
                api('smarthos.information.news.page',{
                    token:this.token,
                    moduleId:id
                }).then(res=>{
                    console.log(res,88888)
                    if(res.succ){
                        this.list = res.list
                    }else {
                        alert(res.msg)
                    }

                })
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.contain{
    background: white;
    line-height: 100px;
    border-bottom: 1px solid gainsboro;
}
.tabs{
    width: 125%;
    overflow-x: scroll;
    background: white;

}
    .tabsValue{
        width: 20%;
        float: left;
        text-align: center;
    }
    .sel{
        color: blue;
    }
    .listItem{
        display: flex;
        align-items: center;
        background: white;
        border-bottom: 1px solid gainsboro;
        padding: 20px;
    }
    .itemImg{
        width: 140px;
        height: 140px;

        margin-right: 30px;
        img{
            width: 140px;
            height: 140px;

            margin-right: 30px;
        }
    }
    .zan{
        color: blue;
        float: right;
        margin-right: 10px;
    }
</style>
