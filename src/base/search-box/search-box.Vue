<template>
 <div class="search-b">
   <i class="iconfont icon-back" @click="back">&#xe78c;</i>
   <input type="text" v-model="query" class="box" placeholder="请输入你要搜索的" ref="sea">
   <i class="iconfont icon-delete" @click="deleteQuery">&#xe70a;</i>
 </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.search-b
   color:#fff
   display: flex
   align-items: center
   justify-content space-around
   box-sizing: border-box
   width: 100%
   padding: 0 6px
   height: 40px
   border-radius 10px
   padding-top: 10px
  .icon-back
    font-size:25px
  .box
    width: 80%
    height: 40px
    background:#ee0000
    color:#fff
    border-bottom: 1px solid #fff
    outline:none
    font-weight:600
  .icon-delete
    font-size: 22px
</style>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/util'
export default {
  props: {
    searchQ: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: ''
    }
  },
  created () {
    this.query = this.searchQ
    this.$watch('query', debounce((newV) => {
      this.$emit('searchQuery', newV)
    }, 400))
  },
  methods: {
    blur () {
      this.$refs.sea.blur()
    },
    back () {
      this.$emit('back')
    },
    deleteQuery () {
      this.query = ''
    }
  }
}
</script>
