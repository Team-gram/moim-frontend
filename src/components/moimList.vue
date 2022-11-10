<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
    <div id="listBox">
      <div id="listItem" v-for="moimItem in moimList" :key="moimItem">
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
                <div>{{ moimItem.name }}</div>
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
                {{ moimItem.member }} 명
              </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/location.png`)"
                ></b-img>
              </b-col>
              <b-col cols="auto">
                {{ moimItem.place }}
              </b-col>
              <b-col cols="auto" style="padding: 0 0 0 15px">
                <b-img
                  id="listIcon"
                  :src="require(`@/assets/mic.png`)"
                ></b-img>
              </b-col>
              <b-col cols="auto">
                {{ moimItem.intro }}
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
          name: "모임1",
          member: 5,
          place: "경기도 수원시 영통구",
          intro: "모임1에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          name: "모임2",
          member: 5,
          place: "경기도 수원시 영통구",
          intro: "모임2에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          name: "모임3",
          member: 5,
          place: "경기도 수원시 영통구",
          intro: "모임3에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          name: "모임4",
          member: 5,
          place: "경기도 수원시 영통구",
          intro: "모임4에 대한 소개",
          image: require(`@/assets/test.jpg`),
        },
        {
          name: "모임5",
          member: 5,
          place: "경기도 수원시 영통구",
          intro: "모임5에 대한 소개",
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
