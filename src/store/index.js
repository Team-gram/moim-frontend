import Vue from 'vue'
import Vuex from 'vuex'
import { getUserinfo } from '@/services/login';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import searchStore from '@/store/modules/searchStore';
import chatStore from '@/store/modules/chatStore';
const store = new Vuex.Store({
  state:{
    userinfo:"",
    width:400,
    height:650,
    isphone:false,
  },
  getters: {
    getUserData(state) {
      return state.userinfo;
    },
    getPhone(state){
      return state.isphone;
    },
    getSize(state){
      return [state.width,state.height];
    }
  },
  mutations:{
    MoimUserInfo(state,data){
      state.userinfo = data;
    },
    Resize(state,width,height){
      state.width = width;
      state.height = height;
    },
    Phone(state,isphone){
      state.isphone = isphone
    },
  },
  actions:{
   async UpdateUserInfo(state, userId){
      if(state.userinfo==undefined){
        var data = await getUserinfo(userId);
        state.commit('MoimUserInfo',data.data);
      }
    }
  },
  modules: {searchStore,chatStore},
  plugins: [createPersistedState({
    paths: ['searchStore','chatStore'],
  })],
});

export default store;
