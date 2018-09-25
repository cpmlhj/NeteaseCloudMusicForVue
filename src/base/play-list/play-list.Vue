<template>
  <transition name="el-zoom-in-bottom">
    <div class="play-list" v-show="showPlayList">
      <div class="list-top">
        <i class="iconfont icon-mode" v-html="initMode" @click="changeMode"></i>
        <span class="t-m" v-html="playname">({{playList.length}})</span>
      </div>
      <scroll class="list" :data="playList"  :refreshDelay="refreshDelay" ref="listWrapper">
        <div>
        <li class="list-item" v-for="(item, index) in playList" @click="changeCurrentSong(index)" :class="{'listening': index === currentIndex}">
          <div class="item-wrapper">
            <i class="iconfont icon-lala" v-show="index === currentIndex">&#xe602;</i>
            <span class="item-n">{{item.name}} -</span>
            <span class="item-s">{{item.singer}}</span>
          </div>
        </li>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
 .play-list
   position fixed
   top:300px
   left:0
   bottom:0
   right:0
   z-index:300
   background:#fff
   border-radius 10px
  .list
    max-height:400px
    overflow hidden
    width:100%
  .list-top
    height:45px
    border-bottom: 1px solid #D4D4D4
    font-size:18px
    line-height:45px
   .icon-mode
     margin-left:8px
   .t-m
     margin-left:10px
  .list-item
    height:45px
    width:100%
    display: flex
    justify-content space-between
    align-items center
    padding-bottom:5px
    border-bottom: 1px solid #ddd
  .listening
     color:#ee0000
   .icon-lala
     color:#ee0000
     font-size:21px
   .item-wrapper
     width:80%
     overflow hidden
     white-space nowrap
    .item-n
      padding-left:5px
    .item-s
      font-size:13px
      color:#D4D4D4
</style>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export default {
  data () {
    return {
      refreshDelay: 100
    }
  },
  methods: {
    ...mapMutations({
      setMode: 'SET_PLAY_MODE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayList: 'SET_PLAY_LIST'
    }),
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
        this.setChangeCurrentIndex(list)
      } else {
        list = this.sequenceList
      }
      this.setPlayList(list)
    },
    setChangeCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    changeCurrentSong (index) {
      this.setCurrentIndex(index)
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'showPlayList',
      'mode',
      'sequenceList',
      'currentSong',
      'currentIndex'
    ]),
    initMode () {
      return this.mode === playMode.sequence ? `&#xe60b;` : this.mode === playMode.loop ? `&#xe66c;` : this.mode === playMode.random ? `&#xe622;` : ''
    },
    playname () {
      var length = this.playList.length
      return this.mode === playMode.sequence ? `列表循环 (${length})` : this.mode === playMode.loop ? `单曲循环 (${length})` : this.mode === playMode.random ? `随机播放 (${length})` : ''
    }
  },
  components: {
    Scroll
  },
  watch: {
    showPlayList () {
      if (this.showPlayList === true) {
        setTimeout(() => {
          this.$refs.listWrapper.refresh()
        }, 500)
      }
    }
  }
}
</script>
