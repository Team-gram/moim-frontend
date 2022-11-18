<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="register-card" style="max-width: 1000px">
      <h4 id="register-title">회원 정보 등록</h4>
      <b-container class="bv-example-row">
        <b-row class="mb-3">
          <b-col id="subtitle">닉네임*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-input
              id="form-input"
              v-model="nickname"
              placeholder="닉네임을 입력하세요"
              aria-describedby="input-live-feedback"
              style="max-width: 200px"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">성별*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-radio-group
              v-model="gender_selected"
              :options="gender_options"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              style="float: left"
            ></b-form-radio-group>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">생년월일*</b-col>
          <div class="w-100"></div>
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="year_selected"
              :options="year_options"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >년</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="month_selected"
              :options="month_options"
              style="width: 60px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >월</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="day_selected"
              :options="day_options"
              style="width: 60px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >일</b-col
          >
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">활동지역*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-row class="mb-2">
              <b-col cols="auto" style="margin: 0px 5px 5px 0">
                <b-form-select
                  id="form-input"
                  v-model="region1_selected"
                  :options="region1_options"
                  v-on:change="UpdateLocation(1, $event)"
                  style="width: 200px; text-align: center"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >광역시/도</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="auto" style="margin: 0px 5px 5px 0">
                <b-form-select
                  id="form-input"
                  v-model="region2_selected"
                  :options="region2_options"
                  v-on:change="UpdateLocation(2, $event)"
                  style="width: 200px; text-align: center"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >시/군/구</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="auto" style="margin: 0px 5px 5px 0">
                <b-form-select
                  id="form-input"
                  v-model="region3_selected"
                  :options="region3_options"
                  style="width: 200px; text-align: center"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >읍/면/동</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">자기소개</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-textarea
              id="form-input"
              v-model="selfIntro"
              placeholder="간단한 자기소개를 입력하세요"
              rows="3"
              max-rows="3"
            ></b-form-textarea
          ></b-col>
        </b-row>

        <b-row>
          <b-col id="subtitle" cols="auto"
            >관심 카테고리<a id="subdescription">(최대 5개 선택 가능)</a></b-col
          >
          <b-col cols="auto">
            <b-button @click="AddSelectedCategory">추가</b-button>
          </b-col>
        </b-row>
        <b-row
          class="mb-2"
          v-for="(item, index) in selected_category"
          :key="item.childCategory"
        >
          <b-col cols="auto" style="margin: 0px 5px 5px 0">
            <b-form-select
              id="form-input"
              v-model="item.parentCategory"
              :options="parentCategory_options"
              v-on:change="SetChildCategory($event, index)"
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
              v-model="item.childCategory"
              :options="item.childCategory_options"
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
          <b-col cols="auto">
            <b-button @click="DeleteSelectedCategory(index)">삭제</b-button>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle"
            >정보공개여부<a id="subdescription"
              >(다른 사용자에게 나의 정보(일정 등)를 공개하는 것에
              동의합니다.)</a
            ></b-col
          >
          <div class="w-100"></div>
          <b-col>
            <b-form-radio-group
              v-model="data_selected"
              :options="data_options"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              style="float: left"
            ></b-form-radio-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-button
      pill
      id="register-button"
      class="ml-auto"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="clickCompleteButton()"
      >정보 입력 완료
    </b-button>
  </div>
</template>

<script>
import locationjson from "@/data/법정동.json";
import { getAllParentCategory, getChildCategory } from "@/services/category.js";
import { registerUser } from "@/services/register.js";
export default {
  data() {
    return {
      userid: this.$cookies.get("MoimUserId"),
      profileImage:"",
      nickname: "",
      selfIntro: "",
      gender_selected: "M",
      gender_options: [
        { item: "M", name: "남" },
        { item: "W", name: "여" },
      ],
      data_selected: "Y",
      data_options: [
        { item: "Y", name: "네" },
        { item: "N", name: "아니요" },
      ],
      year_selected: null,
      month_selected: null,
      day_selected: null,
      year_options: [],
      month_options: [],
      day_options: [],
      region1_selected: null,
      region2_selected: null,
      region3_selected: null,
      region1_options: [],
      region2_options: [],
      region3_options: [],
      parentCategory_options: [],
      selected_category: [],
    };
  },
  methods: {
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
    async SetParentCategory() {
      this.parentCategory_options = [];
      let parentCategory = await getAllParentCategory();
      if (parentCategory.status === 200) {
        this.parentCategory_options = parentCategory.data;
      }
    },
    async SetChildCategory(parentId, index) {
      this.selected_category[index].childCategory = null;

      let childCategory = await getChildCategory(parentId);
      if (childCategory.status === 200) {
        this.selected_category[index].childCategory_options =
          childCategory.data;
      }
    },
    AddSelectedCategory: function () {
      if (this.selected_category.length < 5) {
        this.selected_category.push({
          parentCategory: null,
          childCategory: null,
          childCategory_options: null,
        });
      }
    },
    DeleteSelectedCategory: function (index) {
      if (this.selected_category.length > 1) {
        this.selected_category.splice(index, 1);
      }
    },
    async clickCompleteButton() {
      var text = "";
      // let data = new Object();
      if (this.nickname.split(' ').join('') == "") {
        text += "'닉네임'";
      }
      if (
        this.year_selected == null ||
        this.month_selected == null ||
        this.day_selected == null
      ) {
        if (text !== "") {
          text += ", ";
        }
        text += "'생년월일'";
      }
      if (
        this.region1_selected == null ||
        this.region2_selected == null ||
        this.region3_selected == null
      ) {
        if (text !== "") {
          text += ", ";
        }
        text += "'활동지역'";
      }

      if (text !== "") {
        this.$bvToast.toast(text + ` 은 필수 입력 항목입니다.`, {
          // title: "회원 정보 등록 실패",
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
      } else {
        var birthday = this.year_selected.toString()+'-'+this.month_selected.toString().padStart(2,'0')+'-'+this.day_selected.toString().padStart(2,'0');
        var categories = [];
        for(var i = 0 ; i <this.selected_category.length; i++) {
          if(this.selected_category[i].childCategory != null) {
            categories.push(this.selected_category[i].childCategory);
          }
        }
        var data = Object();
        data.id = this.userid;
        data.name = this.nickname;
        data.sido = this.region1_selected;
        data.sigungu = this.region2_selected;
        data.dong = this.region3_selected;
        data.birthday = birthday;
        data.detail = this.selfIntro;
        data.isPublish = this.data_selected;
        data.categories = categories;
        data.gender = this.gender_selected;
        const response = await registerUser(data);
        if(response.status==200){
          alert("가입해주셔서 감사합니다.")
          this.$router.replace('/');
        }else{
          alert("네트워크 오류로 인해 가입에 실패했습니다.");
          this.$router.replace('/');
        }
        
      }
    },
  },
  created() {
    for (var year = 1900; year <= 2022; year++) {
      this.year_options.push(year);
    }
    for (var month = 1; month <= 12; month++) {
      this.month_options.push(month);
    }
    for (var day = 1; day <= 31; day++) {
      this.day_options.push(day);
    }
    for (var index in locationjson) {
      this.region1_options.push(index);
    }
    this.region1_options.sort();
    this.SetParentCategory();
    this.selected_category.push({
      parentCategory: null,
      childCategory: null,
      childCategory_options: null,
    });
  },
  computed: {},
};
</script>

<style>
h4 {
  font-weight: bold;
}
#register-button {
  width: 200px !important;
  height: 50px !important;
  background-color: #799761 !important;
  border: 0px solid;
  font-weight: bold;
}
#register-title {
  font-weight: bold;
  margin: 10px 0 30px 0;
}
#register-card {
  border-radius: 20px !important;
  border: 0px solid;
  padding: 0;
  background-color: #f3f3f3 !important;
}
#form-input {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #ffffff !important;
  float: left;
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
