<template>
  <div>
    <MoimHeader></MoimHeader>
    <router-view :key="$route.fullPath"/>
  </div>
  
</template>


<script>
import MoimHeader from './components/MoimHeader.vue'
export default {
  name: 'App',
  components: {
    MoimHeader,
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
</style>