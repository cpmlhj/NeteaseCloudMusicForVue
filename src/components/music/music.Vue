<template>
  <div class="music">
    <div class="music-header">
      <li v-for="(item, index) in tabName " :class="{'select' : index === pageIndex}" class="list-item">
        <router-link tag="div" :to="item.path">
          <span class="item">{{item.name}}</span>
        </router-link>
      </li>
    </div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
@import "~common/stylus/variable"
  .music-header
    display: flex
    flex-direction row
    justify-content space-around
    align-items center
    height:50px
    background:#ee0000
    color:#fff
    padding-bottom:4px
  .list-item
     width:50px
     height:30px
     text-align center
     line-height 30px
  .sliderleft-enter-active, .sliderleft-leave-active
    transition:all 0.3s
  .sliderleft-enter, .sliderleft-leave-to
    transform: translate3d(-100%, 0, 0)
  .slideright-enter-active, .slideright-leave-active
    transition:all 0.3s
  .slideright-enter, .slideright-leave-to
    transform: translate3d(100%, 0, 0)
  .select
    font-weight: 800
    border-bottom 4px solid #fff
</style>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      transitionName: '',
      routeName: ['find', 'mine', 'FM'],
      tabName: [],
      pageIndex: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.tabName = [
        {
          path: '/music/find',
          name: '发现'
        },
        {
          path: '/music/mine',
          name: '我的'
        },
        {
          path: '/music/videoStation',
          name: '电台'
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      const toNameindex = this.routeName.indexOf(to.name)
      this.pageIndex = toNameindex
      const fromName = this.routeName.indexOf(from.name)
      this.transitionName = toNameindex > fromName ? 'sliderleft' : 'slideright'
    }
  }
}
</script>
