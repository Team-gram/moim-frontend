import Vue from 'vue'
import Vuex from 'vuex'
import { getUserinfo } from '@/services/login';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import searchStore from '@/store/modules/searchStore';

const store = new Vuex.Store({
  state:{
    userinfo:"",
    width:400,
    height:650,
  },
  getters: {
    getUserData(state) {
      return state.userinfo;
    }
  },
  mutations:{
    MoimUserInfo(state,data){
      state.userinfo = data;
      console.log(data);
    },
    Resize(state,width,height){
      state.width = width;
      state.height = height;
    }
  },
  actions:{
   async UpdateUserInfo(state, userId){
      console.log("hi?");
      if(state.userinfo==undefined){

        var data = await getUserinfo(userId);
        state.commit('MoimUserInfo',data.data);
      }
    }
  },
  modules: {searchStore},
  plugins: [createPersistedState({
    paths: ['searchStore'],
  })],
});

export default store;
