import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueAxios from 'vue-axios'
import store from "./store";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.Kakao.init('562fa760eb046b2bf13d97aa8556d908');
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$axios = axios //axios 전역 사용
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
