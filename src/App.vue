<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
    <router-view/>
    </keep-alive>
    <shade></shade>
    <play @comment="goToComment"></play>
    <loading></loading>
  </div>
</template>

<script>
import MHeader from 'components/header/header'
import Tab from 'components/tab/tab'
import Shade from 'base/shade/shade'
import Play from 'components/play/play'
import Loading from 'base/loading/loading'
import personFm from 'components/personalFM/personalFM'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Shade,
    Play,
    Loading,
    personFm
  },
  methods: {
    goToComment (item) {
      this.$router.push({
        name: 'comment',
        params: {song: item}
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
