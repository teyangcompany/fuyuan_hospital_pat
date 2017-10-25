<template>
    <div class="page">
        <top class="noflex" title="图文问诊" ref="header">
            <i slot="back"></i>
            <div slot="right" class="right absolute" @click="submit">下一步</div>
        </top>
        <div class="myHeader">
                <span class="col">
                        请务必保证填写资料的真实、详细；
                </span><br>
            <span class="col">
                        医生会在48小时内回复您，否则将为您退款。
                </span>
        </div>
        <div>
            <div class="weui-cells__title">咨询信息</div>
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <p class="mfb">咨询对象</p>
                    </div>
                    <div class="weui-cell__ft mfb">{{docName}}</div>
                </div>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="togglePatient">
                    <div class="weui-cell__bd">
                        <p class="mfb">就诊人</p>
                    </div>
                    <div class="weui-cell__ft mfb">
                        {{showPat}}
                    </div>
                </a>
            </div>
            <div class="weui-cell" style="background: white">
                <div class="weui-cell__hd"><label class="weui-label illNameLabel">疾病名称</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input illName" v-model="illName" type="text" placeholder="未确诊请不要填写"/>
                </div>
                <img src="../../../static/img/icon/arrow-right-grow.png" class="illArrow" alt="">
            </div>
            <div class="weui-cells__title">病情资料</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea v-model="illDescribe" id="myArea" @keyup="keypress()" class="weui-textarea"
                                  placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。（如有症状照片、病历、检查单,可在下方上传）"
                                  rows="3"></textarea>
                        <div class="weui-textarea-counter"><span>{{ textLength }}</span>/500</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="addImg">
            <upload-img :picList="picList">

                <upload slot="upload" class="float-left"
                        :server="config.api_url"
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
            <div slot="pat" class="myPat bor">
                <div class="myPat bor" v-if="userList" v-for="(item,index) in userList" @click="getUser(item,index)">
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
    import api from '../../lib/http'
    import {getAge, getGender} from "../../lib/filter"

    export default {
        components: {
            top,
            scroll,
            upload,
            uploadImg,
            selPatient
        },
        mixins: [mainHeightMixin],
        data() {
            return {
                scrollHeight: '',
                config: config,
                picList: [],
                userList: [],
                userName: "",
                userSex: "",
                userAge: "",
                userObj: {},
                token: localStorage.getItem('token'),
                docName: "",
                docId: "",
                illName: "",
                illDescribe: "",
                textLength: 0,
                text: "",
                pickedIndex: 0,
                attaIdList: [],
                fee: ""
            }
        },
        computed: {
            showPat() {
                if (this.userList.length > 0) {
                    let user = this.userList[this.pickedIndex];
                    return user ? user.commpatName + " " + getGender(user.commpatGender) + " " + getAge(user.commpatIdcard) : "";
                }
                return ""
            }
        },
        created() {
            this.scrollHeight = window.innerHeight - 45
            this.fee = this.$route.query.fee
        },
        mounted() {
            window.addEventListener('resize', function () {
                if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                    window.setTimeout(function () {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                }
            });
            this.docId = sessionStorage.getItem('docId')
            this.docName = sessionStorage.getItem('docName');
            console.log(this.docName, this.docId, 8888)
            this.getData()
        },
        methods: {
            keypress() {
                this.text = document.getElementById("myArea").value
                this.textLength = this.text.length
                if (this.textLength > 500) {
                    document.getElementById("myArea").value = this.text.substr(0, 500)
                    weui.alert("病情资料不能超过500个字")
                }
            },
            submit() {
                if (this.illDescribe == '') {
                    weui.alert("病情资料不可为空")
                } else if (this.textLength > 500) {
                    weui.alert("病情资料不能超过500个字")
                } else {
                    console.log(this.picList, 88888);
                    for (var i = 0; i < this.picList.length; i++) {
                        this.attaIdList.push(this.picList[i].imgId)
                    }
                    ;
                    api('smarthos.consult.one2one.pic.issue', {
                        attaIdList: this.attaIdList,
                        token: this.token,
                        "consulterName": this.userName,
                        "consulterMobile": this.userObj.commpatMobile,
                        "consulterIdcard": this.userObj.commpatIdcard,
                        "consultContent": this.illDescribe,
                        "docId": this.docId,
                        "illnessName": this.illName
                    }).then(res => {
                        console.log(res, 3535535);
                        if (res.succ) {
                            if (this.fee == 0) {
                                this.$router.push({
                                    path: 'oneConsult/' + res.obj.consultInfo.id,
                                })
                            } else {
                                this.$router.push({
                                    path: 'pay/' + res.obj.consultInfo.id,
                                    query: {fee: this.fee}
                                })
                            }
                        } else {
                            alert(res.msg)
                        }
                    })
                }
            },
            addPatient(path){
              if(path == '/imageInquiry'){
                this.$router.push({
                  path:"/my/addUser",
                  query:{num:'2'}
                })
              }

            },
            getUser(item, index) {
                this.pickedIndex = index
                this.userObj = item;
                this.userName = item.commpatName
            },
            changeName() {
                this.$router.push({
                    name: 'illName',
                    params: {
                        routerName: 'imageInquiry'
                    }
                })
            },
            getData() {
                api('smarthos.user.commpat.list', {
                    token: this.token
                }).then(res => {
                    if (res.succ) {
                        this.userName = res.list[0].commpatName
                        this.userSex = res.list[0].commpatGender
                        this.userAge = res.list[0].commpatIdcard
                        this.userObj = res.list[0]
                        this.userList = res.list;

                    } else {
                        weui.alert(res.msg)
                    }
                })
            },
            togglePatient() {
                this.$refs.patient.flag = true;
            },
            added(file) {
                file.thumb().then(res => {
                    file.setThumbUrl(res);
                    this.picList.push(file);
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
        watch: {
            illDescribe() {
                this.text = document.getElementById("myArea").value
                this.textLength = this.text.length
                if (this.textLength > 500) {
                    document.getElementById("myArea").value = this.text.substr(0, 500)
                    weui.alert("病情资料不能超过500个字")
                }
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/common.scss';

    .page {
        display: flex;
        flex: 1;
        overflow: hidden;
        flex-direction: column;
        .weui-cells__title {
            font-size: 30px;
        }
        textarea {
            font-size: 30px;
        }
    }

    .illName {
        text-align: right;
        padding-right: 10px;
    }

    .illNameLabel {
        width: 200px !important;
    }

    .illArrow {
        width: 18px;
    }

    .myHeader {
        width: 100%;
        height: 90px;
        background: #e1ebff;
        text-align: center;
    }

    .col {
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

    .addImg {
        box-sizing: border-box;
        background: white;
        flex: 1;
        overflow: auto;
        padding: 10px 30px;
        margin-top: 30px;
    }

    .myPat {
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 30px;
        color: black;
        border-bottom: 1px solid gainsboro;
    }
</style>
