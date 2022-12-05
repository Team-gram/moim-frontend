<template>
  <body>
    <b-navbar type="dark" variant="dark">
      <b-container class="navbar-container">
        <b-row align-v="center" style="width: 100vw; margin: 10px 0 10px 0">
          <b-col>
            <b-navbar-brand @click="home()" style="margin-left: 10px">
              <img src="../assets/new_logo.png" width="40" />
            </b-navbar-brand>
          </b-col>
          <b-col cols="auto">
            <b-navbar-nav :fill="width <= 600">
              <div id="header-item" @click="home()">홈</div>
              <div id="header-item" @click="mymoim()">MY모임</div>
              <div id="header-item" @click="calender()">일정관리</div>
              <div id="header-item" @click="settle()">설정</div>
            </b-navbar-nav>
          </b-col>
          <b-col>
            <div style="float: right; margin-right: 10px">
              <b-dropdown
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                style="margin: 0; padding: 0"
              >
                <template #button-content
                  ><img
                    v-if="
                      !islogin ||
                      userProfile == undefined ||
                      userProfile == null ||
                      userProfile == ''
                    "
                    src="../assets/default-profile.png"
                    width="40"
                  /><b-img
                    v-else
                    :src="`${userProfile}`"
                    rounded="circle"
                    width="40"
                  />
                </template>
                <b-dropdown-item
                  v-if="!islogin"
                  @click="[$bvModal.show('login-modal')]"
                  >로그인/회원가입</b-dropdown-item
                >
                <b-dropdown-item v-else @click="[logout()]"
                  >로그아웃</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-modal
        v-if="!islogin"
        id="login-modal"
        size="sm"
        hide-footer
        hide-header
        centered
      >
        <div
          class="d-block text-center"
          style="margin-bottom: 20px; margin-top: 20px"
        >
          <h5>{{ logintext }}</h5>
        </div>
        <div class="d-block text-center" style="margin-bottom: 20px">
          <img
            src="../assets/kakao_login_medium_narrow.png"
            @click="kakaoLogin"
          />
        </div>
      </b-modal>
    </b-navbar>
    <hr id="header" />
  </body>
</template>

<script>
import { getLogin } from "@/services/login";
export default {
  data() {
    return {
      width: 0,
      height: 0,
      userID: "로그인",
      logintext: "로그인 | 회원가입",
      islogin: false,
      userProfile: null,
      userInfo: null,
      userInfoTest: {
        profileImage:
          "http://k.kakaocdn.net/dn/d7dp4q/btrQ1JslRdP/E9yZpopocyQjHIMnmSG1B1/img_640x640.jpg",
      },
    };
  },
  methods: {
    home() {
      this.$router.push("/").catch((error) => {
        if (error.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    mymoim() {
      this.$router.push("/mymoim").catch((error) => {
        if (error.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    calender() {
      this.$router.push("/calendar").catch((error) => {
        if (error.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    settle() {
      this.$router.push("/setting").catch((error) => {
        if (error.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    async kakaoLogin() {
      let login = await getLogin();
      if (login.status === 200) {
        window.location.href = login.data;
      }
      // this.axios.get('/login')
      //   .then((response) => {
      //       window.location.href = response.data;
      //   })
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    logout() {
      if (this.islogin) {
        this.$cookies.remove("MoimUserId");
        this.$router.go();
      }
    },
  },
  async created() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.$cookies.get("MoimUserId") != undefined) {
      this.userID = "로그아웃";
      this.islogin = true;
      this.logintext = "로그아웃";

      // 로그인되어 있는 경우
      await this.$store.dispatch(
        "UpdateUserInfo",
        this.$cookies.get("MoimUserId")
      );
      this.userinfo = this.$store.getters.getUserData;
      this.userProfile = this.userinfo.profileImage;
    }
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
  background-color: #ffffff !important;
}
.login-button {
  width: 110px !important;
}
h5 {
  font-weight: bold;
}
#header-item {
  cursor: pointer;
  color: #000000 !important;
  margin: 0 10px 0 10px;
  padding: 8px;
  vertical-align: text-bottom;
  /* font-weight: bold; */
  font-family: "NanumBarunGothic";
}
#header-item:hover {
  cursor: pointer;
  color: #4fb26f !important;
  margin: 0 10px 0 10px;
  padding: 8px;
  vertical-align: text-bottom;
  font-family: "NanumBarunGothic";
  /* font-weight: bold; */
}
#header {
  margin: 0;
  background-color: #eeeeee;
}
</style>
