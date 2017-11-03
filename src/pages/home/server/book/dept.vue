<template>
  <div class="page">
    <!--<app-header :title="hosName" class="noflex">-->
      <!--<i slot="back"></i>-->
    <!--</app-header>-->
    <div class="top_bar main_head border-1px">
      <section class="goBack" @click="gohosList()">
        <img src="../../../../../static/img/icon/arrow-left-black.png" alt="">
      </section>
      <section class="title">
        <span class="word">{{hosName}}</span>
      </section>
      <section class="nav">

      </section>
    </div>
    <div class="wrapper main flex" ref="main">
      <div ref="left" class="maindept flex0">
        <ul>
          <li :class="[index==currentDept?'cover':'']" @click="selectRoom(index)" v-for="(item,index) in parentList">
            {{item.deptName}}
          </li>
        </ul>
      </div>
      <div ref="right" class="subdept flex0">
        <ul>
          <router-link tag="li" :to="{path:'/home/server/book/doc/expert',query:{depid:item.ksid,hosid:hosid,selected:item.ksmc,hosName:hosName}}" :key="index" v-for="(item,index) in subDept">{{item.ksmc}}</router-link>
        </ul>
      </div>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>

<script>
  import AppHeader from "../../../../components/app-header.vue"
  import api from '../../../../lib/bookApi'
  import Toast from '../../../../base/toast.vue'
  import {mainHeightMixin} from "../../../../lib/mixin"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        currentDept: 0,
        hosid:"",
        hosName:"",
        parentList:"",
        subDept:"",
        showToast:false
      };
    },
    computed: {
//      subDept() {
//        return this.dept[this.currentDept].deptList
//      }
    },
    components: {
      AppHeader,
      Toast
    },
    mounted() {
      this.init();

    },
    created(){
        this.hosid = this.$route.query.hosid
        this.hosName = this.$route.query.hosName
        this.showToast = true
        api("smarthos.yygh.ApiDepartmentService.oneClassDepartmentList",{
          hosId:this.hosid
        }).then((data)=>{
          this.showToast = false
            if(data.code == 0){
              this.parentList = data.list
              this.subDept = data.list[0].yyghYyksList
              console.log(data)
            }else{
                weui.alert(data.msg)
            }
        })
    },
    beforeDestroy() {

    },
    methods: {
      init() {
        setTimeout(() => {
          if (this.$refs.left) {
            this.$refs.left.style.height = `${window.innerHeight - 45}px`;
          }

          if (this.$refs.right) {
            this.$refs.right.style.height = `${window.innerHeight - 45}px`;
          }

        }, 20)
      },
      selectRoom(index){
          this.currentDept = index
        this.subDept = this.parentList[index].yyghYyksList
      },
      gohosList(){
        this.$router.back(-1)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../common/common";

  .main {
    overflow: hidden;
    > div {
      overflow-y: auto;
      background-color: white;
      ul {
        li {
          font-size: 30px;
          padding: 30px 0 30px 50px;
        }
      }
    }
    .maindept {
      background-color: #f5f5f5;
      width: 240px;
      li {
        color: #666666;
        &.cover {
          color: $mainColor;
          background-color: white;
          @include border(left, $mainColor, after, solid, 12px);

        }
      }
    }
    .subdept {
      width: 750px - 240px;
      li {
        color: #333;
      }
    }
  }
  .top_bar{
    position: relative;
    background-color: white;
    height: 88px;
    line-height: 88px;
    width:100%;
    top:0;
    display: flex;

    /*z-index:160;*/

    z-index:6;

    section{
      text-align: center;
      .word{
        font-size: 18px;
        color: #333333;
        font-family: PingFang SC;
      }
      span{
        display: block;
      }
    }
    .goBack{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img{
        height: 35px;
        padding-left: 30px;
      }
    }
    .scanImg{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /*padding-left: 15px;*/
      img{
        width:40px;
        padding-left: 30px;
      }
    }
    .title{
      flex:2;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size: 36px!important;
        color: #333333;
        display: inline-block;
      }
      img{
        width:55px;
        height:55px;
        display: inline-block;
        margin-right: 10px;
        /*<!--position: absolute;-->*/
        /*<!--left:270px;-->*/
        /*<!--top:15px;-->*/
        border-radius: 50%;
      }
    }
    .nav{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: center;
      .rightWord{
        font-size: 32px;
        color: $mainColor;
      }
    }
  }
</style>
