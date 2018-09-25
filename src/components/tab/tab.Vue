<template>
  <div class="header-nav">
    <router-link tag="div" to="/video">
      <i class="icon-video iconfont">&#xe650;</i>
    </router-link>
    <router-link tag="div" to="/music">
      <i class="icon-music iconfont">&#xe680;</i>
    </router-link>
    <router-link tag="div" to="/community">
      <i class="icon-community iconfont">&#xe71d;</i>
    </router-link>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .header-nav
    display:flex
    flex: 0.75
    flex-direction: row
    justify-content: space-around
    align-items:center
    .iconfont
       display block
       color:$color-background
       font-size:25px
</style>

<script></script>
