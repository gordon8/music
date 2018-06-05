<template>
  <ul class="song-list">
    <li class="item" v-for="song in songs" :key="song.id">
      <div class="content">
        <h2 class="name">{{song.name}}</h2>
        <p class="desc">{{getDesc(song)}}</p>
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  @import "../../common/css/mixin";
  .song-list {
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: $font-size-medium;
      .content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
          color: $color-text;
          @include no-wrap();
        }
        .desc {
          color: $color-text-d;
          @include no-wrap();
        }
      }
    }
  }
</style>