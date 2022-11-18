Cookies 설명
MoimUserId : 유저 Id를 보관한다.
MoimJwt : 페이지 접근 권한 Jwt 토큰 보관
예시: 유저 ID를 가져오고 싶어요
var UserID = this.$cookies.get("MoimUserId");

Store 설명
Userdata가 필요해요(유저 Id만 쓰고 싶으면 Cookies에서 가져올 것)
1. this.$store.dispatch("UpdateUserInfo") 사용
사용시 Userdata가 store에 업데이트 됨(유저 Id가 Cookies에 저장되어 있어야함)
2. 1 이후 this.$store.userinfo로 데이터 가져다 쓰면 됨.
예시:
this.$store.dispatch("UpdateUserInfo");
var Userinfo = this.$store.userinfo;