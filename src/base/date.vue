<template>
    <div>
        <div class="weui-cells">
            <a @click="selectDate" class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p class="bf">日期</p>
                </div>
                <div class="weui-cell__ft bf">{{date}}</div>
            </a>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {mainHeightMixin} from '../lib/mixin'
    import config from '../lib/config'
    import {Getdate,Todate} from '../lib/filter'
    export default{
        components: {
            top
        },
        props:["time"],
        mixins: ['mainHeightMixin'],
        data(){
            return {
                date:""
            }
        },
        mounted(){
            setTimeout(()=>{
                this.date=this.time;
            },100)
        },
        methods:{
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
                        };
                        var s =  $this.date
                        $this.$set($this.$data,'date', s.substring(0,s.length-1));
                        $this.$emit('getDate',$this.date)
                    }
                });
            },
        }
    }
</script>
<style scoped lang='scss'>
    @import '../common/common.scss';
    .weui-cells{
        margin-top: 0;
        border-bottom: 1px solid lightgrey;
    }
</style>
