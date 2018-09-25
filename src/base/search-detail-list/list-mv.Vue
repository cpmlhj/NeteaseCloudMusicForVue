<template>
  <scroll class="list-mv" ref="scroll">
    <ul class="list">
      <li class="list-item" v-for="item in mvList">
        <div class="list-l">
          <div class="l-t">
            <i class="iconfont icon-play">&#xe7a5;</i>
            <span>{{item.playCount}}</span>
          </div>
          <div class="image">
            <img :src="item.cover" width="100%" height="100%" style=" border-radius: 5px">
          </div>
        </div>
        <div class="list-r">
          <p class="l-r-n">{{item.name}}</p>
          <p class="l-r-s"> {{item.dt}} {{item.artistName}}</p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .list-mv
    background:#f7f7f7
    width: 100%
    height: 100%
  .list
    padding: 20px 10px
  .list-item
    width: 100%
    height: 60px
    display: flex
    justify-content space-around
    align-items center
    padding-bottom:10px
   .list-l
     position: relative
     width: 28%
     height: 60px
     font-size: 12px
    .l-t
      position absolute
      top: 3px
      right: 5px
      color:#fff
      z-index:10
    .image
      width 100%
      height:100%
      filter brightness(80%)
   .list-r
      width: 65%
      height: 50px
      border-bottom: 1px solid #ddd
    .l-r-n, .l-r-s
      margin: 5px 10px
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
    .l-r-s
      color:#595959
      font-size: 13px
      margin-top: 5px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters} from 'vuex'
import scroll from 'base/scroll/scroll'
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mvList: [],
      pageIndex: 1
    }
  },
  created () {
    this.initMv()
  },
  methods: {
    initMv () {
      let data = {
        keywords: this.id,
        type: 1004
      }
      return new Promise((resolve, reject) => {
        axios('search', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.mvList = this.initImage(res.data.result.mvs)
            setTimeout(() => {
              this.$refs.scroll.refresh()
            }, 300)
            resolve(this.mvList)
          }
        })
      })
    },
    initImage (list) {
      if (!list) {
        return
      }
      list.forEach((res) => {
        res.cover = `${res.cover}?imageView&thumbnail=360y360&quality=75&tostatic=0`
        res.dt = this.time(res.duration / 1000)
      })
      return list
    },
    time (time) {
      time = time | 0
      const min = time / 60 | 0
      const second = this._pad(time % 60)
      return `${min}:${second}`
    },
    _pad (time, n = 2) {
      let len = time.toString().length
      while (len < n) {
        time = '0' + time
        len++
      }
      return time
    }
  },
  computed: {
    ...mapGetters([
      'searchPageIndex',
      'currentSearch'
    ])
  },
  components: {
    scroll
  },
  watch: {
    searchPageIndex () {
      if (this.pageIndex === this.searchPageIndex) {
        if (this.mvList.length > 2) {
          return
        }
        this.initMv()
      }
    },
    id (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.mvList = []
      }
    }
  }
}
</script>
