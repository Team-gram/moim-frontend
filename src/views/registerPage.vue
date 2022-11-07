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
              style="max-width: 200px"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">활동지역*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-row class="mb-2">
              <b-col cols="auto">
                <b-form-select
                  id="form-input"
                  v-model="selected"
                  :options="options"
                  style="max-width: 200px"
                ></b-form-select>
              </b-col>
              <b-col style="text-align: left; padding: 8px 0 0 0;">시</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="auto">
                <b-form-select
                  id="form-input"
                  v-model="selected"
                  :options="options"
                  style="max-width: 200px"
                ></b-form-select>
              </b-col>
              <b-col style="text-align: left; padding: 8px 0 0 0;">구</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="auto">
                <b-form-select
                  id="form-input"
                  v-model="selected"
                  :options="options"
                  style="max-width: 200px"
                ></b-form-select>
              </b-col>
              <b-col style="text-align: left; padding: 8px 0 0 0;">동</b-col>
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
                <b-row align-h="center">
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/게임오락.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">게임/오락</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/아웃도어여행.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">아웃도어/여행</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/스포츠운동.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">스포츠/운동</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/댄스무용.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">댄스/무용</div>
                    </div> </b-col
                  >
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/업무직무.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">업무/직무</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/인문학책글.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">인문학/책/글</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/패션뷰티.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">패션/뷰티</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/문화공연.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">문화/공연</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/음악악기.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">음악/악기</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/공예만들기.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">공예/만들기</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/요리제조.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">요리/제조</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/사진영상.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">사진/영상</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/차오토바이.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">차/오토바이</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/봉사활동.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">봉사활동</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/반려동물.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">반려동물</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/결혼가족.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">결혼/가족</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/사교인맥.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">사교/인맥</div>
                    </div>
                  </b-col>
                  <b-col cols="auto" id="button">
                    <div id="category-button">
                      <img
                        src="@/assets/category-icon/자유주제.png"
                        id="category-icon"
                        style="width: 50px"
                      />
                      <div id="category-text">자유주제</div>
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
      >정보 입력 완료
    </b-button>
  </div>
</template>

<script>
export default {
  created(){
    const data =this.axios.get("https://api.vworld.kr/req/data?key=CEB52025-E065-364C-9DBA-44880E3B02B8&domain=http://localhost:8080&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO")
    console.log(data);
  },
  data() {
    return {
      nickname: "",
      selfIntro: "",
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
    };
  },
  methods: {
    addSelectedCategory: function() {
      
    }
  }
  // created() {
  //   this.store.mutations.setHideHeader(true);
  // },
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
  background-color: #d9d9d9 !important;
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
