<template>
  <transition name="el-fade-in-linear">
    <div class="artists-detail">
     <div class="top">
       <div class="image">
         <img :src="artists.artistsPic || artists.picUrl" width="100%" height="100%">
       </div>
      <div class="detail-t">
        <i class="iconfont icon-back" @click="back">&#xe78c;</i>
        <span v-html="artists.name" class="artists-name"></span>
      </div>
       <div class="detail-b">
         <i class="iconfont"></i>
         <span>个人主页</span>
       </div>
     </div>
     <div class="artists-select">
       <span class="select-list" v-for="(item, index) in viewlist" @click="goSelect(index)" :class="{'select': index === artistPageIndex }">{{item.china}}</span>
     </div>
       <swiper ref="myswiper" @slideChangeTransitionEnd="sliderChange" :options="swiperOption" class="swiper">
         <swiper-slide v-for="item in viewlist" class="swiper-slide">
           <keep-alive>
           <component :is="item.name" :id="artists.id" @showDesc="artistDesc" @simiArtist="goToArtist" @toAlbum="goToAlbum"></component>
           </keep-alive>
         </swiper-slide>
       </swiper>
    <introduction :desc="desc" :introduction="introduce" ref="introd"></introduction>
    </div>
  </transition>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
.artists-detail
  position: fixed
  top:0
  left:0
  bottom:0
  right:0
  background:#fff
  z-index:120
 .top
   position: relative
 .image
   width 100%
   height:320px
  .detail-t
    position absolute
    top:10px
    left:10px
    height:40px
    line-height 40px
    color:#fff
    font-size:20px
   .artists-name, .icon-back
     margin-left:10px
  .detail-b
    position absolute
    bottom:10px
    left:45%
    color:#fff
 .detail
   width 100%
   border:1px solid red
   border-radius 15px
   position fixed
   top: 350px
   left: 0px
   overflow hidden
   bottom:0
  .artists-select
    display: flex
    height:45px
    justify-content space-around
    align-items center
    border-radius 10px
    background:#f7f7f7
   .select-list
     width: 18%
     height:40px
     text-align center
     line-height 40px
   &.select
     color: #ee000e
     font-weight 800
     border-bottom 2px solid #ee0000
  .list-wrapper
    position fixed
    top:0
    right: 0
    left:0
    bottom:0
    background:#f7f7f7
  .swiper
    height:430px
</style>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import artistsAlbum from 'base/artists-album/artists-album'
import artistsHotSong from 'base/artists-hot-songs/artists-hot'
import artistsMessage from 'base/artists-message/artists-message'
import artistsMv from 'base/artists-mv/artists-mv'
import 'swiper/dist/css/swiper.css'
import Scroll from 'base/scroll/scroll'
import introduction from 'base/introduction/introduction'
export default {
  data () {
    return {
      viewName: 'hot',
      swiperOption: {
        initialSlide: 0,
        autoHeight: true
      },
      viewlist: [
        {
          name: 'hot',
          china: '热门',
          index: 0
        },
        {
          name: 'album',
          china: '专辑',
          index: 1
        },
        {
          name: 'mv',
          china: '视频',
          index: 2
        },
        {
          name: 'message',
          china: '歌手信息',
          index: 3
        }
      ],
      viewIndex: 0,
      desc: null,
      introduce: null
    }
  },
  mounted () {
    this.setPageIndex(0)
  },
  methods: {
    ...mapMutations({
      setPageIndex: 'SET_ARTIST_PAGE_INDEX',
      setArtist: 'SET_ARTISTS_DETAIL'
    }),
    goSelect (index) {
      this.viewIndex = index
    },
    sliderChange () {
      this.setPageIndex(this.swiper.activeIndex)
    },
    back () {
      this.$router.back()
    },
    artistDesc (introduce, desc) {
      this.desc = desc
      this.introduce = introduce
      this.$refs.introd.show()
    },
    goToArtist (item, id) {
      this.setArtist(item)
      this.setPageIndex(0)
    },
    goToAlbum (id) {
      this.$router.push({path: `/music/find/rank/album/${id}`})
    }
  },
  computed: {
    ...mapGetters([
      'artists',
      'artistPageIndex'
    ]),
    swiper () {
      return this.$refs.myswiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide,
    album: artistsAlbum,
    hot: artistsHotSong,
    message: artistsMessage,
    mv: artistsMv,
    Scroll,
    introduction
  },
  watch: {
    viewIndex (newval, oldval) {
      if (newval !== oldval) {
        this.swiper.slideTo(newval, 300, false)
        this.setPageIndex(newval)
      }
    },
    artists () {
      this.swiper.slideTo(0, 300, false)
    }
  }
}
</script>
