<template>
  <div
    align="center"
    style="margin-top: 80px; margin-left: 20px; margin-right: 20px"
  >
    <div id="main-text">
      <b id="main-text-highlight">장소 상위노출 신청</b>
    </div>
    <div id="listbackground">
      <b-row class="mb-3">
        <b-col id="subtitle">업소 제목</b-col>
        <b-col>
          <b-form-input
            id="form-input"
            v-model="placetitle"
            placeholder="제목을 입력해주세요"
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
        <b-col id="subtitle">지역</b-col>
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
        <b-col id="subtitle">사업자 등록증 번호</b-col>
        <b-col>
          <b-form-input
            id="form-input"
            v-model="PlaceOwnerNum"
            placeholder="사업자 등록증 번호를 입력해주세요"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col id="subtitle">인터넷 주소</b-col>
        <b-col>
          <b-form-input
            id="form-input"
            v-model="PlaceURL"
            placeholder="https:// 없이 입력해주세요."
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col id="subtitle">기간</b-col>
        <b-col>
          <b-form-select
            id="form-input"
            v-model="placeperiod_selected"
            :options="placeperiod"
            style="width: 150px; text-align: center"
            @change="UpdatePeriod($event)"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >기간 선택하기</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
      </b-row>
    <b-row class="mb-3">
        <b-col id="subtitle">가격</b-col>
        <b-col>
          <b-form-input
            id="form-input"
            v-model="PlacePricetext"
            placeholder="기간에 따라 가격이 결정됩니다."
            disabled
          ></b-form-input>
        </b-col>
      </b-row>
       <b-row style="margin-top: 12px; padding:0;">
          <b-col sm="4">
            <label id="subtitle">사업자 등록증 첨부: </label>
          </b-col>
          <b-col sm="8">
            <div class="container">
              <input type="text" class="upload-name" value="이미지, PDF를 업로드 하세요" disabled>
              <label for="upload-file">파일선택</label>
              <input @change="uploadfile()" id="upload-file" ref="image" type="file" accept="image/*,.pdf">
            </div>
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
      >장소 상위 노출 신청하기
    </b-button>
  </div>
</template>

<script>
import { getAllParentCategory, getChildCategory } from "@/services/category.js";
import { SetPlaceTop } from "@/services/meet.js"
import locationjson from "@/data/법정동.json";
export default {
  name: "PlaceTop",
  components: {
  },
  data() {
    return {
      placetitle: "",
      PlaceOwnerNum:"",
      PlaceURL:"",
      PlacePricetext:"",
      PlacePrice:"",
      imageFile:null,
      region1_selected: null,
      region2_selected: null,
      region3_selected: null,
      placeperiod:["30일","90일","180일"],
      placeperiod_selected:null,
      placeperiod_push:null,
      region1_options: [],
      region2_options: [],
      region3_options: [],
      category_list: [],
      parentCategory_options: [],
      selected_category: {
        parentCategory: null,
        childCategory: null,
        childCategory_options: null,
      }
    };
  },
  methods: {
    uploadfile(){
      const imagepdf = this.$refs.image.files[0]
      console.log(imagepdf);
      const upload_name = document.querySelector(".upload-name");
      upload_name.value = imagepdf.name;
    },
    UpdatePeriod(e){
      if(e=="30일"){
        this.PlacePrice = 20000;
        this.placeperiod_push = 30
        this.PlacePricetext = this.PlacePrice + " 원";
      }else if(e=="90일"){
        this.placeperiod_push = 90
        this.PlacePrice = 55000;
        this.PlacePricetext = this.PlacePrice + " 원";
      }else{
        this.placeperiod_push = 180
        this.PlacePrice = 100000;
        this.PlacePricetext = this.PlacePrice + " 원";
      }
    },
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
      const imagepdf = this.$refs.image.files[0]
      let filedata = new FormData();
      filedata.append("userId",this.$cookies.get("MoimUserId"));
      filedata.append("placeId",this.PlaceOwnerNum);
      filedata.append("placeName",this.placetitle);
      filedata.append("categoryId",this.selected_category.childCategory);
      filedata.append("page",this.PlaceURL);
      filedata.append("crn",imagepdf);
      filedata.append("sido",this.region1_selected);
      filedata.append("sigungu",this.region2_selected);
      filedata.append("dong",this.region3_selected);
      filedata.append("period",this.placeperiod_push);
      filedata.append("money",this.PlacePrice);
      console.log(filedata);
      const response = await SetPlaceTop(filedata);
      if (response.status == 200) {
        alert("장소 신청이 완료되었습니다.\n설정에서 현황을 볼 수 있습니다.");
      }
    },
  },
  async created(){
    let data = Object();
    data.userId = this.$cookies.get("MoimUserId");
    for (var index in locationjson) {
      this.region1_options.push(index);
    }
    this.region1_options.sort();
    this.SetParentCategory();
  },
};
</script>

<style>
.upload-name {
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60%;
  color: #999999;
  border-radius: 5px;
}
.container label {
  display: inline-block;
  padding: 5px 10px;
  color: #fff;
  background-color: rgba(0, 53, 109, 0.95);
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}
.container input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
