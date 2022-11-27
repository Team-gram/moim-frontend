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

검색 data가 필요해요(store/modules/searchStore.js (모듈로 분리후, 해당 모듈만 localStorage에서 보이도록 설정(store/index.js참고)))
type(검색 타입) : category / keyword
data(검색 데이터) : category 검색인 경우, 선택한 상위 카테고리 정보(Object) / keyword 검색인 경우, 입력한 검색어(String)
options(검색 추가 옵션) : {subCategory(카테고리 검색 내에서 선택한 하위 카테고리 정보(Object)), location(지역필터정보(Object))}

* 모듈로 분리된 store 사용 시,
1. getters 사용할 경우, this.$store.getters['모듈이름/함수이름'] 사용
2. mutations 사용할 경우, this.$store.commit('모듈이름/함수이름') 사용



