<template>
  <div class="KakaoLogin">
    <h1>hello</h1>
  </div>
</template>
<script>
// @ is an alias to /src
import { getKakaoToken } from '@/services/kakaologin'
export default {
  name: 'KakaoLogin',
  created() {
        console.log("test");
        if (this.$route.query.code) {
            this.setKakaoToken();
        }
  },
  methods: {
    async setKakaoToken () {
          const data = await getKakaoToken(this.$route.query.code);
          console.log(data);
          this.$router.replace('/');
        },
  }
}
</script>