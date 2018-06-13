import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'

export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'playlist',
      'currentSong',
      'mode'
    ])
  },
  methods: {
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      // 'saveFavoriteList',
      // 'deleteFavoriteList'
    ])
  }
}
