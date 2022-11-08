<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <h4 id="category-name">{{ this.categoryName }}</h4>
    <div id="searchBox">
      <b-row align-h="between">
        <b-col>
          <b-form-input
            id="searchInput"
            v-model="text"
            placeholder="검색어를 입력하세요."
          ></b-form-input>
        </b-col>
        <b-col cols="auto">
          <b-img
            id="search-button"
            :src="require('@/assets/search.png')"
          ></b-img>
        </b-col>
      </b-row>
    </div>
    <div id="optionBox">
      <b-row align-h="center">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: "아웃도어/여행",
      subCategoryList: [
        "전체",
        "등산",
        "산책/트래킹",
        "캠핑/백패킹",
        "국내여행",
        "해외여행",
        "낚시",
        "패러글라이딩",
      ],
    };
  },
};
</script>

<style>
#category-name {
  font-weight: bold;
  margin: 10px 0 30px 0;
}
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
