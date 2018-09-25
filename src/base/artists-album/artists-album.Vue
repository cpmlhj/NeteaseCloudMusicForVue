<template>
 <div class="artists-album">
     <scroll class="album-list" :data="album" ref="scroll">
       <div>
       <li class="item-list" v-for="item in album" @click="goToSheet(item.id)">
         <div class="l-l">
           <div class="background"></div>
           <img :src="item.picUrl" class="image">
         </div>
         <div class="l-r">
            <p class="l-r-t">{{item.name}} {{item.alias[0]}}</p>
            <p class="l-r-b">{{item.publishTime}}</p>
         </div>
       </li>
       </div>
     </scroll>
 </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.artists-album
   background #F7F7F7
  .album-list
     height:430px
     overflow hidden
     position relative
  .item-list
    display: flex
    justify-content space-around
    align-items center
    height:65px
   .l-l
     width 20%
     height:55px
     position relative
    .background
      width: 110%
      height:53px
      position absolute
      top: 0
      left: 0
      right:0
      background: url("http://s2.music.126.net/style/web2/img/coverall.png?ed0c26f721bd64ee2b035be4fac8e70c")
      background-position 145px -249px
    .image
      width: 80%
      height:60px
      border-radius 3px
   .l-r
     width: 75%
     height:60px
     border-bottom 1px solid #ddd
    .l-r-t, .l-r-b
      margin: 12px 10px
    .l-r-b
      font-size:13px
      color:#595959
</style>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      album: [],
      pageIndex: 1
    }
  },
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
  mounted () {
  },
  methods: {
    _initAlbum () {
      var data = {id: this.id, limit: 100}
      return new Promise((resolve, reject) => {
        axios('artist/album', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.album = this._initImage(res.data.hotAlbums)
            setTimeout(() => {
              this.$refs.scroll.refresh()
            }, 300)
            resolve(this.album)
          }
        })
      })
    },
    _initImage (list) {
      list.forEach((res) => {
        res.picUrl = `${res.picUrl}?param=130y130`
        res.publishTime = this.time(res.publishTime)
      })
      return list
    },
    time (time) {
      var date = new Date(time)
      return `发行时间：${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`
    },
    goToSheet (id) {
      this.$emit('toAlbum', id)
    },
    handlePlaylist (playlist) {
    }
  },
  computed: {
    ...mapGetters([
      'artistPageIndex'
    ])
  },
  watch: {
    artistPageIndex () {
      if (this.pageIndex === this.artistPageIndex) {
        if (this.album.length > 2) {
          return
        }
        this._initAlbum()
      }
    },
    id () {
      this.album = []
    }
  },
  components: {
    Scroll
  }
}
</script>
