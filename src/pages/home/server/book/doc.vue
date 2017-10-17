<template>
  <div class="page">
    <!--<app-header :title="selected" class="noflex">-->
      <!--<i slot="back"></i>-->
    <!--</app-header>-->
    <div class="top_bar main_head border-1px">
      <section class="goBack" @click="goRoom()">
        <img src="../../../../../static/img/icon/arrow-left-black.png" alt="">
      </section>
      <section class="title">
        <span class="word">{{selected}}</span>
      </section>
      <section class="nav">

      </section>
    </div>
    <div class="nav">
      <ul class="flex">
        <!--<li class="flex0" @click="current=index" :class="[current==index?'cover':'']" v-for="(item,index) in nav">-->
          <!--{{item.value}}-->
        <!--</li>-->
        <router-link tag="li" :to="{path:'/home/server/book/doc/expert',query:{depid:depid,hosid:hosid,selected:selected,hosName:hosName}}">
            按专家预约
        </router-link>
        <router-link tag="li" :to="{path:'/home/server/book/doc/date',query:{depid:depid,hosid:hosid,selected:selected,hosName:hosName}}">
            按日期预约
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import config from "../../../../lib/config"
  import api from '../../../../lib/bookApi'
  import Toast from '../../../../base/toast.vue'
  import AppHeader from "../../../../components/app-header.vue"

  export default {
    data() {
      return {
        current: 0,
        nav: config.book_doc_nav,
        depid:"",
        hosid:"",
        doctorList:"",
        showToast:false,
        bookDocId:"",
        selected:"",
        commonRoom:"",
        hosName:""
      };
    },
    computed: {},
    components: {
      AppHeader,
    },
    mounted() {

    },
    created(){
        this.selected = this.$route.query.selected
        this.depid = this.$route.query.depid
        this.hosid = this.$route.query.hosid
        this.selected = this.$route.query.selected
        this.hosName = this.$route.query.hosName
    },
    beforeDestroy() {

    },
    methods: {
      goRoom(){
        this.$router.back(-1)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../common/common";

  .nav {
    /*position: relative;*/
    z-index: 100;
    ul {
      li {
        &:nth-child(2) {
          @include border(left, #ccc, before);
          &::before {
            top: 10px;
            height: 70px;
          }
        }

        &.cover {
          color: $mainColor;
          @include border(bottom, $mainColor, after, solid, 8px);
          &::after {
            width: 200px;
            left: (750px/2 - 200px)/2;
          }
        }

        background-color: white;
        @include h_lh(90px);
        text-align: center;
        width: 50%;
        font-size: 30px;
        color: #999999;
      }
      .router-link-exact-active{
        color: $mainColor;
        border-bottom: 4px solid $mainColor;
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
