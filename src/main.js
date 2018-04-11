import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import './common/stylus/index.styl'

/* eslint-disable no-new */

fastclick.attach(document.body)

Vue.use(VueLazyLoad)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
