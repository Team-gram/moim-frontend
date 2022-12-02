<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
    <div id="list-box">
      <div
        id="list-item"
        v-for="moimItem in moimList"
        :key="moimItem.title"
        @click="moimDetail(moimItem)"
      >
        <b-row align-v="center">
          <b-col cols="auto">
            <b-img
              id="listImage"
              :src="moimItem.image"
              rounded="circle"
            ></b-img>
          </b-col>
          <b-col>
            <b-row id="listTitle">
              <b-col>
                <div>{{ moimItem.title }}</div>
              </b-col>
            </b-row>
            <b-row id="listData">
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/person.png`)"
                ></b-img>
              </b-col>
              <b-col cols="auto" style="width: 70px">
                {{ moimItem.maxMember }} 명
              </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/location.png`)"
                ></b-img>
              </b-col>
              <b-col
                cols="auto"
                style="
                  width: 150px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                "
              >
                {{ moimItem.sido }} {{ moimItem.sigungu }} {{ moimItem.dong }}
              </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img id="listIcon" :src="require(`@/assets/mic.png`)"></b-img>
              </b-col>
              <b-col
                cols="auto"
                style="
                  width: 220px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                "
              >
                {{ moimItem.content }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div v-if="!this.moimList.length">검색 결과가 없습니다.</div>
    </div>
  </div>
</template>

<script>
import { SearchMoim } from "@/services/moim";

export default {
  data() {
    return {
      moimList: [],
    };
  },
  methods: {
    async getMoimSearchResult() {
      var searchData = new Object();
      if (this.$store.getters["searchStore/getSearchType"] === "keyword") {
        //title
        searchData.title = this.$store.getters["searchStore/getSearchData"];
      } else if (
        this.$store.getters["searchStore/getSearchType"] === "category"
      ) {
        //categoryId
        if (
          this.$store.getters["searchStore/getSelectedSubCategory"] !== null
        ) {
          searchData.categoryId =
            this.$store.getters[
              "searchStore/getSelectedSubCategory"
            ].categoryId;
        } else {
          searchData.categoryId =
            this.$store.getters["searchStore/getSearchData"].categoryId;
        }
      }
      var location = this.$store.getters["searchStore/getSearchLocation"];
      if (location) {
        if (location.sido) {
          searchData.sido =
            this.$store.getters["searchStore/getSearchLocation"].sido;
        }
        if (location.sigungu) {
          searchData.sigungu =
            this.$store.getters["searchStore/getSearchLocation"].sigungu;
        }
        if (location.dong) {
          searchData.dong =
            this.$store.getters["searchStore/getSearchLocation"].dong;
        }
      }
      console.log(searchData);
      let result = await SearchMoim(searchData);
      this.moimList = result.data;
    },
    changeSubCategory() {
      this.$store.commit("searchStore/initCategorySearchOptions");
    },
    moimDetail(moimItem) {
      console.log(moimItem.id);
      this.$store.commit("searchStore/setSelectedMoimId", moimItem.id);
      this.$router.push({ name: "MoimIntro" });
    },
  },
  created() {
    this.getMoimSearchResult();
  },
  computed: {
    subCategory: function () {
      return this.$store.getters["searchStore/getSelectedSubCategory"];
    },
    location: function () {
      return this.$store.getters["searchStore/getSearchLocation"];
    },
  },
  watch: {
    subCategory(value) {
      console.log("watch subcategory", value);
      this.changeSubCategory();
      this.getMoimSearchResult();
    },
    location(value) {
      console.log("watch location", value);
      this.getMoimSearchResult();
    },
  },
};
</script>

<style>
#listBox {
  border-radius: 20px !important;
  border: 0px solid;
  background-color: #f3f3f3 !important;
  float: center;
  max-width: 1000px;
  padding: 20px 20px 20px 20px;
  margin: 10px 0 10px 0;
}
#listItem {
  cursor: pointer;
  border-radius: 20px !important;
  border: 0px solid;
  background-color: #ffffff !important;
  float: center;
  /* width: 900px !important; */
  height: 80px !important;
  padding: 5px 5x 5px 5px;
  margin: 10px 5px 10px 5px;
}
#listImage {
  width: 60px !important;
  height: 60px !important;
  float: left;
  margin: 10px 0px 10px 20px;
}
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 18px;
}
#listData {
  text-align: left;
  font-size: 15px;
}
#listIcon {
  width: 15px !important;
}
</style>
