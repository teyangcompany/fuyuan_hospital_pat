<template>
  <div class="userform">
    <dl>
      <dt>
        手机号
      </dt>
      <dd class="">
        <div class="hd">
          <input v-model="form.mobile" type="text" placeholder="请输入手机号">
        </div>
      </dd>
    </dl>
    <dl>
      <dt>
        验证码
      </dt>
      <dd class="">
        <div class="hd">
          <input type="password" placeholder="请输入验证码">
        </div>
        <div class="ht">
          <send-code v-model="form.cid" :mobile="form.mobile" @error="codeError"></send-code>
        </div>
      </dd>
    </dl>
    <msg :text="msg" ref="msg"></msg>
  </div>
</template>

<script>
  import Msg from "../../base/msg.vue"
  import SendCode from '../../components/code.vue'
  import {mapMutations} from "vuex"
  import * as types from "../../store/types"

  export default {
    data() {
      return {
        form: {
          mobile: "",
          cid: "",
          captcha: ""
        },
        msg: ""
      };
    },
    computed: {},
    components: {
      SendCode,
      Msg
    },
    created() {
      this.$watch("form", (form) => {
        this.changeForm(form);
      }, {deep: true});
    },
    mounted() {
    },
    beforeDestroy() {

    },
    methods: {
      codeError(msg) {
        this.msg = msg;
        this.$refs.msg.show();
      },
      ...mapMutations({
        changeForm: types.USER_REG_FORM
      })
    }
  };
</script>

<style scoped lang="scss">

</style>
