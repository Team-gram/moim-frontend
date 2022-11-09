
<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
  <h4 style="margin-top: 20px; margin-bottom: 40px"><b>어떤 모임을 찾고 있나요?</b></h4>
    <div id="searchBox">
        <b-row align-h="between">
          <b-col>
            <b-form-input
              id="searchInput"
              type="text"
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
      <b-row>
          <b-col>
            <b-card id="category" style="max-width: 900px">
              <b-container>
                <b-row>
                  <b-col
                    v-for="category in category_list"
                    :key="category"
                    cols="auto"
                    id="button"
                  >
                    <div
                      id="category-button"
                      :style="[
                        selected_category_list.includes(category)
                          ? { backgroundColor: '#9b9b9b' }
                          : { backgroundColor: '#d9d9d9' },
                      ]"
                    >
                      <img
                        :src="require(`@/assets/category-icon/${category}.png`)"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">
                        {{ category.replaceAll("-", "/") }}
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
  </div>
  
</template>


<script>
import categoryjson from "@/data/카테고리.json";

export default {
  name: 'MainHome',
  data(){
    return{
      category_list: [],
      selected_category_list: [],
    };
  },
  methods: {
    SetCategory: function () {
      this.category_list.splice(0);
      for (var index in categoryjson) {
        this.category_list.push(index);
      }
    },
  },
  created() {
    this.SetCategory();
  }
}
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
#category{
  border: none;
}
#category-button {
  cursor: pointer;
  width: 80px !important;
  height: 80px !important;
  border: 0px solid;
  border-radius: 10px;
  margin: 5px 5px 10px 5px;
  padding: 0;
  align-content: center;
  /* background-color: #d9d9d9 !important; */
  /* float: left; */
}
div #button {
  padding: 0;
  /* display:inline-block; */
}
#category-card {
  padding: 0;
}
#category-icon {
  margin: 5px 0 0 0;
}
#category-text {
  font-size: 70% !important;
  font-weight: bold;
  margin: 5px 0 0 0;
}
</style>