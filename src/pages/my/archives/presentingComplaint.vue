<template>
    <div>
        <!--<top>-->
            <!--<div class="middle big">所患疾病</div>-->
            <!--<span slot="right" class="step" @click="save">保存修改</span>-->
        <!--</top>-->
        <top title="所患疾病" class="noflex">
            <i slot="back"></i>
            <div slot="right" class="right absolute" @click="save">
                保存
            </div>
        </top>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" v-model="presentingComplaint" placeholder="请输入文本" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from "../../../components/app-header.vue"
    import config from "../../../lib/config"
    import api from '../../../lib/http'
    export default{
        components: {
            top
        },
        data(){
            return {
              token:localStorage.getItem('token'),
              presentingComplaint:''
            }
        },
        mounted(){
          this.$set(this.$data,'presentingComplaint',this.$route.params.str)
        },
      methods:{
        save(){
          api("smarthos.medical.info.modify",{
            "presentingComplaint":this.presentingComplaint,
            "token":this.token
          }).then(res=>{
            if(res.succ){
              console.log(res);
                this.$router.push({
                    name:"healthRecord"
                })
            }else {
              this.$weui.alert(res.msg)
            }
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import "../../../common/common.scss";

    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
</style>
