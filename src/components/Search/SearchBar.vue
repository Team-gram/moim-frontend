<template>
  <div id="searchBox">
    <b-row align-h="between">
      <b-col>
        <b-form-input
          id="searchInput"
          type="text"
          v-model="searchKeyword"
          placeholder="검색어를 입력하세요."
          @keyup.enter="Submit()"
        ></b-form-input>
      </b-col>
      <b-col cols="auto">
        <b-img
          @click="Submit()"
          id="search-button"
          :src="require('@/assets/search.png')"
        ></b-img>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: "",
    };
  },
  methods: {
    Submit: function () {
      if(this.searchKeyword.split(' ').join('') !== "") {
        this.$emit("searchKeyword", this.searchKeyword);
      }
      // console.log(this.searchKeyword);
    },
  },
};
</script>
<style>
#searchBox {
  border-radius: 20px !important;
  border: 0px solid;
  background-color: #f3f3f3 !important;
  float: center;
  max-width: 700px;
  height: 40px;
  margin: 10px 0 10px 0;
}
#searchInput {
  float: left;
  border: 0px solid;
  background-color: rgba(0, 0, 0, 0);
  margin: 0 0 0 9px;
  /* width: 80% !important; */
}
#search-button {
  cursor: pointer;
  height: 20px;
  width: 20px;
  float: right;
  margin: 9px 20px 0 0;
}
</style>
