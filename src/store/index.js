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

  },
  mutations:{
    MoimUserInfo(state,data){
      state.userinfo = data;
    },
    Resize(state,width,height){
      state.width = width;
      state.height = height;
    }
  },
  actions:{
   async UpdateUserInfo(state){
      if(state.userinfo==null){
        var data = await getUserinfo(this.$cookies.get("MoimUserId"));
        state.commit('MoimUserInfo',data);
      }
    }
  },
  modules: {searchStore},
  plugins: [createPersistedState({
    paths: ['searchStore'],
  })],
});

export default store;
