<template>
  <div class="all">
    <div class="all-sheet">
     <div name="normal">
      <div class="top">
        <i class="iconfont icon-back" @click="back">&#xe78c;</i>
        <span style="padding-left:15px">歌单</span>
      </div>
      <scroll :data="allSheet" class="item">
        <div>
      <div class="highquality" v-if="highquality.length > 0">
        <div class="avatar" :style="bgStyle">
        </div>
        <div class="high-l">
          <img :src="highquality[0].coverImgUrl" class="image" style="border-radius: 8px">
        </div>
        <div class="high-r">
          <div class="hight-r-t" @click="goToHighQuality">
            <span>精品歌单</span>
            <i class="iconfont icon-right">&#xe634;</i>
          </div>
          <p class="high_n">{{highquality[0].name}}</p>
          <p class="high_w">{{highquality[0].copywriter}}</p>
        </div>
      </div>
      <div class="classify">
        <div class="classInput">
         <em></em>
          <i class="iconfont"></i>
        </div>
        <div class="classify-r">
          <span>欧美</span>
          <span>影视原声</span>
          <span>轻音乐</span>
        </div>
      </div>
      <div class="sheet-list" v-if="allSheet.length > 0">
        <ul class="list">
          <li class="list-item" v-for="item in allSheet" @click="goToSheet(item.id)">
            <div class="list-detail">
              <div class="bgImage">
                <img :src="item.coverImgUrl" style="border-radius: 8px">
              </div>
             <div class="list-top">
               <i class="iconfont icon-listen">&#xe6bf;</i>
               <span>{{item.playCount | newLine}}</span>
             </div>
            <div class="customer">
              <i class="iconfont icon-customer">&#xe619;</i>
              <span>{{item.creator.nickname}}</span>
            </div>
            </div>
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </div>
        </div>
      </scroll>
    </div>
    <high-quality ref="high" :list="highquality" @selectItem="goToSheet"></high-quality>
    </div>
    <router-view></router-view>
  </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
.all
 .all-sheet
   position fixed
   left: 0
   top:0
   bottom:0
   right:0
   background:#FAFAFA
   z-index:100
  .top
    height: 50px
    background:#ee0000
    color:#fff
    display: flex
    justify-content flex-start
    align-items center
    font-size:17px
  .item
    position: fixed
    top: 50px
    bottom: 0
    width: 100%
    overflow hidden
  .highquality
    height:130px
    display: flex
    justify-content space-around
    align-items center
    position relative
   .avatar
     position absolute
     width: 100%
     height: 130px
     z-index: -1
     filter: blur(20px)
     background-position: 50%
     background-size: cover
     transform scale(1.5)
    .image
     width: 100px
     height:100px
   .high-r
     height: 90px
     width: 65%
     color:#fff
    .hight-r-t
      display flex
      height:20px
      align-items center
      justify-content flex-start
      padding:5px
    .high_n, .high_w
      margin-top:8px
      padding:5px
      font-size:15px
    .high_w
      font-size: 12px
      color:#ccc
  .classify
    height:50px
    display: flex
    justify-content space-between
    align-items center
    padding-top:10px
  .classify-r
    display flex
    width: 40%
    align-items center
    justify-content space-between
    color:#595959
    font-size: 13px
 .list
   display flex
   flex-flow row wrap
   justify-content space-between
  .list-item
    width:49%
    height:220px
    position relative
   .list-detail
     position relative
     width: 100%
     height:170px
    .bgImage
      width:100%
      height:170px
      filter:brightness(80%)
    .bgImage img
      width: 100%
      height:100%
    .list-top
      font-size:12px
      color:#fff
      position absolute
      right:10px
      top:8px
    .customer
      font-size 13px
      color:#fff
      position absolute
      bottom:8px
      left:5px
   .name
     height:18px
     font-size:14px
     padding:8px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'
import HighQuality from 'base/highquality/highquality'
const ERR_OK = 200
export default {
  data () {
    return {
      highquality: [],
      allSheet: [],
      classify: ''
    }
  },
  name: 'AllSheet',
  mounted () {
    if (this.allSheet.length > 0) {
      return
    } else {
      this._initSheet()
      this._inithighquality()
      this.setLoading(true)
    }
  },
  methods: {
    _initSheet () {
      var data = {
        limit: 100
      }
      return new Promise((resolve, reject) => {
        axios('top/playlist', {
          params: data
        }).then((res) => {
          if (res.data.code === ERR_OK) {
            this.allSheet = this.initImage(res.data.playlists)
            resolve(this.allSheet)
          } else {
            reject(' Error')
          }
        })
      })
    },
    _inithighquality () {
      var data = {
        limit: 100
      }
      return new Promise((resolve, reject) => {
        axios('top/playlist/highquality', {
          params: data
        }).then((res) => {
          if (res.data.code === ERR_OK) {
            this.highquality = this.initImage(res.data.playlists)
            this.setLoading(false)
          } else {
            reject(' Error')
          }
        })
      })
    },
    initImage (list) {
      list.forEach((item) => {
        item.coverImgUrl = `${item.coverImgUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`
      })
      return list
    },
    goToSheet (id) {
      this.$router.push({
        path: `/music/find/allsheet/sheet/${id}`
      })
    },
    ...mapMutations({
      setLoading: 'SET_PLAY_LOADING'
    }),
    back () {
      this.$router.back()
    },
    goToHighQuality () {
      this.$refs.high.show()
    }
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.highquality[0].coverImgUrl})`
    }
  },
  components: {
    Scroll,
    HighQuality
  }
}
</script>
