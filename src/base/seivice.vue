<template>
    <transition name="fade" >
    <div class="page" v-show="flag"  @click.stop="close">
        <div class="wrap">

        </div>

        <div class="contain" >
            <div class="mfb">选择你需要的服务</div>
            <div class="serviceType">
                <div class="imageText" :class="{active:test==index}" v-for="(item,index) of list" @click.stop="getText(index)">
                    <p class="mf">{{item.value}}</p>
                    <p class="col">{{item.print}}</p>
                </div>
            </div>
            <div v-show="index==test" v-for="(character,index) of textList" >
                <p class="mfc" v-for="state of character.text">
                   {{state}}
                </p>
                <!--<p class="mfc">-->
                    <!--2.为珍惜您的咨询机会，请全部围绕病情进行沟通，避免无关内容。-->
                <!--</p>-->
                <!--<p class="mfc">-->
                    <!--3.医生工作繁忙，可能无法及时回复您的咨询，若医生48小时未回复，我们会为您自动退款。-->
                <!--</p>-->
            </div>
            <div class="agree">
                <span>
                    提交即表示同意
                </span>
                <span style="color: blue">
                    浙二网络医学中心服务协议
                </span>
            </div>
            <div class="goNext mfb" @click.stop="goNext">
                下一步
            </div>
        </div>
    </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import config from '../lib/config'
    export default{
        components: {

        },
        data(){
            return {
                flag:false,
                list:config.basic_service,
                textList:config.basic_text,
                test:0
            }
        },
        mounted(){

        },
        methods:{
            close(){
                this.flag = false
            },
            getText(index){
                this.test = index
            },
            goNext(){
                this.$router.push({
                    name:'imageInquiry'
                })
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '../common/common.scss';

    .goNext{
        width: 100%;
        padding: 15px;
        text-align: center;
        color: blue;
        background: beige;
    }
    .agree{
        width: 100%;
        font-size: 24px;
        color: grey;
        background: gainsboro;
        text-align: center;
        margin: 10px 0;
    }
    .col{
        color: orange;
        font-size: 24px;
    }
    .serviceType{
        display: flex;
        justify-content: space-around;
        margin: 15px 0;
    }
    .imageText{
        border:1px solid gainsboro;
        border-radius: 5px;
        padding: 5px;
        text-align: center;
        width: 170px;
    }
.page{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    background: grey;
    /*opacity: .6;*/
}
    .wrap{
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .contain{
        width: 100%;
        height: auto;
        background: white;
        padding: 30px;

    }
    .fade-enter{
      opacity: 0;
        .contain{
            transform: translateY(100%);
        }


    }
    .fade-enter-active{
        transition: all 0.6s ease;
       .contain {
           transition: all 0.6s ease;
       }

    }
    .fade-leave-active{
        transition: all 0.6s ease;
        .contain{
            transition: all 0.6s ease;
        }
    }
    .fade-leave-to{
        opacity: 0;
        .contain{
            transform: translateY(100%);
        }
    }
    /*.fade-enter-to{*/
        /*transform: translateY(0);*/
    /*}*/
    .active{
        border:1px solid orange;
    }
</style>
