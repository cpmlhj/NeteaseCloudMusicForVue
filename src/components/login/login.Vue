<template>
 <transition name="el-zoom-in-top">
 <div class="login" >
   <div class="Image">
     <img src="./music.png" alt="">
   </div>
   <div class="login-input">
     <div class="phone">
       <input type="number" v-model="phoneNumber" placeholder="请输入您的手机号">
     </div>
     <div class="phone">
       <input type="password" v-model="password" placeholder="请输入您的密码">
     </div>
     <div class="button-login" @click.stop="login">
       <el-button type="primary">点击登录</el-button>
     </div>
   </div>
   <div class="fixed">
   <div class="other-login">
     <div class="top">
       <div class="left"></div>
       <div class="middle">其他登录方式</div>
       <div class="right"></div>
     </div>
     <div class="bottom">
       <div class="icon">
         <i class="iconfont icon-weixin" style="color:#32CD32">&#xe658;</i>
         <span>微信</span>
       </div>
       <div class="icon">
         <i class="iconfont icon-qq" style="color:#1e90ff">&#xe61c;</i>
         <span>QQ</span>
       </div>
       <div class="icon">
         <i class="iconfont icon-weibo" style="color:#ee0000">&#xe630;</i>
         <span>微博</span>
       </div>
       <div class="icon">
         <i class="iconfont icon-youxiang" style="color:#ee0000">&#xe748;</i>
         <span>网易邮箱</span>
       </div>
     </div>
   </div>
   </div>
 </div>
 </transition>
</template>

<style scoped rel="stylesheet/stylus" lang="stylus">
 .login
   position: fixed
   top: 0
   bottom: 0
   width: 100%
   z-index: 200
   background-image: url('//s3.music.126.net/m/s/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922')
   text-align center
  .Image
    margin 60px auto
   img
    width:70px
    height:70px
 .login-input
   width: 100%
  .phone
    margin: 30px auto
    width:70%
    height:40px
    input
      width: 100%
      height:35px
      margin 0 auto
      border:1px solid #ee0000
      border-radius 10px
  .button-login
     margin 10px auto
     width: 70%
   button
     width: 100%
     height:40px
     border-radius 15px
     background:#1E90FF
     border none
     color: white
 .fixed
   width: 100%
   position:absolute
   bottom: 0
  .other-login
    margin: 70px auto
    width: 80%
   .top
     display flex
     flex-flow row nowrap
     justify-content space-between
     align-items center
    .left, .right
     width:20%
     border 0.5px solid #dedede
   .middle
     width:35%
     font-size 14px
  .bottom
    display flex
    flex-flow row nowrap
    justify-content space-between
    align-items center
    padding-top:20px
    .icon
      display: flex
      flex-flow column wrap
      justify-content center
      align-content space-between
     .iconfont
      font-size 35px
      border-color #dedede
   .icon span
     font-size 14px
     color:#6E7B8B
     padding-top:8px
  .back
    position:absolute
    top: 10px
    left: 8px
   .icon-back
     font-size:20px
     color:#444
</style>

<script type="text/ecmascript-6">
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      phoneNumber: '',
      password: '',
      flag: false
    }
  },
  methods: {
    ...mapActions([
      'setCustomer'
    ]),
    login () {
      axios.get(`login/cellphone?phone=${this.phoneNumber}&password=${this.password}`, {
      }).then((res) => {
        console.log(res)
        let cookies = {
          customer: this.phoneNumber,
          userId: res.data.bindings[1].userId
        }
        this.setCustomer(cookies)
      }).then(() => {
        setTimeout(() => {
          this.$router.push({
            path: '/music/find'
          })
        }, 200)
        this.phoneNumber = ''
        this.password = ''
      })
    }
  }
}
</script>
