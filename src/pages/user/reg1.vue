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

  import {required} from "vuelidate/lib/validators"
  import {phone} from "../../lib/validate"

  export default {
    data() {
      return {
        form: {
          mobile: "",
          cid: ""
        },
        msg: ""
      };
    },
    validations: {
      form: {
        mobile: {
          required,
          phone
        }
      }
    },
    computed: {},
    components: {
      SendCode,
      Msg
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      codeError(msg) {
        this.msg = msg;
        this.$refs.msg.show();
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
