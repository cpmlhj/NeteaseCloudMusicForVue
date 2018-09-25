<template>
  <transition name="el-zoom-in-bottom">
 <div class="history" v-show="showFlag">
    <div class="title">
      <i class="iconfont icon-back" style="margin: 0 10px" @click="hide">&#xe78c;</i>
      <span>最近播放</span>
    </div>
    <scroll class="list-wrapper" :data="list" ref="scroll">
      <div>
        <div class="list-t">
          <i class="iconfont icon-play">&#xe662;</i>
          <span class="list-t-t">播放全部 (共{{songs.length}})</span>
        </div>
        <li class="list-item" v-for="(item, index) in songs" @click="selectItem(songs, index)">
          <div class="item">
            <p class="s-n">{{item.name}}</p>
            <p class="s-s">{{item.singer}} - {{item.type}}</p>
          </div>
        </li>
      </div>
    </scroll>
 </div>
  </transition>
</template>

<style rel="stylesheet/stylus" lang="stylus" scoped>
 .history
   position fixed
   top: 0
   bottom: 0
   left: 0
   right: 0
   background:#fff
   z-index:120
 .title
   height:50px
   background:#ee0000
   font-size:18px
   color:#fff
   line-height 50px
 .list-wrapper
   position fixed
   top: 50px
   bottom: 0
   left: 0
   right: 0
   overflow hidden
  .list-t
    height: 45px
    width:100%
    line-height 45px
    colot:#fff
    font-size: 17px
    border-bottom 1px solid #ddd
    .list-t-t , .icon-play
      margin: 5px  5px
    .icon-play
       font-size: 20px
  .item
    height: 45px
    width: 100%
    border-bottom 1px solid #ddd
  .s-n, .s-s
    margin: 10px 0 0 10px
  .s-n
    font-weight 600
    font-size: 14px
  .s-s
    color:#595959
    font-size:12px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {initSonglit} from 'common/js/song'
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
  methods: {
    show () {
      this.showFlag = true
      this.songs = this.init()
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 300)
    },
    hide () {
      this.showFlag = false
    },
    selectItem (list, index) {
      this.$emit('select', list, index)
    },
    init () {
      var songlist = []
      this.list.forEach((res) => {
        songlist.push(res.song)
      })
      return initSonglit(songlist)
    }
  },
  components: {
    Scroll
  }
}
</script>
