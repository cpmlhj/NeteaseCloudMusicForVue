<template>
  <div class="play" v-show="playList.length > 0 && !play">
    <transition name="well">
      <div class="normal-play" v-if="showPersonFM">
        <div class="background">
          <img  :src="currentSong.img" width="100%" height="100%">
        </div>
        <div class="play-top">
          <div class="icon" @click.stop="back">
            <i class="iconfont icon-back">&#xe78c;</i>
          </div>
          <div class="song-message">
            <div class="scrollMessage">
              <i class="iconfont icon-fm">&#xe76a;</i>
            </div>
            <div>
              <span class="singer">私人FM</span>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middlel" v-show="showCd">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" @click.stop="goTolyric">
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
            <P class="icon-t-n">{{currentSong.name}}</P>
            <p class="icon-t-s">{{currentSong.singer}}</p>
          </div>
          <div class="progress-wrapper">
            <span class="time-l time">{{_initTime(currenttime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar @percentChange="progressChange" :percent="percent"></progress-bar>
            </div>
            <span class="time-r time">{{_initTime(currentSong.duration / 1000)}}</span>
          </div>
          <div class="operatros">
            <div class="icon-left" @click="deleteSong">
              <i class="iconfont icon-delete">&#xe62e;</i>
            </div>
            <div class="icon-left-l">
              <i class="iconfont icon-love">&#xe63b;</i>
            </div>
            <div class="icon-middle" @click="toggleplay">
              <i class="iconfont icon-play" v-html="getIconPlay"></i>
            </div>
            <div class="icon-right-r" @click="next">
              <i class="iconfont iconf-right">&#xe7a5;</i>
            </div>
            <div class="icon-right">
              <i class="iconfont icon-slider" @click="showComment">&#xe603;</i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!showPersonFM" >
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
          </div>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" @play="ready" autoplay="autoplay" ref="audio" @ended="end" @timeupdate="updatetime"></audio>
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
      z-index: 200
      background #fff
  .background
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    opacity: 0.7
    filter: blur(30px) brightness(20%)
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
    padding: 8px auto
    width: 80%
    display flex
    flex-flow column wrap
    align-content center
    padding-bottom 2px
    color:#fff
    font-size:24px
   .icon
     font-size:22px
   .singer
     font-size:12px
  .middle
    position fixed
    top: 120px
    bottom:220px
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
        width:100%
        height 100%
        .cd
          width: 100%
          height: 100%
          box-sizing: border-box
        .image
          position absolute
          left 0
          top: 0
          width: 80%
          height:100%
          border-radius 15px
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
      width: 80%
      height:60px
      margin: 10px auto
     .icon-t-n, .icon-t-s
       height:20px
       width: 70%
       text-align center
       margin:10px auto
       font-size:22px
       color:#fff
    .icon-t-s
      font-size:12px
      color:#ccc
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
  &.well-enter-active, .well-leave-active
    transition: all 0.4s
    .play-top, .bottom
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.well-enter, &.well-leave-to
    opacity 0
  .play-top
    transform: translate3d(0 -100px, 0)
  .bottom
    transform: translatd3d(0, 100px, 0)
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
import LyricJS from 'lyric-parser'
import Scroll from 'base/scroll/scroll'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-cir/progress-cir'
import {getPersonFm} from 'common/js/API'
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
      radius: 40
    }
  },
  methods: {
    goTolyric () {
      this.showCd = false
    },
    goToCd () {
      this.showCd = true
    },
    ...mapMutations({
      setPersonFM: 'SET_SHOW_PERSON_FM',
      setPlay: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayList: 'SET_PLAY_LIST'
    }),
    back () {
      this.setPersonFM(false)
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
    next () {
      if (!this.songReady) {
        return
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
    changeCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    end () {
      this.next()
    },
    getlyric () {
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
      this.setPersonFM(true)
    },
    showComment () {},
    deleteSong () {}
  },
  computed: {
    ...mapGetters([
      'playing',
      'currentSong',
      'showPersonFM',
      'currentIndex',
      'playList',
      'sequenceList',
      'play'
    ]),
    getIconPlay () {
      return this.playing ? `&#xe606;` : `&#xe662;`
    },
    percent () {
      return this.currenttime / (this.currentSong.duration / 1000)
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
    },
    currentIndex () {
      console.log(console.log(this.currentIndex))
      if (this.currentIndex === 2) {
        getPersonFm().then((res) => {
          console.log(res)
        })
      }
    }
  },
  components: {
    Scroll,
    ProgressBar,
    ProgressCircle
  }
}
</script>
