<template>
  <div>
    <div
      style="float: center; max-width: 700px; height: 30px"
      v-if="showFilter == false"
    >
      <div
        id="green-colored-option-button"
        style="cursor: pointer"
        @click="turnOnOffFileter()"
      >
        <b-row>
          <b-col cols="auto" style="padding-right: 5px">
            <i class="fa-solid fa-filter" style="color: #ffffff"></i>
          </b-col>
          <b-col cols="auto" style="padding-left: 0"> 필터 </b-col>
        </b-row>
      </div>
    </div>
    <div
      id="default-item"
      style="
        max-width: 700px;
        padding: 20px 20px 20px 20px;
        margin: 10px 0 10px 0;
      "
      v-if="showFilter == true"
    >
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
            id="default-item"
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
            id="default-item"
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
            id="default-item"
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
          <div id="green-colored-option-button" style="cursor: pointer" @click="applySearchFilter()">
            필터 적용
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import locationjson from "@/data/법정동.json";

export default {
  data() {
    return {
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
      this.region1_selected = null;
      this.region2_selected = null;
      this.region3_selected = null;
      this.region2_options.splice(0);
      this.region3_options.splice(0);
    },
    UpdateLocation: function (num, event) {
      if (num == 1) {
        this.region2_selected = null;
        this.region3_selected = null;

        this.region2_options.splice(0);
        this.region3_options.splice(0);

        for (var index in locationjson[event]) {
          this.region2_options.push(index);
        }

        this.region2_options.sort();
      } else {
        this.region3_selected = null;

        this.region3_options.splice(0);

        for (index in locationjson[this.region1_selected][event]) {
          this.region3_options.push(
            locationjson[this.region1_selected][event][index]
          );
        }

        this.region3_options.sort();
      }
    },
    applySearchFilter() {
      var location = {
        sido: this.region1_selected,
        sigungu: this.region2_selected,
        dong: this.region3_selected,
      };
      console.log(location);
      this.$store.commit("searchStore/modifySearchOptions", {
        key: "location",
        value: location,
      });
      this.turnOnOffFileter();
    },
  },
  created() {
    this.oldSearchKeyword = this.$route.query.data;
    for (var index_location in locationjson) {
      this.region1_options.push(index_location);
    }
    this.region1_options.sort();
  },
};
</script>

<style>
#filter-button {
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #d9d9d9 !important;
  color: #ffffff;
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
#optionBox {
  max-width: 700px;
  padding: 20px 20px 20px 20px;
  margin: 10px 0 10px 0;
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
