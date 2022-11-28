<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <h4 id="schedule-title">모임 준비물 리스트</h4>
      <b-container class="bv-example-row">
      </b-container>
    </b-card>
    <b-button
      pill
      id="register-button"
      class="ml-auto"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="registerSchedule()"
      >추가하기
    </b-button>
  </div>
</template>