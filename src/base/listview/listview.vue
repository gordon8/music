<template>
  <scroll @scroll="scroll"
          :listenScroll="listenScroll"
          :probeType="probeType"
          :data="list"
          class="list-view"
          ref="listview">
    <ul class="list">
      <li v-for="item in list" :key="item.title" class="item" ref="items">
        <h3 class="title">{{item.title}}</h3>
        <ul class="singer-list">
          <li @click="selectItem(innerItem)" v-for="innerItem in item.items" :key="innerItem.id" class="singer-item">
            <img v-lazy="innerItem.imgUrl" width="50" height="50" class="avatar">
            <span class="name">{{innerItem.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="menu-list" @touchstart.stop.prevent="onMenuTouchStart" @touchmove.stop.prevent="onMenuTouchMove">
      <li v-for="(item, index) in menuList" :key="item" class="menu-item" :data-index="index"
          :class="{'current': currentIndex === index}">
        {{item}}
      </li>
    </ul>
    <h2 v-show="fixedTitle" class="fixed-title" ref="fixedTitle">{{fixedTitle}}</h2>
    <div v-show="list.length === 0" class="loading-wrap">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getData} from 'common/js/dom'

const ITEM_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  name: 'listview',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      listHeight: [],
      currentIndex: 0,
      listenScroll: true,
      probeType: 3,
      scrollY: 0,
      touch: {},
      fixedY: 0
    }
  },
  computed: {
    menuList() {
      let res = []
      this.list.forEach((item) => {
        res.push(item.title.substr(0, 1))
      })
      return res
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.list[this.currentIndex] ? this.list[this.currentIndex].title : ''
    }
  },
  created() {
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    onMenuTouchStart(e) {
      let index = getData(e.target, 'index')
      let firstItem = e.touches[0]
      this.touch.y1 = firstItem.pageY
      this.touch.currentIndex = index
      this._scrollTo(index)
    },
    onMenuTouchMove(e) {
      // console.log(e)
      let firstItem = e.touches[0]
      this.touch.y2 = firstItem.pageY
      let delta = parseInt((this.touch.y2 - this.touch.y1) / ITEM_HEIGHT)
      let currentIndex = delta + Number(this.touch.currentIndex)
      this._scrollTo(currentIndex)
    },
    _scrollTo(index) {
      if (index === null) {
        return
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.items[index], 0)
    },
    _calculateHeight() {
      if (this.listHeight.length > 0) {
        return
      }
      let height = 0
      let items = this.$refs.items
      this.listHeight.push(height)
      for (let i = 0; i < items.length - 1; i++) {
        height += items[i].clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    list() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY() {
      if (this.scrollY >= 0) {
        this.currentIndex = 0
        return
      }
      let scrollY = Math.abs(this.scrollY)
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if ((scrollY >= height1 && scrollY < height2) || !height2) {
          this.currentIndex = i
          if (!height2) {
            this.fixedY = TITLE_HEIGHT
          } else {
            this.fixedY = height2 - scrollY
          }
          break
        }
      }
    },
    fixedY() {
      if (this.fixedY <= TITLE_HEIGHT) {
        let fixedHeight = this.fixedY - TITLE_HEIGHT
        this.$refs.fixedTitle.style.transform = `translate3d(0,${fixedHeight}px,0)`
      } else {
        this.$refs.fixedTitle.style.transform = `translate3d(0,0,0)`
      }
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";

  .list-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .list {
      .item {
        padding-bottom: 30px;
        .title {
          height: 30px;
          padding-left: 20px;
          line-height: 30px;
          font-size: $font-size-small;
          color: $color-text-l;
          background-color: $color-highlight-background;
        }
        .singer-list {
          .singer-item {
            display: flex;
            align-items: center;
            margin: 20px 0 0 30px;
            .avatar {
              border-radius: 50%;
            }
            .name {
              padding-left: 20px;
              font-size: $font-size-medium;
              color: $color-text-l;
            }
          }
        }
      }
    }
    .menu-list {
      position: absolute;
      top: 50%;
      right: 0;
      width: 20px;
      padding: 20px 0;
      background-color: $color-background-d;
      border-radius: 10px;
      transform: translate3d(0, -50%, 0);
      z-index: 10;
      .menu-item {
        padding: 3px;
        font-size: $font-size-small;
        text-align: center;
        color: $color-text-l;
        &.current {
          color: $color-theme;
        }
      }
    }
    .fixed-title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      padding-left: 20px;
      line-height: 30px;
      font-size: $font-size-small;
      color: $color-text-l;
      background-color: $color-highlight-background;
    }
    .loading-wrap {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }
  }
</style>
