const state = {
  type: null,
  data: null,
  options: {},
  details: {},
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
  },
  getSelectedMoimId(state) {
    return state.details.id;
  },
  getSelectedMoimData(state) {
    return state.details.data;
  },
  getSelectedMoimHostId(state) {
    return state.details.Hostid;
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
  setSelectedMoimId(state, id) {
    state.details.id = id;
  },
  setSelectedMoimHostId(state, hostid) {
    state.details.Hostid = hostid;
  },
  setSelectedMoimDate(state, data) {
    state.details.data = data;
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
