<template>
 <transition name="el-zoom-in-bottom">
   <div class="sheet">
     <div class="sheet-top">
       <div class="avatar">
         <img :src="sheetlist.coverImgUrl" width="100%" height="100%">
       </div>
       <div class="icon " @click.stop="back">
         <i class="icon-back iconfont">&#xe78c;</i>
       </div>
     </div>
     <scroll class="list" :data="sheetlist.tracks">
       <div class="list-wrapper">
         <div class="sheet-middle">
           <div class="image">
             <img :src= 'sheetlist.coverImgUrl'>
           </div>
         </div>
         <div class="sheet-bottom">
           <div class="list-item">
             <i class="iconfont icon-comment">&#xe78d;</i>
             <span>{{sheetlist.commentCount}}</span>
           </div>
           <div class="list-item">
             <i class="iconfont icon-subscribed">&#xe603;</i>
             <span>{{sheetlist.subscribedCount
               }}</span>
           </div>
           <div class="list-item">
             <i class="iconfont icon-share">&#xe624;</i>
             <span>{{sheetlist.shareCount}}</span>
           </div>
         </div>
         <sheet-list :songs="sheetlist.tracks" v-if="sheetlist"></sheet-list>
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
    z-index:100
    background $color-background
    color:#fff
    .avatar
      position absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter:blur(20px) brightness(60%)
  .sheet-top
    display: flex
    flex-flow row
    justify-content flex-start
    align-items center
    padding:8px
    height: 40px
  .icon-back
    font-size:20px
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
    padding-bottom:50px
  .image
    width:150px
    height:150x
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
import axios from 'axios'
import SheetList from 'base/sheet-list/sheet-list'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      sheetlist: {}
    }
  },
  created () {
    this.setLoading(true)
  },
  mounted () {
    this._initSheetList()
  },
  methods: {
    _initSheetList () {
      var data = {
        idx: this.$route.params.id
      }
      return new Promise((resolve, reject) => {
        axios('top/list', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.sheetlist = this.initImage(res.data.playlist)
            resolve(this.sheetlist)
            this.setLoading(false)
          } else {
            reject('error')
          }
        })
      })
    },
    initImage (list) {
      list.coverImgUrl = `${list.coverImgUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`
      return list
    },
    back () {
      this.$router.back()
    },
    ...mapMutations({
      setLoading: 'SET_PLAY_LOADING'
    })
  },
  components: {
    SheetList,
    Scroll
  }
}
</script>
