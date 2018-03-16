<template>
  <div class="page">
    <app-header title="当天挂号" class="noflex">
      <!--<i slot="back"></i>-->
      <div class="right absolute" slot="right">
        <router-link tag="span" to="/my/myRegistration">我的挂号</router-link>
      </div>
    </app-header>
    <div class="wrapper" ref="main">
      <div class="list">
        <ul>
          <router-link :key="item.id" :to="{path:'/home/server/book/dept',query:{hosid:item.yyid,hosName:item.yyjc,from:'today'}}" tag="li" class="flex" v-for="item in hosList">
            <div class="ava flex0">
              <img :src="item.yytp" alt="" v-if="item.yytp" onerror="javascript:this.src='./static/img/fuyuanPic.jpg'">
              <img src="../../../../../static/img/fuyuanPic.jpg" alt="" v-else>
            </div>
            <div class="info flex1">
              <h3>{{ item.yyjc }}</h3>
              <div>{{ item.yydj }}</div>
              <p>{{ item.yydz }}</p>
            </div>
          </router-link>
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
  import {isBindMixin} from '../../../../lib/mixin'
  export default {
    data() {
      return {
        hosList:"",
        showToast:false
      };
    },
    computed: {},
    components: {
      AppHeader,
      Toast
    },
    mixins: [isBindMixin],
    mounted() {

    },
    created(){

      this._isBind().then((res) => {
        if (res === false) {
//          fromCache.set(this.$route.fullPath);
          this.$router.push("/login")
        }
      });
      this.showToast = true
      api("smarthos.yygh.ApiHospitalService.areaHosList",{
//          cityAreaId:"330100"
      }).then((data)=>{
        this.showToast = false
        if(data.code == 0){
          this.hosList = data.list
        }else{
          weui.alert(data.msg)
        }
        console.log(data)
      })
    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../../../common/common";

  .list {
    ul {
      li + li {
        @include border(top);
      }
      li {
        /*<!--padding: 210px/2 - 130px/2 28px;-->*/
        padding: 20px 28px;
        background-color: white;
        %a {
          @include w_h(130px, 130px);
        }
        .ava {
          @extend %a;
          overflow: hidden;
          border-radius: 8px;
          img {
            @extend %a;
          }
        }
        .info {
          background-image: url(../../../../../static/img/icon/arrow-right-grow.png);
          @include backgroundImageSet(16px, 26px, right);
          margin-left: 30px;
          h3 {
            font-size: 16px; /*no*/
          }
          p, div {
            margin-top: 0px;
            font-size: 12px; /*no*/
            color: #999;
          }
        }
      }
    }
  }
</style>
