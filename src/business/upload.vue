<template>
    <div>
      <!--<div class="upLoad">-->
        <!--<div class="addImg">-->
          <!--<img src="../../static/img/addImg.png" alt="">-->
        <!--</div>-->
        <!--<div class="hint">-->
          <!--<p class="bf">添加图片</p>-->
          <!--<p class="mfc">请上传患处图片，让医生更了解您</p>-->
        <!--</div>-->
      <!--</div>-->


      <div class="weui-cells weui-cells_form" id="uploader">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <slot name="title">
                <div class="weui-uploader__hd">
                  <p class="weui-uploader__title bf">图片上传</p>
                </div>
              </slot>

              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li class="weui-uploader__file" v-for="item,index of srcList">
                    <img :src="item.attaFileUrl" alt="" class="uploadImg" @click="deleteImg(index,item.attaFileUrl)"><br>
                    <!--<span>{{num+'%'}}</span>-->
                  </li>
                </ul>
                <!--<span class="bf">添加图片</span>-->
                <div class="weui-uploader__input-box uploadImg">
                  <input @change="upLoad" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-show="showBig" >
        <test  :indexes="indexes" :flag="flag">
          <div class="test" v-for="item of srcList" >
            <slot name="del">
              <div>
                <top>
                  <div slot="left"></div>
                  <a style="background: white;border: none;font-size: 16px;color: #3CC51F"  class="step" @touchstart="testDelete(item.attaFileUrl)">删除</a>
                </top>
              </div>
            </slot>
            <div style="display: flex;height: 100%;align-items: center"  @click="showContain">
              <img :src="item.attaFileUrl" />
            </div>
          </div>
        </test>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import test from './test.vue'
import top from '/app-header.vue'
    export default{
      props:['imgList'],
        components: {
          test,
          top
        },
        data(){
            return {
              index:0,
            srcList:[],
              num:0,
              attaIdList:[],
              showBig:false,
              indexes:Number,
              flag:0
            }
        },
      watch:{
        imgList:function () {
          console.log('难道是他么')
          this.srcList=this.imgList.slice();
          console.log(this.imgList, 77777)
          this.getId()
        }
      },
        mounted(){
            console.log(45456456)

        },
      methods:{
        showContain(){
          console.log(11111)
          this.$set(this.$data,'showBig',false)
        },

        testDelete(url){
          console.log(url,21212121212121212);
            for(var i=0;i<this.srcList.length;i++){
              if(this.srcList[i].attaFileUrl==url){
                if(confirm('确定删除该图片？')){
                  this.srcList.splice(i,1)
                  this.attaIdList.splice(i,1);
                  this.$emit('getAttaIdsList',this.attaIdList)
                  this.$set(this.$data,'showBig',false)
                  console.log('删除');
                  return false;
                }
              }
            };

        },
        getId(){
          if(this.imgList){
              for(var i=0;i<this.imgList.length;i++){
                console.log(121221)
                this.attaIdList.push(this.imgList[i].id)
              }
              this.$emit('getAttaIdsList',this.attaIdList)
          }
        },
        upLoad(e){
          if(this.attaIdList.length>8){
            this.$weui.alert('最多可以上传9张图片')
            return false;
          }else {
            var src  = {}
            var  url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            for (var i = 0, len = files.length; i < len; ++i) {
              var file = files[i];
              if (url) {
                src.attaFileUrl = url.createObjectURL(file);
                var arr = this.srcList;
                arr.push(src);
                this.$set(this.$data,'srcList',arr);

              } else {
                src.attaFileUrl = e.target.result;
                var arr = this.srcList;
                arr.push(src)
                this.$set(this.$data,'srcList',arr);
              }
            }
            var file = e.target.files[0];
            var $this = this
            ajax(file,{
              progress:function (evt) {
                if (evt.lengthComputable) {
                  var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                  $this.$set($this.$data,'num',percentComplete)
                }else {
                  console.log('无法计算')
                }
              }
            },'PAT','IMAGE').then(data=>{
              console.log(data,66666)
              if(data.succ){
                this.attaIdList.push(data.obj.id)
                this.$emit('getAttaIdsList',this.attaIdList)
                this.$weui.alert('上传成功')
              }else {
                alert('上传失败')
              }
            })
          }




        },
        deleteImg(indexes,url){
          console.log(indexes,9999);
          this.$set(this.$data,'indexes',indexes)
          this.flag++;
          this.$set(this.$data,'showBig',true)

          var $this = this;
//          var gallery = weui.gallery(url, {
//            onDelete: function(){
//              console.log($this.srcList.indexOf(url),55555);
//              var flag = $this.srcList.indexOf(url)
//              $this.srcList.splice(flag,1)
//              $this.attaIdList.splice(flag,1)
//              $this.$emit('getAttaIdsList',$this.attaIdList)
//              if(confirm('确定删除该图片？')){ console.log('删除'); }
//              gallery.hide(function() {
//                console.log('`gallery` has been hidden');
//              });
//            }
//          });
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../common/public.scss';
    /*.upLoad{*/
      /*box-sizing: border-box;*/
      /*padding: 30rem/$rem 0;*/
      /*display: flex;*/
      /*align-items: center;*/
    /*img{*/
      /*width: 140rem/$rem;*/
      /*height: 140rem/$rem;*/
    /*}*/


    .uploadImg{
      width: 140px;
      height: 140px;
      margin: 6px;
    }

    #uploaderInput{
      width: 140px;
      height: 140px;
      display: inline-block;
    }
    .hint{
      padding-left: 30px;
      box-sizing: border-box;
    }
    .weui-uploader__file{
      display: inline-block;
      margin: 0px;
      width: 140px;
      height: 140px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  .bottom{
    position: fixed;
    background: lightgrey;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 991;
  }
    .test {
      float: left;
      width: 100%;
      height: 100%;
    }

   .test img {
      width: 100%;
      display: block;
    }
</style>
