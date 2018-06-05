<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="iconfont icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrap">
        <div class="play">
          <i class="iconfont icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <scroll :data="songs"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            class="list"
            ref="list"
    >
      <div class="song-list-wrap">
        <song-list
            :songs="songs"
        >
        </song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'

const RESERVED_HEIGHT = 40

export default {
  name: 'music-list',
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    back() {
      this.$router.back()
    },
    scroll() {
      console.log('sc')
    }
  },
  components: {
    Scroll,
    Loading,
    SongList
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  @import "../../common/css/mixin";

  .music-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color-background;
    z-index: 100;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back {
        display: block;
        padding: 10px;
        font-size: 22px;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: $font-size-large;
      color: $color-text;
      @include no-wrap;
      z-index: 10;
    }
    .bg-image {
      position: relative;
      width: 100%;
      padding-top: 70%;
      height: 0;
      background-size: cover;
      .play-wrap {
        position: absolute;
        bottom: 20px;
        width: 100%;
        z-index: 10;
        .play {
          box-sizing: border-box;
          margin: 0 auto;
          width: 135px;
          padding: 7px 0;
          text-align: center;
          font-size: 0;
          color: $color-theme;
          border: 1px solid $color-theme;
          border-radius: 100px;
          .icon-play {
            display: inline-block;
            margin-right: 6px;
            vertical-align: middle;
            font-size: $font-size-large;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
          }
        }
      }
    }
    .list {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-background;
    }
    .song-list-wrap {
      padding: 20px 30px;
    }
  }
</style>
