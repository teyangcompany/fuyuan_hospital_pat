<template>
  <div class="page">
    <div class="wrapper" ref="main">
      <header class="relative center">
        <!--<div class="back absolute"></div>-->
        我的
      </header>
      <div class="subheader flex" @click="goPerson">
        <div class="ava flex0" v-if="patAvatar">
          <img :src="patAvatar" alt="">
        </div>
        <div class="ava flex0" v-else>
          <img src="../../../static/img/pat.m.jpg" alt="" v-if="patDetail.commpatGender == 'M'">
          <img src="../../../static/img/pat.f.jpg" alt="" v-else>
        </div>
        <div class="info flex1">
          <!--<h3 v-show="patDetail.commpatName">小{{patDetail.commpatName.substring(0, 1)}}</h3>-->
          <div>姓名：{{patDetail.commpatName}}</div>
          <p v-if="patDetail">
            {{patDetail.commpatGender | getGender}} {{ patDetail.commpatIdcard | getAge}}岁</p>
        </div>
        <!--<rouer-link :to="{name:'editUser',query:{id:patDetail.id,item:JSON.stringify(patDetail)}}" tag="div"-->
                    <!--class="info flex1">-->
          <!--<div>姓名：{{patDetail.commpatName}}</div>-->
          <!--<p v-if="patDetail">-->
            <!--{{patDetail.commpatGender | getGender}} {{ patDetail.commpatIdcard | getAge}}岁</p>-->
        <!--</rouer-link>-->
      </div>

      <div class="nav">
        <ul>
          <li @click="goPage(item)" v-for="item in nav" :class="[item.name]" class="flex">
            <div class="icon flex0"></div>
            <div class="text flex1">{{item.value}}</div>
          </li>
        </ul>
      </div>

      <!--<div class="quit flex">-->
      <!--<div class="icon flex0"></div>-->
      <!--<div class="text flex0">退出登录</div>-->
      <!--</div>-->
    </div>
    <app-footer class="noflex" :currentNav="currentNav" ref="footer"></app-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import AppFooter from "../../components/app-footer.vue"
  import config from "../../lib/config"
  import {mainHeightMixin, isBindMixin} from "../../lib/mixin"
  import api from '../../lib/http'
  import {getGender, getAge} from "../../lib/filter"
  import {debug} from "../../lib/util"

  export default {
    filters: {getGender, getAge},
    mixins: [mainHeightMixin, isBindMixin],
    data() {
      return {
        nav: config.my_nav,
        currentNav: 3,
        patDetail: {},
        patAvatar: "",
        patGender:""
      };
    },
    computed: {},
    components: {
      AppFooter
    },
    mounted() {
      this._isBind().then((res) => {
        if (res === false) {
          this.$router.push("/login")
        } else {
          this.patDetail = res.userCommonPatVo;
          this.patAvatar = res.pat.patAvatar
          this.patGender = res.pat.patGender
        }
      });
    },
    beforeDestroy() {

    },
    methods: {
      goPage(nav) {
        nav.path && this.$router.push("/my" + nav.path);
      },
      goPerson(){
          this.$router.push({
               path:"my/profile"
          })
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  header {
    $hHei: 128px;

    @include h_lh($hHei);
    font-size: 18px; /*no*/
    color: white;
    background-color: #1b8afe;
    .back {
      @include w_h($hHei, $hHei);
      @include t_r_b_l(0, 1, 1, 0);
      background-image: url(../../../static/img/icon/back.png);
      @include backgroundImageSet(12px*1.8, 22px*1.8);
    }
  }

  .subheader {
    @include w_h(750px, 213px);
    background-image: url(../../../static/img/my/bg2.png);
    @include backgroundImageSet(750px, 213px);
    padding: 0 $commonSpace;

    $aWid: 134px;
    %a {
      @include w_h($aWid, $aWid);
    }
    .ava {
      border-radius: 50%;
      overflow: hidden;
      @extend %a;
      img {
        @extend %a;
      }
    }
    .info {
      margin-left: 30px;
      color: white;
      background-image: url(../../../static/img/icon/arrow-right-white.png);
      @include backgroundImageSet(18px*1.5, 33px*1.5, right, $aWid/2 - 33px*1.5/2);
      p {
        font-size: 12px; /*no*/
      }
      div, p {
        margin-top: 15px;
      }
    }
  }

  %icon {
    $iconWid: 45px;
    @include w_h($iconWid, $iconWid);
    @include backgroundImageSet(100%, 0);
  }

  %text {
    font-size: 16px; /*no*/
    margin-left: 30px;
  }

  .nav {
    ul {
      li + li {
        @include border(top);
      }
      li {
        align-items: center;
        background-color: white;
        @include h_lh(90px);
        padding: 0 $commonSpace;
        .icon {
          @extend %icon;
        }
        .text {
          @extend %text;
          background-image: url("../../../static/img/icon/arrow-right-grow.png");
          @include backgroundImageSet(18px, 30px, right);
        }
        &.account, &.wallet {
          &::after {
            display: none;
          }
        }
        &.wallet {
          margin: 20px 0;
        }
        @each $i in my-consult, my-book, common-visitperson, archives, wallet, account, about {
          &.#{$i} {
            .icon {
              background-image: url("../../../static/img/my/#{$i}.png");

            }
          }
        }
      }
    }
  }

  .quit {
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    height: 90px;
    .icon {
      @extend %icon;
      @include backgroundImageSet(90%, 0);
      background-image: url("../../../static/img/my/quit.png");
    }
    .text {
      @extend %text;
    }
  }
</style>
