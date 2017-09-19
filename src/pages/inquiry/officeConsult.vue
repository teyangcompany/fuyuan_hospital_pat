<template>
    <div class="page">
        <app-header title="浙医二院" class="noflex">
            <i slot="back"></i>
        </app-header>
        <div class="wrapper main flex" ref="main">
            <div ref="left" class="maindept flex0">
                <ul>
                    <li :class="[index==currentDept?'cover':'']" @click="currentDept=index" v-for="(item,index) in dept">
                        {{item.deptName}}
                    </li>
                </ul>
            </div>
            <div ref="right" class="subdept flex0">
                <ul>
                    <li   :key="index" @click="goConsultOffice(item)" v-for="(item,index) in subDept">{{item.deptName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import AppHeader from "../../components/app-header.vue"
    import {mainHeightMixin} from "../../lib/mixin"
    import api from '../../lib/http'
    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                currentDept: 0,
                dept: [],
                subDeptList:[]

            };
        },
        computed: {
            subDept() {
                if(this.dept[this.currentDept]){
                        return this.dept[this.currentDept].subDeptList
                }

            }
        },
        components: {
            AppHeader
        },
        mounted() {
            this._init();
            this.getData()
        },
        beforeDestroy() {

        },
        methods: {
            goConsultOffice(item){
                console.log(item.deptCode,2222)
                this.$router.push({
                    path:'/consultOffice/'+item.deptCode,
                    query:{
                        officeName:item.deptName
                    }
                })
            },
            getData(){
                api('smarthos.system.stddeptgb.list',{
                    "hasDept": true,
                    "hasDoc": true,
                    "deptLevel": 2
                }).then((res)=>{
                    console.log(res,1123232);
                    if(res.succ){
                        this.dept = res.obj
                    }else {
                        alert(res.msg)
                    }
                })
            },
            _init() {
                setTimeout(() => {
                    if (this.$refs.left) {
                        this.$refs.left.style.height = `${window.innerHeight - 45}px`;
                    }

                    if (this.$refs.right) {
                        this.$refs.right.style.height = `${window.innerHeight - 45}px`;
                    }

                }, 20)
            },
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common.scss";

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
