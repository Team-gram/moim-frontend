<template>
  <div
    align="center"
    style="margin-top: 40px; margin-left: 20px; margin-right: 20px"
  >
    <div id="main-text">
      <b id="main-text-highlight">모임 개설하기</b>
    </div>
    <div id="listbackground">
      <b-row class="mb-3">
        <b-col id="subtitle">제목</b-col>
        <b-col>
          <b-form-input
            id="form-input"
            v-model="moimtitle"
            placeholder="모임제목을 입력해주세요"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col id="subtitle">카테고리</b-col>
        <b-col cols="auto" style="margin: 0px 5px 5px 0">
          <b-form-select
            id="form-input"
            v-model="selected_category.parentCategory"
            :options="parentCategory_options"
            v-on:change="SetChildCategory($event)"
            style="width: 200px; text-align: center"
            value-field="categoryId"
            text-field="categoryName"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >대분류</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
        <b-col cols="auto" style="margin: 0px 5px 5px 0">
          <b-form-select
            id="form-input"
            v-model="selected_category.childCategory"
            :options="selected_category.childCategory_options"
            style="width: 200px; text-align: center"
            value-field="categoryId"
            text-field="categoryName"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >소분류</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col id="subtitle">활동지역</b-col>
        <b-col>
          <b-form-select
            id="form-input"
            v-model="region1_selected"
            :options="region1_options"
            v-on:change="UpdateLocation(1, $event)"
            style="width: 150px; text-align: center"
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
            id="form-input"
            v-model="region2_selected"
            :options="region2_options"
            v-on:change="UpdateLocation(2, $event)"
            style="width: 150px; text-align: center"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >시/군/구</b-form-select-option
              >
            </template>
          </b-form-select></b-col
        >
        <b-col cols="auto" style="margin: 0px 5px 5px 0">
          <b-form-select
            id="form-input"
            v-model="region3_selected"
            :options="region3_options"
            style="width: 150px; text-align: center"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >읍/면/동</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col id="subtitle">장문 소개</b-col>
        <div class="w-100"></div>
        <b-col>
          <b-form-textarea
            id="form-input"
            v-model="content"
            placeholder="간단한 자기소개를 입력하세요"
            rows="3"
            max-rows="3"
          ></b-form-textarea
        ></b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col id="subtitle">정원</b-col>
        <b-col>
          <b-form-input
            id="form-input"
            v-model="maxMember"
            placeholder="최대 정원을 입력해주세요"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col id="subtitle">가입방식</b-col>
        <div class="w-100"></div>
        <b-col>
          <b-form-radio-group
            v-model="isFreeEnter_selected"
            :options="isFreeEnter_options"
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
            v-model="isPublish_selected"
            :options="isPublish_options"
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
      id="green-colored-option-button"
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
import { getAllParentCategory, getChildCategory } from "@/services/category.js";
import { MoimCreate } from "@/services/moim";
export default {
  data() {
    return {
      isFreeEnter_selected: "Y",
      isFreeEnter_options: [
        { item: "Y", name: "자유 가입" },
        { item: "N", name: "승인 가입" },
      ],
      isPublish_selected: "Y",
      isPublish_options: [
        { item: "Y", name: "공개" },
        { item: "N", name: "비공개" },
      ],
      content: "",
      moimtitle: "",
      maxMember: 10,
      region1_selected: null,
      region2_selected: null,
      region3_selected: null,
      region1_options: [],
      region2_options: [],
      region3_options: [],
      category_list: [],
      parentCategory_options: [],
      selected_category: {
        parentCategory: null,
        childCategory: null,
        childCategory_options: null,
      },
    };
  },
  methods: {
    async SetParentCategory() {
      this.parentCategory_options = [];
      let parentCategory = await getAllParentCategory();
      if (parentCategory.status === 200) {
        this.parentCategory_options = parentCategory.data;
      }
    },
    async SetChildCategory(parentId) {
      this.selected_category.childCategory = null;
      let childCategory = await getChildCategory(parentId);
      if (childCategory.status === 200) {
        this.selected_category.childCategory_options = childCategory.data;
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
    async clickCompleteButton() {
      var data = Object();
      data.userId = this.$cookies.get("MoimUserId");
      data.categoryId = this.selected_category.childCategory;
      data.title = this.moimtitle;
      data.content = this.content;
      data.sido = this.region1_selected;
      data.sigungu = this.region2_selected;
      data.dong = this.region3_selected;
      data.isPublish = this.isPublish_selected;
      data.isFreeEnter = this.isFreeEnter_selected;
      data.maxMember = this.maxMember;
      console.log(data);
      const response = await MoimCreate(data);
      if (response.status == 200) {
        alert("모임 개설 완료");
        this.$router.replace("/mymoim");
      }
      //여기에 버튼 클릭시 json 보낼 데이터를 입력해주세요!
    },
  },
  created() {
    for (var index in locationjson) {
      this.region1_options.push(index);
    }
    this.region1_options.sort();
    this.SetParentCategory();
  },
};
</script>
<style>
#listbackground {
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
  background-color: #ffffff !important;
  float: left;
  border: 1px solid #aaaaaa;
  font-family: "NanumBarunGothic";
}
</style>
