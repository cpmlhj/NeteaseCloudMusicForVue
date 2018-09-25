<template>
 <transition name="slider">

   <div class="sliders" v-show="slider">
    <div class="top">
      <div class="customer-img"></div>
      <span class="customer-name">{{getCustomer}}</span>
    </div>
   <div class="middle">
     <div class="list">
       <i class="iconfont icon-message">&#xe748;</i>
       <span>我的信息</span>
     </div>
     <div class="list">
       <i class="iconfont icon-vip">&#xe60a;</i>
       <span>vip会员</span>
     </div>
     <div class="list">
       <i class="iconfont icon-shop">&#xe620;</i>
       <span>商城</span>
     </div>
     <div class="list">
       <i class="iconfont icon-online">&#xe76a;</i>
       <span>在线听歌免流量</span>
     </div>
     <div class="list">
       <i class="iconfont icon-friend">&#xe625;</i>
       <span>我的好友</span>
     </div>
     <div class="list">
       <i class="iconfont icon-map">&#xe60d;</i>
       <span>附近的人</span>
     </div>
     <div class="list">
       <i class="iconfont icon-shirt">&#xe666;</i>
       <span>个性皮肤</span>
     </div>
     <div class="list">
       <i class="iconfont icon-lsiten">&#xe61f;</i>
       <span>听歌识曲</span>
     </div>
     <div class="list">
       <i class="iconfont icon-time">&#xe78b;</i>
       <span>定时停止播放</span>
     </div>
   </div>
   <div class="bottom" @click="logout">
     <i class="iconfont icon-power">&#xe601;</i>
     <span>退出登录</span>
   </div>
   </div>
 </transition>
</template>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  .sliders
    position fixed
    z-index:2000
    width: 80%
    top: 0
    bottom: 0
    left:0
    background-color:#fff
   .top
     background-image:url("./timg.jpg")
     background-size 100% 100%
     height:180px
     width:100%
     position: relative
    .customer-img
      position absolute
      top:30px
      left:10px
      width:80px
      height:80px
      border-radius 50%
      background-image url("Kobe.jpeg")
      background-size 100% 100%
    .customer-name
      position absolute
      bottom:10px
      left:8px
      color:#fff
   .middle
     width: 100%
     height:65%
     display: flex
     flex-flow column wrap
     .list
       display: flex
       flex: 1
       height: 11%
       flex-flow row nowrap
       justify-content left
       padding: 6px
       font-size:15px
       align-items center
       .iconfont
         font-size 18px
         padding-right 5px
         color:#6E7B8B
   .bottom
     width: 100%
     display flex
     height:50px
     flex-flow row nowrap
     justify-content flex-end
     align-items center
     span
        padding: 0 10px 0 5px
  .slider-enter-active, .slider-leave-active
    transition all 0.2s
  .slider-enter, .slider-leave-to
    transform translate3d(-100%, 0, 0)
  .list:nth-of-type(4), .list:nth-of-type(6)
    border-bottom 4px solid #ddd
</style>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'slider',
      'customer'
    ]),
    getCustomer () {
      if (!this.customer.customer) {
        setTimeout(() => {
          this.$router.push({
            path: '/login'
          })
        }, 500)
        this.setSlider(false)
        this.setShade(false)
      } else {
        return `${this.customer.customer}`
      }
    }
  },
  methods: {
    ...mapMutations({
      setSlider: 'SET_SLIDER',
      setShade: 'SET_SHADE',
      setCustomer: 'SET_CUSTOMER'
    }),
    logout () {
      this.setCustomer({})
    }
  }
}

</script>
