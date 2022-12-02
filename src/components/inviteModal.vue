<template>
  <div>
    <b-button v-b-modal.invite_modal>초대하기</b-button>

    <b-modal
      id="invite_modal"
      ref="modal"
      title="모임 초대하기"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="모임" label-for="moim-input">
          <b-form-select
            id="moim-input"
            v-model="moim"
            :options="moims"
            required
          >
          </b-form-select>
        </b-form-group>

        <b-form-group label="초대메세지" label-for="name-input">
          <b-form-input id="name-input" v-model="msg" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      moim: null,
      moims: [{ value: null, text: "초대할 모임을 선택하세요" }, "a", "b", "c"],
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    resetModal() {
      this.msg = "";
      this.moim = "";
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("invite_modal");
      });
    },
  },
};
</script>
