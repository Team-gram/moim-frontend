<template>
  <div class="KakaoLogin">
  </div>
</template>
<script>
// @ is an alias to /src
import { getKakaoToken, getUserInfo } from '@/services/kakaologin'
export default {
  name: 'KakaoLogin',
  created() {
        if (this.$route.query.code) {
            this.setKakaoToken();
        }
  },
  methods: {
    async setKakaoToken () {
          await getKakaoToken(this.$route.query.code);
          const userinfo = await getUserInfo();
          this.$store.commit('KakaouserSet', userinfo);
          this.$router.replace('/register');
        },
    async getUsedid(userid){
          let data = "";
          await this.axios.get('https://pz9ucukztk.execute-api.ap-northeast-1.amazonaws.com/default/vaild',{params: {id : userid}})
          .then(result=>{
            data = result.data;
          })
          return Number(data);
    }
  }
}
</script>