<template>
  <div contenteditable="true"
       @click="inputText"
       @input="changeText" style="-webkit-user-select: auto;">
  </div>
</template>
<script>
  export default {
    props: ['value','message'],
    data(){
      return {innerText:this.value}
    },
    watch:{
      message(){
        this.$el.innerHTML="";
      }
    },
    methods:{
      inputText(){
        this.$emit('inputText')
      },
      changeText(){
        this.innerText = this.$el.innerText;
        var text = this.innerText.replace(/\ +/g,"");
        this.$emit('input',text);
//        this.$el.innerText=''

      }
    }
  }
</script>
<style scoped>

</style>
