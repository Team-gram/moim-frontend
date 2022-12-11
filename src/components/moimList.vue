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
import { mapGetters,mapMutations } from "vuex";
export default {
  data() {
    return {
      moimList: [],
    };
  },
  methods: {
    async getMoimSearchResult() {
      var searchData = new Object();
      // this.$store.getters["searchStore/getSearchType"] 
      if(this.getSearchType === "keyword") {
        //title
        searchData.title = this.getSearchData;
      } 
      else if (this.getSearchType === "category"){
        //categoryId
        if (this.getSelectedSubCategory !== null) {
          searchData.categoryId = this.getSelectedSubCategory
        } else {
          searchData.categoryId = this.getSearchData.categoryId;
        }
      }
      var location = this.getSearchLocation;
      // var location = this.$store.getters["searchStore/getSearchLocation"];
      if (location) {
        if (location.sido) {
          searchData.sido = this.getSearchLocation.sido;
            // this.$store.getters["searchStore/getSearchLocation"].sido;
        }
        if (location.sigungu) {
          searchData.sigungu = this.getSearchLocation.sigungu;
            // this.$store.getters["searchStore/getSearchLocation"].sigungu;
        }
        if (location.dong) {
          searchData.dong = this.getSearchLocation.dong;
            // this.$store.getters["searchStore/getSearchLocation"].dong;
        }
      }
      console.log(searchData);
      let result = await SearchMoim(searchData);
      this.moimList = result.data;
    },
    changeSubCategory() {
      // this.$store.commit("searchStore/initCategorySearchOptions");
      this.initCategorySearchOptions();
    },
    moimDetail(moimItem) {
      console.log(moimItem.id);
      this.setSelectedMoimId(moimItem.id);
      // this.$store.commit("searchStore/setSelectedMoimId", moimItem.id);
      this.$router.push({ name: "MoimIntro" });
    },
  },
  created() {
    this.getMoimSearchResult();
    // console.log("다음 실행할 두개는 결과가 같아야 한다.");
    // console.log(this.subCategory);
    // console.log(this.subCate)
    // console.log("다음 값이 변경 되었을 때 watch에 의해 적발 되어야 한다.")
    // console.log("모든 테스트가 동일하니 변수를 대체할 수 있다. 리펙토링");
  },
  computed: {
    ...mapGetters("searchStore",{
      getSelectedSubCategory:"getSelectedSubCategory",
      getSearchType:"getSearchType",
      getSearchLocation:"getSearchLocation",
      getSearchData:"getSearchData"
      }),
    ...mapMutations("searchStore",{
      setSelectedMoimId:"setSelectedMoimId",
      initCategorySearchOptions:"initCategorySearchOptions",
      }),
    // subCategory: function () {
    //   return this.$store.getters["searchStore/getSelectedSubCategory"];
    // },
    // location: function () {
    //   return this.$store.getters["searchStore/getSearchLocation"];
    // },
  },
  watch: {
    // subCate(value) {
    //   console.log("watch subcategory", value);
    //   this.changeSubCategory();
    //   this.getMoimSearchResult();
    // },
    getSelectedSubCategory(value) {
      console.log("watch subcategory", value);
      this.changeSubCategory();
      this.getMoimSearchResult();
    },
    getSearchLocation(value) {
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
