import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    kakaouserinfo:"",
    userinfo:"",
  },
  mutations:{
    KakaouserSet(state,data){
      this.kakaouserinfo=data;
    },
    Moimuserinfo(state,data){
      this.userinfo = data;
    }
  },
  actions:{
  },
});

export default store;
