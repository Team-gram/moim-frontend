const state = {
  chatList : [],
  newchatList : [],
};

const getters = {
  getchatList(state) {
    return state.chatList;
  },
  getnewchatList(state){
    console.log(state.newchatList)
    return state.newchatList
  }
};
const mutations = {
  setchatList(state, chatList) {
    state.chatList = [];
    state.newchatList = [];
    state.chatList = chatList;
  },
  pushnewchat(state,newchat){
    state.newchatList.push(newchat);
  }
};
const actions = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};