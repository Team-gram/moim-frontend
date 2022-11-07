
import Vue from 'vue';
import VueRouter from 'vue-router';
import KakaoLogin from '../views/kakaologin.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import MoimSearchList from '@/views/moimSearchList'
import MoimMain from '@/views/mainhome.vue'

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
  {
    path: "/register",
    name: 'Register',
    component: () => import("@/views/registerPage"),
  },
  {
    path: "/search",
    name: 'MoimSearchList',
    component: MoimSearchList
  },
  {
    path: "/main",
    name: 'MoimMain',
    component: MoimMain
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router