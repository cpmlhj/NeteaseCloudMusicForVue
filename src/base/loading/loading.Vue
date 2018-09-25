<template>
 <div class="loading" v-show="loading">
   <div class="detail">
     <img src="./loading2.gif" width="80" height="80" style="border-radius: 50%">
   </div>
 </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .loading
   position:fixed
   top: 0px
   left: 0px
   width: 100%
   height:100%
   background rgba(255, 255, 255 , 0.5)
   .detail
     margin: 300px auto
     width:80px
     height:80px
</style>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: '正在载入'
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
}
</script>
