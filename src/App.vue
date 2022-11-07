<template>
  <div>
    <MoimHeader></MoimHeader>
    <router-view/>
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
    kakaoLogin() {
      const params = {
        redirectUri:'http://localhost:8080/kakaologin',
      }
      window.Kakao.Auth.authorize(params);
    },
  },
}
</script>

