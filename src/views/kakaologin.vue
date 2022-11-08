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
          let userinfo = await getUserInfo();
          //서버 vaild 호출
          this.axios.get('https://2080c2c3-dc1f-48fa-8d27-db3471cbce2a.mock.pstmn.io/validate',{params: {id : userinfo.id}})
          .then(result=>{
            console.log(result);
          })
          this.$router.replace('/register');
        },
  }
}
</script>