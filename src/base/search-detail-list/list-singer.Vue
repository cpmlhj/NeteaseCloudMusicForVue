<template>
 <scroll class="list-singer" ref="scroll">
   <ul class="list">
     <li class="list-item" v-for="item in singerList" @click="goToSinger(item)">
       <div class="image">
         <img :src="item.img" width="100%" height="100%" style="border-radius: 6px">
       </div>
       <span class="singer">{{item.name}}</span>
     </li>
   </ul>
 </scroll>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .list-singer
   width:100%
   height:100%
   background:#FCFCFC
  .list
    padding: 20px 10px
   .list-item
     height: 55px
     width:100%
     display: flex
     align-items center
     justify-content space-around
     margin-bottom: 10px
    .image
      width 16%
      height:53px
    .singer
      width: 80%
      height 55px
      border-bottom: 1px solid #ddd
      line-height 55px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      singerList: [],
      currentPage: 2
    }
  },
  methods: {
    ...mapMutations({
      setSingerDetail: 'SET_ARTISTS_DETAIL'
    }),
    initSinger () {
      var data = {
        keywords: this.id,
        type: 100
      }
      axios('search', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.singerList = this.initImage(res.data.result.artists)
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 300)
        }
      })
    },
    initImage (list) {
      list.forEach((res) => {
        res.img = res.picUrl ? `${res.picUrl}?param=130y130` : `${res.img1v1Url}?param=130y130`
      })
      return list
    },
    goToSinger (item) {
      this.setSingerDetail(item)
      this.$emit('singer')
    }
  },
  computed: {
    ...mapGetters([
      'searchPageIndex'
    ])
  },
  components: {
    Scroll
  },
  watch: {
    searchPageIndex () {
      if (this.currentPage === this.searchPageIndex) {
        if (this.singerList.length > 2) {
          return
        }
        this.initSinger()
      }
    },
    id (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.singerList = []
      }
    }
  }
}
</script>
