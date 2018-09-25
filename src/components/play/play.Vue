<template>
 <div class="play" v-show="playList.length > 0">
   <transition name="well" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
     <div class="normal-play" v-show="play">
       <div class="background" :style="bgStyle">
         <!--<img  :src="currentSong.img" width="100%" height="100%">-->
       </div>
     <div class="play-top">
       <div class="icon" @click.stop="back">
         <i class="iconfont icon-back">&#xe78c;</i>
       </div>
       <div class="song-message">
         <div class="scrollMessage">{{currentSong.name}}</div>
         <div>
           <span class="singer">{{currentSong.singer}}</span>
         </div>
       </div>
     </div>
     <div class="middle">
       <div class="middle-l" ref="middlel" v-show="showCd">
         <div class="cd-wrapper" ref="cdWrapper">
           <div class="cd" @click.stop="goTolyric" :class="cdS">
             <img :src="currentSong.img" class="image">
           </div>
         </div>
       </div>
       <scroll class="middle-r" ref="middler" v-show="!showCd" :data="currentLyric && currentLyric.lines">
         <div class="lyric-wrapper">
           <div class="lyric" @click.stop="goToCd" v-if="currentLyric">
             <p class="text" ref="lyricline" v-for="(item, index) in currentLyric.lines" :class="{'height': currentlyricNum === index}">{{item.txt}}</p>
           </div>
           <div class="no-lyric" v-if="!currentLyric" @click.stop="goToCd">
             <p>此歌曲暂无歌词</p>
           </div>
         </div>
       </scroll>
     </div>
     <div class="bottom">
       <div class="icon-top">
         <div class="collection">
           <i class="iconfont icon-collection">&#xe63b;</i>
         </div>
         <div class="comment" @click="goToComment">
           <el-badge :value="1000" :max="999">
           <i class="iconfont icon-comment">&#xe603;</i>
           </el-badge>
         </div>
       </div>
       <div class="progress-wrapper">
         <span class="time-l time">{{_initTime(currenttime)}}</span>
         <div class="progress-bar-wrapper">
         <progress-bar @percentChange="progressChange" :percent="percent"></progress-bar>
         </div>
         <span class="time-r time">{{_initTime(currentSong.duration / 1000)}}</span>
       </div>
       <div class="operatros">
         <div class="icon-left" @click="changeMode">
           <i class="iconfont icon-sui" v-html="iconMode"></i>
         </div>
         <div class="icon-left-l" @click="pre">
           <i class="iconfont icon-left">&#xe78a;</i>
         </div>
         <div class="icon-middle" @click="toggleplay">
           <i class="iconfont icon-play" v-html="getIconPlay"></i>
         </div>
         <div class="icon-right-r" @click="next">
           <i class="iconfont icon-right">&#xe7a5;</i>
         </div>
         <div class="icon-right">
           <i class="iconfont icon-slider" @click="showlist">&#xe640;</i>
         </div>
       </div>
     </div>
     </div>
   </transition>
   <transition name="mini">
      <div class="mini-player" v-show="!play && !showPersonFM" >
        <div class="mini-left" @click="open">
          <div class="l-image">
            <img :src="currentSong.img" width="100%" height="100%">
          </div>
          <div class="mini-song-message">
            <p class="message-n">{{currentSong.name}}</p>
            <p class="message-l">{{playinglyric}}</p>
          </div>
        </div>
        <div class="mini-right">
          <div class="mi-r-icon">
            <progress-circle :radius="radius" :percent="percent" >
              <i class="iconfont icon-mini mini-icon" v-html="getIconPlay" @click.stop="toggleplay"></i>
            </progress-circle>
            <i class="iconfont icon-playlist" @click="showlist">&#xe640;</i>
          </div>
        </div>
      </div>
   </transition>
   <play-list></play-list>
   <audio :src="currentSong.url || videoUrl " @play="ready" autoplay="autoplay" ref="audio" @ended="end" @timeupdate="updatetime"></audio>
 </div>
</template>

<style rel="stylesheet/stylus" lang="stylus" scoped>
 .play
   .normal-play
     position fixed
     top: 0
     bottom: 0
     left: 0
     right: 0
     z-index: 120
     background #fff
  .background
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    z-index: -1
    filter: blur(20px)
    background-position: 50%
    background-size: cover
    transform scale(1.5)
  .background::after
    content: ''
    position absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    z-index: -1
    background: rgba(0, 0, 0, .25)
   .image
     width:100%
     height:100%
  .play-top
    display flex
    justify-content space-around
    align-items center
    height:50px
    color:#fff
  .song-message
    padding-left:8px
    width: 80%
    display flex
    flex-flow column wrap
    justify-content space-around
    align-content center
    padding-bottom 2px
    border-bottom 1px solid rgba(200, 200, 200, 0.6)
   .icon
     font-size 25px
   .singer
     font-size 14px
     color:rgba(244,220, 255, 0.6)
 .middle
  position fixed
  top: 120px
  bottom:180px
  width:100%
  white-space nowrap
  border: 1 solid red
  .middle-l
   position relative
   vertical-align top
   display inline-block
   width: 100%
   height:0
   padding-top:80%
   .cd-wrapper
     position absolute
     left 10%
     top:0
     width:80%
     height 100%
     .cd
       width: 100%
       height: 100%
       box-sizing: border-box
       border-radius: 50%
       &.play
         animation: rotate 20s linear infinite
       &.pause
         animation-play-state: paused
      .image
        position absolute
        left 0
        top: 0
        width: 80%
        height:80%
        border-radius 50%
        border: 30px solid rgba(0, 0, 0, 0.8)
  .middle-r
     display: inline-block
     vertical-align: top
     width:100%
     height:100%
     overflow hidden
    .lyric-wrapper
       width: 80%
       margin:0 auto
       overflow hidden
       text-align center
     .no-lyric
       color: #fff
       margin:100px auto
     .text
       line-height 32px
       color:rgba(255,255,255, 0.3)
       &.height
          color:#fff
 .bottom
   position:absolute
   bottom:50px
   width:100%
   .icon-top
     height:40px
     width: 100%
     display flex
     justify-content space-around
     align-items center

   .progress-wrapper
     display: flex
     flex-flow row nowrap
     justify-content space-between
     align-items flex-start
     height:30px
     width:90%
     margin:0 auto
   .time
     flex: 0 0  40px
     font-size 13px
     color:#fff
   .progress-bar-wrapper
     width:75%
   .operatros
     display: flex
     justify-content space-around
     align-items center
     height: 50px
    .iconfont
      font-size 30px
      color:#fff
 .mini-player
   position fixed
   bottom:0
   left:0
   height:60px
   width:100%
   display: flex
   z-index: 180
   justify-content space-between
   align-items center
   background:#fff
  .mini-left
     width:70%
     display flex
     justify-content flex-start
     align-items center
   .l-image
     width: 50px
     height:50px
     padding-left:8px
    .mini-song-message
      padding-left:10px
      width:65%
      height:50px
    .message-l, .message-n
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
    .message-n
      padding-top:10px
    .message-l
      padding-top:5px
      font-size:12px
      color:#595959
    .mini-icon
      display: block
      position: absolute
      border-radius 50%
      top: 3px
      left: 5px
      z-index 100px
      font-size:32px
      background:#fff
  .mini-right
    width:25%
   .mi-r-icon
     display flex
     justify-content space-between
     align-items center
    .icon-playlist
      font-size:31px
  &.well-enter-active, &.well-leave-active
        transition: all 0.4s
      .play-top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.well-enter, &.well-leave-to
      opacity 0
      .play-top
        transform: translate3d(0 -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
 @keyframes rotate
   0%
     transform: rotate(0)
   100%
     transform: rotate(360deg)
</style>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import LyricJS from 'lyric-parser'
import Scroll from 'base/scroll/scroll'
import ProgressBar from 'base/progress-bar/progress-bar'
import animations from 'create-keyframe-animation'
import ProgressCircle from 'base/progress-cir/progress-cir'
import PlayList from 'base/play-list/play-list'
import axios from 'axios'
export default {
  props: {
    songs: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      songReady: false,
      showCd: true,
      currentLyric: null,
      currentlyricNum: 0,
      playinglyric: '',
      currenttime: 0,
      radius: 40,
      videoUrl: ''
    }
  },
  methods: {
    enter (el, done) {
      const {x, y, scale} = this.getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      console.log('11111');
      if (this.showCd === true) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this.getPosAndScale()
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      }
    },
    afterLeave () {
      console.log('11111')
      if (this.showCd === true) {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style.transform = ''
      }
    },
    getPosAndScale () {
      const targetWidth = 80
      const paddingleft = 40
      const paddingBottom = 30
      const paddingtop = 40
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingleft)
      const y = window.innerHeight - paddingtop - width / 2 - paddingBottom
      return {x, y, scale}
    },
    goTolyric () {
      this.showCd = false
    },
    goToCd () {
      this.showCd = true
    },
    ...mapMutations({
      showPlay: 'SET_PLAY',
      setPlay: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST',
      setShowPlayList: 'SET_SHOW_PLAY_LIST',
      setShade: 'SET_SHADE'
    }),
    back () {
      this.showPlay(false)
    },
    ready () {
      this.songReady = true
    },
    toggleplay () {
      if (!this.songReady) {
        return
      } else {
        this.setPlay(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      }
    },
    pre () {
      if (!this.songReady) {
        return
      } else if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.songReady) {
          this.toggleplay()
        }
        this.songReady = false
      }
    },
    next () {
      if (!this.songReady) {
        return
      } else if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length - 1) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.songReady) {
          this.toggleplay()
        }
        this.songReady = false
      }
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
        this.changeCurrentIndex(list)
      } else {
        list = this.sequenceList
      }
      this.setPlayList(list)
    },
    changeCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    getlyric () {
      if (!this.currentSong.url) {
        return
      }
      this.currentSong.getLyric().then((res) => {
        if (this.currentSong.lyric !== res) {
          return
        }
        this.currentLyric = new LyricJS(res, this.handlelyric)
        if (this.playing) {
          this.$refs.middler.refresh()
          this.currentLyric.play()
        }
      }).catch((e) => {
        this.currentLyric = null
        this.playinglyric = ''
        this.currentlyricNum = 0
      })
    },
    handlelyric ({lineNum, txt}) {
      this.currentlyricNum = lineNum
      if (lineNum > 5) {
        var lineEl = this.$refs.lyricline[lineNum - 5]
        this.$refs.middler.scrollToElement(lineEl, 400)
      } else {
        this.$refs.middler.scrollTo(0, 0, 400)
      }
      this.playinglyric = txt
    },
    updatetime (e) {
      this.currenttime = e.target.currentTime
    },
    _initTime (time) {
      time = time | 0
      const min = time / 60 | 0
      const second = this._pad(time % 60)
      return `${min}: ${second}`
    },
    _pad (time, n = 2) {
      let len = time.toString().length
      while (len < n) {
        time = '0' + time
        len++
      }
      return time
    },
    progressChange (percent) {
      const currTime = (this.currentSong.duration / 1000) * percent
      this.$refs.audio.currentTime = currTime
      if (!this.playing) {
        this.toggleplay()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currTime * 1000)
      }
    },
    open () {
      this.showPlay(true)
    },
    showlist () {
      this.setShowPlayList(true)
      this.setShade(true)
    },
    getUrls () {
      var data = {
        id: this.currentSong.id
      }
      return new Promise((resolve, reject) => {
        axios('music/url', {params: data}).then((res) => {
          this.videoUrl = res.data.data[0].url
          resolve(res.data.data[0].url)
        })
      })
    },
    goToComment () {
      this.$emit('comment', this.currentSong)
    }
  },
  computed: {
    ...mapGetters([
      'playing',
      'currentSong',
      'play',
      'currentIndex',
      'playList',
      'mode',
      'sequenceList',
      'showPersonFM'
    ]),
    cdS () {
      return this.playing ? 'play' : 'pause'
    },
    getIconPlay () {
      return this.playing ? `&#xe606;` : `&#xe662;`
    },
    iconMode () {
      return this.mode === playMode.sequence ? `&#xe60b;` : this.mode === playMode.loop ? `&#xe66c;` : this.mode === playMode.random ? `&#xe622;` : ''
    },
    percent () {
      return this.currenttime / (this.currentSong.duration / 1000)
    },
    getUrl () {
      return this.videoUrl
    },
    bgStyle () {
      return `background-image:url(${this.currentSong.img})`
    }
  },
  watch: {
    playing (newValue) {
      var audio = this.$refs.audio
      this.$nextTick(() => {
        newValue ? audio.play() : audio.pause()
      })
    },
    currentSong (newSong, oldSong) {
      if (!newSong.url) {
        this.getUrls()
      }
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentLyric = null
        this.playinglyric = ''
        this.currentlyricNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
        this.getlyric()
      }, 800)
    }
  },
  components: {
    Scroll,
    ProgressBar,
    ProgressCircle,
    PlayList
  }
}
</script>
