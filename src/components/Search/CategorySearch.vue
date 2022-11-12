<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <h4 id="category-name">{{ this.categoryName }}</h4>
    <div id="optionBox">
      <b-row>
        <b-col
          v-for="subCategory in subCategoryList"
          :key="subCategory"
          cols="auto"
          id="optionItem"
        >
          {{ subCategory }}
        </b-col>
      </b-row>
    </div>
    <searchfilter></searchfilter>
  </div>
</template>

<script>
// import locationjson from "@/data/법정동.json";
import categoryjson from "@/data/카테고리.json";
import searchfilter from "@/components/Search/SearchFilter";

export default {
  data() {
    return {
      categoryName: "",
      subCategoryList: [],
    };
  },
  components: {
    searchfilter,
  },
  methods: {},
  created() {
    this.categoryName = this.$route.query.data;
    
    for (var cat_index in categoryjson[this.categoryName]) {
      this.subCategoryList.push(categoryjson[this.categoryName][cat_index]);
    }
    // this.subCategoryList.sort();
  },
};
</script>

<style>
#category-name {
  font-weight: bold;
  margin: 10px 0 30px 0;
}

#optionBox {
  border-radius: 20px !important;
  border: 0px solid;
  background-color: #f3f3f3 !important;
  float: center;
  max-width: 1000px;
  padding: 20px 20px 20px 20px;
  margin: 10px 0 10px 0;
}
#optionItem {
  cursor: pointer;
  border-radius: 20px !important;
  border: 0px solid;
  background-color: #ffffff !important;
  float: center;
  width: max-content !important;
  padding: 5px 20px 5px 20px;
  margin: 5px 10px 5px 10px;
}
</style>
