<template>
  <footer class="footer">
    <div class="apps">
      <div  v-for="item,index in list" @click=go(index) >
            <img :src="item.url">
            <p class="urlName">{{item.name}}</p>
      </div>
    </div>

  </footer>
</template>
<script>
  export default {
    props:{
        index:{
            type:String,
            default:"0",
            required:false
        }
    },
    data() {
      return {
        list:[{name:"首页",url:'../.../../static/img/home.png'},{name:"我的医生",url:'../../static/img/myDoc.png'},{name:"健康",url:'../../static/img/hear.png'},{name:"我的",url:'../../static/img/my.png'}],
        activeUrl:['../../static/img/home_on.png',"../../static/img/myDoc1.png","../../static/img/hear1.png","../../static/img/my_on.png"]
      };
    },
    computed:{

    },
    components:{

    },
    mounted() {
        this.setCurrentPage(this.index);
        console.log(21212121212)
    },
    beforeDestroy() {

    },
    methods: {
        go(index){
            var indexList=["/","/consultList",'/serviceHistory',"/myDetail"];
        this.$router.push(indexList[index]);

        },
        setCurrentPage(index){
            let i = parseInt(index);
            console.log(i,99999)
            this.list[i].url=this.activeUrl[i];
        }
    }
  };
</script>

<style  lang="scss">

    img{
        height:45px;
        display:block;
        margin:0 auto;
    }
    .urlName{
        font-size:22px;
        color:#999999;
    }
  .footer{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      z-index:1000000;
      border-top:1px solid rgb(204,204,204);
      /*height: 94px;;*/
    background-color: white;

    .apps{
        padding-top: 12px;
      display: flex;
        flex-direction:row;
      div{
          flex:1 1 auto;
          text-align:center;
      }
    }
  }

</style>
