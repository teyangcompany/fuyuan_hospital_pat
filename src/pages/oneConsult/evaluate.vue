<template>
    <div class="page">
        <top class="noflex" title="评价医生" ref="header">
            <i slot="back"></i>
        </top>
        <div class="wrap">
            <div class="xing">
               <p class="topWord"><span>请您对本次问诊做出评价</span></p>
                <label v-for="item,index of 5" class="eval" :class="{sel:num>index}" @click="num=index+1">&#xe64e;</label>
            </div>
            <div class="contain">
                <div class="weui-cells__title commentTitle"> <span>请输入评价</span><span>{{ textLength }}/200</span></div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <textarea v-model="evaluateContent" id="myArea" @keyup="keypress()" class="weui-textarea" placeholder="您对医生的具体评价(可以不填)" rows="3"></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="btn" @click="submit">
                <span class="submit">
                      提交
                </span>
            </div>
        </div>
        <toast v-if="showToast"></toast>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import api from '../../lib/http'
    import Toast from '../../base/toast.vue'
    export default{
        components: {
            top,
           Toast
        },
        mixins: [mainHeightMixin],
        data(){
            return {
                num:0,
                consultId:"",
                token:localStorage.getItem('token'),
                evaluateContent:"",
                consultType:"",
                showToast:false,
                textLength: 0,
                text: "",
            }
        },
        mounted(){
            this.consultId=this.$route.params.id
            this.consultType = this.$route.query.consultType
            console.log(this.consultType)
        },
        watch:{
          evaluateContent() {
            this.text = document.getElementById("myArea").value
            this.textLength = this.text.length
            if (this.textLength > 200) {
              document.getElementById("myArea").value = this.text.substr(0, 200)
              weui.alert("评价内容不能超过200个字")
            }
          }
        },
        methods:{
            submit(){
                if(this.num == 0){
                    weui.alert("您还未对该医生做出评价")
                }else if(this.textLength > 200){
                  weui.alert("评价内容不能超过200个字")
                }else{
                  this.showToast = true
                    api('smarthos.system.comment.add',{
                        content:this.evaluateContent,
                        token:this.token,
                        score:this.num*2,
                        sysModuleType:"CONSULT",
                        moudleId:this.consultId,
                        consultInfoType:this.consultType
                    }).then(res=>{
                        console.log(res,6666);
                       this.showToast = false
                        if(res.succ){
                            weui.alert("评价成功")
                            this.$router.push('/my/consultService/myConsult')
                        }else {
                            weui.alert(res.msg)
                        }
                    })
                }
            },
            keypress() {
              this.text = document.getElementById("myArea").value
              this.textLength = this.text.length
              if (this.textLength > 200) {
                document.getElementById("myArea").value = this.text.substr(0, 200)
                weui.alert("评价内容不能超过200个字")
              }
            },
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
    label{
        font-size: 50px;
        font-family: 'iconfont';
    }
    .contain{
        padding: 0 20px;
      .commentTitle{
           display: flex;
           justify-content: space-between;
      }
    }
    .sel{
        color: orange;
    }
    .wrap{
        flex: 1;
        background: white;
        color: gainsboro;
    }
    .xing{
        margin: 100px auto;
        text-align: center;
        .topWord{
          color: #333333;
          font-size: 32px;
          margin-bottom: 15px;
        }
    }
    .eval{
        padding: 5px;
    }
    .weui-textarea{
        color: black;
    }
    .btn{
        width: 80%;
        margin: 100px auto;
        background:  #3d9bff;
        color: white;
        padding: 20px;
        text-align: center;
    }
    .submit{

    }


</style>
