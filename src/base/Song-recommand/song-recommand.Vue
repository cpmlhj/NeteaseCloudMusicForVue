<template>
  <transition name="el-zoom-in-bottom">
   <div class="song-recommand" v-show="showFlag">
    <div class="top">
      <i class="iconfont icon-back" @click="hide">&#xe78c;</i>
      <span class="top-title">每日推荐</span>
    </div>
    <scroll class="list-wrapper" :data="list">
      <div>
     <div class="image">
       <img :src="songs[0].img" width="100%" height="100%">
     </div>
     <div class="song-options">
       <i class="iconfont icon-play"></i>
       <span class="play-all">播放全部</span>
     </div>
     <div class="song-list">
       <li class="item" v-for="(item, index) in songs" @click="goToPlay(songs, index)">
         <div class="item-l">
           <img :src="item.img" width="100%" height="100%">
         </div>
         <div class="item-m">
           <p class="item-m-n">{{item.name}}</p>
           <p class="item-m-a">{{item.singer}} - {{item.type}}</p>
         </div>
         <div class="item-r">
           <i class="iconfont icon-slider">&#xe67a;</i>
         </div>
       </li>
     </div>
      </div>
    </scroll>
   </div>
  </transition>
</template>

<style rel="stylesheet/stylus" scoped lang="stylus">
.song-recommand
  position fixed
  bottom:0
  top:0
  left:0
  right:0
  background:#fafafa
  z-index:200
 .top
   height:50px
   background:#ee0000
   color:#fff
   font-size:20px
   line-height:50px
  .top-title, .icon-back
    padding-left: 8px
  .list-wrapper
    position fixed
    top:50px
    bottom:0
    overflow hidden
 .image
   height:200px
 .song-options
   height:40px
   line-height:40px
   width:100%
  .play-all, icon-play
    padding-left:10px
 .song-list
   min-height:1px
   border-top: 1px solid #ddd
  .item
    display flex
    flex-flow row wrap
    justify-content space-around
    align-items center
    height:55px
    font-size:15px
    padding:8px 0 8px 0
    width:100%
   .item-l
     width:10%
     height:80%
   .item-m
     width: 65%
     height:80%
     border-bottom: 1px solid #ddd
   .item-r
     width:10%
     height: 80%
     display flex
     justify-content center
     align-items center
   .item-m-a
     font-size:12px
     color:#595959
   .item-m-n, .item-m-a
     margin-top:8px
   .item-m-n
     overflow hidden
     text-overflow ellipsis
     white-space nowrap
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {createSong} from 'common/js/song'
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      showFlag: false,
      songs: []
    }
  },
  created () {
    this._initSong()
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    _initSong () {
      this.list.forEach((item) => {
        let musicData = {
          id: item.id,
          singer: item.album.artists[0].name,
          name: item.name,
          type: item.album.name,
          musicImg: item.album.picUrl,
          duration: item.duration
        }
        this.songs.push(createSong(musicData))
      })
    },
    goToPlay (songs, index) {
      this.$emit('selectItem', songs, index)
    }
  },
  components: {
    Scroll
  }
}
</script>
