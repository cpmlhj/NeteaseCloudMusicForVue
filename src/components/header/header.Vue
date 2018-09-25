<template>
  <div class="header">
    <div class="slider" @click="goToLogin">
      <i class="icon-slider iconfont">&#xe639;</i>
    </div>
     <tab></tab>
    <div class="header-search">
      <router-link tag="div" to="/search">
      <i class="icon-search iconfont">&#xe613;</i>
      </router-link>
    </div>
    <slider ref="slider"></slider>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .header
    display: flex
    flex-direction row
    justify-content space-around
    height:50px
    background-color:#ee0000
    align-items: center
    .icon-search, .icon-slider
        padding: 8px
    .iconfont
      display block
      color:$color-background
      font-size:25px
</style>

<script type="text/ecmascript-6">
import Tab from 'components/tab/tab'
import Slider from 'base/slider/slider'
import {mapActions, mapMutations} from 'vuex'
export default {
  components: {
    Tab,
    Slider
  },
  methods: {
    goToLogin () {
      this.setShade(true)
      this.setSlider(true)
    },
    ...mapActions([
      'setShade'
    ]),
    ...mapMutations({
      setSlider: 'SET_SLIDER'
    })
  }
}
</script>
