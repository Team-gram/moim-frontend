import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    kakaouserinfo:"",
    userinfo:"",
    jwt:"",
  },
  mutations:{
    JwtSet(state,data){
      this.jwt=data;
    },
    KakaouserSet(state,data){
      this.kakaouserinfo=data;
    },
    Moimuserinfo(state,data){
      this.userinfo = data;
    },
  },
  actions:{
  },
});

export default store;
