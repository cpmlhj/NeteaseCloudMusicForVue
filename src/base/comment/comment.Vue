<template>
 <transition name="el-zoom-in-bottom">
   <div class="comment">
     <div class="common-t">
       <i class="iconfont icon-back" @click="back">&#xe78c;</i>
       <span class="common-com">评论 ({{total}})</span>
     </div>
    <scroll class="list-wrapper" ref="listWrapper">
      <div class="wrapper">
     <div class="common-obj">
       <div class="image">
         <img :src="song.img" width="100%" height="100%" style="border-radius: 6px">
       </div>
       <div class="obj-detail">
         <p class="detail-name">{{song.name}}</p>
         <p class="detail-artist">{{song.singer}}</p>
       </div>
       <i class="iconfont icon-go" style="font-size: 20px">&#xe634;</i>
     </div>
     <h1 class="title">精彩评论</h1>
     <div class="common-list">
       <li class="list-item" v-for="item in comments">
         <div class="item-l">
           <img :src="item.customerImg" width="100%" height="100%" style="border-radius: 50%">
         </div>
         <div class="item-r">
           <div class="item-r-t">
             <div class="item-r-t-l">
               <p class="t-l">{{item.user.nickname}}</p>
               <p v-html="initTime(item.time)" class="t-l-t"></p>
             </div>
             <div class="item-r-t-r">
               <span>{{item.likedCount}}</span>
               <i class="iconfont icon-zan">&#xe661;</i>
             </div>
           </div>
           <div class="item-r-b">
             <p v-html="item.content" class="r-b-t"></p>
           </div>
         </div>
       </li>
     </div>
      </div>
    </scroll>
   </div>
 </transition>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .comment
   position fixed
   top: 0
   bottom: 0
   left: 0
   right: 0
   z-index: 130
   background:#f7f7f7
  .common-t
    height:50px
    line-height 50px
    width 100%
    background #ee0000
    color:#fff
   .icon-back, .common-com
     font-size: 20px
     margin-left 10px
  .list-wrapper
    width 100%
    height 100%
    overflow hidden
   .wrapper
     padding:10px 10px
    .common-obj
      height:80px
      display: flex
      justify-content space-around
      align-items center
     .image
       width:20%
       height: 80px
     .obj-detail
       width: 70%
       height:80px
      .detail-name, .detail-artist
        margin-top: 10px
      .detail-name
        font-size: 20px
      .detail-artist
        font-size: 13px
        color:#5CACEE
     .title
       height: 35px
       line-height 35px
       background:#F0F0F0
       margin-top:20px
  .common-list
     margin-top: 20px
   .list-item
     width 100%
     display flex
     justify-content space-around
     align-items flex-start
   .item-l
     width:10%
     height: 40px
   .item-r
     width: 87%
     min-height:100px
    .item-r-t
       width 100%
       height: 40px
       display flex
       justify-content space-between
       align-items center
     .t-l, .t-l-t
       font-size:13px
       color:#595959
       margin-top: 4px
    .item-r-t-r
       font-size: 13px
       color:#595959
    .r-b-t
      line-height 140%
      padding: 10px 0 10px 0
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      comments: [],
      song: {},
      total: 0
    }
  },
  created () {
    this.initComment()
  },
  methods: {
    initComment () {
      this.song = this.$route.params.song
      var data = {
        id: this.song.id
      }
      axios('comment/music', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.comments = this.initImage(res.data)
          this.total = res.data.total
        }
      })
    },
    back () {
      this.$router.back()
    },
    initImage (data) {
      var hots = []
      var comment = []
      data.hotComments.forEach((res) => {
        res.customerImg = `${res.user.avatarUrl}?param=130y130`
        hots.push(res)
      })
      data.comments.forEach((res) => {
        res.customerImg = `${res.user.avatarUrl}?param=130y130`
        comment.push(res)
      })
      return hots.concat(comment)
    },
    initTime (time) {
      var date = new Date(time)
      return `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`
    }
  },
  activated () {
    this.initComment()
  },
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  watch: {
    comments () {
      this.refs.listWrapper.refresh()
    }
  }
}
</script>
