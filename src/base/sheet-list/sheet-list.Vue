<template>
 <div class="sheet-list">
   <div class="title">
     <div class="icon">
       <i class="iconfont icon-play">&#xe600;</i>
     </div>
     <div class="play-all">
       <span>播放全部</span>
     </div>
     <div class="play-all" v-if="songs">
       <span style="color: #bbb; font-size: 15px">(共{{songs.length}}首)</span>
     </div>
   </div>
   <list-view :songList="songs" @selectItem="playSong"></list-view>
 </div>
</template>

<style rel="stylesheet/stylus" scoped lang="stylus">
 .sheet-list
   background:#F7F7F7
   margin-top:10px
   color:#000
   border-radius 10px
  .title
    display: flex
    align-items center
    height:40px
    border-bottom 1px solid #eee
    padding-bottom 15px
   .icon, .play-all
     padding-left 10px
     font-size: 18px
     font-family 'Microsoft YaHei'
</style>

<script type="text/ecmascript-6">
import ListView from 'base/list-view/list-view'
import {mapMutations, mapActions} from 'vuex'
export default {
  props: {
    songs: {
      type: Array,
      default: null
    }
  },
  components: {
    ListView
  },
  methods: {
    ...mapMutations({
      ShowPlay: 'SET_PLAY'
    }),
    ...mapActions([
      'setPlayList'
    ]),
    playSong (songs, index) {
      this.setPlayList({
        list: songs,
        index: index
      })
    }
  }
}
</script>
