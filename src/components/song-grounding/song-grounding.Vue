<template>
  <div>
 <transition name="grounding">
   <div class="song-grounding">
     <div class="top">
       <i class="iconfont icon-back" @click="back">&#xe78c;</i>
       <span class="top-title">新碟上架</span>
     </div>
     <scroll class="list-wrapper" :data="grounding">
       <div>
     <h1 class="title">全部新碟</h1>
     <div class="ground-list">
       <li class="item" v-for="item in grounding" @click="goToSheet(item.id)">
         <div class="grounding-image">
         <img :src="item.picUrl" >
         <div class="background"></div>
       </div>
         <p class="item-t">{{item.name}}</p>
         <p class="item-b">{{item.artist.name}}</p>
       </li>
     </div>
       </div>
     </scroll>
   </div>
 </transition>
    <router-view></router-view>
  </div>
</template>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.song-grounding
  position: fixed
  top:0
  bottom: 0
  left: 0
  right: 0
  background:#fff
 .top
   height:50px
   width:100%
   background:#ee0000
   font-size: 18px
   line-height:50px
   color:#fff
  .icon-back, .top-title
    margin-left:10px
 .title
   padding:30px 0 10px 0
   font-size:22px
 .list-wrapper
   position fixed
   bottom: 0
   left:0
   right:0
   top: 50px
   overflow: hidden
 .ground-list
   display flex
   flex-flow row wrap
   justify-content space-around
   padding-top:20px
   border-top:3px solid #ee0000
  .item
    width: 47%
    margin-top:10px
 .grounding-image
   width: 70%
   height:130px
   position relative
   margin: 8px auto
 .background
   width: 122%
   height:130px
   position absolute
   top: 0px
   left: 0
   right:0
   background: url("http://s2.music.126.net/style/web2/img/coverall.png?ed0c26f721bd64ee2b035be4fac8e70c")
   background-position 0 -845px
  img
    width: 100%
    height:100%
   .item-t, .item-b
     overflow: hidden
     text-overflow ellipsis
     white-space nowrap
     margin-left: 25px
   .item-b
     font-size:12px
     color:#595959
&.grounding-enter-active, &.grounding-leave-active
   transition  all 0.4s
&.grounding-enter, &.grounding-leave-to
   transform translate3d(0, -100%, 0)
   opacity 0
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import Album from 'base/album/album'
export default {
  data () {
    return {
      grounding: [],
      album: null
    }
  },
  name: 'groundingSong',
  mounted () {
    this._initGrounding()
  },
  methods: {
    _initGrounding () {
      return new Promise((resolve, reject) => {
        axios('top/album').then((res) => {
          if (res.data.code === 200) {
            this.grounding = this.initImage(res.data.albums)
            resolve(this.grounding)
          } else {
            reject('error')
          }
        })
      })
    },
    initImage (list) {
      list.forEach((res) => {
        res.picUrl = `${res.picUrl}?param=130y130`
      })
      return list
    },
    back () {
      this.$router.back()
    },
    goToSheet (id) {
      this.$router.push({path: `/music/find/songgrounding/album/${id}`})
    }
  },
  components: {
    Scroll,
    Album
  }
}
</script>
