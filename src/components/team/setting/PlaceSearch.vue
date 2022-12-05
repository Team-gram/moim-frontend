<template>
  <div
    align="center"
    style="margin-top: 20px;"
  >
    <div class="map-area">
      <div class="searchbox" align="left" >
        <b-form-input v-model="text" id="searchkeyword" placeholder="장소" @keyup.enter="searchPlaces()"></b-form-input>
        <div v-if="!search.data.length" style="font-size:10px">데이터가 존재하지 않습니다.</div>
        <div class="searchdata" v-for="rs in search.data" :key="rs.id" @click="move(rs)">
          <div class="place">
            <hr/>
              <a @click="history(rs)" :href="rs.place_url" target="_black"><b>{{rs.place_name}}</b></a>
              <b-button variant="success" id="placeset" @click="placeAdd(rs)">추가</b-button>
            <div style="color:green;">{{rs.phone}}</div>
            <div class="searchaddress">{{rs.address_name}}</div>
          </div>
        </div>
      </div>
      <div id="map">map</div>
    </div>
    <div>장소 리스트</div>
    <div v-for="(item,index) in moimlist.data" :key="index">
      <a :href="kakaourl+item.addressId" target="_black"> <b>{{item.placeName}}</b></a>
      <b-button variant="danger" id="placeset" @click="placeRemove(item.id)">삭제</b-button>
    </div>    
  </div>
</template>

<script>
import { historySet,MoimplaceSet,MoimplaceGet,MoimplaceRemove } from '@/services/place'
import { mapGetters } from "vuex";
import { MoimDetail } from "@/services/moim";
import { getCategoryname } from "@/services/category";

export default {
  props:['Scheduleid'],
  data() {
    return {
      kakaourl:"https://map.kakao.com/link/map/",
      map:null,
      ps:null,
      infowinodw:null,
      text:"",
      moimid:0,
      moimData:null,
      recommend:null,
      search : {
        keyword : null,
        pgn : null,
        data : [],
      },
      moimlist : [],
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
      this.ps = new window.kakao.maps.services.Places();
      this.infowinodw = new kakao.maps.InfoWindow({zIndex:1});
      this.map.relayout();
    },
    searchPlaces(){
        if (!this.text.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        this.ps.keywordSearch(this.text,(data,status,pgn)=>{
          this.search.keyword = this.text;
          this.search.pgn = pgn;
          this.search.data = data;
          console.log(data);
        });
    },
    move(place){
      var moveLatLon = new kakao.maps.LatLng(place.y,place.x);
      this.map.setCenter(moveLatLon);
      var marker = new kakao.maps.Marker({
        position: moveLatLon
      });
      marker.setMap(this.map);
    },
    history(place){
      if(place.categoryGroupName!=""){
        let text = String(place.road_address_name).split(" ");
        for(var i in text){
          if(!isNaN(text[i])){
            text[i] = "";
          }
        }
        historySet(place,text);
      }
    },
    async setData(id) {
      let moimData = await MoimDetail(id);
      this.moimData = moimData.data;
      console.log(this.moimData.sido,this.moimData.sigungu)
      // const recommend = await recommendplace(this.moimData.sido,this.moimData.sigungu)
      // this.recommend = recommend.data
      const response = await getCategoryname(this.moimData.categoryId)
      this.text = this.moimData.sido + " " + this.moimData.sigungu+ " " + this.moimData.dong + " " + response.data
      this.searchPlaces()
    },
  async placeAdd(place){
      const response = await MoimplaceSet(this.MoimId,this.Scheduleid,place);
      if(response.status==200){
        this.$bvToast.toast('모임 장소가 추가 되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
      }
    },
  async MoimplaceList(){
    const response = await MoimplaceGet(this.MoimId,this.Scheduleid);
    this.moimlist = response;
  },
  async placeRemove(id){
    const response = await MoimplaceRemove(id);
    if(response.status==200){
        this.$bvToast.toast('모임 장소가 삭제 되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
      }
  }  
  },
  created() {
    this.setData(this.MoimId);
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
    this.MoimplaceList();
  },
  computed:{
    ...mapGetters("searchStore",{MoimId :'getSelectedMoimId',HostId:"getSelectedMoimHostId"}),
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
  height: 300px;
  background-color: #ffffff73;
  flex: 1 1 auto;
  overflow-y: auto;
}
.searchdata{
  font-size: 10px;
  margin: 10px;
}
#searchkeyword{
  font-size: 10px;
  width:100%
}
#placeset{
  font-size: 10px;
  padding:5px;
  margin-left:4px; 
}
</style>