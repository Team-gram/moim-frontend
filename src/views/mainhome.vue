<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <h4 style="margin-top: 20px; margin-bottom: 40px">
      <b>어떤 모임을 찾고 있나요?</b>
    </h4>
    <searchbar v-on:searchKeyword="searchKeyword"></searchbar>
    <b-row>
      <b-col>
        <b-card id="category" style="max-width: 900px">
          <b-container>
            <b-row>
              <b-col
                v-for="category in category_list"
                :key="category"
                cols="auto"
                id="button"
              >
                <div
                  id="category-button"
                  :style="[
                    selected_category_list.includes(category)
                      ? { backgroundColor: '#9b9b9b' }
                      : { backgroundColor: '#d9d9d9' },
                  ]"
                  @click="searchCategory(category)"
                >
                  <img
                    :src="
                      require(`@/assets/category-icon/${category.replaceAll(
                        '/',
                        '-'
                      )}.png`)
                    "
                    id="category-icon"
                    style="width: 50px"
                  />
                  <div id="category-text">
                    {{ category }}
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getUserinfo } from '@/services/login';
import searchbar from "@/components/Search/SearchBar";
import categoryjson from "@/data/카테고리.json";
export default {
  name: "MainHome",
  components: {
    searchbar,
  },
  data() {
    return {
      category_list: [],
      selected_category_list: [],
    };
  },
  methods: {
    SetCategory: function () {
      this.category_list.splice(0);
      for (var index in categoryjson) {
        this.category_list.push(index);
      }
    },
    searchKeyword: function (Data) {
      console.log(Data);
      this.$router.push({
        name: "MoimSearchList",
        query: { type: "keyword", data: Data },
      });
    },
    searchCategory: function (Data) {
      console.log(Data);
      this.$router.push({
        name: "MoimSearchList",
        query: { type: "category", data: Data },
      });
    },
  },
 async created() {
    // 파라미터
    this.SetCategory();
    let id = this.$route.query.id;
    let jwt = this.$route.query.jwt;
    if (id !== undefined && jwt !== undefined) {
        this.$store.commit('JwtSet', jwt);
        const result = await getUserinfo(id);
        if(result.status==200){
          this.$store.commit('KakaouserSet', result);
          if(result.data["gender"]==null){
            alert("회원가입이 필요합니다.");
            this.$router.replace('/register');
          }
          else{
            this.$router.replace('/').catch(()=>{});
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
  cursor: pointer;
  width: 80px !important;
  height: 80px !important;
  border: 0px solid;
  border-radius: 10px;
  margin: 5px 5px 10px 5px;
  padding: 0;
  align-content: center;
  /* background-color: #d9d9d9 !important; */
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
