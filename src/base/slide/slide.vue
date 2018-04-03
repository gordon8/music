<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
  name: 'slide',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    click: {
      type: Boolean,
      default: true

    },
    showDot: {
      type: Boolean,
      default: false
    }
  },
  watch: {

  },
  mounted () {
    this.update()
  },
  methods: {
    update () {
      if (this.slide) {
        this.slide.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    init () {
      clearTimeout(this.timer)
      this.currentPageIndex = 0
      this._setSliderWidth()
      if (this.showDot) {
        this._initDot()
      }
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    },
    _setSliderWidth () {
      this.children = this.$refs.slideGroup.children

      let width = 0
      let slideWidth = this.$refs.slide.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slide-item')
        child.style.width = slideWidth + 'px'
        width += slideWidth
      }
      if (this.loop) {
        width += 2 * slideWidth
      }
      this.$refs.slideGroup.style.width = width + 'px'
    },
    _initDot () {

    },
    _initSlider () {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        bounce: false,
        stopPropagation: true,
        click: this.click
      })

      this.slide.on('scrollEnd', this._onScrollEnd)

      this.slide.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })

      this.slide.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScrollEnd () {
      let pageIndex = this.slide.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slide.next()
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  .slide {
    position: relative;
    min-height: 1px;
    .slide-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slide-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      text-align: center;
      font-size: 0;
      transform: translateZ(1px);
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background-color: $color-text-ll;
        }
      }
    }
  }
</style>
