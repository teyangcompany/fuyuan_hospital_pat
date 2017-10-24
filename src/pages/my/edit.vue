<template>
  <div>
    <app-header title="编辑个人资料" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="main" ref="main">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">qq</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入qq号">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import AppHeader from "../../components/app-header.vue"
  import api from '../../lib/http'
  import {mainHeightMixin} from "../../lib/mixin"
  //  var token  = localStorage.getItem('token')
  export default {
    components: {
      AppHeader
    },
    mixins: [mainHeightMixin],
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  @import '../../common/common.scss';

  .add {
    color: #0FBDFF;
  }

  .form-group__message {
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }

  .arrow {
    color: gray;
    font-weight: 800;
  }

  .weui-cells {
    margin-top: 30px;
  }

  .weui-label {
    width: 80px; /*no*/

  }

</style>
