<template>
  <div class="page">
    <div class="docList">
      <ul  class="border-1px" v-for="(item,index) in doctorList" v-if="!(item.ysid)">
        <div @click="goCommonDetail(item.ksid)">
          <li>
            <div class="cancelImg">
              <img src="../../../../../static/img/common.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span class="chatDoctor"></span> <span class="doctorTitle">普通号</span>
                <p>{{ item.yymc }}</p>
                <p>{{ item.ksmc }}</p>
              </div>
            </div>
            <div class="cancelTime">
              <div>
                <span class="year gray" v-if="item.schstate == 0">无</span>
                <span class="year gray" v-if="item.schstate == 1">停诊</span>
                <span class="year gray" v-if="item.schstate == 2">已满</span>
                <span class="year" v-if="item.schstate == 3">即将(未放号或号子被锁定)</span>
                <span class="year" v-if="item.schstate == 4">预约</span>
                <img src="../../../../../static/img/icon/arrow-right-grow.png" alt="">
              </div>
            </div>
          </li>
        </div>
      </ul>
      <div class="blank border-1px"></div>
      <ul  class="border-1px" v-for="(item,index) in doctorList" v-if="item.ysid">
        <div @click="goFamousPage(index)">
          <li>
            <div class="avartarImg" v-if="item.yszpwjm">
              <img :src="item.yszpwjm" alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">
            </div>
            <div class="avartarImg" v-else>
              <img src="../../../../../static/img/doctorM.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span class="chatDoctor">{{ item.ysxm }}</span><br/>
                <span class="doctorTitle">{{ item.yszc }}</span>
                <p>擅长:{{ item.goodat }}</p>
              </div>
            </div>
            <div class="cancelTime">
              <div >
                <span class="year gray" v-if="item.schstate == 0">无</span>
                <span class="year gray" v-if="item.schstate == 1">停诊</span>
                <span class="year gray" v-if="item.schstate == 2">已满</span>
                <span class="year" v-if="item.schstate == 3">即将(未放号或号子被锁定)</span>
                <span class="year" v-if="item.schstate == 4">预约</span>
                <img src="../../../../../static/img/icon/arrow-right-grow.png" alt="">
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>

<script>
  import config from "../../../../lib/config"
  import api from '../../../../lib/bookApi'
  import Toast from '../../../../base/toast.vue'
  import AppHeader from "../../../../components/app-header.vue"

  export default {
    data() {
      return {
        current: 0,
        nav: config.book_doc_nav,
        depid:"",
        hosid:"",
        doctorList:"",
        showToast:false,
        bookDocId:"",
        selected:"",
        commonRoom:"",
        hosName:"",
      };
    },
    computed: {},
    components: {
      AppHeader,
      Toast
    },
    mounted() {

    },
    created(){
      this.depid = this.$route.query.depid
      this.hosid = this.$route.query.hosid
      this.selected = this.$route.query.selected
      this.hosName = this.$route.query.hosName
      this.showToast = true
      api("smarthos.yygh.ApiDoctorService.pblist",{
        hosId:this.hosid,
        deptId:this.depid,
        isPb:'0'
      }).then((data)=>{
          console.log(data,666)
        this.showToast = false
        if(data.code == 0){
          this.doctorList = data.list
        }else{
          weui.alert(data.msg)
        }
//        api("smarthos.yygh.ApiDoctorService.ptpbinfo",{
//          hosId:this.hosid,
//          deptId:this.depid,
//          pageIndex:"1",
//          pageSize:"10"
//        }).then((data)=>{
//          console.log(data,777)
//          this.showToast = false
//          if(data.code == 0){
//            this.commonRoom = data.obj
//            console.log(this.commonRoom)
//          }else{
//            weui.alert(data.msg)
//          }
//
//        })
      })

    },
    beforeDestroy() {

    },
    methods: {
      goFamousPage(index){
        console.log(index)
        this.$router.push({
          path:"/home/server/book/famousPage",
          query:{hosName:this.hosName,bookDocId:this.doctorList[index].ysid,hosid:this.hosid}
        })
      },
      goCommonDetail(ksid){
          console.log(ksid)
          this.$router.push({
            path:"/home/server/book/commonDetail",
            query:{hosName:this.hosName,ksid:ksid,hosid:this.hosid}
          })
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../common/common";
  .page{
    position: absolute;
    top: 183px;
    left:0;
    right:0;
    bottom:0;
    .docList{
      background-color: #FFFFFF;
      ul{
        padding:0;
        margin:0;
        height: 180px;
        li{
          list-style-type: none;
          height: 180px;
          display: flex;
          .cancelImg{
            width: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 110px;
              height: 110px;
              border-radius: 50%;
            }
          }
          .avartarImg{
            width: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 110px;
              height: 110px;
            }
          }
          .cancelIntro{
            flex:2;
            display: flex;
            align-items: center;
            line-height: 40px;
            .badgeDoc{
              display: inline-block;
              padding-top: -5px;
              .myDoctor{
                width: 80px;
                height: 36px;
                background-color: darkturquoise;
                border-radius:5px;
                display: inline-block;
                font-size: 10px;
                color: white;
                line-height: 40px;
                text-align: center;
              }
            }
            p{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              margin:0;
              color: #999999;
              font-size: 28px;
            }
            span.chatDoctor{
              font-size: 32px;
              color: #333333;
            }
            span.doctorTitle{
              font-size: 28px;
              color: #666666;
            }
          }
          .cancelTime{
            width:200px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 20px;
            img{
              width:16px;
              height: 24px;
            }
            span.year{
              font-size: 28px;
              color: $mainColor;
            }
            span.gray{
              color: #999999;
            }
            span.full{
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
