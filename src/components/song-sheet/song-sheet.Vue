<template>
 <transition name="el-zoom-in-bottom">
   <div class="sheet">
     <div class="avatar" :style="backgrounds">
     </div>
   <div class="sheet-top">
     <div class="icon " @click.stop="back">
       <i class="icon-back iconfont">&#xe78c;</i>
     </div>
     <div class="name">
       <span>歌单</span>
       <span class="description">编辑推荐:{{sheet.description}}</span>
     </div>
   </div>
     <scroll class="list" @data="sheet" ref="scroll">
       <div class="list-wrapper">
   <div class="sheet-middle">
     <div class="image">
       <img :src= 'sheet.coverImgUrl'>
       <div class="i-icon">
         <i class="iconfont icon-listen">&#xe6bf;</i>
         <span>{{sheet.playCount | newLine}}</span>
       </div>
     </div>
     <div class="sheet-message">
       <span>{{sheet.name}}</span>
       <div class="sheet-owner">
         <img :src="creator.avatarUrl">
         <span style="padding-left:10px">{{creator.nickname}}</span>
         <i class="iconfont icon-right" style="padding-left:10px">&#xe634;</i>
       </div>
     </div>
   </div>
     <div class="sheet-bottom">
     <div class="list-item">
       <i class="iconfont icon-comment">&#xe78d;</i>
       <span>{{sheet.subscribedCount}}</span>
     </div>
     <div class="list-item">
       <i class="iconfont icon-subscribed">&#xe603;</i>
       <span>{{sheet.commentCount}}</span>
     </div>
     <div class="list-item">
       <i class="iconfont icon-share">&#xe624;</i>
       <span>{{sheet.shareCount}}</span>
     </div>
   </div>
     <sheet-list :songs="sheet.tracks"></sheet-list>
       </div>
     </scroll>
   </div>
 </transition>
</template>

<style rel="stylesheet/stylus" scoped lang="stylus">
@import "~common/stylus/variable"
 .sheet
   position:fixed
   bottom: 0
   top: 0
   left: 0
   right: 0
   z-index:100
   background $color-background
   color:#fff
   .avatar
     position absolute
     left: 0
     top: 0
     bottom: 0
     right: 0
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
import {mapMutations, mapGetters} from 'vuex'
export default {
  data () {
    return {
      sheet: {},
      sheetId: 0,
      creator: {}
    }
  },
  name: 'SongSheet',
  created () {
    this._getSongSheet()
  },
  activated () {
    this._getSongSheet()
  },
  methods: {
    _getSongSheet () {
      this.setLoading(true)
      var data = {
        id: this.$route.params.id
      }
      this.sheetId = this.$route.params.id
      axios('playlist/detail', {
        params: data
      }).then((res) => {
        if (res.data.code === 200) {
          this.sheet = res.data.result
          this.creator = res.data.result.creator
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 300)
          this.setLoading(false)
        } else {
          this.setLoading(false)
        }
      })
    },
    back () {
      this.$router.back()
    },
    ...mapMutations({
      setLoading: 'SET_PLAY_LOADING'
    })
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    backgrounds () {
      return `background-image:url(${this.sheet.coverImgUrl})`
    }
  },
  components: {
    SheetList,
    Scroll
  },
  watch: {}
}
</script>
