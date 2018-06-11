<template>
  <div class="player" v-show="playlist.length > 0">
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
          <div class="icon icon-left">
            <i class="iconfont icon-loop"></i>
          </div>
          <div class="icon icon-left">
            <i class="iconfont icon-circle_skip_previous"></i>
          </div>
          <div class="icon icon-center">
            <i class="iconfont icon-play1"></i>
          </div>
          <div class="icon icon-right">
            <i class="iconfont icon-circle_skip_next"></i>
          </div>
          <div class="icon icon-right">
            <i class="iconfont icon-favorites"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img class="cd-cover" width="40" height="40" :src="currentSong.image">
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.album}}</h2>
        <p class="desc">{{currentSong.singer}}</p>
      </div>
      <div class="control">
        <div class="progress-circle">
          <i class="iconfont icon-play2"></i>
        </div>
      </div>
      <div class="control">
        <div class="iconfont icon-musicmenu"></div>
      </div>
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
      'currentSong',
      'playlist'
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
        position: absolute;
        bottom: 50px;
        width: 100%;
        .progress-bar-wrap {
          display: flex;
          width: 80%;
          margin: 0 auto;
          align-items: center;
        }
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
            color: $color-theme;
            &.disable {
              color: $color-theme-d;
            }
            i {
              font-size: 30px;
            }
            &.icon-left {
              text-align: right;
            }
            &.icon-right {
              text-align: left;
            }
            &.icon-center {
              padding: 0 20px;
              text-align: center;
              i {
                font-size: 40px;
              }
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
      .icon {
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        .cd-cover {
          border-radius: 50%;
        }
      }
      .text {
        display: flex;
        flex: 1;
        flex-direction: column;
        line-height: 20px;
        .name {
          font-size: $font-size-medium;
        }
        .desc {
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
      .control {
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        color: $color-theme-d;
        .iconfont {
          font-size: 32px;
        }
      }
    }
  }
</style>
