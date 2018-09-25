<template>
 <div class="listDetail">
   <li class="list-item" v-for="item in Detail" :key="item.name">
     <div class="item-top">
       <div class="Number" v-if="item.trackCount">
         <i class="iconfont icon-listen">&#xe6bf;</i>
         <span>{{item.trackCount}}万</span>
       </div>
       <div class="image">
         <img :src="item.picUrl" alt="">
       </div>
     </div>
     <div class="item-bottom">
       {{item.name}}
     </div>
   </li>
 </div>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
@import "~common/stylus/variable"
 .listDetail
   display: flex
   flex-flow: row wrap
   justify-content space-between
   .list-item
     display: flex
     width: 32%
     flex-flow column wrap
     position: relative
     padding-bottom 15px
     justify-content space-around
    .Number
      position: absolute
      top: 0
      right:10px
      color:#fff
      font-size:14px
    img
     width: 97%
     height: 100%
     border-radius 10px
  .item-bottom
   font-size: 15px
   padding-top:5px
   white-space nowrap
   text-overflow:ellipsis
   overflow hidden
</style>

<script type="text/ecmascript-6">
export default {
  props: {
    Detail: {
      type: Array,
      default: []
    }
  },
  methods: {
  }
}
</script>
