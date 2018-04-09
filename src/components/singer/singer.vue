<template>
  <div class="singer">
    <list-view></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

const HOT_NAME = '热门'
const HOT_LENGTH = 10

export default {
  name: 'singer',
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this._getSingerList()
    },
    _getSingerList() {
      getSingerList().then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.singerList = res.data.list
          this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item) => {
        if (map.hot.items.length < HOT_LENGTH) {
          
        }
      })
    }
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
