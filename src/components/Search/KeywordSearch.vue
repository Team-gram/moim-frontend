<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <div id="main-text">
      <b id="main-text-highlight"
        >'{{ this.oldSearchKeyword }}'에 대한 검색 결과</b
      >
    </div>
    <searchbar v-on:searchKeyword="searchKeyword"></searchbar>
    <searchfilter></searchfilter>
  </div>
</template>

<script>
// import locationjson from "@/data/법정동.json";
// import categoryjson from "@/data/카테고리.json";
import searchbar from "@/components/Search/SearchBar";
import searchfilter from "@/components/Search/SearchFilter";
export default {
  components: {
    searchbar,
    searchfilter,
  },
  data() {
    return {
      oldSearchKeyword: null,
      newSearchKeyword: "",
    };
  },
  methods: {
    searchKeyword: function (Data) {
      this.$store.commit("searchStore/setSearchType", "keyword");
      this.$store.commit("searchStore/setSearchData", Data);
      this.$store.commit("searchStore/initKeywordSearchOptions");
      this.$router.go(this.$router.currentRoute);
      // this.$router.push({
      //   name: "MoimSearchList",
      // });
    },
  },
  created() {
    this.oldSearchKeyword = this.$store.getters["searchStore/getSearchData"];
  },
};
</script>

<style>
#keyword-name {
  font-weight: bold;
  margin: 10px 0 30px 0;
}
</style>
