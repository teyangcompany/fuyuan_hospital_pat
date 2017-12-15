<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = (this.score ) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../common/mixin';

  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
  }
  .star-48{
    .star-item{
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
    }
    .star-item:last-child{
      margin-right: 0
    }
    .on{
      background-image:url('star48_on@2x.png')
    }
    .half{
      background-image:url('star48_half@2x.png')
    }
    .off{
      background-image:url('star48_off@2x.png')
    }
  }
  .star-36{
    .star-item{
      width: 70px;
      height: 50px;
      margin-right: 6px;
      background-size: 70px 50px;
    }
    .star-item:last-child{
      margin-right: 0
    }
    .on{
      background-image:url('star36_on.png')
    }
    .half{
      background-image:url('star36_half.png')
    }
    .off{
      background-image:url('star36_off.png')
    }
  }
  .star-24{
    .star-item{
      width: 30px;
      height: 30px;
      margin-right: 3px;
      background-size: 30px 30px;
    }
    .star-item:last-child{
      margin-right: 0
    }
    .on{
      background-image:url('star24_on.png')
    }
    .half{
      background-image:url('star24_half.png')
    }
    .off{
      background-image:url('star24_off.png')
    }
  }

</style>
