<template>
  <div class="recommend">
    recommend
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend'

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
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
