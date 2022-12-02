<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <h4 id="schedule-title">이런 장소는 어때요?</h4>
      <div id="map"></div>
      <b-form-input v-model="text" id="keyword" placeholder="Enter your name" @keyup.enter="searchPlaces()"></b-form-input>
      <b-container class="bv-example-row">
      </b-container>
    </b-card>
    <b-button
      pill
      id="register-button"
      class="ml-auto"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="PlaceSearch()"
      >참가하기
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map:null,
      ps:null,
      text:"",
      moimid:0,
    };
  },
  methods: {
    initMap(){
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.28245492702923,127.04357729738105),
        level:3,
      };
      this.map = new kakao.maps.Map(container,options);
      this.map.relayout();
      this.ps = new window.kakao.maps.services.Places();
    },
    searchPlaces(){
      console.log(this.text);
        if (!this.text.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        this.ps.keywordSearch(this.text, (data, status, pagination)=>{
          console.log(data)
          console.log(status) 
          console.log(pagination);
      }); 
    },
    //eslint-disable-next-line
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          // displayPlaces(data);
          // 페이지 번호를 표출합니다-
          // displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
          return;
      } else if (status === kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
      }
    },
  },
  created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    var moiminfo = Object();
    moiminfo = this.$store.getters["searchStore/getSearchData"];
    console.log(moiminfo);
  },
  mounted(){
    if(!window.kakao || !window.kakao.maps){
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey=562fa760eb046b2bf13d97aa8556d908";
      /*global kakao*/ 
      script.addEventListener("load",() =>{
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else{
      this.initMap();
    }
    
  }
};
</script>
<style>
#map{
  width:400px;
  height:400px;
}
</style>