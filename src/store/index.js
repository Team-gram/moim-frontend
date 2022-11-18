import Vue from 'vue'
import Vuex from 'vuex'
import { getUserinfo } from '@/services/login';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userinfo:"",
  },
  mutations:{
    MoimUserInfo(state,data){
      state.userinfo = data;
    },
  },
  actions:{
   async UpdateUserInfo(state){
      if(state.userinfo==null){
        var data = await getUserinfo(this.$cookies.get("MoimUserId"));
        state.commit('MoimUserInfo',data);
      }
    }
  },
});

export default store;
