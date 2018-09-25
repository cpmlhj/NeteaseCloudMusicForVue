<template>
 <transition name="el-zoom-in-bottom">
 <div class="introduction" v-show="showFlag">
    <div class="top">
      <i class="iconfont icon-back" @click="hide">&#xe78c;</i>
      <span class="top-titile">歌手简介</span>
    </div>
   <scroll class="list-wrapper" :data="introduction">
     <div>
    <div class="title" v-html="singer"></div>
    <p class="detail">{{desc}}</p>
    <div class="list">
      <li class="item" v-for="item in introduction">
        <div class="title">{{item.ti}}</div>
        <div class="detail" v-html="item.txt"></div>
      </li>
    </div>
     </div>
  </scroll>
 </div>
</transition>
</template>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.introduction
  position fixed
  top:0
  bottom:0
  left:0
  right:0
  background:#f7f7f7
  z-index:160
 .top
   height:50px
   color:#fff
   background: #ee0000
   line-height 50px
  .top-title, .icon-back
    margin-left:10px
    font-size:20px
  .list-wrapper
     position fixed
     top: 50px
     left:0
     bottom:0
     overflow hidden
 .title
   margin: 15px 10px
   font-size:18px
   border-left: 3px solid #ee0000
   padding-left:5px
 .detail
   letter-spacing 5px
   font-size:14px
   color:#595959
   line-height 130%
   margin: 10px 5px
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
export default {
  props: {
    introduction: {
      type: Array,
      default: null
    },
    desc: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    }
  },
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'artists'
    ]),
    singer () {
      return `${this.artists.name} 简讯`
    }
  }
}
</script>
