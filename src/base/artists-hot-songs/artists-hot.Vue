<template>
  <div class="artists-hot">
    <scroll class="list-wrapper" :data="songs" ref="scroll">
      <div>
     <div class="song-list">
       <list-view :songList="songs" v-if="songs.length > 2" @selectItem="playSong"></list-view>
     </div></div>
  </scroll>
  </div>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
@import 'swiper/dist/css/swiper.css'
  .list-wrapper
    position fixed
    top 0
    bottom: 120px
    right: 0
    left:0
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import listView from 'base/list-view/list-view'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  props: {
    id: {
      type: Number,
      default: null
    },
    index: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      songs: [],
      pageIndex: 0
    }
  },
  created () {
    this._initSongList()
  },
  methods: {
    ...mapActions([
      'setPlayList'
    ]),
    _initSongList () {
      var data = {
        id: this.id
      }
      return new Promise((resolve, reject) => {
        axios('artists', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.songs = this.initImage(res.data.hotSongs, res.data.artist)
            resolve(this.songs)
          } else {
            reject('error')
          }
        })
      })
    },
    initImage (list, data) {
      list.forEach((res) => {
        res.al.picUrl = data.picUrl
      })
      return list
    },
    playSong (songs, index) {
      this.setPlayList({
        list: songs,
        index: index
      })
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length ? '120px' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    }
  },
  components: {
    listView,
    Loading,
    Scroll
  },
  watch: {
    id () {
      this._initSongList()
    },
    songs () {
      if (this.songs.length > 2) {
        this.$emit('update')
      }
    }
  }
}
</script>
