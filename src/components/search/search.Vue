<template>
 <transition name="el-fade-in-linear">
   <div>
   <div class="search">
     <div class="search-box">
       <search-box @searchQuery="queryFn" @back="back"></search-box>
     </div>
     <div class="hot">
       <h1 class="hot-title">热门搜索</h1>
       <div class="hot-list">
         <li class="list-item" v-for="item in hotSearch" @click="searchDetail(item.first)">
           <span>{{item.first}}</span>
         </li>
       </div>
     </div>
     <div class="search-result" >
       <suggest :querys="query" @detail="searchDetail"></suggest>
     </div>
     <div class="search-history" v-show="searchHistory.length > 0">
       <transition-group name="deleteTransition">
        <li class="his-list" v-for="item in searchHistory" :key="item">
         <div class="list-l">
         <i class="iconfont icon-time">&#xe78b;</i>
         </div>
         <div class="list-r" @click.stop="searchDetail(item)">
         <span>{{item}}</span>
         <i class="iconfont icon-delete" @click.stop="deleteHistory(item)">&#xe70a;</i>
         </div>
        </li>
       </transition-group>
     </div>
   </div>
     <router-view></router-view>
   </div>
 </transition>
</template>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.search
  position: fixed
  background #f7f7f7
  top: 0
  left: 0
  right: 0
  bottom:0
 .search-box
   height: 50px
   position relative
   background:#ee0000
 .hot
   padding: 8px
   margin-top: 10px
  .hot-title
    font-size: 15px
    color:#595959
  .hot-list
    margin-top: 10px
    display: flex
    justify-content space-around
    flex-flow wrap row
  .list-item
    height: 30px
    line-height 30px
    text-align center
    border-radius 20px
    border: 1px solid #ddd
    margin: 10px 0 10px 10px
    padding: 5px 10px
 .search-result
   position fixed
   top: 65px
   left: 40px
   right: 0
 .search-history
   width 100%
   margin-top: 20px
  .his-list
    display: flex
    justify-content space-around
    align-items center
    height: 50px
   .list-l
     width: 10%
     font-size: 20px
   .list-r
     width: 85%
     display flex
     justify-content space-between
     height: 50px
     align-items center
     border-bottom: 1px solid #ddd
   .icon-time, .icon-delete
     font-size: 20px
  .deleteTransition-enter-active, .deleteTransition-leave-active
     transition: all 0.3s
  .deleteTransition-enter, .deleteTransition-leave-to
     height 0
     opacity 0
</style>

<script type="text/ecmascript-6">
import searchBox from 'base/search-box/search-box'
import suggest from 'base/suggestion/suggestion'
import axios from 'axios'
import {mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      hotSearch: [],
      query: ''
    }
  },
  mounted () {
    this.initHot()
  },
  methods: {
    queryFn (newY) {
      this.query = newY
    },
    initHot () {
      return new Promise((resolve, reject) => {
        axios('search/hot').then((res) => {
          if (res.data.code === 200) {
            this.hotSearch = res.data.result.hots
            resolve(this.hotSearch)
          } else {
            reject('error')
          }
        })
      })
    },
    searchDetail (name) {
      this.$router.push({
        path: '/search/detail'
      })
      this.setCurrentSearch(name)
      this.setSearchPage(0)
      this.saveSearchHistory(name)
    },
    deleteHistory (item) {
      this.deleteSearchHistorys(item)
    },
    back () {
      this.$router.back()
    },
    ...mapMutations({
      setCurrentSearch: 'SET_CURRENT_SEARCH',
      setSearchPage: 'SET_SEARCH_PAGE_INDEX'
    }),
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistorys'
    ])
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  components: {
    searchBox,
    suggest
  }
}
</script>
