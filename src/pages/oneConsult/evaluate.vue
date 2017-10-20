<template>
  <div class="page">
    <top class="noflex" title="评价医生" ref="header">
      <i slot="back"></i>
    </top>
    <div class="wrap">
      <div class="xing">
        <label v-for="(item,index) in 5" class="eval" :class="{sel:num>index}" @click="num=index+1">&#xe64e;</label>
      </div>
      <div class="contain">
        <div class="weui-cells__title">请输入评价</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea v-model="evaluateContent" class="weui-textarea" placeholder="请输入文本" rows="3"></textarea>
            </div>
          </div>
        </div>

      </div>
      <div class="btn">
                <span class="submit" @click="submit">
                      提交
                </span>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../components/app-header.vue'
  import {mainHeightMixin} from '../../lib/mixin'
  import config from '../../lib/config'
  import api from '../../lib/http'

  export default {
    components: {
      top
    },
    mixins: ['mainHeightMixin'],
    data() {
      return {
        num: 0,
        consultId: "",
        token: localStorage.getItem('token'),
        evaluateContent: ""
      }
    },
    mounted() {
      this.consultId = this.$route.params.id
    },
    methods: {
      submit() {
        api('smarthos.consult.one2one.pic.evaluate', {
          evaluateContent: this.evaluateContent,
          token: this.token,
          evaluateScore: this.num * 2,
          consultId: this.consultId
        }).then(res => {
          console.log(res, 6666);
          if (res.succ) {

          } else {
            alert(res.msg)
          }
        })
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../common/common.scss';

  @font-face {
    font-family: 'iconfont';  /* project id 326803 */
    src: url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.eot');
    src: url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.woff') format('woff'),
    url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_326803_z3n2q3hshh0k9.svg#iconfont') format('svg');
  }

  label {
    font-size: 50px;
    font-family: 'iconfont';
  }

  .contain {
    padding: 0 20px;
  }

  .sel {
    color: orange;
  }

  .wrap {
    flex: 1;
    background: white;
    color: gainsboro;
  }

  .xing {
    margin: 100px auto;
    text-align: center;
  }

  .eval {
    padding: 5px;
  }

  .weui-textarea {
    color: black;
  }

  .btn {
    width: 80%;
    margin: 100px auto;
    background: blue;
    color: white;
    padding: 20px;
    text-align: center;
  }

  .submit {

  }

</style>
