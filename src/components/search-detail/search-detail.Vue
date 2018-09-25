<template>
 <transition name="el-fade-in-linear">
   <div>
   <div class="search-detail">
     <div class="search-box">
       <search-box @searchQuery="queryFn" :searchQ="currentSearch" @back="back"></search-box>
     </div>
     <div class="search-detail-list">
     <swiper :options="swiperOption" ref="swiperSelect">
       <swiper-slide v-for="(item, index) in detailList">
         <div class="select" @click="goToPage(index)" :class="{'highlight': index === currentIndex}">{{item.china}}</div>
       </swiper-slide>
     </swiper>
   </div>
     <div class="search-detail-component" ref="scroll">
       <swiper ref="swiperComponent" @slideChangeTransitionEnd="sliderChange" class="swiper-container" v-if="currentIndex === searchPageIndex">
         <swiper-slide v-for="item in detailList">
             <keep-alive>
               <component :is="item.name"  :id="currentSearch" @singer="goToSinger" @album="goToAlbum" @sheet="goToSheet" @station="goToStation"></component>
             </keep-alive>
         </swiper-slide>
       </swiper>
       </div>
     <div class="search-result" v-show="showFlag">
       <suggest :querys="query" @detail="searchDetail"></suggest>
     </div>
   </div>
   <router-view></router-view>
   </div>
 </transition>
</template>

<style scoped lang="stylus" rel="stylesheet/styuls">
  .search-detail
    position: fixed
    background #f7f7f7
    top: 0
    left: 0
    right: 0
    bottom:0
    z-index:120
  .search-box
    height: 50px
    position relative
    background:#ee0000
  .search-detail-list
    height:40px
    background:#ee0000
    color:#fff
    padding: 10px 10px 0 10px
   .select
      width: 40px
      height:25px
      line-height 25px
      text-align center
  .search-detail-component
      width: 100%
      height: 100%
  .swiper-container
      height:100%
  .search-result
    position fixed
    top: 65px
    left: 40px
    right: 0
    z-index: 130
  &.highlight
     font-weight 700
     border-bottom: 3px solid #fff
</style>

<script type="text/ecmascript-6">
import searchBox from 'base/search-box/search-box'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import listAlbum from 'base/search-detail-list/list-album'
import listCustomer from 'base/search-detail-list/list-customer'
import listMv from 'base/search-detail-list/list-mv'
import listPlayList from 'base/search-detail-list/list-playlist'
import listSinger from 'base/search-detail-list/list-singer'
import listSongs from 'base/search-detail-list/list-songs'
import listVideoStation from 'base/search-detail-list/list-video-station'
import Scroll from 'base/scroll/scroll'
import suggest from 'base/suggestion/suggestion'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      detailList: [
        {
          name: 'songs',
          china: '单曲'
        },
        {
          name: 'Mv',
          china: 'Mv'
        },
        {
          name: 'singer',
          china: '歌手'
        },
        {
          name: 'album',
          china: '专辑'
        },
        {
          name: 'playlist',
          china: '歌单'
        },
        {
          name: 'customer',
          china: '用户'
        },
        {
          name: 'station',
          china: '电台'
        }
      ],
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 20,
        freeMode: true
      },
      query: '',
      queryName: '',
      currentIndex: 0,
      swiperOptions: {
        autoHeight: true
      },
      showFlag: false
    }
  },
  created () {
  },
  methods: {
    queryFn (newY) {
      this.query = newY
      this.showFlag = true
    },
    ...mapMutations({
      setCurrentSearch: 'SET_CURRENT_SEARCH',
      setSearchPage: 'SET_SEARCH_PAGE_INDEX'
    }),
    sliderChange () {
      this.currentIndex = this.swiper.activeIndex
      this.setSearchPage(this.swiper.activeIndex)
    },
    goToPage (index) {
      this.currentIndex = index
    },
    back () {
      this.$router.back()
    },
    searchDetail (name) {
      this.setCurrentSearch(name)
      this.setSearchPage(0)
      this.currentIndex = 0
      this.showFlag = false
    },
    goToSinger () {
      this.$router.push({
        path: '/singer'
      })
    },
    goToAlbum (id) {
      this.$router.push({
        path: `/album/${id}`
      })
    },
    goToSheet (id) {
      this.$router.push({
        path: `/sheet/${id}`
      })
    },
    goToStation () {
      this.$router.push({
        path: '/station'
      })
    }
  },
  computed: {
    swiper () {
      return this.$refs.swiperComponent.swiper
    },
    ...mapGetters([
      'searchPageIndex',
      'currentSearch'
    ])
  },
  components: {
    searchBox,
    swiper,
    swiperSlide,
    songs: listSongs,
    Mv: listMv,
    singer: listSinger,
    album: listAlbum,
    playlist: listPlayList,
    customer: listCustomer,
    station: listVideoStation,
    Scroll,
    suggest
  },
  watch: {
    currentIndex (newy, oldy) {
      if (newy !== oldy) {
        this.swiper.slideTo(newy, 300, false)
        this.setSearchPage(newy)
      }
    }
  }
}
</script>
