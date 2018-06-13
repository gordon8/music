<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress"></div>
      <div class="progress-btn-wrap">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'progress-bar',
  props: {
    percent: {
      type: Number,
      default: 20
    }
  },
  created() {
    this.touch = {}
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background-color: $color-background-d;
      .progress {
        position: absolute;
        height: 100%;
        background-color: $color-theme;
      }
      .progress-btn-wrap {
        position: absolute;
        top: -13px;
        left: -7px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: absolute;
          top: 7px;
          left: 7px;
          width: 16px;
          height: 16px;
          background-color: $color-theme;
          border: 3px solid $color-text;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
