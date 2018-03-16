<template>
    <div>
        <!--<top class="noflex" title="文章详情" ref="header">-->
            <!--<i slot="back"></i>-->
        <!--</top>-->
        <v-header :title="title" :rightTitle="rightTitle"></v-header>
        <scroll :height="scrollHeight"  style="background: white" :data="articleObj">
            <div>
                <div class="easyHeader">
                    <h3>{{articleObj.title}}</h3>
                </div>
                <div class="date">
                    <span class="mfc reader">{{articleObj.docName}} </span>
                    <span class="mfc reader">{{articleObj.createTime | Todate}}</span>
                    <span class="mfc reader">阅读 {{articleObj.readCount}} </span>
                    <!--<span class="mfc reader">{{articleObj.likesCount}} 赞</span>-->
                </div>
                <div class="contain mfb" v-html="articleObj.content">

                </div>
                <div class="codeImg">
                   <span>扫描二维码关注我</span>
                  <img :src="doc.docQrcode" alt="">
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
    import header from '../../base/header.vue'
    import scroll from '../../base/scroll.vue'
    import {Todate} from '../../lib/filter'
    export default{
        components: {
            top,
            scroll,
            "VHeader":header
        },
        mixins: [mainHeightMixin],
        filters:{
            Todate
        },
        data(){
            return {
                id:"",
                doc:"",
                docId:"",
                token:localStorage.getItem('token'),
                scrollHeight:"",
                articleObj:{},
                title:"文章详情",
                rightTitle:""
            }
        },
        created(){
          this.scrollHeight = window.innerHeight-45
          this.getData()
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
        },
        methods:{
          getData() {
            this.docId = sessionStorage.getItem('docId')
            api('smarthos.user.doc.card.get', {
              docId: this.docId
            }).then(res => {
              console.log(res,1111)
              if (res.succ) {
                this.doc = res.obj.doc;
              } else {
                if (res.msg == '医患关系不存在') {

                } else {
                  alert(res.msg)
                }
              }
            })
          },
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.easyHeader{
    text-align: center;
    padding: 20px;
    h3{
      font-size: 32px;
      color: #333333;
    }
}
    .date{
        text-align: center;
        span{
           font-size: 24px;
           color: #999999;
        }
    }
    .reader{
        color: #666666;
        padding: 5px;
    }
    .contain{
        padding: 30px;
        font-size: 28px;
        color: #333333;
    }
    .codeImg{
      width: 690px;
      margin:0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
        img{
          width: 400px;
          height:400px;
        }
    }
</style>
