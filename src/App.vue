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
</style>