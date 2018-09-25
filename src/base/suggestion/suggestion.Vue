<template>
 <transition name="result-wrapper">
   <div class="result" v-show="querys">
     <scroll class="list-wrapper" ref="scroll">
     <div>
     <h1 class="title"><span style="margin-left: 25px">搜索 "{{querys}}"</span></h1>
     <li class="result-list" v-for="item in result" @click="goToSearchDetail(item.name)">
       <div class="item-l">
         <i class="iconfont icon-search">&#xe60c;</i>
       </div>
       <div class="item-r">{{item.name}}</div>
     </li>
     </div>
     </scroll>
   </div>
 </transition>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .result
   background:#fff
   z-index: 100
   padding: 5px 8px
  .list-wrapper
    height 500px
    overflow:hidden
   .title
     color:#63B8FF
     height: 45px
     line-height 45px
     border-bottom: 1px solid #F4F4F4
   .result-list
     height: 40px
     width: 100%
     display: flex
     justify-content space-around
     align-items center
     border-bottom: 1px solid #F4F4F4
   .item-l
     width: 15%
     height: 30px
     line-height 30px
     text-align center
     font-size: 20px
   .item-r
     width: 80%
     height: 30px
     line-height 30px
     text-overflow ellipsis
     overflow hidden
     white-space nowrap
 &.result-wrapper-enter-active, &.result-wrapper-leave-active
   transition: all 0.2s cubic-bezier(.42,0,.58,1)
 &.result-wrapper-enter, &.result-wrapper-leave-to
     transform translate3d(100%, 0, 0)
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import scroll from 'base/scroll/scroll'
export default {
  props: {
    querys: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: []
    }
  },
  methods: {
    searchResult () {
      var data = {
        keywords: this.querys
      }
      axios('search', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.result = res.data.result.songs
        }
      })
    },
    goToSearchDetail (name) {
      this.$emit('detail', name)
    }
  },
  watch: {
    querys () {
      this.searchResult()
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      }, 300)
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
  components: {
    scroll
  }
}
</script>
