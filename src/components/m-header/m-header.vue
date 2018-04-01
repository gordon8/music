<template>
  <div class="header">
    <div class="logo"></div>
    <h1 class="title">My Music</h1>
    <router-link tag="div" class="user" to="/user">
      <i class="iconfont icon-user"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'm-header'
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  @import "../../common/css/mixin";
  .header {
    position: relative;
    height: 44px;
    width: 100%;
    text-align: center;
    color: $color-theme;
    .logo {
      display: inline-block;
      margin-top: 6px;
      margin-right: 9px;
      width: 30px;
      height: 32px;
      vertical-align: top;
      @include bg-image('logo');
    }
    .title {
      display: inline-block;
      font-size: $font-size-large;
      line-height: 44px;
    }
    .user {
      position: absolute;
      right: 0;
      top: 0;
      .iconfont {
        display: block;
        padding: 12px;
        font-size: 20px;
      }
    }
  }
</style>
