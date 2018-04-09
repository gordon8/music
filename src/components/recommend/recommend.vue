<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-con" :data="mvList">
      <div>
        <div class="slider-wrap">
          <slide v-if="recommendList.length">
            <div class="slide-item" v-for="item in recommendList" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slide>
        </div>
        <div class="recommend-list">
          <h2 class="list-title">热门MV推荐</h2>
          <ul>
            <li class="list-item" v-for="item in mvList" :key="item.mv_id">
              <div class="pic-wrap">
                <img width="60" height="60" v-lazy="item.picurl">
              </div>
              <div class="mv-con">
                <p class="mv-title">{{item.mvtitle}}</p>
                <p class="mv-desc">{{item.mvdesc}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="mvList.length === 0" class="loading-wrap">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slide from 'base/slide/slide'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  name: 'recommend',
  data() {
    return {
      recommendList: [],
      mvList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this._getRecommendList()
      this._getDiscList()
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.mvList = res.data.mvlist
        }
      })
    },
    _getRecommendList() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendList = res.data.slider
        }
      })
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        // this.$refs.
      }
    }
  },
  components: {
    Slide,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";
  @import "../../common/css/mixin";

  .recommend {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    .recommend-con {
      height: 100%;
      overflow: hidden;
    }
    .slider-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        font-size: $font-size-medium;
        text-align: center;
        color: $color-theme;
      }
      .list-item {
        display: flex;
        position: relative;
        padding: 0 20px 20px 20px;
        .pic-wrap {
          flex: 0 0 60px;
          width: 60px;
          margin-right: 20px;
        }
        .mv-con {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
          .mv-title, .mv-desc {
            @include no-wrap();
          }
          .mv-title {
            margin-bottom: 10px;
            color: $color-text;
          }
          .mv-desc {
            color: $color-text-ll;
          }
        }
      }
    }

    .loading-wrap {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translate3d(0, -50%, 0);
    }

  }
</style>
