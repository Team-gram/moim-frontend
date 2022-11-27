<template>
  <div
    align="center"
    style="margin-top: 80px; margin-left: 20px; margin-right: 20px"
  >
    <b-row>
      <b-col>
        <div id="main-text">
          <b id="main-text-highlight">어떤 모임을 찾고 있나요?</b>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <searchbar v-on:searchKeyword="searchKeyword"></searchbar>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div
          id="category-button"
          @click="searchCategory(category)"
        >
          <img
            :src="require(`@/assets/category-icon/게임-오락.png`)"
            id="category-icon"
            style="width: 50px"
          />
          <div id="category-text">게임/오락</div>
        </div>
        <b-card id="category" style="max-width: 900px">
          <b-container>
            <b-row>
              <b-col
                v-for="category in category_list"
                :key="category.categoryId"
                cols="auto"
                id="button"
              >
                <div
                  id="category-button"
                  @click="searchCategory(category)"
                >
                  <img
                    :src="
                      require(`@/assets/category-icon/${category.categoryName.replaceAll(
                        '/',
                        '-'
                      )}.png`)
                    "
                    id="category-icon"
                    style="width: 50px"
                  />
                  <div id="category-text">
                    {{ category.categoryName }}
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="main-text">
          <b id="main-text-highlight">'김모임' 님을 위한 추천 모임</b>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <recommendMoim></recommendMoim>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getUserinfo } from "@/services/login";
import { getAllParentCategory, getChildCategory } from "@/services/category";
import searchbar from "@/components/Search/SearchBar";
import recommendMoim from "@/components/MoimRecommend";

export default {
  name: "MainHome",
  components: {
    searchbar,
    recommendMoim,
  },
  data() {
    return {
      category_list: [],
      selected_category_list: [],
    };
  },
  methods: {
    async SetCategory() {
      this.category_list.splice(0);
      let category = await getAllParentCategory();
      this.category_list = category.data;
      console.log(this.category_list);
    },
    searchKeyword: function (Data) {
      console.log(Data);
      this.$store.commit("searchStore/setSearchType", "keyword");
      this.$store.commit("searchStore/setSearchData", Data);
      this.$store.commit("searchStore/initKeywordSearchOptions");
      this.$router.push({
        name: "MoimSearchList",
      });
    },
    async searchCategory(Data) {
      console.log(Data);
      this.$store.commit("searchStore/setSearchType", "category");
      this.$store.commit("searchStore/setSearchData", Data);
      let subCategory = await getChildCategory(Data.categoryId);
      this.$store.commit("searchStore/modifySearchOptions", {
        key: "subCategory",
        value: subCategory.data[0],
      });
      this.$store.commit("searchStore/initCategorySearchOptions");
      this.$router.push({
        name: "MoimSearchList",
      });
    },
  },
  async created() {
    // 파라미터
    this.SetCategory();
    let id = this.$route.query.id;
    let jwt = this.$route.query.jwt;
    if (id !== undefined && jwt !== undefined) {
      this.$cookies.set("MoimJwt", jwt);
      const result = await getUserinfo(id);
      if (result.status == 200) {
        this.$cookies.set("MoimUserId", result.data.id);
        if (result.data["gender"] == null) {
          alert("회원가입이 필요합니다.");
          this.$router.replace("/register");
        } else {
          this.$store.commit("MoimUserInfo", result.data);
          history.replaceState({}, null, location.pathname);
          this.$router.go("/");
        }
      }
    }
  },
};
</script>

<style>
#category {
  border: none;
}
#category-button {
  box-shadow: 0px 0px 5px #ccc;
  background-color: #ffffff;
  cursor: pointer;
  width: 80px !important;
  height: 80px !important;
  border: 0px solid;
  border-radius: 10px;
  margin: 5px 5px 10px 5px;
  padding: 0;
  align-content: center;
  font-family: "NanumBarunGothic";
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
