<template>
 <div class="progress-bar" ref="progressBar" @click="progressClick">
   <div class="bar-init">
     <div class="progress" ref="progress"></div>
     <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressStart" @touchmove.prevent="progressMove" @touchend.prevent="progressEnd">
       <div class="progress-btn"></div>
     </div>
   </div>
 </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .progress-bar
    height:30px
   .bar-init
     height:4px
     line-height:30px
     background rgba(0, 0, 0, 0.3)
    .progress
      position absolute
      height:4px
      background #ee0000
    .progress-btn-wrapper
      position relative
      top: -4px
      left:-3px
      width:15px
      height: 15px
      background #fff
      border-radius 50%
     .progress-btn
       position absolute
       width: 5px
       height:5px
       top:5px
       left:5px
       background:#ee0000
       border-radius 50%
</style>

<script type="text/ecmascript-6">
const progressBtnWidth = 15
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent (newper) {
      if (newper >= 0 && !this.touch.init) {
        var barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        var offwidth = barWidth * newper
        this._offset(offwidth)
      }
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    progressStart (e) {
      this.touch.init = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
      console.log(e.touches[0].pageX)
    },
    progressMove (e) {
      if (!this.touch.init) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, deltaX + this.touch.left))
      this._offset(offsetWidth)
    },
    _offset (offsetwidth) {
      this.$refs.progress.style.width = offsetwidth + 'px'
      this.$refs.progressBtn.style.transform = `translate3d(${offsetwidth}px, 0, 0)`
    },
    progressEnd (e) {
      this.touch.init = false
      this._getPercent()
    },
    progressClick (e) {
      const rec = this.$refs.progressBar.getBoundingClientRect()
      const offset = e.pageX - rec
      this._offset(offset)
    },
    _getPercent () {
      const barwidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barwidth
      this.$emit('percentChange', percent)
    }
  }
}
</script>
