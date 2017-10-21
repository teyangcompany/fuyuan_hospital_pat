<template>
    <div>
        <!--<top>-->
            <!--<div>常用就诊人</div>-->
            <!--<span slot="right" class="add"@click="saveEdit">保存修改</span>-->
        <!--</top>-->
      <top title="常用就诊人" ref="header" class="noflex">
        <i slot="back"></i>
        <div slot="right" class="right absolute" @click="saveEdit">
          保存修改
        </div>
      </top>
      <div class="wrap">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patName.$error }">
              <input  @blur="$v.patName.$touch()" class="weui-input" type="text" v-model="patName"  placeholder="请输入姓名"/>
            </div>
          </div>
          <span class="form-group__message bf" v-if="!$v.patName.minLength&&showNameError">姓名至少2位</span>
          <span class="form-group__message bf" v-if="!$v.patName.maxLength&&showNameError">姓名至多15位</span>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf" >身份证号</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patIdcard.$error }">
              <input @blur="getAge"  @input="$v.patIdcard.$touch()"  class="weui-input" type="text" v-model="patIdcard" placeholder="请输入身份证号"/>
            </div>
          </div>
        </div>
        <span class="form-group__message bf" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:;" @click="editPhone">
            <div class="weui-cell__bd">
              <p>手机号 &nbsp; &nbsp;&nbsp;{{mobile}}</p>
            </div>
            <div class="weui-cell__ft">
            </div>
          </a>
        </div>

        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
              <label  class="weui-label bf">性&nbsp;&nbsp;&nbsp;别</label>
            </div>
            <div class="weui-cell__bd">
              {{ gender == 'M'? '男':'女'  }}
              <!--<select class="weui-select bf" name="select2">-->
                <!--<option value="1">男</option>-->
                <!--<option value="2">女</option>-->
              <!--</select>-->
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">年&nbsp;&nbsp;&nbsp;龄</label></div>
            <div class="weui-cell__bd bf">
              {{age}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import top from "../../../components/app-header.vue"
  import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
  import cd from '../../../lib/regex'
  import api from '../../../lib/http'
  import {mainHeightMixin} from "../../../lib/mixin"
//  var token  = localStorage.getItem('token')
  export default{
    components: {
      top
    },
    mixins: [mainHeightMixin],
    validations: {
      patName: {
        required,
        minLength:minLength(2),
        maxLength:maxLength(15)
      },patIdcard:{
        required,
        cd:cd(15,18)
      }
    },
    data(){
      return {
        token:localStorage.getItem('token'),
        patName:'',
        patIdcard:'',
        showNameError:false,
        showCd:false,
        mobile:'',
        patId:'',
        age:'',
        gender:"",
        compatId:'',
        patDetail:{}
      }
    },
    mounted(){
      console.log(this.$route.params.item,565656)
      this.$set(this.$data,'patName',this.$route.params.item.commpatName);
      this.$set(this.$data,'patIdcard',this.$route.params.item.commpatIdcard);
      this.$set(this.$data,'mobile',this.$route.params.item.commpatMobile);
      this.$set(this.$data,'gender',this.$route.params.item.commpatGender);
//      this.$set(this.$data,'age',this.$route.params.item.compatAge);
      this.$set(this.$data,'compatId',this.$route.params.item.id);
    },
    methods:{
      getAge(){
        var date = new Date;
        var year = date.getFullYear();
        var num = this.patIdcard.substring(6,10);
        var age = year-num;
        return this.$set(this.$data,'age',age)
      },
      editPhone(){
        this.$router.push({
          name:'editPhone',
          params:{
            compatId:this.compatId
          }
        })
      },
      saveEdit(){
        if(this.$v.patName.$invalid){
          this.$set(this.$data,'showNameError',true)
        }else if(this.$v.patIdcard.$invalid){
          this.$set(this.$data,'showCd',true)
        } else {
          api('smarthos.user.commpat.infomation.modify',{
            "token": this.token,
            "commpatId": this.compatId,
            "commpatName": this.patName,
            "commpatIdcard": this.patIdcard
          }).then(res=>{
            if(res.succ){
              this.$router.push({
                path:"/my/common-visitperson"
              })
            }else {
              this.$weui.alert(res.msg)
            }
          })
        }
      },
      getAge(){
        var date = new Date;
        var year = date.getFullYear();
        var num = this.patIdcard.substring(6,10);
        var age = year-num;
        return this.$set(this.$data,'age',age)
      },
      bindCode(){
        Api('nethos.book.compat.bind',{
          token:this.token,
          compatId:this.compatId
        }).then(req=>{
          console.log(req,999999);
          if(req.succ){

          }else {
            this.$router.push('feedback')
          }
        })
      },
      deleteUser(){
        Api('nethos.pat.compat.delete',{
          token:this.token,
          compatId:this.compatId
        }).then(req=>{
          console.log(req,56565656);
          if(req.succ){
            this.$router.push('users')
          }
        })
      },
      changePhone(){
        this.$router.push('editPhone')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/common.scss';
  .add{
    color: #0FBDFF;
  }
  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
  .arrow{
    color: gray;
    font-weight: 800;
  }
  .weui-cells{
    margin-top: 30px;
  }
  .weui-label{
    width: 80px;/*no*/

  }

</style>
