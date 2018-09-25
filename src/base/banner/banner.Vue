<template>
   <div class="banner" ref="banner" v-show="!imageList">
     <div class="banner-item" ref="bannerItem">
      <slot></slot>
      </div>
     <div class="dots">
     <span class="dot" v-for="(item, index) in dots" :key="item" :class="{active: currentPageIndex === index}"></span>
      </div>
   </div>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
@import "~common/stylus/variable"
 .banner
   min-height: 1px
   position relative
  .banner-item
    position: relative
    overflow: hidden
    white-space: nowrap
   .banner-items
     float: left
     box-sizing: border-box
     overflow: hidden
     text-align: center
     a
       display: block
       width: 100%
       overflow: hidden
       text-decoration: none
     img
       display: block
       width: 100%
       height:100%
   .dots
     position: absolute
     right: 0
     left 0
     bottom: 12px
     text-align center
     font-size 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background:#ee0000
      &.active
        width: 20px
        border-radius:5px
        background:$color-text-ll
</style>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    imageList: {
      type: Array,
      default: null
    }
  },
  mounted () {
    setTimeout(() => {
      this._setBannerWidth()
      this._initSlider()
      this._initDots()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setBannerWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setBannerWidth (isResize) {
      let width = 0
      this.children = this.$refs.bannerItem.children
      let sliderWidth = this.$refs.banner.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'banner-items')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += sliderWidth * 2
      }
      this.$refs.bannerItem.style.width = width + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.banner, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      this.slider.on('scrollEnd', () => {
        let PageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          PageIndex -= 1
        }
        this.currentPageIndex = PageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots () {
      this.dots = new Array(this.children.length - 2)
    },
    _play () {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
