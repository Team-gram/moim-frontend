import Vue from 'vue';
import VueRouter from 'vue-router';
import KakaoLogin from '../views/kakaologin.vue'
import HelloWorld from '@/components/HelloWorld.vue'
Vue.use(VueRouter);

const routes = 
[
  {
    path: '/kakaologin',
    name: 'KakaoLogin',
    component: KakaoLogin
  },
  {
    path: "/helloworld",
    name: 'HelloWorld',
    component: HelloWorld
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router