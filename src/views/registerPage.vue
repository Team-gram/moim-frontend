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
          <b-col id="subtitle"
            >관심 카테고리<a id="subdescription">(최대 5개 선택 가능)</a></b-col
          >
        </b-row>
        <b-row class="mb-2">
          <b-col cols="auto" style="margin: 0px 5px 5px 0">
            <b-form-select
              id="form-input"
              v-model="category1_selected"
              :options="category1_options"
              v-on:change="UpdateCategory($event)"
              style="width: 200px; text-align: center"
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
              v-model="category2_selected"
              :options="category2_options"
              style="width: 200px; text-align: center"
            >
              <template #first>
                <b-form-select-option :value="null" disabled
                  >소분류</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-col>
          <b-col>
            <b-button>추가</b-button>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">정보공개여부<a id="subdescription">(다른 사용자에게 나의 정보(일정 등)를 공개하는 것에 동의합니다.)</a></b-col>
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
import categoryjson from "@/data/카테고리.json";

export default {
  data() {
    return {
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
    clickCompleteButton: function () {
      var text = "";
      let data = new Object();
      if (this.nickname.split(' ').join('') == "") {
        text += "'닉네임'";
      }
      if (this.number1 == null || this.number2 == "" || this.number3 == "") {
        if (text !== "") {
          text += ", ";
        }
        text += "'전화번호'";
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
        data.id = this.$store.kakaouserinfo.id;
        data.name = this.nickname;
        data.profileImage = this.$store.kakaouserinfo.properties.profile_image;
        data.sido = this.region1_selected;
        data.sigungu = this.region2_selected;
        data.dong = this.region3_selected;
        if(this.$store.kakaouserinfo.kakao_account.has_gender)
          data.gender = this.$store.kakaouserinfo.gender;
        else
          data.gender = "";
        data.birthday = this.year_selected + "-" + this.month_selected + "-" + this.day_selected;
        data.categories = this.selected_category_list;
        console.log(data);
        this.RegisterCall(data);
        this.$router.replace("/");
      }
    },
    async RegisterCall(data){
        let res = ''
        await this.axios.post('/join',data)
        .then(result=>{
          res = result;
        })
        return res;

    }
  },
  created() {
    this.selected_category_list = [];

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
    this.SetCategory();
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
