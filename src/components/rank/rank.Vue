<template>
  <div>
  <transition name="el-zoom-in-bottom">
 <div class="rank">
     <div class="rank-top">
       <i class="iconfont icon-back" @click="back">&#xe78c;</i>
       <span class="rank-top-t">排行榜</span>
     </div>
   <scroll class="list-wrapper" :data="artists &&  ranklist.allEarch">
     <div>
     <h1 class="title">官方榜</h1>
   <div class="official">
     <li class="official-item" v-for="item in ranklist.official" @click="goToDetail(item.id)">
       <div class="item-l">
         <img :src="item.coverImgUrl" class="image">
         <span class="message">{{item.updateFrequency
           }}</span>
       </div>
       <div class="item-r">
         <p class="item-r-list" v-for="(items, index) in item.tracks">{{index + 1}}. {{items.first}} - {{items.second}}</p>
       </div>
     </li>
     <div class="official-item" @click="showArtists">
      <div class="item-l">
       <img src="singerRank.png" class="image">
      </div>
      <div class="item-r">
       <p class="item-r-list" v-for="(items, index) in artistsRank.tracks">{{index + 1}}. {{items.first}} - {{items.second}}</p>
      </div>
     </div>
   </div>
   <h1 class="title">全球榜</h1>
   <div class="allEarth">
     <li class="allEarth-item" v-for="item in ranklist.allEarch" @click="goToDetail(item.id)">
       <div class="item-top">
         <img :src="item.coverImgUrl" class="image">
         <span class="message">{{item.updateFrequency
           }}</span>
       </div>
       <div class="item-b">
         <p class="description">{{item.name}}</p>
       </div>
     </li>
   </div>
     </div>
    </scroll>
 </div>
</transition>
    <singer-list :artists="artists" ref="artists"  @goToArtists="goToArtists"></singer-list>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.rank
  position: fixed
  top:0
  right:0
  left: 0
  bottom:0
  background:#fff
  z-index:100
 .rank-top
   height:50px
   background:#ee0000
   font-size:20px
   line-height 50px
   color:#fff
  .list-wrapper
    position fixed
    top:50px
    overflow hidden
    left:0
    right:0
    bottom:0
  .icon-back
    margin-left:12px
  .rank-top-t
    margin-top:15px
 .title
   margin:15px 5px
   font-weight 900
   font-size:22px
 .official
   display: flex
   flex-flow column wrap
  .official-item
    height:130px
    flex 1
    display: flex
    justify-content space-around
    padding-bottom:5px
   .item-l
     width:35%
     height:130px
     position: relative
    .image
      width: 100%
      height: 100%
      border-radius 10px
    .message
      position: absolute
      left:5px
      bottom:3px
      color:#fff
      font-size:12px
   .item-r
     width:63%
     height:130px
     border-bottom 1px solid #ddd
    .item-r-list
      margin:20px 10px
      font-size:14px
      color:#595959
  .allEarth
    display: flex
    flex-flow row wrap
   .allEarth-item
     width: 31%
     height:150px
     padding:0 3px 20px 4px
    .item-top
      width: 100%
      height:120px
      position: relative
    .description
      font-size:12px
      margin-top:5px
      text-align center
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import axios from 'axios'
import {mapMutations} from 'vuex'
import SingerList from 'components/top-singer/top-singer'
export default {
  data () {
    return {
      artists: [],
      ranklist: {},
      artistsRank: {}
    }
  },
  created () {
    this.setLoading(true)
    this.initRankList()
    this.initSingerRank()
  },
  methods: {
    initRankList () {
      return new Promise((resolve, reject) => {
        axios('toplist/detail').then((res) => {
          var list = []
          if (res.data.code === 200) {
            list = this._initImage(res.data.list)
            this.ranklist = this.classify(list)
            this.setLoading(false)
            resolve(this.ranklist)
          } else {
            reject('error')
          }
        })
      })
    },
    initSingerRank () {
      return new Promise((resolve, reject) => {
        axios('toplist/artist').then((res) => {
          if (res.data.code === 200) {
            this.artists = this._initImage(res.data.list.artists)
            var singer = {}
            var ret = []
            res.data.list.artists.slice(0, 3).forEach((res) => {
              singer = {
                first: res.name,
                second: res.score
              }
              ret.push(singer)
            })
            this.artistsRank = {
              coverImgUrl: './singerRank.png',
              tracks: ret
            }
          } else {
            reject ('error')
          }
        })
      })
    },
    _initImage (list) {
      list.forEach((res) => {
        if (res.coverImgUrl) {
          res.coverImgUrl = `${res.coverImgUrl}?param=130y130`
        } else {
          var artistsImg = res.picUrl
          res.picUrl = `${res.picUrl}?param=130y130`
          res.artistsPic = artistsImg
        }
      })
      return list
    },
    classify (list) {
      var map = {
        official: [],
        allEarch: []
      }
      list.forEach((res) => {
        if (res.ToplistType) {
          map.official.push(res)
        } else {
          map.allEarch.push(res)
        }
      })
      return map
    },
    goToDetail (id) {
      this.$router.push({
        path: `/music/find/rank/list/${id}`
      })
    },
    ...mapMutations({
      setLoading: 'SET_PLAY_LOADING',
      setArtists: 'SET_ARTISTS_DETAIL'
    }),
    showArtists () {
      this.$refs.artists.show()
    },
    goToArtists (item, id) {
      this.setArtists(item)
      this.$router.push({
        path: '/music/find/rank/artists'
      })
    },
    back () {
      this.$router.back()
    }
  },
  components: {
    Scroll,
    SingerList
  }
}
</script>
