<template>
 <div class="shade" v-show="shade" @click.stop="hide">
   <i>{{shade}}</i>
 </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .shade
   position fixed
   z-index: 220
   top:0
   left:0
   background #000
   opacity 0.7
   width:100%
   height:100%
</style>

<script type="text/ecmascript-6">
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'shade'
    ])
  },
  methods: {
    ...mapActions([
      'setShade'
    ]),
    hide () {
      this.setShade(false)
      this.setSlider(false)
      this.setShowPlayList(false)
    },
    ...mapMutations({
      setSlider: 'SET_SLIDER',
      setShowPlayList: 'SET_SHOW_PLAY_LIST'
    })
  }
}
</script>
