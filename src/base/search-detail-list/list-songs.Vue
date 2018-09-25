<template>
 <scroll class="list-songs" ref="scroll">
   <ul class="list">
     <li class="list-item" v-for="item in songs" @click="inser(item)">
       <p class="song-n">{{item.name}}</p>
       <div class="songs-item">
         <span>{{item.singer}} -</span>
         <span>{{item.type}}</span>
       </div>
       <p v-show="item.alias.length > 0" class="songs-a">{{item.alias[0]}}</p>
     </li>
   </ul>
 </scroll>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list-songs
   background:#f7f7f7
   height: 100%
   width: 100%
 .list
   padding: 20px 10px
 .list-item
   height: 60px
   width: 100%
   padding-bottom: 5px
  .song-n
    color:#5CACEE
    margin: 8px 0 5px 0px
  .songs-item, .songs-a
    font-size:12px
    color:#595959
    margin: 5px 0 5px 0px
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import scroll from 'base/scroll/scroll'
import {createSong} from 'common/js/song'
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      songs: []
    }
  },
  mounted () {
    this.initSongs()
  },
  methods: {
    ...mapActions([
      'inserSong'
    ]),
    initSongs () {
      var data = {
        keywords: this.currentSearch,
        type: 1
      }
      return new Promise((resolve, reject) => {
        axios('search', {params: data}).then((res) => {
          if (res.data.code === 200) {
            this.songs = this.createMusic(res.data.result.songs)
            setTimeout(() => {
              this.$refs.scroll.refresh()
            }, 300)
            resolve(this.songs)
          }
        })
      })
    },
    inser (item) {
      this.inserSong(item)
    },
    createMusic (list) {
      var List = []
      list.forEach((res) => {
        var musicData = {
          id: res.id,
          singer: res.artists[0].name,
          name: res.name,
          type: res.album.name,
          musicImg: 'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          duration: res.duration,
          alias: res.alias
        }
        List.push(createSong(musicData))
      })
      return List
    }
  },
  computed: {
    ...mapGetters([
      'currentSearch'
    ])
  },
  components: {
    scroll
  },
  watch: {
    currentSearch (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.initSongs()
      }
    }
  }
}
</script>
