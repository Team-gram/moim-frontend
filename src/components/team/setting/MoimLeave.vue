<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <h4 id="schedule-title">모임 떠나시나요..?</h4>
      <b-container class="bv-example-row">
      </b-container>
    </b-card>
    <b-button
      variant="danger"
      class="ml-auto"
      align="center"
      style="width:110px;"
      @click="leavemoim()"
      >안녕
    </b-button>
  </div>
</template>

<script>
import { LeaveMoim } from "@/services/moim"
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
    async leavemoim(){
      const response = await LeaveMoim(this.MoimId,this.$cookies.get("MoimUserId"))
      if(response.status==200){
        this.$bvToast.toast(
          "모임을 떠났습니다.",
          {
            toaster: "b-toaster-top-right",
            appendToast: false,
            autoHideDelay: 3000,
          }
        );
        setTimeout(() => this.$router.push("/mymoim"), 300);
      } 
    }
  },
  created() {
  },
  computed:{
    ...mapGetters("searchStore",{MoimId :'getSelectedMoimId'}),
  },
};
</script>

<style>
