<template>
    <div>
        <!--<top>-->
            <!--<div class="middle big">添加病例</div>-->
            <!--<span slot="right" class="step" @click="save">保存</span>-->
        <!--</top>-->
        <top title="添加病例" class="noflex">
            <i slot="back"></i>
            <div slot="right" class="right absolute">
                保存
            </div>
        </top>
      <div class="wrap">
        <div class="weui-cells">
          <a @click="selectDate" class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p class="bf">日期</p>
            </div>
            <div class="weui-cell__ft bf">{{date}}</div>
          </a>
        </div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p class="bf">请输入病例详情</p>
            </div>
          </div>
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" v-model="caseDetail" placeholder="请输入文本" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div class="addImg">
          <!--<upload v-on:getAttaIdsList="getAttaIdsList"></upload>-->
        </div>

      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Upload from "../../../base/upload.vue"
    import top from "../../../components/app-header.vue"
    import config from "../../../lib/config"
    import api from '../../../lib/http'
    export default{
        components: {
            top,
            Upload
        },
        data(){
            return {
              token:localStorage.getItem('token'),
              date:'',
              caseDetail:'',
              imgList:[]
            }
        },
        mounted(){
          var day2 = new Date();
           day2.setTime(day2.getTime());
          var month = day2.getMonth()+1>10?day2.getMonth()+1:'0'+(day2.getMonth()+1);
          var day = day2.getDate()>10?day2.getDate():'0'+day2.getDate();
          this.date = day2.getFullYear()+"-" + month + "-" + day;
        },
      methods:{
        getAttaIdsList(value){
          console.log(value,3333);
          this.$set(this.$data,'imgList',value)
        },
        selectDate(){
          this.$set(this.$data,'date','');
          var $this = this;
          this.$weui.datePicker({
            start: 2010,
            end: 2020,
            onConfirm: function(result){
              console.log(result,6666);
              for(var i=0;i<result.length;i++){
                $this.date+=result[i].value+'-'
              }
              var s =  $this.date;
              let now = new Date(s)
              let year = now.getFullYear()
              let mm = now.getMonth() + 1     //月
              let dd = now.getDate()          //日
              let clock=''
              clock+=year+'-'
              if(mm < 10) clock += "0"
              clock += mm + "-"
              if(dd < 10) clock += "0"
              clock += dd;
              console.log(clock,9999)
              $this.$set($this.$data,'date',clock )
            }
          });
        },
        save(){
          api('smarthos.medical.history.add',{
            "medicalTime":this.date,
            "medContent":this.caseDetail,
            "token":this.token,
            "attaList":this.imgList
          }).then(res=>{
            console.log(res,6666)
            if(res.succ){
              this.$router.push({
                name:'healthRecord'
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
    @import '../../../common/common.scss';

    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
  .weui-cells{
    margin-top: 0;
  }
  .addImg{
    box-sizing: border-box;
    background: white;
    padding: 30px;
  }
</style>
