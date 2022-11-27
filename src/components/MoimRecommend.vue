<template>
  <div>
    <div id="option-button">
      <span @click="changePrevRecommendType()">
        <i class="fa-solid fa-angle-left" id="recommend-type-change-button"></i>
      </span>
      <a v-if="this.currentRecommendMoimData.recommendType !== 'category'">  {{ this.currentRecommendMoimData.recommendDetail }} 추천  </a>
      <a v-else>  관심 카테고리({{ this.currentRecommendMoimData.recommendDetail }}) 추천  </a>
      <span @click="changeNextRecommendType()">
        <i
          class="fa-solid fa-angle-right"
          id="recommend-type-change-button"
          @click="changeNextRecommendType()"
        ></i>
      </span>
    </div>
    <div id="moim-list-box">
      <div
        id="moim-list-item"
        v-for="moimItem in currentRecommendMoimData.moimList"
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
              <b-col cols="auto"> {{ moimItem.maxMember }} 명 </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/location.png`)"
                ></b-img>
              </b-col>
              <b-col cols="auto">
                {{ moimItem.sido }} {{ moimItem.sigungu }} {{ moimItem.dong }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRecommendMoimData: [],
      currentRecommendMoimIndex: null,
      allRecommendMoimData: [
        {
          recommendType: "age",
          recommendDetail: "30대",
          moimList: [
            {
              image: "image",
              title: "30대 모임방1",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "30대 모임방2",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "30대 모임방3",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "30대 모임방4",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "30대 모임방5",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
          ],
        },
        {
          recommendType: "gender",
          recommendDetail: "남자",
          moimList: [
            {
              image: "image",
              title: "남자 모임방1",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "남자 모임방2",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "남자 모임방3",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "남자 모임방4",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "남자 모임방5",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
          ],
        },
        {
          recommendType: "category",
          recommendDetail: "다트",
          moimList: [
            {
              image: "image",
              title: "다트 모임방1",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "다트 모임방2",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "다트 모임방3",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "다트 모임방4",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
            {
              image: "image",
              title: "다트 모임방5",
              maxMember: 10,
              sido: "경기도",
              sigungu: "수원시 팔달구",
              dong: "우만동",
            },
          ],
        },
      ],
    };
  },
  methods: {
    changePrevRecommendType() {
      console.log("hi?");
      if (this.currentRecommendMoimIndex == 0)
        this.currentRecommendMoimIndex = this.allRecommendMoimData.length - 1;
      else this.currentRecommendMoimIndex -= 1;
      this.currentRecommendMoimData =
        this.allRecommendMoimData[this.currentRecommendMoimIndex];
      console.log(this.currentRecommendMoimData);
      console.log(this.currentRecommendMoimData);
    },
    changeNextRecommendType() {
      if (
        this.currentRecommendMoimIndex ==
        this.allRecommendMoimData.length - 1
      )
        this.currentRecommendMoimIndex = 0;
      else this.currentRecommendMoimIndex += 1;
      this.currentRecommendMoimData =
        this.allRecommendMoimData[this.currentRecommendMoimIndex];
      console.log(this.currentRecommendMoimData);
    },
  },
  created() {
    this.currentRecommendMoimIndex = 0;
    this.currentRecommendMoimData =
      this.allRecommendMoimData[this.currentRecommendMoimIndex];
  },
};
</script>

<style>
#recommend-type {
  background-color: #4fb26f;
  border-radius: 20px !important;
  border: 0px solid;
  color: #ffffff;
  font-family: "NanumBarunGothic";
  padding: 5px 20px 5px 20px;
  width: fit-content;
}
#recommend-type-change-button {
  cursor: pointer;
}
</style>
