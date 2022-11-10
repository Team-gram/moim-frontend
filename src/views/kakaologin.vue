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
          let usedid = await this.getUsedid(userinfo.id);
          //임시 테스트 usedid가 1이면 main으로 이동, usedid가 0이면 register로 이동.
          //[수정]해서 테스트하세요
          if(usedid!=0)
            this.$router.replace('/');
          else
            this.$router.replace('/register');
        },
    async getUsedid(userid){
          let data = "";
          await this.axios.get('https://pz9ucukztk.execute-api.ap-northeast-1.amazonaws.com/default/vaild',{params: {id : userid}})
          .then(result=>{
            data = result.data;
            console.log(data);
          })
          return Number(data);
    }
  }
}
</script>