<template>
  <div
    align="center"
    style="margin-top: 20px;"
  >
    <div class="map-area">
      <div class="searchbox" align="left" >
        <b-form-input v-model="text" id="searchkeyword" placeholder="장소" @keyup.enter="searchPlaces()"></b-form-input>
        <div v-if="!search.data.length" style="font-size:10px">데이터가 존재하지 않습니다.</div>
        <div v-if="placethirdlist.length>0" class="placethird">
          <p style="font-size:10px; text-align : center;"><b>우리 모임과 가장 일치하는 장소들이예요!</b></p>
          <div class="searchdata" v-for="(third,index) in placethirdlist" :key="index">
            <div class="place">
              <a style="font-size:11px" @click="historyTop(third.id)" :href="third.page" target="_black"><b>☆{{third.placeName}}☆</b></a>
              <b-button variant="success" id="placeset" @click="placeTopAdd(third)">추가</b-button>
            <div class="searchaddress">{{third.sido}} {{third.sigungu}} {{third.dong}}</div>
            <div class="searchaddress"></div>
            <hr/>
          </div>
          </div>
        </div>
        <div class="searchdata" v-for="(rs,index) in search.data" :key="index" @click="move(rs)">
          <div class="place">
              <a @click="history(rs)" :href="rs.place_url" target="_black"><b>{{rs.place_name}}</b></a>
              <b-button variant="success" id="placeset" @click="placeAdd(rs)">추가</b-button>
            <div style="color:green;">{{rs.phone}}</div>
            <div class="searchaddress">{{rs.address_name}}</div>
            <hr/>
          </div>
        </div>
      </div>
      <div id="map">map</div>
    </div>
    <div v-if="moimlist.length">장소 리스트</div>
    <div v-for="(item,index) in moimlist.data" :key="index">
      <div v-if="item.addressId>100000">
        <a :href="kakaourl+item.addressId" target="_black"> <b>{{item.placeName}}</b></a>
        <b-button variant="danger" id="placeset" @click="[placeRemove(item.id,index)]">삭제</b-button>
      </div>
      <div v-else>
        <a :href="item.page" target="_black"> <b>☆{{item.placeName}}☆</b></a>
        <b-button variant="danger" id="placeset" @click="[placeRemove(item.id,index)]">삭제</b-button>
      </div>
    </div>    
  </div>
</template>

<script>
import { historySet,MoimplaceSet,MoimplaceGet,MoimplaceRemove, MoimplaceTopSet } from '@/services/place'
import { mapGetters } from "vuex";
import { MoimDetail } from "@/services/moim";
import { getCategoryname } from "@/services/category";
import { GetPlaceTop, historyTopSet } from "@/services/meet";
export default {
  props:['Scheduleid'],
  data() {
    return {
      placefirstlist:[],
      placesecondlist:[],
      placethirdlist:[],
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
    historyTop(id){
        historyTopSet(id);
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
    async PlaceTop(){
      const response = await GetPlaceTop(this.moimData.categoryId)
      for (var index of response.data){
        if(index.sido==this.moimData.sido){
          if(index.sigungu==this.moimData.sigungu){
            if(index.dong==this.moimData.dong){
              this.placethirdlist.push(index)
           }else{
             this.placesecondlist.push(index)
           }
          }else{
            this.placefirstlist.push(index)
          }
        }
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
      this.PlaceTop()
    },
    async placeTopAdd(place){
      console.log(place)
      const response = await MoimplaceTopSet(this.MoimId,this.Scheduleid,place);
      if(response.status==200){
        this.$bvToast.toast('모임 장소가 추가 되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 1000,
        });
        const response = await MoimplaceGet(this.MoimId,this.Scheduleid);
        this.moimlist.data.push({placeName:place.placeName,id:response.data[response.data.length-1].id,page:place.page})
      }
    },
  async placeAdd(place){
      const response = await MoimplaceSet(this.MoimId,this.Scheduleid,place);
      if(response.status==200){
        this.$bvToast.toast('모임 장소가 추가 되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 1000,
        });
      const response = await MoimplaceGet(this.MoimId,this.Scheduleid);
      console.log(response)  
        this.moimlist.data.push({addressId:place.id,placeName:place.place_name,id:response.data[response.data.length-1].id})
      }
    },
  async MoimplaceList(){
    const response = await MoimplaceGet(this.MoimId,this.Scheduleid);
    this.moimlist = response;
  },
  async placeRemove(id,index){
    console.log(id)
    const response = await MoimplaceRemove(id);
    if(response.status==200){
        this.$bvToast.toast('모임 장소가 삭제 되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 1000,
        });
      }
    this.moimlist.data.splice(index,1);
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
  background-color: #ffffff5b;
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
.placethird{
  background-color: #fccfcf77;
}
</style>