<template>
  <div class="Find" ref="find">
  <scrolls class="musicFind" :data="recommandFM" ref="scroll">
    <div>
     <div>
       <swiper class="swiper" :options="swiperOption" ref="myswiper">
         <swiper-slide  v-for="item in banners" :key="item.encodeId" class="banner-items">
             <img :src="item.picUrl" @load="loadImage" width="100%" height="100%">
         </swiper-slide>
         <div class="swiper-pagination"></div>
       </swiper>
     </div>
    <div class="nav">
      <div class="nav-list">
        <div class="circle">
        <i class="icon-video iconfont">&#xe650;</i>
        </div>
        <span>私人FM</span>
      </div>
      <div class="nav-list">
        <div class="circle">
        <i class="icon-recommand iconfont" @click="goToRecommand">&#xe616;</i>
        </div>
        <span>每日推荐</span>
      </div>
      <div class="nav-list">
        <div class="circle">
        <i class="icon-songList iconfont" @click="goToAll">&#xe640;</i>
        </div>
        <span>歌单</span>
      </div>
      <div class="nav-list">
        <div class="circle">
        <i class="icon-rank iconfont" @click="goToRank">&#xe782;</i>
        </div>
        <span>排行榜</span>
      </div>
    </div>
    <div class="hsonglist">
      <h3>推荐歌单</h3>
      <i class=" icon-right iconfont">&#xe634;</i>
    </div>
      <div class="listDetail">
        <li class="list-item" v-for="item in recommandSong" :key="item.name" @click="goToSheet(item.id)">
          <div class="item-top">
            <div class="Number" v-if="item.playCount">
              <i class="iconfont icon-listen">&#xe6bf;</i>
              <span>{{item.playCount | newLine}}</span>
            </div>
            <div class="image">
              <img :src="item.picUrl" alt="">
            </div>
          </div>
          <div class="item-bottom">
            {{item.name}}
          </div>
        </li>
      </div>
    <div class="hsonglist">
      <h3>独家放送</h3>
    </div>
    <div class="personalized">
      <li class="personalized-item" v-for="item in ExclusiveDelivery">
        <div class="item-top">
          <div class="icon">
            <i class="iconfont icon-video">&#xe650;</i>
          </div>
          <img :src="item.picUrl" alt="">
        </div>
        <div class="item-bottom">
          <span>{{item.name}}</span>
        </div>
      </li>
    </div>
      <div class="hsonglist" @click="goToGrounding">
        <h3>最新音乐</h3>
        <i class=" icon-right iconfont">&#xe634;</i>
      </div>
      <div class="listDetail">
        <li class="list-item" v-for="item in newSong" @click="NewSonglist(item)">
          <div class="item-top">
            <div class="image">
              <img :src="item.img" alt="">
            </div>
          </div>
          <div class="item-bottom">
            {{item.name}}
          </div>
        </li>
      </div>
      <div class="hsonglist">
        <h3>推荐电台</h3>
        <i class=" icon-right iconfont">&#xe634;</i>
      </div>
      <div class="listDetail">
        <li class="list-item" v-for="item in recommandFM">
          <div class="item-top">
            <div class="Number" v-if="item.trackCount">
              <i class="iconfont icon-listen">&#xe6bf;</i>
              <span>{{item.trackCount}}万</span>
            </div>
            <div class="image">
              <img :src="item.picUrl" @load="loadImage">
            </div>
          </div>
          <div class="item-bottom">
            {{item.name}}
          </div>
        </li>
      </div>
    </div>
  </scrolls>
      <transition name="el-fade-in-linear">
        <keep-alive include="AllSheet groundingSong">
        <router-view></router-view>
        </keep-alive>
      </transition>
    <song-recommand :list="songlist" ref="resong" @selectItem="goToPlay" v-if="songlist.length > 0"></song-recommand>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
 .Find
   width: 100%
   position fixed
   bottom: 0
   top: 100px
   background:#fff
 .musicFind
   height:100%
   overflow hidden
  .nav
   display flex
   flex-direction row
   height: 80px
   justify-content space-around
   align-items center
   .nav-list
     width: 80px
     height 70px
     display flex
     flex-flow column wrap
     justify-content space-between
     align-items center
     padding-top 8px
   .swiper
      height:350px
    .circle
      width: 45px
      height: 45px
      border-radius: 50%
      border 1px solid #ee0000
      text-align center
     .iconfont
       line-height 45px
       color:#ee0000
       display: block
       font-size 23px
  .hsonglist
    margin-top:40px
    display: flex
    flex-flow row nowrap
    justify-content left
    align-items center
    padding-left 10px
    padding-bottom 15px
   .iconfont
     fong-size:20px
  .personalized
    display flex
    flex-flow row wrap
    justify-content space-between
   .personalized-item
     display flex
     width: 46%
     flex-flow column wrap
     position relative
     .icon
       width: 23px
       height:23px
       border-radius 50%
       border: 1px solid #fff
       font-weight 700
       background:rgba(7,7,7,0.4)
       position absolute
       top: 8px
       left:10px
       text-align center
       .icon-video
         color:#fff
         line-height 20px
         font-size:14px
     img
       width: 100%
       height:100px
   .personalized-item:last-child
     width:100%
   .personalized-item:last-child img
      height:130px
   .item-bottom
     font-size:14px
     padding: 10px 0 10px 0
  .loading
    position:absolute
    width: 100%
    top: 50%
    transform translateY(-50%)
.listDetail
  display: flex
  flex-flow: row wrap
  justify-content space-around
  .list-item
    display: flex
    width: 32%
    flex-flow column wrap
    position: relative
    padding-bottom 15px
  .Number
    position: absolute
    top: 0
    right:10px
    color:#fff
    font-size:14px
  img
    width: 97%
    height: 100%
    border-radius 15px
.item-bottom
  font-size: 13px
  padding-top:5px
  font-family STXihei, "Microsoft YaHei";
</style>

<script type="text/ecmascript-6">
import Banner from 'base/banner/banner'
import axios from 'axios'
import Scrolls from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapMutations, mapActions, mapGetters} from 'vuex'
import SongRecommand from 'base/song-recommand/song-recommand'
import {createSong} from 'common/js/song'
import {getPersonFm} from 'common/js/API'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
const ERR_OK = 200
export default {
  data () {
    return {
      recommandSong: [],
      ExclusiveDelivery: [],
      newSong: [],
      recommandFM: [],
      banners: [],
      imageCheck: false,
      songlist: [],
      newSongs: [],
      swiperOption: {
        initialSlide: 0,
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  name: 'musicFind',
  created () {
    this._initFindList()
  },
  methods: {
    _initFindList () {
      let Banners = axios('banner')
      let Recommand = axios('personalized')
      let Exclusive = axios('personalized/privatecontent')
      let newSong = axios('personalized/newsong')
      let FM = axios('personalized/djprogram')
      axios.all([Banners, Recommand, Exclusive, newSong, FM]).then(axios.spread((a, b, c, d, e) => {
        this.banners = a.data.banners
        this.recommandSong = b.data.result.splice(0, 6)
        this.ExclusiveDelivery = c.data.result
        var song = d.data.result.splice(0, 6)
        this.newSong = this._initNewSong(song)
        this.recommandFM = e.data.result
      })).then(() => {
        this.swiper.init()
      })
    },
    loadImage () {
      if (!this.imageCheck) {
        this.$refs.scroll.refresh()
        this.imageCheck = true
      }
    },
    scrollrefresh () {
      this.$refs.scroll.refresh()
    },
    goToSheet (id) {
      this.$router.push({
        path: `/music/find/sheet/${id}`
      })
    },
    ...mapMutations({
      setLoading: 'SET_PLAY_LOADING'
    }),
    goToAll () {
      this.$router.push({
        path: '/music/find/allsheet'
      })
    },
    goToRecommand () {
      if (this.songlist.length > 0) {
        this.$refs.resong.show()
      } else {
        var data = {
          timestamp: new Date().getTime()
        }
        axios('recommend/songs', {
          params: data
        }).then((res) => {
          if (res.data.code === ERR_OK) {
            this.songlist = res.data.recommend
          }
        }).then(() => {
          this.$refs.resong.show()
        })
      }
    },
    ...mapActions([
      'setPlayList',
      'setPersonFMList'
    ]),
    ...mapMutations({
      setPersonFm: 'SET_SHOW_PERSON_FM'
    }),
    goToPlay (songs, index) {
      this.setPlayList({
        list: songs,
        index: index
      })
    },
    _initNewSong (list) {
      var newlist = []
      list.forEach((item) => {
        let musicData = {
          id: item.id,
          singer: item.song.artists[0].name,
          name: item.name,
          type: item.song.album.name,
          musicImg: item.song.album.picUrl,
          duration: item.song.duration
        }
        newlist.push(createSong(musicData))
      })
      return newlist
    },
    NewSonglist (item) {
      var list = []
      list.push(item)
      this.goToPlay(list, 0)
    },
    goToGrounding () {
      this.$router.push({path: '/music/find/songgrounding'})
    },
    goToPersonFM () {
      if (this.personPlaying) {
        this.setPersonFm(true)
      } else {
        getPersonFm().then((res) => {
          this.setPersonFMList({
            list: res,
            index: 0
          })
        })
      }
    },
    goToRank () {
      this.$router.push({path: '/music/find/rank'})
    }
  },
  computed: {
    ...mapGetters([
      'personPlaying'
    ]),
    swiper () {
      return this.$refs.myswiper.swiper
    }
  },
  components: {
    Banner,
    SongRecommand,
    Scrolls,
    Loading,
    swiper,
    swiperSlide
  },
  watch: {
  }
}
</script>
