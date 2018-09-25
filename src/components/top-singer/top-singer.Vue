<template>
 <transition name="el-zoom-in-bottom">
   <div class="top-singer" v-show="showFlag">
     <div class="top">
       <div class="title">
       <i class="iconfont icon-back" @click="hide">&#xe78c;</i>
       <span class="title-n">云音乐歌手榜</span>
       </div>
       <p class="t-t">华语</p>
     </div>
     <scroll class="list-wrapper" :data="artists" ref="scroll">
       <div>
     <div class="singer-list">
       <li class="list-item" v-for="(item, index) in artists" @click="select(item, item.id)">
         <div class="item-l" :class="{'hot': index < 3}">{{index + 1}}</div>
         <div class="item-m">
           <img :src="item.picUrl" alt="" width="100%" height="100%" class="image">
         </div>
         <div class="item-r">
           <p class="item-r-p">{{item.name}}</p>
           <p class="item-r-p score"><i class="iconfont icon-hot">&#xe66d;</i>{{item.score}}</p>
         </div>
       </li>
     </div>
       </div>
   </scroll>
   </div>
 </transition>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.top-singer
  position: fixed
  top:0
  bottom:0
  left:0
  right:0
  background:#f7f7f7
  z-index:120
 .top
   height:80px
   background:#ee0000
   font-size:20px
   color:#fff
   .title
     height:50px
     line-height 50px
     margin-bottom:4px
    .title-n, .icon-back
      margin-left:10px
    .t-t
      margin: 0 0 10px 20px
 .list-wrapper
   position fixed
   top:80px
   left:0
   overflow hidden
   bottom:0
   right:0
  .singer-list
    display: flex
    flex-flow column wrap
   .list-item
     height:110px
     flex 1
     display: flex
     flex-flow row nowrap
     justify-content space-around
     align-items center
   .item-l
     font-size:20px
     font-weight 800
    .hot
      color:#ee0000
   .item-m
     width: 25%
     height:100px
    .image
      border-radius 15px
   .item-r
     width:60%
     height:100px
    .item-r-p
      margin:20px auto
    .score
      color:#595959
      font-size:14px
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    artists: {
      type: Array,
      default: null
    }
  },
  mounted () {
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
    },
    select (item, id) {
      console.log(111111)
      this.$emit('goToArtists', item, id)
    }
  },
  components: {
    Scroll
  },
  watch: {
    showFlag () {
      console.log(this.showFlag)
      if (this.showFlag === true) {
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>
