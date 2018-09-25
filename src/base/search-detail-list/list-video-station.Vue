<template>
 <scroll class="list-station">
   <ul class="list">
     <li class="list-item" v-for="item in Fm" @click="goToStation(item)">
       <div class="list-l">
         <img :src="item.img" width="100%" height="100%" style="border-radius: 8px">
       </div>
       <div class="list-r">
         <p class="playlist-n">{{item.name}}</p>
         <p class="playlist-d">
           <span>{{item.dj.nickname}}</span>
         </p>
       </div>
     </li>
   </ul>
 </scroll>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .list-station
    width:100%
    height: 100%
    background: #fcfcfc
  .list
    padding: 20px 10px
  .list-item
    height: 60px
    width 100%
    display: flex
    justify-content: space-around
    align-items center
    padding-bottom: 10px
  .list-l
    width: 16%
    height: 60px
  .list-r
    width: 80%
    height: 60px
    line-height 15px
    border-bottom: 1px solid #ddd
  .playlist-n, .playlist-d
    margin-top: 10px
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
  .playlist-d
    font-size:12px
    color:#595959
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      Fm: [],
      currentPage: 6
    }
  },
  methods: {
    ...mapMutations({
      setStation: 'SET_STATIONS_DETAIL'
    }),
    initFm () {
      var data = {
        keywords: this.id,
        type: 1009
      }
      axios('search', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.Fm = this.initImage(res.data.result.djRadios)
        }
      })
    },
    initImage (list) {
      list.forEach((res) => {
        res.img = `${res.picUrl}`
      })
      return list
    },
    goToStation (item) {
      this.setStation(item)
      this.$emit('station')
    }
  },
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'searchPageIndex'
    ])
  },
  watch: {
    searchPageIndex () {
      if (this.currentPage === this.searchPageIndex) {
        if (this.Fm > 2) {
          return
        }
        this.initFm()
      }
    },
    id (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.Fm = []
      }
    }
  }
}
</script>
