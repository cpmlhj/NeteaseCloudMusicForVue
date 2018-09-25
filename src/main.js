// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import './common/stylus/index.styl'
import lazy from 'vue-lazyload'
import Cookies from 'vue-cookies'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filter from 'common/filters/vue-filter'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.use(Cookies)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(lazy, {
  loading: require('common/image/loading.gif'),
  attempt: 3
})

axios.defaults.baseURL = 'http://localhost:8686/'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
