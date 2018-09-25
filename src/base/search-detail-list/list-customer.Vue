<template>
  <scroll class="list-customer">
    <ul class="list">
      <li class="list-item" v-for="item in cus">
        <div class="list-l">
          <img :src="item.img" width="100%" height="100%" style="border-radius: 50%">
        </div>
        <div class="list-r">
          <p class="cus-n">
            <span>{{item.nickname}}</span>
           <i class="iconfont icon-mal" v-if="item.gender === 1">&#xe63c;</i>
            <i class="iconfont icon-femal" v-if="item.gender === 2">&#xe63d;</i>
          </p>
          <p class="cus-sign">{{item.signature}}</p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .list-customer
   width: 100%
   height: 100%
   background: #fcfcfc
  .list
    padding: 20px 10px
   .list-item
     height: 60px
     width: 100%
     display flex
     justify-content: space-around
     padding-bottom: 10px
    .list-l
      width: 16%
      height: 60px
    .list-r
      width: 80%
      height: 60px
      border-bottom: 1px solid #ccc
    .cus-n, .cus-sign
      margin-top: 10px
    .cus-sign
      font-size: 12px
      color:#595959
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
    .icon-mal
      color:#5CACEE
    .icon-femal
      color:#FF83FA
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters} from 'vuex'
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
      cus: [],
      currentPage: 5
    }
  },
  methods: {
    initCs () {
      var data = {
        keywords: this.id,
        type: 1002
      }
      axios('search', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.cus = this.initImage(res.data.result.userprofiles)
          console.log(this.cus)
        }
      })
    },
    initImage (list) {
      list.forEach((res) => {
        res.img = `${res.avatarUrl}?param=130y130`
      })
      return list
    },
    gender (g) {
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
        if (this.cus > 2) {
          return
        }
        this.initCs()
      }
    },
    id (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.cus = []
      }
    }
  }
}
</script>
