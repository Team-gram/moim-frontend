<template>
  <div
    align="center"
    style="margin-top: 20px;"
  >
    <div class="map-area">
      <div class="searchbox" v-for="rs in search.data" :key="rs.id">
        <div class="searchdata">
          <div class="place">
            <div>{{rs.place_name}}</div>
            <div class="searchaddress">{{rs.address_name}}</div>
          </div>
        </div>
      </div>
      <div id="map">map</div>
    </div>
    <b-form-input v-model="text" id="keyword" placeholder="Enter your name" @keyup.enter="searchPlaces()"></b-form-input>
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
      infowinodw:null,
      text:"",
      moimid:0,
      search : {
        keyword : null,
        pgn : null,
        data : [],
      }
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
      this.infowinodw = new kakao.maps.InfoWindow({zIndex:1});
    },
    searchPlaces(){
      console.log(this.text);
        if (!this.text.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        this.ps.keywordSearch(this.text,(data,status,pgn)=>{
          this.search.keyword = this.text;
          this.search.pgn = pgn;
          this.search.data = data;
        });
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
  flex: 1 1 auto;
  height: 400px;
}
.map-area{
  display: flex;
  position: relative;
}
.searchbox{
  flex-direction:column;
  z-index:10000;
  position: absolute;
  padding-bottom: 10px;
  height: 400px;
  background-color: #ffffffaa;
}
.searchdata{
  flex: 1 1 auto;
  overflow-y: auto;
}
.place{
  padding: 8px;
}
</style>