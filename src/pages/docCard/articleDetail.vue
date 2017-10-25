<template>
    <div>
        <top class="noflex" title="文章详情" ref="header">
            <i slot="back"></i>
        </top>
        <scroll :height="scrollHeight"  style="background: white" :data="articleObj">
            <div>
                <div class="easyHeader">
                    <h3>{{articleObj.title}}</h3>
                </div>
                <div class="date">
                    <span class="mfc reader">{{articleObj.readCount}} 阅读</span>
                    <span class="mfc reader">{{articleObj.likesCount}} 赞</span>
                    <span class="mfc reader">{{articleObj.createTime | Todate}}</span>
                </div>
                <div class="contain mfb" v-html="articleObj.content">

                </div>
            </div>
        </scroll>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import scroll from '../../base/scroll.vue'
    import {Todate} from '../../lib/filter'
    export default{
        components: {
            top,
            scroll
        },
        mixins: [mainHeightMixin],
        filters:{
            Todate
        },
        data(){
            return {
                id:"",
                token:localStorage.getItem('token'),
                scrollHeight:"",
                articleObj:{}
            }
        },
        created(){
          this.scrollHeight = window.innerHeight-45
        },
        mounted(){
            this.id = this.$route.params.id
            api('smarthos.user.doc.article.get',{
                token:this.token,
                id:this.id
            }).then(res=>{
                console.log(res,6666);
                if(res.succ){
                    this.articleObj = res.obj
                }else {
                    alert(res.msg)
                }
            })
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.easyHeader{
    text-align: center;
    padding: 20px;
}
    .date{
        text-align: center;
    }
    .reader{
        color: blue;
        padding: 5px;
    }
    .contain{
        padding: 30px;
    }
</style>
