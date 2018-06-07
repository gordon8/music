<template>
  <div class="player">
    <div class="full-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="iconfont icon-back"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrap">
            <div class="cd">
              <img :src="currentSong.image" class="image">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="dot-wrap"></div>
        <div class="progress-bar-wrap">
        </div>
        <div class="operators">
          <div class="icon"></div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon"></div>
      <div class="text"></div>
      <div class="control"></div>
      <div class="control"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'player',
  data() {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'fullScreen',
      'playing',
      'currentSong'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  @import "../../common/css/mixin";

  .player {
    .full-player {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      background-color: $color-background;
      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        filter: blur(20px);
        z-index: -1;
      }
      .top {
        position: relative;
        margin-bottom: 20px;
        .back {
          position: absolute;
          top: 0;
          left: 6px;
          .iconfont {
            display: block;
            padding: 9px;
            font-size: 22px;
            color: $color-theme;
            transform: rotate(-90deg);
          }
        }
        .title {
          margin: 0 auto;
          width: 70%;
          line-height: 40px;
          text-align: center;
          font-size: $font-size-large;
          color: $color-text;
          @include no-wrap();
        }
        .subtitle {
          line-height: 20px;
          font-size: $font-size-medium;
          text-align: center;
          color: $color-text;
        }
      }
      .middle {
        position: fixed;
        top: 80px;
        bottom: 170px;
        width: 100%;
        white-space: nowrap;
        font-size: 0;
        .middle-l{
          display: inline-block;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrap {
            position: absolute;
            top: 0;
            left: 10%;
            width: 80%;
            height: 100%;
          }
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            .image {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
      .bottom {
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
            color: $color-theme;
            &.disable {
              color: $color-theme-d;
            }
          }
        }
      }
    }
    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      background-color: $color-highlight-background;
      z-index: 100;
    }
  }
</style>
