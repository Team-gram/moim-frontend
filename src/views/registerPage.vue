<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card class="register-card" style="max-width: 1000px">
      <h4 style="margin-top: 20px; margin-bottom: 40px">회원 정보 등록</h4>
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
          <b-col id="subtitle">전화번호*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-input
              id="form-input"
              v-model="number1"
              aria-describedby="input-live-feedback"
            ></b-form-input>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0;">-</b-col>
          <b-col>
            <b-form-input
              id="form-input"
              v-model="number2"
              aria-describedby="input-live-feedback"
            ></b-form-input> 
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0;">-</b-col>
          <b-col>
            <b-form-input
              id="form-input"
              v-model="number3"
              aria-describedby="input-live-feedback"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">생년월일*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-select
              id="form-input"
              v-model="year_selected"
              :options="year_options"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0;">년</b-col>
          <b-col>
            <b-form-select
              id="form-input"
              v-model="month_selected"
              :options="month_options"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0;">월</b-col>
          <b-col>
            <b-form-select
              id="form-input"
              v-model="day_selected"
              :options="day_options"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0;">일</b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">활동지역*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-row class="mb-2">
              <b-col cols="auto">
                <b-form-select
                  id="form-input"
                  v-model="region1_selected"
                  :options="region1_options"
                  v-on:change="UpdateLocation(1,$event)"
                  style="width: 200px"
                ></b-form-select>
              </b-col>
              <b-col style="text-align: left; padding: 8px 0 0 0"
                >광역시/도</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col cols="auto">
                <b-form-select
                  id="form-input"
                  v-model="region2_selected"
                  :options="region2_options"
                  v-on:change="UpdateLocation(2,$event)"
                  style="width: 200px"
                ></b-form-select>
              </b-col>
              <b-col style="text-align: left; padding: 8px 0 0 0"
                >시/군/구</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col cols="auto">
                <b-form-select
                  id="form-input"
                  v-model="region3_selected"
                  :options="region3_options"
                  style="width: 200px"
                ></b-form-select>
              </b-col>
              <b-col style="text-align: left; padding: 8px 0 0 0"
                >읍/면/동</b-col
              >
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
        <b-row>
          <b-col>
            <b-card id="form-input" style="max-width: 900px">
              <b-container>
                <b-row align-h="left">
                  <b-col
                    v-for="category in category_list"
                    :key="category"
                    cols="auto"
                    id="button"
                    @click="addSelectedCategory(category)"
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
      </b-container>
    </b-card>
    <b-button
      pill
      id="show-btn"
      class="ml-auto register-button"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="clickCompleteButton()"
      >정보 입력 완료
    </b-button>
  </div>
</template>

<script>
import locationjson from "@/data/법정동.json";

export default {
  created(){
    const data =this.axios.get("https://api.vworld.kr/req/data?key=CEB52025-E065-364C-9DBA-44880E3B02B8&domain=http://localhost:8080&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO")
    console.log(data);
  },
  data() {
    return {
      nickname: "",
      selfIntro: "",
      number1: "",
      number2: "",
      number3: "",
      year_selected: "",
      month_selected: "",
      day_selected: "",
      year_options: [],
      month_options: [],
      day_options: [],
      region1_selected: null,
      region2_selected: null,
      region3_selected: null,
      region1_options: [],
      region2_options: [],
      region3_options: [],
      category_list: [
        "게임-오락",
        "아웃도어-여행",
        "스포츠-운동",
        "댄스-무용",
        "업무-직무",
        "인문학-책-글",
        "패션-뷰티",
        "문화-공연",
        "음악-악기",
        "공예-만들기",
        "요리-제조",
        "사진-영상",
        "차-오토바이",
        "봉사활동",
        "반려동물",
        "결혼-가족",
        "사교-인맥",
        "자유주제",
      ],
      selected_category_list: [],
    };
  },
  methods: {
    UpdateLocation: function(num,event){
      if(num==1){
        this.region2_options.splice(0);
        for(var index in locationjson[event]){
          this.region2_options.push(index);
        }
        this.region2_options.sort();
      }else{
        this.region3_options.splice(0);
        for(index in locationjson[this.region1_selected][event]){
          this.region3_options.push(locationjson[this.region1_selected][event][index]);
        }
        this.region3_options.sort();
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
        }
      }

      console.log(this.selected_category_list);
    },
    clickCompleteButton: function () {
      var text = "";
      if (this.nickname == "") {
        text += "'닉네임'";
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
        this.$router.replace("/");
      }
    },
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
    for(var index in locationjson){
      this.region1_options.push(index);
    }
    this.region1_options.sort();
  },
  computed: {},
};
</script>

<style>
h4 {
  font-weight: bold;
}
.register-button {
  width: 200px !important;
  height: 50px !important;
  background-color: #799761 !important;
  border: 0px solid;
  font-weight: bold;
}
.register-card {
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
