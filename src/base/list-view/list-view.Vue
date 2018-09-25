<template>
  <div class="list">
    <ul>
      <li class="list-item" v-for="(item, index) in songs" :key="item.id" @click="select(songs, index)">
        <span class="currentIndex">{{index + 1}}</span>
        <div class="song-detail">
          <span>{{item.name}}</span>
          <span style="font-size: 14px; color:#595959">{{item.singer}}-{{item.type}}</span>
        </div>
        <div class="slider">
          <i class="iconfont icon-slider">&#xe67a;</i>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
 .list-item
   display: flex
   flex-flow row nowrap
   justify-content space-between
   align-items center
   height 55px
   padding-bottom 10px
   background:#f7f7f7
  .currentIndex
    padding-left 10px
    width:5%
  .song-detail
    display flex
    flex-flow column wrap
    justify-content space-around
    align-content space-around
    width: 80%
    padding-left 10px
    height:100%
    border-bottom 1px solid #ddd
    span
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .slider
    font-size 20px
    padding-right 10px
</style>

<script type="text/ecmascript-6">
import {createSong} from 'common/js/song'
export default {
  props: {
    songList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._initSonglist()
  },
  methods: {
    _initSonglist () {
      if (!this.songList) {
        return
      }
      this.songList.forEach((item) => {
        if (!item.album) {
          let musicData = {
            id: item.id,
            singer: item.ar[0].name,
            name: item.name,
            type: item.alia[0],
            musicImg: item.al.picUrl,
            duration: item.dt
          }
          this.songs.push(createSong(musicData))
        } else {
          let musicData = {
            id: item.id,
            singer: item.album.artists[0].name,
            name: item.name,
            type: item.album.name,
            musicImg: item.album.picUrl,
            duration: item.duration
          }
          this.songs.push(createSong(musicData))
        }
      })
    },
    select (songs, index) {
      this.$emit('selectItem', songs, index)
    }
  },
  watch: {
    songList () {
      this.songs = []
      this._initSonglist()
    }
  }
}
</script>
