<template>
    <div>
      <div class="itemList" v-for="item in historyList">
        <div class="topSelect border-1px-dashed">
          <p>项目名称 {{ item.chargeName }}</p>
          <!--<p></p>-->
          <!--<p>{{ item.chargeName }}</p>-->
        </div>
        <div class="itemDetail border-1px" v-for="subItem in item.costList">
          <p>
            <span v-if="subItem.costUnit">{{ subItem.costName }} ({{ subItem.costUnit }})</span>
            <span v-else>{{ subItem.costName }} {{ subItem.costUnit }}</span>
            <span>¥{{ subItem.costUnitPrice }} x {{ subItem.costQuantity }}</span>
          </p>
          <p>¥{{ subItem.costSubtotal }}</p>
        </div>
      </div>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
  .itemList{
    width: 100%;
    background-color: white;
  .topSelect{
    width:690px;
    height: 90px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  p:nth-child(1){
    font-size: 30px;
    color: #333333;
  }
  p:nth-child(3){
    font-size: 34px;
    color: #333333;
  }
  }
  .itemDetail{
    width:690px;
    height: 90px;
    margin: 0 auto 0px;
    padding-left: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  p:nth-child(1){
    display: flex;
    flex-direction: column;
  span{
    font-size: 30px;
    color: #999999;
  }
  }
  p:nth-child(2){
    font-size: 30px;
    color: #999999;
  }
  }
  }
</style>
