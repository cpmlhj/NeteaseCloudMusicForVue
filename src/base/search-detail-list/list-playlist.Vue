<template>
 <scroll class="list-playlist" ref="scroll">
   <ul class="list">
     <li class="list-item" v-for="item in playlist" @click="goToSheet(item.id)">
       <div class="list-l">
         <img :src="item.img" width="100%" height="100%" style="border-radius: 8px">
       </div>
       <div class="list-r">
         <p class="playlist-n">{{item.name}}</p>
         <p class="playlist-d">
           <span>by {{item.creator.nickname}},</span>
           <span style="margin-left: 10px">播放{{item.playCount | newLine}}次</span>
         </p>
       </div>
     </li>
   </ul>
 </scroll>
</template>

<style rel="stylesheet/stylus" scoped lang="stylus">
 .list-playlist
    width:100%
    height: 100%
    background: #fcfcfc
  .list
    padding: 20px 10px
   .list-item
     height: 60px
     width 100%
     display: flex
     justify-content: space-around
     align-items center
     padding-bottom: 10px
    .list-l
      width: 16%
      height: 60px
    .list-r
      width: 80%
      height: 60px
      line-height 15px
      border-bottom: 1px solid #ddd
     .playlist-n, .playlist-d
       margin-top: 10px
       text-overflow ellipsis
       overflow hidden
       white-space nowrap
     .playlist-d
       font-size:12px
       color:#595959
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      playlist: [],
      currentPage: 4
    }
  },
  methods: {
    initPlayList () {
      let data = {
        keywords: this.id,
        type: 1000
      }
      axios('search', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.playlist = this.initImage(res.data.result.playlists)
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 400)
        }
      })
    },
    initImage (list) {
      list.forEach((res) => {
        res.img = `${res.coverImgUrl}?param=130y130`
      })
      return list
    },
    goToSheet (id) {
      this.$emit('sheet', id)
    }
  },
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'searchPageIndex'
    ])
  },
  watch: {
    searchPageIndex () {
      if (this.currentPage === this.searchPageIndex) {
        if (this.playlist.length > 2) {
          return
        }
        this.initPlayList()
      }
    },
    id (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.playlist = []
      }
    }
  }
}
</script>
