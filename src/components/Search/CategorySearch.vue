<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <h4 id="category-name">{{ this.parentCategory.categoryName }}</h4>
    <div id="optionBox">
      <b-row>
        <b-col
          v-for="subCategory in subCategoryList"
          :key="subCategory.categoryId"
          cols="auto"
          id="optionItem"
          @click="selectSubCategory(subCategory)"
          :style="[
            isSelectedSubCategory(subCategory)
              ? { backgroundColor: '#d9d9d9' }
              : { backgroundColor: '#ffffff' },
          ]"
        >
          {{ subCategory.categoryName }}
        </b-col>
      </b-row>
    </div>
    <searchfilter></searchfilter>
  </div>
</template>

<script>
import searchfilter from "@/components/Search/SearchFilter";
import { getChildCategory } from "@/services/category";

export default {
  data() {
    return {
      parentCategory: null,
      subCategoryList: [],
      selectedSubCategory: null,
    };
  },
  components: {
    searchfilter,
  },
  methods: {
    async setSubCategory() {
      let subCategory = await getChildCategory(this.parentCategory.categoryId);
      this.subCategoryList = subCategory.data;
    },
    selectSubCategory(subCategory) {
      console.log(subCategory);
      this.$store.commit("searchStore/modifySearchOptions", {
        key: "subCategory",
        value: subCategory,
      });
    },
    isSelectedSubCategory(subCategory) {
      let currentSelectedSubCategory = this.$store.getters["searchStore/getSelectedSubCategory"];
      if ( currentSelectedSubCategory != null) {
        if ( this.categoryObjectCompare(subCategory, currentSelectedSubCategory) )
        {
          console.log(subCategory);
          return true;
        }
      }
        return false;
    },
    categoryObjectCompare(obj1, obj2) {
      if (obj1.categoryId === obj2.categoryId) {
        return true;
      }
      return false;
    },
  },
  created() {
    // console.log(this.$store.getters['searchStore/getSearchData']);
    this.parentCategory = this.$store.getters["searchStore/getSearchData"];
    this.selectedSubCategory =
      this.$store.getters["searchStore/getSelectedSubCategory"];
    console.log(this.parentCategory);
    this.setSubCategory();
    // for (var cat_index in categoryjson[this.categoryName]) {
    //   this.subCategoryList.push(categoryjson[this.categoryName][cat_index]);
    // }
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
  background-color: #ffffff;
  float: center;
  width: max-content !important;
  padding: 5px 20px 5px 20px;
  margin: 5px 10px 5px 10px;
}
</style>
