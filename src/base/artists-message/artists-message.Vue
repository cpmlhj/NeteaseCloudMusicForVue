<template>
  <div class="artists-album">
    <scroll class="list-wrapper" :data="simiArtist" ref="scroll">
      <div>
    <h1 class="title" v-html="initName"></h1>
    <p class="desc">{{desc}}</p>
     <div class="show-detail" @click="showIntrod(introduce, desc)">完整歌手介绍</div>
    <h1 class="title">相似歌手</h1>
    <swiper ref="wrapper" :options="swiperOption">
      <swiper-slide v-for="item in simiArtist">
         <div class="simi">
           <img :src="item.picUrl" class="image" @click="goToArtist(item, item.id)">
           <p class="simiName">{{item.name}}</p>
         </div>
      </swiper-slide>
    </swiper>
      </div>
  </scroll>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.artists-album
  background:#f7f7f7
  min-height:100px
 .list-wrapper
    height:350px
    overflow hidden
 .title
   padding: 15px 10px
   font-size:18px
   border-left: 3px solid #ee0000
   padding-left:5px
 .desc
   letter-spacing 3px
   font-size:13px
   padding: 10px 5px
   word-spacing:8px
   color:#595959
   line-height 120%
 .show-detail
   width: 100%
   text-align center
   color:#595959
  .simi
    width: 80px
   .image
     border-radius 5px
     width:70px
     height:70px
   .simiName
     font-size:13px
     color:#595959
     padding:8px auto
     width:60px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
import introduction from 'base/introduction/introduction'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      pageIndex: 3,
      desc: null,
      introduce: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        freeMode: true
      },
      simiArtist: []
    }
  },
  methods: {
    _initMessage () {
      var data = {id: this.id}
      return new Promise((resolve, reject) => {
        axios('artist/desc', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.desc = res.data.briefDesc
            this.introduce = res.data.introduction
            resolve(this.desc)
          } else {
            reject('error')
          }
        })
      })
    },
    _initSimiArtist () {
      var data = {id: this.id}
      return new Promise((resolve, reject) => {
        axios('simi/artist', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.simiArtist = this._initData(res.data.artists)
            this.$refs.scroll.refresh()
          } else {
            reject('error')
          }
        })
      })
    },
    showIntrod (introduce, desc) {
      this.$emit('showDesc', introduce, desc)
    },
    _initData (list) {
      list.forEach((res) => {
        var pic = res.picUrl
        res.picUrl = `${res.picUrl}?param=130y130`
        res.artistsPic = pic
      })
      return list
    },
    goToArtist (item, id) {
      this.$emit('simiArtist', item, id)
    }
  },
  computed: {
    ...mapGetters([
      'artistPageIndex',
      'artists'
    ]),
    initName () {
      return `${this.artists.name} 简讯`
    },
    swiper () {
      return this.$refs.wrapper.swiper
    }
  },
  watch: {
    artistPageIndex () {
      if (this.pageIndex === this.artistPageIndex) {
        if (this.desc) {
          return
        }
        this._initMessage()
        this._initSimiArtist()
      }
    },
    id () {
      this.desc = null
    }
  },
  components: {
    introduction,
    swiper,
    swiperSlide,
    Scroll
  }
}
</script>
