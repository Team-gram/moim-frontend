
import Vue from 'vue';
import VueRouter from 'vue-router';
import KakaoLogin from '@/views/kakaologin.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Register from "@/views/registerPage"
import MainHome from "@/views/mainhome"
import MoimSearchList from '@/views/moimSearchList'
import UserSetting from '@/views/userSetting'
import MoimCalendar from '@/views/MoimCalendar'
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
    component: Register
  },
  {
    path: "/",
    name: 'MainHome',
    component: MainHome
  },
  {
    path: "/search",
    name: 'MoimSearchList',
    component: MoimSearchList
  },
  {
    path: "/setting",
    name: 'UserSetting',
    component: UserSetting
  },
  {
    path:"/calendar",
    name: 'MoimCalendar',
    component: MoimCalendar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router