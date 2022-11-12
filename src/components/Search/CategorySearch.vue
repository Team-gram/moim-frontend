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
    <div style="float: center; max-width: 1000px; height: 30px" v-if="showFilter == false">
      <div
        id="filter-button"
        @click="turnOnOffFileter()"
      >
        <b-row>
          <b-col cols="auto" style="padding: 0px; margin: 0 2px 0 0">
            <b-img
              style="width: 15px"
              :src="require('@/assets/filter.png')"
            ></b-img>
          </b-col>
          <b-col cols="auto" style="padding: 0px; margin: 0 0 0 2px">
            필터
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="optionBox" v-if="showFilter == true">
      <b-row>
        <b-col>
          <b-img
            id="x-button"
            :src="require('@/assets/x-button.png')"
            @click="turnOnOffFileter()"
          ></b-img>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" style="padding: 8px 0px 0 0"> 지역 </b-col>
        <b-col>
          <b-form-select
            v-model="region1_selected"
            :options="region1_options"
            class="mb-3"
            v-on:change="UpdateLocation(1, $event)"
            id="form-input"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >광역시/도</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            v-model="region2_selected"
            :options="region2_options"
            class="mb-3"
            v-on:change="UpdateLocation(2, $event)"
            id="form-input"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >시/군/구</b-form-select-option
              >
            </template>
          </b-form-select></b-col
        >
        <b-col>
          <b-form-select
            v-model="region3_selected"
            :options="region3_options"
            class="mb-3"
            id="form-input"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >읍/면/동</b-form-select-option
              >
            </template>
          </b-form-select></b-col
        >
      </b-row>
      <b-row>
        <b-col>
          <div id="form-input-button">필터 적용</div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import locationjson from "@/data/법정동.json";
import categoryjson from "@/data/카테고리.json";

export default {
  data() {
    return {
      searchKeyword:"",
      categoryName: "아웃도어/여행",
      subCategoryList: [],
      region1_selected: null,
      region2_selected: null,
      region3_selected: null,
      region1_options: [],
      region2_options: [],
      region3_options: [],
      showFilter: false,
    };
  },
  methods: {
    turnOnOffFileter: function () {
      this.showFilter = !this.showFilter;
    },
    UpdateLocation: function (num, event) {
      if (num == 1) {
        this.region2_selected=null;
        this.region3_selected=null;
        this.region2_options.splice(0);
        this.region3_options.splice(0);
        for (var index in locationjson[event]) {
          console.log(index);
          this.region2_options.push(index);
        }
        this.region2_options.sort();
      } else {
        this.region3_selected=null;
        this.region3_options.splice(0);
        for (index in locationjson[this.region1_selected][event]) {
          this.region3_options.push(
            locationjson[this.region1_selected][event][index]
          );
        }
        this.region3_options.sort();
      }
    },
  },
  created() {
    for (var index_location in locationjson) {
      this.region1_options.push(index_location);
    }
    this.region1_options.sort();

    for (var cat_index in categoryjson[this.categoryName]) {
        this.subCategoryList.push(categoryjson[this.categoryName][cat_index]);
      }
      // this.subCategoryList.sort();
  }
};
</script>

<style>
#filter-button {
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #d9d9d9 !important;
  float: right;
  padding: 5px 30px 5px 30px;
  width: max-content !important;
  /* width: 300px; */
}
#x-button {
  cursor: pointer;
  height: 15px;
  width: 15px;
  float: right;
  margin: 10px 10px 20px 0;
}
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
#form-input {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #ffffff !important;
  float: left;
}
#form-input-button {
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #d9d9d9 !important;
  float: center;
  padding: 5px 0 5px 0;
  max-width: 300px;
}
</style>
