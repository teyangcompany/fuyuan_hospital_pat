<template>
    <div class="page">
        <top class="noflex" title="咨询科室" ref="header">
            <i slot="back"></i>
            <div slot="right" class="right absolute" @click="submit">立即提问</div>
        </top>
        <div class="myHeader">
            <div>
                <span class="col">
                        请务必保证填写资料的真实、详细；
                </span><br>
                <span class="col">
                        该科室的医生会根据您的情况安排适合的医生回答。
                </span>
            </div>
        </div>
        <div>
            <div class="weui-cells__title">咨询信息</div>
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <p class="mfb">咨询对象</p>
                    </div>
                    <div class="weui-cell__ft mfb">{{officeName}}</div>
                </div>
                <a class="weui-cell weui-cell_access border-1px" href="javascript:;" @click="togglePatient">
                    <div class="weui-cell__bd">
                        <p class="mfb">就诊人</p>
                    </div>
                    <div class="weui-cell__ft mfb" v-if="userList.length != 0">{{userList[pickedIndex].commpatName}} {{ userList[pickedIndex].commpatGender == 'M'?'男':'女' }} {{ ( JSON.stringify( new Date())).substr(1,4) - userList[pickedIndex].commpatIdcard.substr(6,4)}}</div>
                </a>
                <div class="illNameLine">
                    <span class="leftName">疾病名称</span>
                   <input class="illName" v-model="illName" type="text" placeholder="未确诊请不要填写"/>
                </div>
                <!--<div class="weui-cell"v style="background: white">-->
                  <!--<div class="weui-cell__hd"><label class="weui-label illNameLabel">疾病名称</label></div>-->
                  <!--<div class="weui-cell__bd">-->

                  <!--</div>-->
                  <!--&lt;!&ndash;<img src="../../../static/img/icon/arrow-right-grow.png" class="illArrow" alt="">&ndash;&gt;-->
                <!--</div>-->
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="togglePrice" v-if="roomPrice.length > 1">
                  <div class="weui-cell__bd">
                    <p class="mfb" style="color: #FFB415">悬赏金额</p>
                  </div>
                  <div class="weui-cell__ft mfb" v-if="pickedPrice === ''">选择您愿意支付的金额</div>
                  <div class="weui-cell__ft mfb" style="color: #FFB415" v-else>¥{{ pickedPrice  }}元</div>
                </a>
            </div>
            <div class="weui-cells__title">病情资料</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea  class="weui-textarea" id="myArea" @keyup="keypress()" v-model="illDescribe" placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。（如有症状照片、病历、检查单，可在下方上传）" rows="3"></textarea>
                        <div class="weui-textarea-counter"><span>{{ textLength }}</span>/500</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="addImg">
            <upload-img :picList="picList" @delete="deleteImg">

                <upload slot="upload" class="float-left"
                        :server="serverURl"
                        :params="config.base_params"
                        service="smarthos.system.file.upload"
                        module="MEDICAL"
                        fileType="IMAGE"
                        @progress="progress"
                        @success="success"
                        @added="added"></upload>

            </upload-img>
        </div>
        <sel-patient ref="patient" @on-addPatient="addPatient">
            <div  slot="pat">
                <div class="myPat bor" v-for="(item,index) in userList" @click="getUser(item,index)">
                    {{item.commpatName}}
                </div>
            </div>
        </sel-patient>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../components/app-header.vue'
    import upload from "../../base/upload.vue"
    import {mainHeightMixin} from '../../lib/mixin'
    import config from '../../lib/config'
    import scroll from '../../base/scroll.vue'
    import uploadImg from '../../base/uploadImg.vue'
    import selPatient from '../../base/selPatient.vue'
    import {Todate,consultPrice} from '../../lib/filter'
    import {getApiUrl,getEnv} from "../../lib/util"
    import api from '../../lib/http'
    export default{
        components: {
            top,
            scroll,
            upload,
            uploadImg,
            selPatient
        },
        filters:{
          consultPrice
        },
        mixins: [mainHeightMixin],
        data(){
            return {
                scrollHeight:'',
                config: config,
                picList: [],
                deptId:"",
                officeName:"",
                userList:[],
                userName:"",
                userSex:"",
                userAge:"",
                illName:"",
                userObj:{},
                serverURl:"",
                illDescribe:"",
                attaIdList:[],
                textLength:0,
                text:"",
                pickedIndex:0,
                roomPrice:[],
                pickedPrice:"",
                requestPrice:"",
                token:localStorage.getItem('token')
            }
        },
        create(){
            this.scrollHeight = window.innerHeight-45

        },
        created(){
          this.getData();
          this.roomPrice = this.$route.query.roomPrice
          let url = getEnv().api;
          this.serverURl = url
        },
        mounted(){
            window.addEventListener('resize', function () {
                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                    window.setTimeout(function () {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                }
            });

            if(this.$route.query.officeName&&this.$route.params.id){
                this.officeName=this.$route.query.officeName;
                this.deptId=this.$route.params.id;
                console.log(this.deptId)
                sessionStorage.setItem('officeName',this.$route.query.officeName)
                sessionStorage.setItem('deptId',this.$route.params.id)
                this.officeName = sessionStorage.getItem('officeName')
                this.deptId = sessionStorage.getItem('deptId')
            }else {
                this.officeName = sessionStorage.getItem('officeName')
                this.deptId = sessionStorage.getItem('deptId')
            }



        },
        methods:{
          keypress(){
            this.text = document.getElementById("myArea").value
            this.textLength = this.text.length
            if(this.textLength > 500){
              document.getElementById("myArea").value = this.text.substr(0,500)
              weui.alert("病情资料不能超过500个字")
            }
          },
          deleteImg(index){
            this.picList.splice(index,1)
          },
          togglePrice(){
            var symbol = []
            if(!symbol.length){
                this.roomPrice.forEach((item)=>{
                  var symbols_item = {}
                  symbols_item.label = item / 100
                  symbols_item.value = item / 100
                  symbol.push(symbols_item)
                })
            }
            console.log(symbol)
            let that = this
            weui.picker(symbol,{
              defaultValue: ['1', 'A'],
              onConfirm: function (result) {
                  console.log(result)
                that.pickedPrice = result[0].label
                console.log(that.pickedPrice,77)
              },
              id: 'multiPickerBtn'
            })
          },
            submit(){
                if(this.illDescribe == ''){
                     weui.alert("病情资料不可为空")
                }else if(this.textLength > 500){
                  weui.alert("病情资料不能超过500个字")
                }else if(this.roomPrice.length > 1 && this.pickedPrice === ''){
                  weui.alert("请选择一个悬赏金额")
                }else{
                  console.log(this.picList,88888);
                  for(var i=0;i<this.picList.length;i++){
                    this.attaIdList.push(this.picList[i].imgId)
                  };
                  this.roomPrice.length > 1 ? this.requestPrice = this.pickedPrice*100 : this.requestPrice = this.roomPrice[0]
                  api('smarthos.consult.platform.pic.issue',{
                    attaIdList:this.attaIdList,
                    token:this.token,
                    "consulterName":this.userName,
                    "consulterMobile":this.userObj.commpatMobile,
                    "consulterIdcard":this.userObj.commpatIdcard,
                    "consultContent":this.illDescribe,
                    "deptId":this.deptId,
                     payFee:Math.round(this.requestPrice),
                    "illnessName":this.illName
                  }).then(res=>{
                    console.log(res,3535535);
                    if(res.succ){
                      if(this.roomPrice.length == 0){
                        this.$router.push('/consuitDetail/'+res.obj.consultInfo.id)
                      }else if(this.roomPrice.length == 1 && this.roomPrice[0] != 0){
                        this.$router.push({
                          path: '/pay/' + res.obj.consultInfo.id,
                          query: {fee: this.roomPrice[0],source:'room'}
                        })
                      }else if(this.roomPrice.length == 1 && this.roomPrice[0] == 0){
                        this.$router.push('/consuitDetail/'+res.obj.consultInfo.id)
                      }else if(this.roomPrice.length > 1 && this.pickedPrice === 0){
                        this.$router.push('/consuitDetail/'+res.obj.consultInfo.id)
                      }else{
                         this.$router.push({
                           path: '/pay/' + res.obj.consultInfo.id,
                           query: {roomPrice: this.pickedPrice,source:'room'}
                         })
                      }
                    }else {
                      weui.alert(res.msg)
                    }
                  })
                }
            },
            addPatient(path){
              this.$router.push({
                path:"/my/addUser",
                query:{num:'3'}
              })
            },
            getUser(item,index){
                console.log(index)
                this.pickedIndex = index
                this.userObj = item;
                this.userName = item.commpatName
            },
            getData(){
              api('smarthos.user.commpat.list',{
                  token:this.token
              }).then(res=>{
                  console.log(res,66666)
                  if(res.succ){
                     this.userName = res.list[0].commpatName
                     this.userSex =  res.list[0].commpatGender
                     this.userAge =  res.list[0].commpatIdcard
                     this.userObj = res.list[0]
                     this.userList = res.list;
                     console.log(this.userList,777)

                  }else {
                      alert(res.msg)
                  }
              })
            },
            togglePatient(){
                this.$refs.patient.flag = true;
            },
            added(file) {
                file.thumb().then(res => {
                    file.setThumbUrl(res);
                    if(this.picList.length < 9){
                      this.picList.push(file);
                    }else{
                      weui.alert("最多可上传九张照片")
                    }
                    this.picList.sort((a, b) => {
                        return a.sort - b.sort
                    })
                });
            },
            progress(file, pro) {
                let index = this.picList.findIndex((pic) => {
                    return pic.id == file.id;
                });
                this.picList[index].changeStatus("loading");
                this.picList[index].setProgress(pro);
            },
            success(file, res) {
                let index = this.picList.findIndex((pic) => {
                    return pic.id == file.id;
                });
                if (res.code == 0) {
                    this.picList[index].changeStatus("loaded");
                    this.picList[index].setImgId(res.obj.id);
                    this.picList[index].setUrl(res.obj.attaFileUrl)
                }

            },
        },
        watch:{
          illDescribe(){
            this.text = document.getElementById("myArea").value
            this.textLength = this.text.length
            if(this.textLength > 500){
              document.getElementById("myArea").value = this.text.substr(0,500)
              weui.alert("病情资料不能超过500个字")
            }
          }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';
    .page{
        display: flex;
        flex: 1;
        overflow: auto;
        flex-direction: column;
        .weui-cell{
          label{
            font-size: 32px;
          }
          input{
            font-size: 32px;
          }
        }
        .illNameLine{
          width: 690px;
          margin:0 auto;
          height:90px;
          display: flex;
          align-items: center;
          .leftName{
            width:300px;
            font-size: 32px;
          }
          input{
              font-size: 32px;
          }
        }
    }
    textarea{
      font-size: 30px;
    }
    .illName{
       text-align: right;
      padding-right: 10px;
    }
    .illNameLabel{
      width:200px!important;
    }
    .illArrow{
      width:18px;
    }
    .myHeader{
        width: 100%;
        height: 90px;
        background: #e1ebff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .col{
        font-size: 24px;
        color: #2772ff;
    }
    .upload {
        background-image: url(../../../static/img/upload.png);
        width: 140px;
        height: 140px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 99% 99%;
    }
    .addImg{
        box-sizing: border-box;
        background: white;
        flex: 1;
        overflow: auto;
        padding: 10px 30px;
        margin-top: 30px;
    }
    .myPat{
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 30px;
        color: black;
        border-bottom: 1px solid gainsboro;
    }
</style>
