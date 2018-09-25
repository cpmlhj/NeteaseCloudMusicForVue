<template>
 <scroll class="list-album" ref="scroll">
   <ul class="list">
     <li class="list-item" v-for="item in album" @click="goToAlbum(item.id)">
       <div class="l-l">
         <div class="background"></div>
         <img :src="item.img" class="image">
       </div>
       <div class="l-r">
         <p class="l-r-t">{{item.name}} {{item.alias[0]}}</p>
         <p class="l-r-b">{{item.publishTime}}</p>
       </div>
     </li>
   </ul>
 </scroll>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .list-album
   width 100%
   height:100%
   background:#fcfcfc
  .list
    padding: 20px 10px
  .list-item
    width: 100%
    display: flex
    justify-content space-around
    align-items center
    height:65px
    margin-bottom: 10px
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
      background-position 138px -248px
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
     text-overflow ellipsis
     overflow hidden
     white-space nowrap
   .l-r-b
     font-size:13px
     color:#595959
</style>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      currentPage: 3,
      album: []
    }
  },
  methods: {
    _initAlbum () {
      var data = {
        keywords: this.id,
        type: 10
      }
      axios('search', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.album = this._initImage(res.data.result.albums)
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 300)
        }
      })
    },
    _initImage (list) {
      list.forEach((res) => {
        res.img = `${res.picUrl}?param=130y130`
        res.publishTime = this.time(res.publishTime)
      })
      return list
    },
    time (time) {
      var date = new Date(time)
      return `发行时间：${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`
    },
    goToAlbum (id) {
      this.$emit('album', id)
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
        if (this.album.length > 2) {
          return
        }
        this._initAlbum()
      }
    },
    id (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.album = []
      }
    }
  }
}
</script>
