// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './store.js'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.use(VueRouter)
Vue.config.productionTip = false
import router from './router';
new Vue({
  store,
  router,
  render:h=>h(App)
}).$mount('#app')
