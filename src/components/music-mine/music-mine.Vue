<template>
  <div class="mine">
   <scroll class="list-wrapper" ref="scroll">
     <div>
    <div class="title">
      <i class="iconfont icon-history">&#xe642;</i>
      <span class="t-n">本地音乐</span>
    </div>
    <div class="title" @click="showHistory">
      <i class="iconfont icon-history">&#xe600;</i>
      <span class="t-n">最近播放 ({{history.length}})</span>
    </div>
    <div class="title">
      <i class="iconfont icon-history">&#xe794;</i>
      <span class="t-n">下载管理</span>
    </div>
    <div class="title">
      <i class="iconfont icon-fm">&#xe76a;</i>
      <span class="t-n">我的电台</span>
    </div>
    <div class="title">
      <i class="iconfont icon-comment">&#xe625;</i>
      <span class="t-n">我的收藏</span>
    </div>
    <el-collapse class="el-collapse" @change="hasChange">
      <el-collapse-item title="创建的歌单" class="collapse-item">
        <div class="list">
          <div class="list-l">
            <img :src="customerlist.coverImgUrl" class="image">
          </div>
          <div class="list-r">
            <p class="r-t">我喜欢的音乐</p>
            <p class="r-le">{{customerlist.trackCount}} 首</p>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="收藏的歌单" class="collapse-item el-collapse-item__content">
        <li class="list-item" v-for="item in playlist" @click="goToSheet(item.id)">
          <div class="list">
            <div class="list-l">
              <img :src=" item.coverImgUrl" class="image">
            </div>
            <div class="list-r">
              <p class="r-t">{{item.name}}</p>
              <p class="r-le">{{item.trackCount}} 首</p>
            </div>
          </div>
        </li>
      </el-collapse-item>
    </el-collapse>
     </div>
  </scroll>
    <history ref="history" :list="history" @select="play"></history>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.mine
  position fixed
  bottom:0
  right:0
  left: 0
  background:#f7f7f7
 .list-wrapper
   overflow hidden
   position fixed
   bottom:0
   right:0
   left: 0
   top: 100px
 .title
   height:50px
   border-bottom 1px solid #ddd
   width:100%
   line-height 50px
   font-size:17px
   margin 10px 0
  .iconfont
    color:#ee0000
    margin-left: 10px
    font-size:30px
  .t-n
    margin 0 10px
    font-weight 600
  .el-collapse
    background:#B5B5B5
  .list
    height:55px
    display flex
    justify-content space-around
    align-items center
    padding-bottom: 5px
  .list-l
    height:55px
    width:15%
  .list-r
    width: 75%
    height:50px
    font-weight 500
  .image
    width:100%
    height:100%
    border-radius 5px
  .r-t, .r-le
    margin: 3px  8px
  .r-t
    font-size: 14px
    font-weight 600
   .r-le
     color:#595959
     font-size:12px
.el-collapse-item__content
  padding-bottom: 0px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
import History from 'base/historySong/historySong'
export default {
  data () {
    return {
      Count: null,
      playlist: [],
      customerlist: {},
      history: []
    }
  },
  created () {
    this.initPlayList()
    this.initPlayHistory()
  },
  mounted () {
    this.$refs.scroll.refresh()
  },
  methods: {
    initPlayList () {
      var data = {
        uid: this.customer.userId
      }
      return new Promise((resolve, reject) => {
        axios('user/playlist', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.playlist = res.data.playlist.slice(1)
            this.customerlist = res.data.playlist[0]
            resolve(this.playlist)
          } else {
            reject('error')
          }
        })
      })
    },
    initPlayHistory () {
      var data = {
        uid: this.customer.userId
      }
      return new Promise((resolve, reject) => {
        axios('user/record', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.history = res.data.allData
          } else {
            reject('error')
          }
        })
      })
    },
    goToSheet (id) {
      this.$router.push({
        path: `/music/mine/sheet/${id}`
      })
    },
    hasChange () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 300)
    },
    showHistory () {
      this.$refs.history.show()
    },
    play (list, index) {
      this.setPlayList({
        list: list,
        index: index
      })
    },
    ...mapActions([
      'setPlayList'
    ])
  },
  computed: {
    ...mapGetters([
      'customer'
    ])
  },
  components: {
    Scroll,
    History
  }
}
</script>
