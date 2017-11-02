<template>
    <div class="notice">
        <div class="contain">
            <div class="msg" v-if="docRestNotice && docRestNotice.content">
               <p>
                   <span>停诊公告</span>
                   <span class="restTime">{{ docRestNotice.noticeStartDate | Todate}}~{{ docRestNotice.noticeEndDate | Todate}}</span>
               </p>
               <p>&nbsp; &nbsp;&nbsp; &nbsp;{{docRestNotice.content}}</p>
            </div>
            <div>
               <p>医生公告</p>
               <p>{{docOrdinaryNotice.content}}</p>
            </div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import {Todate,getDay,} from '../../lib/filter'
    export default{
        components: {
            top
        },
        mixins: [mainHeightMixin],
        filters:{
          Todate,
          getDay,
        },
        data(){
            return {
                token:localStorage.getItem('token'),
                docId:sessionStorage.getItem('docId')||"",
                docOrdinaryNotice:{},
                docRestNotice:{}
            }
        },
        mounted(){
            api('smarthos.user.doc.notice.get',{
                token:this.token,
                docId:this.docId
            }).then(res=>{
                console.log(res,66666);
                if(res.succ){
                    this.docOrdinaryNotice = res.obj.docOrdinaryNotice
                    this.docRestNotice = res.obj.docRestNotice
                }else {
                    alert(res.msg)
                }
            })
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
.notice{
    display: flex;
    flex: 1;
}
    .contain{
        margin: 60px 25px;
        height: 100%;
    }
    .msg{
        margin-bottom: 40px;
        p:nth-child(1){
            display: flex;
            justify-content: space-between;
            span.restTime{
              color: red;
            }
        }
    }
</style>
