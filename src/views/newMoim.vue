<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
  <div id="listbackground">
  <div id="title">새로운 모임 개설하기</div>
  <b-row class="mb-3">
    <b-col id="subtitle">카테고리</b-col>
    <b-col cols="auto" style="margin: 0px 5px 5px 0">
      <b-form-select
        id="form-input"
        v-model="category1_selected"
        :options="category1_options"
        v-on:change="UpdateCategory($event)"
        style="width: 200px; text-align: center"
      >
      <template #first>
        <b-form-select-option :value="null" disabled>대분류</b-form-select-option>
      </template>
      </b-form-select>
    </b-col>
      <b-col cols="auto" style="margin: 0px 5px 5px 0">
      <b-form-select
        id="form-input"
        v-model="category2_selected"
        :options="category2_options"
        style="width: 200px; text-align: center"
      >
      <template #first>
        <b-form-select-option :value="null" disabled>소분류</b-form-select-option>
      </template>
      </b-form-select></b-col>
  </b-row>
  <b-row>
    <b-col id="subtitle">활동지역</b-col>
    <b-col>
      <b-form-select
      id="form-input"
      v-model="region1_selected"
      :options="region1_options"
      v-on:change="UpdateLocation(1, $event)"
      style="width: 200px; text-align: center"
      >
      <template #first>
        <b-form-select-option :value="null" disabled>광역시/도</b-form-select-option>
      </template>
      </b-form-select></b-col>
    <b-col>
      <b-form-select
      id="form-input"
      v-model="region2_selected"
      :options="region2_options"
      v-on:change="UpdateLocation(2, $event)"
      style="width: 200px; text-align: center"
      >
      <template #first>
        <b-form-select-option :value="null" disabled>시/군/구</b-form-select-option>
      </template>
      </b-form-select></b-col>
    <b-col cols="auto" style="margin: 0px 5px 5px 0">
      <b-form-select
        id="form-input"
        v-model="region3_selected"
        :options="region3_options"
        style="width: 200px; text-align: center"
      >
      <template #first>
        <b-form-select-option :value="null" disabled>읍/면/동</b-form-select-option>
      </template>
      </b-form-select>
    </b-col>
  </b-row>
  <b-row class="mb-3">
    <b-col id="subtitle">정기모임 여부</b-col>
    <div class="w-100"></div>
    <b-col>
      <b-form-radio-group
        v-model="regular_selected"
        :options="regular_options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        style="float: left"
      ></b-form-radio-group>
    </b-col>
  </b-row>
  <b-row class="mb-3">
    <b-col id="subtitle">한 줄 소개</b-col>
    <div class="w-100"></div>
    <b-col>
      <b-form-textarea
        id="form-input"
        v-model="simpleIntro"
        placeholder="간단한 자기소개를 입력하세요"
        rows="1"
        max-rows="1"
      ></b-form-textarea
    ></b-col>
  </b-row>
 <b-row class="mb-3">
    <b-col id="subtitle">장문 소개</b-col>
    <div class="w-100"></div>
    <b-col>
      <b-form-textarea
        id="form-input"
        v-model="Intro"
        placeholder="간단한 자기소개를 입력하세요"
        rows="3"
        max-rows="3"
      ></b-form-textarea
    ></b-col>
  </b-row>
  <b-row class="mb-3">
    <b-col id="subtitle">정원</b-col>
    <b-col>
      <b-form-input id="form-input" v-model="number" placeholder="최대 정원을 입력해주세요"></b-form-input>
    </b-col>
  </b-row>
  <b-row class="mb-3">
    <b-col id="subtitle">가입방식</b-col>
    <div class="w-100"></div>
    <b-col>
      <b-form-radio-group
        v-model="free_selected"
        :options="free_options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        style="float: left"
      ></b-form-radio-group>
    </b-col>
  </b-row>
  <b-row class="mb-3">
    <b-col id="subtitle">공개여부</b-col>
    <div class="w-100"></div>
    <b-col>
      <b-form-radio-group
        v-model="open_selected"
        :options="open_options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        style="float: left"
      ></b-form-radio-group>
    </b-col>
  </b-row>
  </div>
   <b-button
      pill
      id="register-button"
      class="ml-auto"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="clickCompleteButton()"
      >모임 개설 하기
    </b-button>
</div>
</template>

<script>
import locationjson from "@/data/법정동.json";
import categoryjson from "@/data/카테고리.json";

export default {
  data() {
    return {
      free_selected: "Y",
      free_options: [
        { item: "Y", name: "자유 가입" },
        { item: "N", name: "승인 가입" },
      ],
      open_selected: "Y",
      open_options: [
        { item: "Y", name: "공개" },
        { item: "N", name: "비공개" },
      ],
      regular_selected: "Y",
      regular_options: [
        { item: "Y", name: "네" },
        { item: "N", name: "아니요" },
      ],
      simpleIntro: "",
      Intro: "",
      region1_selected: null,
      region2_selected: null,
      region3_selected: null,
      region1_options: [],
      region2_options: [],
      region3_options: [],
      category_list: [],
      selected_category_list: [],
      category1_selected: null,
      category2_selected: null,
      category1_options: [],
      category2_options: [],
    };
  },
  methods: {
    SetCategory: function () {
      this.category_list.splice(0);
      for (var index in categoryjson) {
        this.category1_options.push(index);
      }
    },
    UpdateLocation: function (num, event) {
      if (num == 1) {
        this.region2_options.splice(0);
        for (var index in locationjson[event]) {
          this.region2_options.push(index);
        }
        this.region2_options.sort();
      } else {
        this.region3_options.splice(0);
        for (index in locationjson[this.region1_selected][event]) {
          this.region3_options.push(
            locationjson[this.region1_selected][event][index]
          );
        }
        this.region3_options.sort();
      }
    },
    UpdateCategory: function (event) {
      this.category2_options.splice(0);
      for (var index in categoryjson[event]) {
        this.category2_options.push(categoryjson[this.category1_selected][index]);
      }
    },
    addSelectedCategory: function (category) {
      if (this.selected_category_list.includes(category)) {
        this.selected_category_list = this.selected_category_list.filter(
          (element) => element !== category
        );
      } else {
        if (this.selected_category_list.length < 5) {
          this.selected_category_list.push(category);
          console.log(category)
        }
      }
    },
  },
  created() {
    this.selected_category_list = [];
    for (var index in locationjson) {
      this.region1_options.push(index);
    }
    this.region1_options.sort();
    this.SetCategory();
  },
};
</script>
<style>
#listbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 20px 30px 30px 30px;
  margin: 10px 0 10px 0;
  max-width: 1050px;
}
#register-button {
  width: 200px !important;
  height: 50px !important;
  background-color: #799761 !important;
  border: 0px solid;
  font-weight: bold;
}
#subtitle {
  text-align: left;
  margin: 5px 0 5px 5px;
  font-weight: bold;
}
#subdescription {
  text-align: left;
  margin: 0 0 5px 5px;
  font-size: 70% !important;
}
#form-input {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #ffffff !important;
  float: left;
}
</style>
