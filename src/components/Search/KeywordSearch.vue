<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <h4 id="keyword-name">'{{ this.oldSearchKeyword }}'에 대한 검색 결과</h4>
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
      this.$router.push({
        name: "MoimSearchList",
        query: { type: "keyword", data: Data },
      });
    },
  },
  created() {
    this.oldSearchKeyword = this.$store.getters['searchStore/getSearchData'];
  },
};
</script>

<style>
#keyword-name {
  font-weight: bold;
  margin: 10px 0 30px 0;
}
</style>
