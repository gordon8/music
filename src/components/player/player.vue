<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="full"
                @enter="enter"
                @afterEnter="afterEnter"
                @leave="leave"
                @afterLeave="afterLeave">
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
            <div class="cd-wrap" ref="cdWrap">
              <div :class="cdCls" class="cd">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrap"></div>
          <div class="progress-wrap">
            <span class="time time-l">{{format(currentTime)}}</span>
            <progress-bar @progressChange="onProgressChange" :percent="percent" class="progress-bar"></progress-bar>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon icon-left">
              <i class="iconfont icon-loop"></i>
            </div>
            <div class="icon icon-left">
              <i class="iconfont icon-circle_skip_previous"></i>
            </div>
            <div class="icon icon-center">
              <i @click="togglePlaying" class="iconfont" :class="playIcon"></i>
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
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" class="cd-cover" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <div class="progress-circle">
            <i @click.prevent.stop="togglePlaying" class="iconfont icon-play2"></i>
          </div>
        </div>
        <div class="control">
          <div class="iconfont icon-musicmenu"></div>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations, mapActions} from 'vuex'
import animations from 'create-keyframe-animation'
import {prefixStyle} from 'common/js/dom'
import ProgressBar from 'base/progress-bar/progress-bar'
import {playerMixin} from 'common/js/mixin'

const transform = prefixStyle('transform')

export default {
  name: 'player',
  mixins: [playerMixin],
  data() {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  computed: {
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play1'
    },
    cdCls() {
      return this.playing ? 'play' : 'pause'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'currentIndex',
      'fullScreen',
      'playing'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: 'translate3d(0,0,0) scale(1.1)'
        },
        100: {
          transform: 'translate3d(0,0,0) scale(1.0)'
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrap, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrap.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrap.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrap.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrap.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrap.style.transition = ''
      this.$refs.cdWrap.style[transform] = ''
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    end() {

    },
    onProgressChange(precent) {
      const currentTime = this.currentSong.duration * precent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    format(interval) {
      interval = interval | 0 // 取整相当于Number.parseInt()
      const minute = interval / 60 | 0
      let second = interval % 60
      second = this._pad(second)
      return `${minute}:${second}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - paddingBottom - width / 2
      return {
        x,
        y,
        scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
      }, 1000)
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  components: {
    ProgressBar
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
        .middle-l {
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
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: rotate 20s infinite;
            &.play {

            }
            &.pause {
              animation-play-state: paused;
            }
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
        .progress-wrap {
          display: flex;
          width: 80%;
          margin: 0 auto;
          align-items: center;
          .time {
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: $font-size-small;
            color: $color-text;
          }
          .time-l {
            text-align: left;
          }
          .time-r {
            text-align: right;
          }
          .progress-bar {
            flex: 1;
          }
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
      &.full-enter-active, &.full-leave-active {
        transition: all 0.4s;
        .top, .bottom {
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.full-enter, &.full-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -100px, 0);
        }
        .bottom {
          transform: translate3d(0, 100px, 0);
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
          animation: rotate 10s linear infinite;
          &.pause {
            animation-play-state: paused;
          }
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
      &.mini-enter-active, &.mini-leave-leave {
        transition: all 0.4s;
      }
      &.mini-enter, &mini-leave-to {
        opacity: 0;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
