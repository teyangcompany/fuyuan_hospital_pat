<template>
  <div class="msg_type">
    <span class="text" v-if="type=='text'">{{text}}</span>
    <img @load="onLoad($event)" class="image" :src="image" v-if="type=='image'" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      type: String,
      text: String,
      image: String
    },
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      onLoad() {
        this.$emit("load", true);
      }
    }
  };
</script>

<style scoped lang="scss">
  .msg_type {
    .text {
      font-size: 32px;
      color: white;
    }
    .image {
      width: 100%;
    }
  }
</style>
