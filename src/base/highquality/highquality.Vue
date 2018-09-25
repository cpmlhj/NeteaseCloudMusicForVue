<template>
 <div class="all">
 <transition name="el-zoom-in-bottom">
   <div class="highquality" v-show="showFlag">
     <div class="top">
       <i class="iconfont icon-back" @click="hide">&#xe78c;</i>
       <span class="high-title">精品歌单·全部</span>
     </div>
       <div class="list-wrapper">
     <div class="high-list">
       <scroll class="list" ref="scroll">
         <ul>
         <li class="list-item" v-for="item in list" @click.stop="select(item.id)">
           <div class="item-left">
             <img :src="item.coverImgUrl" class="image">
             <div class="left-top">
               <i class="iconfont icon-listen">&#xe6bf;</i>
               <span>{{item.playCount | newLine}}</span>
             </div>
           </div>
           <div class="item-right">
             <p class="r-p-n">{{item.name}}</p>
             <p class="r-p-nick">by {{item.creator.nickname}}</p>
             <p class="r-p-t">
             <span class="tag">{{item.tag}}</span><span>{{item.copywriter}}</span>
             </p>
           </div>
         </li>
         </ul>
       </scroll>
     </div>
       </div>
   </div>
 </transition>
 </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.all
 .highquality
   position fixed
   left:0
   top: 0
   bottom: 0
   right: 0
   background:#fff
   z-index:300
  .top
    height:50px
    background:#ee0000
    color:#fff
    font-size:18px
    line-height 50px
   .icon-back, .high-title
     margin-left:8px
  .list
    position: fixed
    top: 55px
    bottom: 0
    width: 100%
    overflow hidden
  .high-list
    margin-top:5px
    height:100%
   .list-item
     width:100%
     height:130px
     display flex
     justify-content space-between
     align-items center
     padding-bottom:5px
   .item-left
     width:35%
     height:100%
     position relative
    .image
      width:100%
      height:100%
    .left-top
      position: absolute
      top:5px
      right:5px
      font-size:12px
      color:#fff
   .item-right
     width: 62%
     height:100%
     display flex
     flex-flow column wrap
     justify-content center
     align-content center
    .r-p-n, .r-p-nick, .r-p-t
      padding-top:13px
    .r-p-n
      font-size:15px
    .r-p-nick
      font-size:12px
      color:#CFCFCF
    .r-p-t
      font-size:12px
      color:#595959
     .tag
       display inline-block
       height:13px
       border:1px solid #ee0000
       margin-right:5px
       color:#ee0000
       font-size:10px
       line-height 13px
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    list: {
      type: Array,
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
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 300)
    },
    hide () {
      this.showFlag = false
    },
    select (id) {
      this.$emit('selectItem', id)
    }
  },
  components: {
    Scroll
  },
  watch: {
    list () {
      this.$refs.scroll.refresh()
    }
  }
}
</script>
