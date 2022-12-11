<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <b-row>
        <b-col>
          <div>상위노출 옵션(기간 및 결제금액)을 선택해주세요.</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <b-form-radio-group
              v-model="selected"
              :options="options"
              class="mb-3"
              value-field="item"
              text-field="name"
            ></b-form-radio-group>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-col>
        <div
          id="green-colored-option-button"
          align="center"
          style="cursor: pointer"
          @click="applyMoimUpper()"
        >
          상위노출 신청하기
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { LeaveMoim, applyMoimUpper } from "@/services/moim";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: {period: 30, money: 25000},
      options: [
        { item: {period: 30, money: 25000}, name: "30일(25,000원)" },
        { item: {period: 90, money: 70000}, name: "90일(70,000원)" },
        { item: {period: 180, money: 140000}, name: "180일(140,000원)" },
      ],
    };
  },
  methods: {
    async leavemoim() {
      const response = await LeaveMoim(
        this.MoimId,
        this.$cookies.get("MoimUserId")
      );
      if (response.status == 200) {
        this.$bvToast.toast("모임을 떠났습니다.", {
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
        setTimeout(() => this.$router.push("/mymoim"), 300);
      }
    },
    async applyMoimUpper() {
      console.log(this.selected);
      console.log(this.MoimId, this.selected.period, this.selected.money);
      await applyMoimUpper(this.MoimId, this.selected.period, this.selected.money);
      this.$emit("closeUpper");
      alert("모임 상위노출 신청이 성공적으로 등록되었습니다.");
    }
  },
  created() {},
  computed: {
    ...mapGetters("searchStore", { MoimId: "getSelectedMoimId" }),
  },
};
</script>

<style></style>
