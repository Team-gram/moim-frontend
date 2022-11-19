const state = {
  type: null,
  data: null,
  options: {},
};
const getters = {
  getSearchType(state) {
    return state.type;
  },
  getSearchData(state) {
    return state.data;
  },
  getSelectedSubCategory(state) {
    console.log(state.options.subCategory);
    return state.options.subCategory;
  },
  getSearchLocation(state) {
    return state.options.location;
  }
};
const mutations = {
  setSearchType(state, type) {
    state.type = type;
  },
  setSearchData(state, data) {
    state.data = data;
  },
  modifySearchOptions(state, data) {
    console.log(data);
    state.options[data.key] = data.value;
  },
  initKeywordSearchOptions(state) {
    state.options.location=null;
    state.options.subCategory = null;
  },
  initCategorySearchOptions(state) {
    state.options.location=null;
    state.options.title = null;
  },
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
