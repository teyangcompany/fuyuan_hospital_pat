<template>
  <!-- 切换就诊人模块-->
  <my-popup :show="showPat" @activate="close">
    <div slot="contain" class="contain">
      <div class="title">
        <p class="m light border-1px">{{ option }}</p>
      </div>
      <div class="main" id="wrapper" ref="wrapper">
        <div>
          <div v-for="(item,index) in patList" @click="check(index)">
            <p class="dark border-1px">{{item.commpatName}}</p>
          </div>
          <p class="lightBlue border-1px" @click="addPat()" v-if="path !='/bookService'"><span>添加常用就诊人</span></p>
        </div>
      </div>
      <div class="ft">
        <p class="dark cancel" @click="closeToggle()">取消</p>
      </div>
    </div>
  </my-popup>
</template>
<script>
  import MyPopup from "./pop.vue";
  import BScroll from 'better-scroll'
  export default({
    data(){
      return{
        path:""
      }
    },
    components:{
      MyPopup
    },
    props:{
      showPat:{
        type:Boolean,
        default:false,
        required:true
      },
      patList:{
//        type:Array,
        default:[],
        required:true
      },
      option:{
        type:String,
      }
    },
    mounted(){
      this.path = this.$route.path
      console.log(this.path)
    },
    methods:{
      _initPatient(){
         this.myScroll = new BScroll(this.$refs.wrapper,{
//           mouseWheel: true,
//           momentum:true,
//           useTransition:true,
           click:true
         })
         console.log(this.myScroll)
      },
      check(index){
        this.$emit("activate",index);
      },
      addPat(){
        this.$router.push({
          path:"/my/addUser",
          query:{num:"1"}
        });
//        if(this.path == '/home/server/book/confirmOrder'){
//
//        }

      },
      close(){
        this.$emit("close");
      },
      closeToggle(){
        this.$emit("toggleClosed")
      },
      close(){
        this.$emit("toggleClosed")
      }
    },
    watch:{
      "$route":function(){
        this.path = this.$route.path
      },
      patList(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initPatient()
          },200)
        })
      }
    }
  })
</script>
<style scoped lang="scss">
  @import "../common/var.scss";
  @import '../common/mixin.scss';
 @mixin letter{
    padding: 30px 20px;
  }
  .contain{
    background:rgb(238,238,238);
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    div{
      background:white;
      p{
        position:relative;
        /*border-top:1px solid silver;*/
        @include letter;
        img{
          position:absolute;
          height:1rem;
          left:13rem;
          top:.8rem;
        }
      }
      flex:0 0 auto;
      text-align:center;
      padding:0 auto;
      &.ft{
        margin-top:.1rem;
      }
    }
    div#wrapper{
      /*width:100%;*/
      flex: 1 1 auto;
      /*overflow:hidden;*/
    }
  }
</style>
