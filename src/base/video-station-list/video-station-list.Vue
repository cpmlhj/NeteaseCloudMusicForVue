<template>
  <div class="station-list">
    <h1 class="list-length">  共{{list.length}}期</h1>
    <li class="list-wrapper" v-for="(item, index) in list" @click="listenVideo(list, index)">
      <div class="list-l">
        {{index + 1}}
      </div>
      <div class="list-r">
        <p style="margin-top: 20px" class="list-r-n">{{item.name}}</p>
        <div class="list-desc">
          <span class="desc-l">{{item.createTime}}</span>
          <span class="desc-l">{{item.listenerCount}}</span>
          <span class="desc-l">{{item.dt}}</span>
        </div>
      </div>
    </li>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .list-length
    height: 40px
    background:#D4D4D4
    color:#595959
    line-height 40px
 .list-wrapper
   width:100%
   height: 70px
   display: flex
   align-items center
   justify-content space-around
  .list-l
    width: 10%
    color:#595959
    text-align center
  .list-r
    width:80%
    height: 70px
    line-height 30px
    border-bottom 1px solid #ddd
   .list-r-n
     text-overflow ellipsis
     overflow: hidden
     white-space nowrap
  .list-desc
    font-size: 12px
    color:#595959
    padding-bottom: 5px
   .desc-l
     margin-left 10px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var data = {rid: this.id, limit: 200}
      axios('dj/program', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.list = this.initData(res.data.programs)
        }
      })
    },
    initData (list) {
      list.forEach((res) => {
        res.coverUrl = `${res.coverUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`
        res.createTime = this.time(res.createTime)
        res.dt = this._initTime(res.duration / 1000)
      })
      return list
    },
    time (time) {
      var date = new Date(time)
      return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`
    },
    _initTime (time) {
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
    },
    listenVideo (item, index) {
      this.$emit('goToPlay', item, index)
    }
  }
}
</script>
