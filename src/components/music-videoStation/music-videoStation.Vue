<template>
  <div class="videoStation">
    <scroll class="list-wrapper" ref="scroll">
      <div>
    <div class="top">
      <div class="top-t"></div>
      <div class="banner">
        <swiper class="swiper" :options="swiperOption" ref="myswiper">
          <swiper-slide v-for="item in recommend">
            <img :src="item.picUrl"  width="100%" height="100%" class="image">
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="nav">
      <div class="classify">
        <i class="iconfont icon-classify">&#xe627;</i>
        <span>电台分类</span>
      </div>
      <div class="rank">
        <i class="iconfont icon-rank">&#xe782;</i>
        <span>电台排行</span>
      </div>
    </div>
    <div class="title">精选电台</div>
     <div class="recommend">
       <li class="list-items" v-for="item in recommend" @click="goToDetail(item)">
         <div class="item-l">
           <img :src="item.picUrl" class="image">
         </div>
         <div class="item-r">
           <p class="rec-n">{{item.name}}</p>
           <p class="rec-t">{{item.rcmdtext}}</p>
         </div>
       </li>
     </div>
    <div class="title">电台个性推荐</div>
        <div class="style">
          <li class="list-style" v-for="item in personstyle">
            <div class="s-t">
              <img :src="item.picUrl" class="image">
              <span class="actor">{{item.name}}</span>
            </div>
            <div class="s-b">
              <p>{{item.copywriter}}</p>
            </div>
          </li>
        </div>
        <div class="station">
          <li class="station-list" v-for="item in stationlist">
            <div class="title">{{item[0].category}}</div>
            <div class="list-item">
            <div class="list-style" v-for="detail in item" @click="goToDetail(detail)">
              <div class="s-t">
                <img :src="detail.picUrl" class="image" style="filter: brightness(80%)" @load="loadImage">
                <span class="actor">{{detail.name}}</span>
              </div>
              <div class="s-b">
                <p>{{detail.rcmdtext}}</p>
              </div>
            </div>
            </div>
          </li>
        </div>
      </div>
  </scroll>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.videoStation
   position fixed
   top: 100px
   bottom: 0
   left: 0
   right:0
   background:#f7f7f7
   font-family "Microsoft YaHei UI Light"
 .list-wrapper
   position fixed
   top: 100px
   bottom: 0
   left: 0
   right:0
   overflow hidden
 .top
   position relative
   height 140px
  .top-t
    height:100px
    background:#ee0000
  .banner
    position absolute
    top: 0
    left: 0
    right: 0
    width: 97%
    margin: 0 auto
  .swiper
    height:140px
  .image
    border-radius 8px
  .nav
    height:60px
    display: flex
    border-bottom 1px solid #ddd
    align-items  center
  .classify, .rank
    width: 50%
    height:80%
    line-height 48px
    text-align center
  .classify
    border-right 1px solid #ddd
  .iconfont
    color:#ee0000
    font-size: 25px
    padding-right 5px
 .title
   font-size: 17px
   font-weight 600
   margin: 10px 10px
  .list-items
    display: flex
    height:120px
    justify-content space-around
    padding-bottom 10px
  .item-l
    width: 35%
    height: 100%
   .image
     width 100%
     height:100%
     border-radius 5px
  .item-r
    width: 61%
    height: 100%
    line-height 20px
  .rec-n, .rec-t
    margin: 20px 10px
  .rec-t
    font-size:13px
    color:#595959
  .style
    display: flex
    justify-content space-around
    align-items center
    flex-flow row wrap
  .list-style
    display flex
    width: 30%
    height:180px
    flex-flow column wrap
   .s-t
     height: 120px
     width: 100%
     position: relative
    .image
      width: 100%
      height: 100%
      border-radius 8px
    .actor
      position absolute
      bottom:4px
      left: 3px
      color:#fff
      font-size: 12px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
   .s-b
     height: 60px
     font-size: 13px
  .station
    display: flex
    justify-content space-around
    align-items center
    flex-flow row wrap
   .station-list
     width 100%
     height: 220px
    .list-item
      display: flex
      height:180px
      justify-content space-around
      align-items center
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      catelist: [],
      stationlist: [],
      recommend: [],
      swiperOption: {
        initialSlide: 0,
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      checkloaded: false,
      personstyle: []
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.initRecommand()
    this.personStyle()
  },
  methods: {
    ...mapMutations({
      setStationsDetail: 'SET_STATIONS_DETAIL'
    }),
    init () {
      axios('dj/catelist').then((res) => {
        if (res.data.code === 200) {
          this.catelist = res.data.categories
        }
      }).then(() => {
        this.stationlist = this.initStation()
      })
    },
    initStation () {
      if (this.catelist.length > 2) {
        var list = []
        this.catelist.forEach((res) => {
          var data = {
            type: res.id
          }
          axios('dj/recommend/type', {params: data}).then((res) => {
            if (res.data.code === 200) {
              var listItem = res.data.djRadios.slice(0, 3)
              list.push(this.initImage(listItem))
            }
          })
        })
        return list
      }
    },
    initRecommand () {
      axios('dj/recommend').then((res) => {
        if (res.data.code === 200) {
          var list = res.data.djRadios.slice(0, 5)
          this.recommend = this.initImage(list)
        }
      })
    },
    personStyle () {
      axios('personalized/djprogram').then((res) => {
        if (res.data.code === 200) {
          this.personstyle = this.initImage(res.data.result)
        }
      })
    },
    initImage (list) {
      list.forEach((res) => {
        var pic = res.picUrl
        res.picUrl = `${res.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`
        res.coverImg = pic
      })
      return list
    },
    loadImage () {
      if (!this.checkloaded) {
        this.$refs.scroll.refresh()
        this.checkloaded = true
      }
    },
    goToDetail (item) {
      this.setStationsDetail(item)
      this.$router.push({
        path: '/music/videoStation/detail'
      })
    }
  },
  computed: {
    swiper () {
      return this.$refs.myswiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide,
    Scroll
  },
  watch: {
    stationlist () {
      if (this.stationlist.length > 2) {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    }
  }
}
</script>
