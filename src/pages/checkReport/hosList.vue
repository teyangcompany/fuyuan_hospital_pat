<template>
  <div class="page">
    <app-header title="选择医院" class="noflex">
      <i slot="back"></i>
    </app-header>
    <div class="wrapper" ref="main">
      <div class="list">
        <ul>
          <router-link :key="item.id" :to="{path:'/checkReport',query:{pickedIndex:index}}" tag="li" class="flex" v-for="(item,index) in hosList">
            <div class="ava flex0">
              <img :src="item.yytp" alt="" v-if="item.yytp">
              <img src="" alt="" v-else>
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
  </div>
</template>

<script>
  import AppHeader from "../../components/app-header.vue"
  import api from '../../lib/bookApi'

  export default {
    data() {
      return {
        hosList:""
      };
    },
    computed: {},
    components: {
      AppHeader
    },
    mounted() {

    },
    created(){
      api("smarthos.yygh.ApiHospitalService.areaHosList",{
      }).then((data)=>{
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
  @import "../../common/common";

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
          background-image: url(../../../static/img/icon/arrow-right-grow.png);
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
