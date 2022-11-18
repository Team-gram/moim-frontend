const state = {
  type: null,
  data: null,
};
const getters = {
  getSearchType(state) {
    return state.type;
  },
  getSearchData(state) {
    return state.data;
  },
};
const mutations = {
  setSearchType(state, type) {
    state.type = type;
  },
  setSearchData(state, data) {
    state.data = data;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
