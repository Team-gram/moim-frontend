<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <h4 id="schedule-title">이런 장소는 어때요?</h4>
      <b-container class="bv-example-row">
      </b-container>
    </b-card>
    <b-button
      pill
      id="register-button"
      class="ml-auto"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="PlaceSearch()"
      >참가하기
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moimid:0,
    };
  },
  methods: {
  },
  created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    var moiminfo = Object();
    moiminfo = this.$store.getters["searchStore/getSearchData"];
    console.log(moiminfo);
  },
};