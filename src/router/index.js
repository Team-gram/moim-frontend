
import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue'
import Register from "@/views/registerPage"
import MainHome from "@/views/mainhome"
import MoimSearchList from '@/views/moimSearchList'
import UserSetting from '@/views/userSetting'
import MoimCalendar from '@/views/MoimCalendar'
import MyMoim from '@/views/MyMoim'
import MoimIntro from '@/views/moimIntro'
import NewMoim from '@/views/newMoim'
import RegisterSchedule from '@/views/RegisterSchedule'
Vue.use(VueRouter);

const routes = 
[
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
  },
  {
    path:"/mymoim",
    name: 'MyMoim',
    component: MyMoim
  },
  {
    path:"/moimintro",
    name: 'MoimIntro',
    component: MoimIntro
  },
  {
    path:"/newmoim",
    name: 'NewMoim',
    component: NewMoim
  },
  {
    path:"/schedule/register",
    name: 'RegisterSchedule',
    component: RegisterSchedule,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router