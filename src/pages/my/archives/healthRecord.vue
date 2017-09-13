<template>
    <div class="page">
        <top @click="goMy" ref="headers">
            <div class="middle big">健康档案</div>
        </top>
      <div v-show="!showLoading" ref="wrapper" class="wrap">
        <div>
          <div class="patMsg">
            <div class="patImg">
              <img :src="patAvatar" alt="">
            </div>
            <div class="patDetail">
              <p class="bf">{{commpat.commpatName}}</p>
              <p class="mfc">姓名：&nbsp; {{commpat.commpatName}}</p>
              <p class="mfc">{{commpat.commpatGender=='M'?'男':'女'}} &nbsp;&nbsp;&nbsp;23</p>
            </div>
          </div>
          <div class="basic">
            <div class="weui-cells__title title">基本情况</div>
            <div class="weui-cells bf">
              <a @click="presentingComplaint" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p>所患疾病</p>
                </div>
                <div class="weui-cell__ft mfc">{{healthDetail.presentingComplaint?healthDetail.presentingComplaint.substring(0,8):'无'}}</div>
              </a>
              <a @click="pastHistory" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p>既往史</p>
                </div>
                <div class="weui-cell__ft mfc">{{healthDetail.pastHistory?healthDetail.pastHistory.substring(0,8):'无'}}</div>
              </a>
              <a @click="familyHistory" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p>家族史</p>
                </div>
                <div class="weui-cell__ft mfc">{{healthDetail.familyHistory?healthDetail.familyHistory.substring(0,8):'无'}}</div>
              </a>
              <a @click="allergyHistory" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p>过敏史</p>
                </div>
                <div class="weui-cell__ft mfc">{{healthDetail.allergyHistory?healthDetail.allergyHistory.substring(0,8):'无'}}</div>
              </a>
            </div>
          </div>
          <div class="record">
            <div class="weui-cells__title title">诊疗记录</div>
            <div class="recordDetail" v-for="item of list" @click="goCaseDetail(item)">
              <div class="recordDate" >
                <span class="mf">{{item.medicalHistory.createTime | Getdate}} </span>
              </div>
              <div class="recordContain">
                <span class="mf">{{item.medicalHistory.medContent}}</span>
                <p class="recordImg" >
                  <img :src="imgSrc.attaFileUrl" alt="" v-for="imgSrc of item.attaList">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <div class="btnImg" @click="goAddCase">
          <!--<img  src="../../../static/img/btn.png" alt="">-->
        </div>
      </div>
      <My-loading v-show="showLoading" class="myLoading"></My-loading>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import api from '../../lib/api'
    import {Getdate} from '../../lib/filter'
    import MyLoading from "../../base/loading/loading.vue";
    import BScroll from 'better-scroll'
//    var token = localStorage.getItem('token')
//    var commpat = JSON.parse(localStorage.getItem('commpat'))
    export default{
        components: {
            top,
          MyLoading
        },
        data(){
            return {
              token:localStorage.getItem('token'),
              commpat:JSON.parse(localStorage.getItem('commpat')),
              list:[],
              healthDetail:{},
              showLoading:true,
              patAvatar:localStorage.getItem('patAvatar')
            }
        },
      filters:{
        Getdate
      },

        mounted(){
            this.initScroll()
          this.getData();
          this.record();
        },
      watch:{
        list(){
          this.$nextTick(()=> {
              this.initScroll()
          })
        }
      },
      methods:{
        initScroll(){
            this.scroll = new BScroll(this.$refs.wrapper,{
              click:true,
              probeType: 1,
              bounce: true
            });
          console.log(this.scroll,2222)
        },
        goMy(){
          this.$router.push('my')
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
        pastHistory(){
          this.$router.push({
            name:'pastHistory',
            params:{
              pastHistory:this.healthDetail.pastHistory?this.healthDetail.pastHistory:''
            }
          })
        },
        presentingComplaint(){
          this.$router.push({
            name:'presentingComplaint',
            params:{
              presentingComplaint:this.healthDetail.presentingComplaint?this.healthDetail.presentingComplaint:''
            }
          })
        },
        allergyHistory(){
          this.$router.push({
            name:'allergyHistory',
            params:{
              allergyHistory:this.healthDetail.allergyHistory?this.healthDetail.allergyHistory:''
            }
          })
        },
        familyHistory(){
          this.$router.push({
            name:'familyHistory',
            params:{
              familyHistory:this.healthDetail.familyHistory?this.healthDetail.familyHistory:''
            }
          })
        },
        getData(){
          api('smarthos.medical.info.detail',{
            token:this.token
          }).then(res=>{
            console.log(res,6666)
            if(res.succ){
              this.$set(this.$data,'showLoading',false)
              this.$set(this.$data,'healthDetail',res.obj);
            }else {
              this.$weui.alert(res.msg)
            }
          })
        },
        goAddCase(){
          this.$router.push({
            name:'addCase'
          })
        },
        goCaseDetail(item){
          this.$router.push({
            name:'caseDetail',
            params:{
              caseObj:item
            }
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';

    .page{
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      height: 100%;
    }
    .wrap{
      flex: 1;
      overflow-y: auto;
      position: fixed;
      left: 0;
      right: 0;
      top:88rem/$rem;
      bottom: 0;
      width: 100%;
    }
   .patMsg{
     padding: 20rem/$rem 30rem/$rem;
     height: 160rem/$rem;
     width: 100%;
     display: flex;
     align-items: center;
     box-sizing: border-box;
     background: white;
   }
  .patImg{
    box-sizing: border-box;
    padding-right: 30rem/$rem;
    img{
      display: block;
      width: 120rem/$rem;
      height: 120rem/$rem;
    }
  }
    .weui-cells__title{
      padding: 0;
    }
  .weui-cells:before{
    border: none;
  }
  .title{
    box-sizing: border-box;
    padding: 10rem/$rem 30rem/$rem;
    font-size: 32rem/$rem;
    color: black;
  }
   .recordDetail{
     padding: 30rem/$rem;
     background: white;
     display: flex;
     box-sizing: border-box;
     border-bottom: 1px solid gainsboro;
   }
  .recordDate{
    padding-right: 20rem/$rem;
    flex: 0 0 auto;
  }
  .circle{
    display: inline-block;
    width: 20rem/$rem;
    height: 20rem/$rem;
    background: #0fbdff;
    border-radius: 10rem/$rem;
  }
  .recordImg{
    flex: 1 1 auto;
    box-sizing: border-box;
    padding-top: 20rem/$rem;
    padding-right: 10rem/$rem;

    img{
      width: 140rem/$rem;
      height: 140rem/$rem;
      padding-right: 5rem/$rem;
    }
  }
    .btn{
      position: fixed;
      bottom: 90rem/$rem;
      right: 30rem/$rem;
    }
  .btnImg{
    width: 110rem/$rem;
    height: 110rem/$rem;
    background-image: url(../../../static/img/btn.png);
    repeat:no-repeat;
    background-size:110rem/$rem;
  }
  .btnImg:active{
    background-image: url(../../../static/img/dbtn.png);
    repeat:no-repeat;
    background-size:110rem/$rem;
  }
  /*.myLoading{*/
    /*height: 100%;*/
  /*}*/

</style>
