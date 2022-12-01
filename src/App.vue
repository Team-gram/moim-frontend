<template>
  <div>
    <MoimHeader></MoimHeader>
    <router-view :key="$route.fullPath"/>
    <MoimFooter class="footer"></MoimFooter>
  </div>
  
</template>


<script>
import MoimHeader from './components/MoimHeader.vue'
import MoimFooter from './components/MoimFooter.vue'
export default {
  name: 'App',
  components: {
    MoimHeader,
    MoimFooter,
  },
  methods: {
    
  },
  created(){
    this.$store.commit('Resize',window.innerWidth,window.innerHeight);
  },
  mounted(){
    window.addEventListener('resize',() =>{
      this.$store.commit('Resize',window.innerWidth,window.innerHeight);
    });
  }
}
</script>

<style>
.v-application {
  font-family: 'NanumBarunGothic', sans-serif !important;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('assets/fonts/NanumBarunGothic.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('assets/fonts/NanumBarunGothicLight.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('assets/fonts/NanumBarunGothicBold.ttf') format('truetype');
  font-weight: 700;
}
#main-text {
  float: center;
  max-width: 700px;
  height: 40px;
  margin: 10px 0 10px 0;
  font-size: 25px;
  /* background:linear-gradient(180deg, transparent 60%, yellow 60%); */
  font-family: "NanumBarunGothic";
}
#main-text-highlight {
  background:linear-gradient(180deg, transparent 60%, #4FB26F 60%);
}
#list-box { /*모임 리스트를 감싸는 박스에 대한 id*/
  float: center;
  max-width: 700px;
  height: max-content;
  margin: 20px 0 20px 0;
}
#list-item {  /*모임 리스트 내 개별 요소에 대한 id*/
  cursor: pointer;
  border-radius: 20px !important;
  border: 0px solid;
  box-shadow: 0px 0px 5px #ccc;
  background-color: #ffffff;
  float: center;
  max-width: 700px;
  height: 80px;
  padding: 5px 5x 5px 5px;
  margin: 10px 0 10px 0;
  font-family: "NanumBarunGothic";
}
#green-colored-option-button {  /*초록색 옵션 버튼 id*/
  background-color: #4fb26f;
  border-radius: 20px !important;
  border: 0px solid;
  color: #ffffff;
  font-family: "NanumBarunGothic";
  padding: 5px 20px 5px 20px;
  width: fit-content;
}
#green-outline-option-button {  /*초록색 외곽 옵션 버튼 id*/
  background-color: #ffffff;
  border-radius: 20px !important;
  border: 1px solid #4fb26f;
  font-family: "NanumBarunGothic";
  padding: 2px 20px 2px 20px;
  width: fit-content;
}
#gray-colored-option-button {  /*회색 옵션 버튼 id*/
  background-color: #aaaaaa;
  border-radius: 20px !important;
  border: 0px solid #aaaaaa;
  color: #ffffff;
  font-family: "NanumBarunGothic";
  padding: 2px 20px 2px 20px;
  width: fit-content;
}
#gray-outline-option-button {  /*회색 외곽 옵션 버튼 id*/
  background-color: #ffffff;
  border-radius: 20px !important;
  border: 1px solid #aaaaaa;
  font-family: "NanumBarunGothic";
  padding: 2px 20px 2px 20px;
  width: fit-content;
}
#default-item {  /*기본 요소에 대한 id*/
  border-radius: 20px !important;
  border: 0px solid;
  box-shadow: 0px 0px 5px #ccc;
  background-color: #ffffff;
  float: center;
  font-family: "NanumBarunGothic";
}
#gray-icon {  /*회색 아이콘*/
  color: #aaaaaa;
}
</style>