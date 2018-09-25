<template>
  <div class="artists-album">
    <scroll class="list-item" ref="scroll" :data="mvList">
      <div>
      <li class="item" v-for="item in mvList">
        <div class="item-l">
          <img :src="item.imgurl" class="image">
          <div class="play-count">
            <i class="iconfont icon-play">&#xe600;</i>
            <span>{{item.playCount}}</span>
          </div>
        </div>
        <div class="item-r">
          <p class="m-n">{{item.name}} {{item.artistName}}</p>
          <p class="m-t">{{item.publishTime}}</p>
        </div>
      </li>
      </div>
    </scroll>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.artists-album
  background #f7f7f7
  margin-top:20px
 .title
   color:#595959
 .list-item
   height:430px
   overflow hidden
 .item
   width 100%
   height:70px
   display flex
   justify-content space-around
   align-items center
  .item-l
    width: 25%
    height:65px
    position: relative
   .image
     width 100%
     height:100%
     border-radius 3px
   .play-count
     position absolute
     top:3px
     right:4px
     color:#fff
     font-size:12px
  .item-r
    width: 70%
    height:60px
    border-bottom:1px solid #ddd
   .m-n, .m-t
     margin: 10px auto
   .m-n
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
   .m-t
     font-size: 13px
     color:#595959
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      mvList: [],
      pageIndex: 2
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  mounted () {
  },
  methods: {
    _initMv () {
      var data = {
        id: this.id
      }
      return new Promise((resolve, reject) => {
        axios('artist/mv', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.mvList = this._initData(res.data.mvs)
            this.$refs.scroll.refresh()
            resolve(this.mvList)
          } else {
            reject('error')
          }
        })
      })
    },
    _initData (list) {
      list.forEach((res) => {
        res.imgurl = `${res.imgurl}?param=130y130`
      })
      return list
    }
  },
  computed: {
    ...mapGetters([
      'artistPageIndex',
      'artists'
    ])
  },
  watch: {
    artistPageIndex () {
      if (this.pageIndex === this.artistPageIndex) {
        if (this.mvList.length > 2) {
          return
        }
        this._initMv()
      }
    },
    id () {
      this.mvList = []
    }
  },
  components: {
    Scroll
  }
}
</script>
