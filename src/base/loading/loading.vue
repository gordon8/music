<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{text}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'loading',
  props: {
    text: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";

  .loading {
    width: 100%;
    text-align: center;
    .desc {
      font-size: $font-size-small;
      line-height: 20px;
      color: $color-text-l;
    }
  }
</style>
