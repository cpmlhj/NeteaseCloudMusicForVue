<template>
  <transition name="el-zoom-in-bottom">
    <div class="sheet">
      <div class="avatar" :style="bgStyle">
      </div>
      <div class="sheet-top">
        <div class="icon " @click.stop="back">
          <i class="icon-back iconfont">&#xe78c;</i>
        </div>
        <div class="name">
          <span>专辑</span>
        </div>
      </div>
      <scroll class="list">
        <div class="list-wrapper">
          <div class="sheet-middle">
            <div class="image">
              <img :src= 'initImage'>
            </div>
            <div class="sheet-message">
              <span>{{albumDetail.name}}</span>
              <div class="sheet-owner">
                <span style="padding-left:4px">歌手：</span>
                <span>{{albumDetail.artist.name}}</span>
                <i class="iconfont icon-right" style="padding-left:2px">&#xe634;</i>
              </div>
              <p v-html="changeTime"></p>
            </div>
          </div>
          <div class="sheet-bottom">
            <div class="list-item">
              <i class="iconfont icon-comment">&#xe78d;</i>
              <span>{{albumDetail.info.likedCount}}</span>
            </div>
            <div class="list-item">
              <i class="iconfont icon-subscribed">&#xe603;</i>
              <span>{{albumDetail.info.commentCount}}</span>
            </div>
            <div class="list-item">
              <i class="iconfont icon-share">&#xe624;</i>
              <span>{{albumDetail.info.shareCount}}</span>
            </div>
          </div>
          <sheet-list :songs="songs"></sheet-list>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .sheet
    position:fixed
    bottom: 0
    top: 0
    left: 0
    right: 0
    z-index:120
    background $color-background
    color:#fff
    .avatar
      position absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(20px)
      background-position: 50%
      background-size: cover
      transform scale(1.5)
    .avatar::after
      content: ''
      position absolute
      left: 0
      top: 0
      bottom: 0
      right: 0
      z-index: -1
      background: rgba(0, 0, 0, .25)
  .sheet-top
    display: flex
    flex-flow row
    justify-content flex-start
    align-items center
    padding:8px
    height: 40px
  .icon-back
    font-size:20px
  .name
    display flex
    width: 75%
    flex-flow column wrap
    justify-content center
    align-content flex-start
    padding-left 10px
  .description
    font-size:10px
    opacity 0.8
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .list
    position: fixed
    top: 60px
    bottom: 0
    width: 100%
    overflow hidden
  .sheet-middle
    width: 100%
    display flex
    flex-flow row nowrap
    justify-content flex-start
    align-items flex-start
  .image
    width:120px
    height:120x
    padding-left:15px
    position relative
    color:#eee
    font-size:12px
  img
    width:100%
    height:100%
  .i-icon
    position:absolute
    top:5px
    right:5px
  .sheet-message
    width:50%
    padding:15px
  .sheet-owner
    display: flex
    flex-flow row nowrap
    justify-content flex-start
    padding:20px 10px 10px 0
    align-items center
    img
      width: 30px
      height:30px
      border-radius 50%
  .sheet-bottom
    display flex
    flex-flow row nowrap
    justify-content space-around
    align-items center
    height: 60px
    border:1 solid red
  .list-item
    display: flex
    width: 60px
    height:50px
    flex-flow column wrap
    justify-content space-around
    align-items center
    font-size: 14px
  .iconfont
    font-size:25px
</style>

<script type="text/ecmascript-6">
import SheetList from 'base/sheet-list/sheet-list'
import Scroll from 'base/scroll/scroll'
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      albumDetail: {},
      songs: []
    }
  },
  created () {
    this.setLoading(true)
    this._initAlbum()
  },
  activated () {
    if (this.songs.length === 0) {
      return
    }
    this._initAlbum()
  },
  methods: {
    _initAlbum () {
      if (!this.$route.params.id) {
        return
      }
      var data = {id: this.$route.params.id}
      return new Promise((resolve, reject) => {
        axios('album', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.albumDetail = res.data.album
            this.songs = this._initSong(res.data.songs)
            resolve(this.albumDetail)
            this.setLoading(false)
          } else {
            reject('error')
          }
        })
      })
    },
    _initSong (list) {
      list.forEach((res) => {
        res.al.picUrl = this.albumDetail.picUrl
      })
      return list
    },
    ...mapMutations({
      setLoading: 'SET_PLAY_LOADING'
    }),
    back () {
      this.$router.back()
    }
  },
  computed: {
    changeTime () {
      var date = new Date(this.albumDetail.publishTime)
      return `发行时间：${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`
    },
    initImage () {
      return `${this.albumDetail.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`
    },
    bgStyle () {
      return `background-image: url(${this.albumDetail.picUrl})`
    }
  },
  components: {
    SheetList,
    Scroll
  },
  watch: {
  }
}
</script>
