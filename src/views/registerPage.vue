<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card class="register-card" style="max-width: 1000px">
      <h4 style="margin-top: 20px; margin-bottom: 40px">회원 정보 등록</h4>
      <b-container class="bv-example-row">
        <b-row class="mb-3">
          <b-col cols="3">닉네임*</b-col>
          <b-col cols="9">
            <b-form-input
              id="form-input"
              v-model="nickname"
              placeholder="닉네임을 입력하세요"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="3">자기소개</b-col>
          <b-col cols="9"
            ><b-form-textarea
              id="form-input"
              v-model="selfIntro"
              placeholder="간단한 자기소개를 입력하세요"
              rows="3"
              max-rows="6"
            ></b-form-textarea
          ></b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="3">활동지역*</b-col>
          <b-col cols="9">
            <b-row class="mb-2">
              <b-col>
                <b-form-select
                  id="form-input"
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </b-col>
              <b-col cols="3">시</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col>
                <b-form-select
                  id="form-input"
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </b-col>
              <b-col cols="3">구</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col>
                <b-form-select
                  id="form-input"
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </b-col>
              <b-col cols="3">동</b-col>
            </b-row>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col class="text-left">관심 카테고리</b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col class="text-left">(최대 5개 선택 가능)</b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card id="form-input" style="max-width: 900px"> </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-button
      pill
      id="show-btn"
      class="ml-auto register-button"
      align="center"
      style="margin-right: 10px; margin-top: 20px"
      >정보 입력 완료
    </b-button>
  </div>
</template>

<script>
export default {
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
  created(){
    this.store.mutations.setHideHeader(true);
  }
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
  background-color: #f3f3f3 !important;
}
#form-input {
  border-radius: 20px !important;
  border: 0px solid;
  background-color: #ffffff !important;
}
</style>
