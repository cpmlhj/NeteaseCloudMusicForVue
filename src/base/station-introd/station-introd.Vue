<template>
  <div class="introd">
    <div class="title"><span class="t-n">主播</span></div>
    <div class="customer">
      <div class="image">
        <img :src="dj.avatarUrl" style="border-radius: 50%" width="100%" height="100%" v-if="introd">
      </div>
      <div class="cus-desc">
        <p class="cus-n">{{dj.nickname}}</p>
        <p class="cus-d">{{dj.signature}}</p>
      </div>
      <div class="reward-count">
        <span>{{dj.rewardCount}}次赞赏</span>
      </div>
    </div>
    <div class="title"><span class="t-n">电台内容简介</span></div>
     <div class="desc">
       <div class="classify">
         <span>分类:</span>
         <span class="c-f">{{introd.category}}</span>
       </div>
       <p v-html="introd.desc" class="detail"></p>
     </div>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
.introd
  background:#f7f7f7
.title
  height: 50px
  line-height 50px
  width: 100%
 .t-n
   border-left 2px solid #ee0000
   padding-left: 4px
 .customer
    height: 80px
    display flex
    justify-content space-around
    align-items center
    border-bottom 1px solid #ddd
    border-top: 1px solid #ddd
  .image
    height:60px
    width: 60px
 .cus-desc
    height: 60px
    width: 65%
  .cus-n, .cus-d
    margin: 8px 5px
  .cus-n
    font-weight 600
  .cus-d
    font-size:14px
    color:#595959
    margin-top: 5px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
 .reward-count
    width: 18%
    height: 60px
    line-height 60px
    color:#ee0000
    font-size:13px
 .desc
    margon-top: 12px
  .c-f
    display inline-block
    width: 60px
    height:20px
    line-height 20px
    text-align center
    border: 1px solid #ee0000
    font-size: 14px
    color:#ee0000
  .detail
    padding: 10px 10px
    line-height 130%
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data () {
    return {
      introd: {},
      dj: {}
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      var data = {
        rid: this.id
      }
      axios('dj/detail', {params: data}).then((res) => {
        if (res.data.code === 200) {
          this.introd = res.data.djRadio
          this.dj = res.data.djRadio.dj
        }
      })
    }
  }
}
</script>
