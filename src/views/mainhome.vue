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
    async Userinfo(id){
      let data = ''
      await this.axios.get('/user',{params: {"id" : id}})
          .then(response=>{
            data = response;
          })
      return data;
    }
  },
  created() {
    // 파라미터
    this.SetCategory();
    let id = this.$route.query.id;
        let jwt = this.$route.query.jwt;
        console.log(id, jwt);

        if (id !== undefined && jwt !== undefined) {
            this.axios.get('/user/' + id)
                .then((response) => {
                    console.log(response.data);
                    // response 데이터 스토어에 저장하는 로직 작성
                });
            //스토어에 저장 완료되면 메인이나 추가정보 입력창으로 리다이렉트 하면 됨
            //window.location.href = '/';
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
