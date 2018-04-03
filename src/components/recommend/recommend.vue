<template>
  <div class="recommend">
    <div class="slider-wrap">
      <slide v-if="recommendList.length">
        <div class="slide-item" v-for="item in recommendList" :key="item.id">
          <a :href="item.linkUrl">
            <img @load="loadImage" :src="item.picUrl">
          </a>
        </div>
      </slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slide from 'base/slide/slide'

export default {
  name: 'recommend',
  data () {
    return {
      recommendList: []
    }
  },
  created () {
    this._getRecommendList()
  },
  methods: {
    _getRecommendList () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendList = res.data.slider
        }
      })
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        // this.$refs.
      }
    }
  },
  components: {
    Slide
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/variable";

  .recommend {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    .slider-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
  }
</style>
