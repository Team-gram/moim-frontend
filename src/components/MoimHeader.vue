<template>
  <body>
    <b-navbar type="dark" variant="dark" class="shadow">
      <b-container class="navbar-container">
        <b-row align-v="center" style="width: 100vw; margin-top: 20px">
          <b-col>
            <b-navbar-brand href="/main" style="margin-left: 10px">
              <img src="../assets/moim_logo_fullname.png" width="120" />
            </b-navbar-brand>
          </b-col>
          <b-col>
            <b-button
              pill
              variant="light"
              id="show-btn"
              class="ml-auto login-button"
              @click="$bvModal.show('bv-modal-example')"
              style="float: right; margin-right: 10px"
              >로그인
            </b-button>
          </b-col>
          <div class="w-100"></div>
          <b-col>
            <b-navbar-nav :fill="width <= 600">
              <b-nav-item href="/main">홈</b-nav-item>
              <b-nav-item href="#">MY모임</b-nav-item>
              <b-nav-item href="#">일정관리</b-nav-item>
              <b-nav-item href="#">설정</b-nav-item>
            </b-navbar-nav>
          </b-col>
        </b-row>
      </b-container>
      <b-modal id="bv-modal-example" size="sm" hide-footer hide-header centered>
        <div
          class="d-block text-center"
          style="margin-bottom: 20px; margin-top: 20px"
        >
          <h5>로그인 | 회원가입</h5>
        </div>
        <div class="d-block text-center" style="margin-bottom: 20px">
          <img
            src="../assets/kakao_login_medium_narrow.png"
            @click="kakaoLogin"
          />
        </div>
      </b-modal>
    </b-navbar>
  </body>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  methods: {
    kakaoLogin() {
      const params = {
        redirectUri: "http://localhost:8080/kakaologin",
      };
      window.Kakao.Auth.authorize(params);
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
  created() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.navbar.navbar-dark.bg-dark {
  background-color: #b6d884 !important;
}
.login-button {
  width: 110px !important;
}
h5 {
  font-weight: bold;
}
</style>
