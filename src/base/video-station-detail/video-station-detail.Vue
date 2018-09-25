<template>
<transition name="el-fade-in-linear">
 <div class="station-detail">
   <div class="top">
     <div class="title">
       <i class="iconfont icon-back" @click="back">&#xe78c;</i>
       <span style="margin-left: 15px">电台</span>
     </div>
     <div class="description" :style="bgStyle" ref="backgroundImage">
       <div class="desc" ref="desc">
         <p class="desc-t">{{stationsDetail.name}}</p>
         <p class="desc-b">{{stationsDetail.programCount}} 人已订阅</p>
       </div>
       <div class="filter"></div>
     </div>
   </div>
   <div class="bg-layer" ref="layer"></div>
  <scroll class="list-wrapper" @scroll="scroll" ref="wrapper" :probe-type="probeType" :listen-scroll="listenScroll">
    <div class="goodwrapper">
   <div class="select">
     <div class="s-trod">
       <span class="inp" @click="goToPage(0)" :class="{'highline': currentPage === 0}">详情</span>
     </div>
     <div class="s-list"><span class="inp"  @click="goToPage(1)" :class="{'highline': currentPage === 1}">节目</span></div>
   </div>
   <swiper ref="mySwiper" :options="swiperOption" class="swiper" @slideChangeTransitionEnd="sliderChange">
     <swiper-slide>
       <station-introd :id="stationsDetail.id"></station-introd>
     </swiper-slide>
     <swiper-slide>
       <station-list :id="stationsDetail.id" @goToPlay="goPlay"></station-list>
     </swiper-slide>
   </swiper>
    </div>
  </scroll>
 </div>
</transition>
</template>

<style scoped lang="stylus" rel="stylesheet/styuls">
.station-detail
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: #fff
  z-index:100
 .title
   position absolute
   top: 10px
   left: 10px
   height: 30px
   color:#fff
   z-index: 12
   font-size: 20px
   line-height 30px
 .description
   position: relative
   height: 0
   padding-top: 90%
   transform-origin: top
   background-size: cover
   width: 100%
  .bg-layer
    position: relative
    height: 105%
    background: #f7f7f7
    border-radius 10px
    overflow hidden
 .list-wrapper
    position fixed
    top: 360px !important
    bottom: 0
    width: 100%
    background:#f7f7f7
    border-radius 15px
 .filter
   position: absolute
   top: 0
   left: 0
   width: 100%
   height: 100%
   background: rgba(7, 17, 27, 0.4)
.desc
   position absolute
   bottom: 30px
   left: 10px
   color:#fff
   z-index: 10
  .desc-b
    font-size: 12px
    color:#f7f7f7
    margin-top 5px
 .select
   height: 40px
   display: flex
   z-index: 12
   position relative
  .s-trod, .s-list
    width: 50%
    height:40px
    line-height 40px
    text-align center
  .inp
     width: 40px
     height:30px
     font-size: 17px
 .highline
    font-weight 600
    color:#ee0000
    border-bottom 2px solid #ee0000
</style>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import Scroll from 'base/scroll/scroll'
import stationIntrod from 'base/station-introd/station-introd'
import stationList from 'base/video-station-list/video-station-list'
export default {
  data () {
    return {
      scrolly: 0,
      swiperOption: {
        autoHeight: true
      },
      currentPage: 0
    }
  },
  mounted () {
    this.imageHeight = this.$refs.backgroundImage.clientHeight
    this.minTranslateY = -this.imageHeight
    this.$refs.wrapper.$el.style.top = `${this.$refs.backgroundImage.clientHeight}px`
    console.log(this.swiper)
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    ...mapActions([
      'setPlayList'
    ]),
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrolly = pos.y
    },
    sliderChange () {
      console.log('11111')
      setTimeout(() => {
        this.$refs.wrapper.refresh()
      }, 200)
      if (this.swiper.activeIndex === 0) {
        console.log('11111')
        this.$refs.wrapper.scrollTo(0, 0, 300)
        this.$refs.layer.style.transform = `translate3d(0,0,0)`
      }
      this.currentPage = this.swiper.activeIndex
    },
    goToPage (num) {
      setTimeout(() => {
        this.$refs.wrapper.refresh()
      }, 300)
      if (num === 0) {
        this.$refs.wrapper.scrollTo(0, 0, 300)
        this.swiper.slideTo(num, 300, false)
        this.$refs.layer.style.transform = `translate3d(0,0,0)`
      }
      this.swiper.slideTo(num, 300, false)
      this.currentPage = num
    },
    goPlay (list, index) {
      var videoList = []
      list.forEach((res) => {
        var listItem = {}
        listItem.id = res.mainSong.id
        listItem.singer = res.dj.nickname
        listItem.name = res.name
        listItem.duration = res.duration
        listItem.img = res.coverUrl
        videoList.push(listItem)
      })
      this.setPlayList({
        list: videoList,
        index: index
      })
    }
  },
  computed: {
    ...mapGetters([
      'stationsDetail'
    ]),
    bgStyle () {
      return this.stationsDetail.coverImg ? `background-image: url(${this.stationsDetail.coverImg})` : `background-image: url(${this.stationsDetail.picUrl})`
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide,
    Scroll,
    stationIntrod,
    stationList
  },
  watch: {
    scrolly (newy) {
      let zIndex = 0
      let scale = 1
      const percent = Math.abs(newy / this.imageHeight)
      let translateY = Math.max(this.minTranslateY, newy)
      this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
      if (newy > 0) {
        scale = 1 + percent
      }
      if (newy < this.minTranslateY + 40) {
        zIndex = 10
        this.$refs.backgroundImage.style.paddingTop = 0
        this.$refs.backgroundImage.style.height = '50px'
        this.$refs.desc.style.display = 'none'
      } else {
        this.$refs.backgroundImage.style.paddingTop = '90%'
        this.$refs.backgroundImage.style.height = 0
        this.$refs.desc.style.display = ''
      }
      this.$refs.backgroundImage.style.zIndex = zIndex
      this.$refs.backgroundImage.style.transform = `scale${scale}`
    }
  }
}
</script>
