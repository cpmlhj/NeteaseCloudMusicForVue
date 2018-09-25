<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.0" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50"></circle>
      <circle class="progress-br" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharry" :stroke-dashoffset="dashOffset"></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .progress-circle
    position:relative
    background:#FFF
    circle
      stroke-width:8px
      transform-origin: center
      &.progress-background
        transform:scale(0.9)
        stroke:#ddd
      &.progress-br
        transform:scale(0.9) rotate(-90deg)
        stroke:#ee0000
</style>

<script type="text/ecmascript-6">
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dasharry: Math.PI * 100
    }
  },
  computed: {
    dashOffset () {
      return (1 - this.percent) * this.dasharry
    }
  }
}
</script>
