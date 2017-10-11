<template>
  <div class="page">
    <app-header :title="hosName" class="noflex">
      <i slot="back"></i>
    </app-header>
    <div class="wrapper main flex" ref="main">
      <div ref="left" class="maindept flex0">
        <ul>
          <li :class="[index==currentDept?'cover':'']" @click="selectRoom(index)" v-for="(item,index) in parentList">
            {{item.deptName}}
          </li>
        </ul>
      </div>
      <div ref="right" class="subdept flex0">
        <ul>
          <router-link tag="li" :to="{path:'/home/server/book/doc',query:{depid:item.ksid,hosid:hosid}}" :key="index" v-for="(item,index) in subDept">{{item.ksmc}}</router-link>
        </ul>
      </div>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>

<script>
  import AppHeader from "../../../../components/app-header.vue"
  import api from '../../../../lib/bookApi'
  import Toast from '../../../../base/toast.vue'
  import {mainHeightMixin} from "../../../../lib/mixin"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        currentDept: 0,
        hosid:"",
        hosName:"",
        parentList:"",
        subDept:"",
        showToast:false
      };
    },
    computed: {
//      subDept() {
//        return this.dept[this.currentDept].deptList
//      }
    },
    components: {
      AppHeader,
      Toast
    },
    mounted() {
      this.init();

    },
    created(){
        this.hosid = this.$route.query.hosid
        this.hosName = this.$route.query.hosName
        this.showToast = true
        api("smarthos.yygh.ApiDepartmentService.oneClassDepartmentList",{
          hosId:this.hosid
        }).then((data)=>{
          this.showToast = false
            if(data.code == 0){
              this.parentList = data.list
              this.subDept = data.list[0].yyghYyksList
              console.log(data)
            }else{
                weui.alert(data.msg)
            }
        })
    },
    beforeDestroy() {

    },
    methods: {
      init() {
        setTimeout(() => {
          if (this.$refs.left) {
            this.$refs.left.style.height = `${window.innerHeight - 45}px`;
          }

          if (this.$refs.right) {
            this.$refs.right.style.height = `${window.innerHeight - 45}px`;
          }

        }, 20)
      },
      selectRoom(index){
          this.currentDept = index
        this.subDept = this.parentList[index].yyghYyksList
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../common/common";

  .main {
    overflow: hidden;
    > div {
      overflow-y: auto;
      background-color: white;
      ul {
        li {
          font-size: 30px;
          padding: 30px 0 30px 50px;
        }
      }
    }
    .maindept {
      background-color: #f5f5f9;
      width: 240px;
      li {
        color: #666666;
        &.cover {
          color: $mainColor;
          background-color: white;
          @include border(left, $mainColor, after, solid, 12px);

        }
      }
    }
    .subdept {
      width: 750px - 240px;
      li {
        color: #333;
      }
    }
  }
</style>
