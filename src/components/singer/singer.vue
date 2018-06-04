<template>
  <div class="singer">
    <list-view @select="selectSinger" :list="singerList"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'

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
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
        }
      })
    },
    selectSinger(singer) {
      // console.log(singer.id)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
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
          map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      let res = []
      let hot = []
      let others = []
      for (let k in map) {
        if (k === 'hot') {
          hot.push(map[k])
        } else {
          let reg = /[A-Za-z]/
          if (reg.test(map[k].title)) {
            others.push(map[k])
          }
        }
      }
      others.sort(function (a, b) {
        return a.title.charCodeAt() - b.title.charCodeAt()
      })
      res = hot.concat(others)
      return res
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>
