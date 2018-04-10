<template>
  <scroll ref="scroll"
          :data="list"
          class="list-view">
    <ul class="list">
      <li v-for="item in list" :key="item.title" class="item" ref="items">
        <h3 class="title">{{item.title}}</h3>
        <ul class="singer-list">
          <li v-for="innerItem in item.items" :key="innerItem.id" class="singer-item">
            <img v-lazy="innerItem.imgUrl" width="50" height="50" class="avatar">
            <span class="name">{{innerItem.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="menu-list">
      <li v-for="item in menuList" :key="item" class="menu-item">{{item}}</li>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'

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
      listHeight: []
    }
  },
  computed: {
    menuList() {
      let res = []
      this.list.forEach((item) => {
        res.push(item.title.substr(0, 1))
      })
      return res
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  methods: {
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
    }
  },
  components: {
    Scroll
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
  }
</style>
