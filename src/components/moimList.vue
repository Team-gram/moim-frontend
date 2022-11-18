<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
    <div id="listBox">
      <div id="listItem" v-for="moimItem in moimList" :key="moimItem.title">
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
              <b-col cols="auto">
                {{ moimItem.maxMember }} 명
              </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/location.png`)"
                ></b-img>
              </b-col>
              <b-col cols="auto">
                {{ moimItem.sido }} {{ moimItem.sigungu }} {{ moimItem.dong }}
              </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/mic.png`)"
                ></b-img>
              </b-col>
              <b-col cols="auto">
                {{ moimItem.content }}
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
      moimList: [
        {
          title: "모임1",
          maxMember: 5,
          sido: "경기도",
          sigungu:"수원시",
          dong:"영통구",
          content: "모임1에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          title: "모임2",
          maxMember: 5,
          sido: "경기도",
          sigungu:"수원시",
          dong:"영통구",
          content: "모임2에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          title: "모임3",
          maxMember: 5,
          sido: "경기도",
          sigungu:"수원시",
          dong:"영통구",
          content: "모임3에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          title: "모임4",
          maxMember: 5,
          sido: "경기도",
          sigungu:"수원시",
          dong:"영통구",
          content: "모임4에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          title: "모임5",
          maxMember: 5,
          sido: "경기도",
          sigungu:"수원시",
          dong:"영통구",
          content: "모임5에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
      ],
    };
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
