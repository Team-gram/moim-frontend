 <template>
 <div>
    <b-img center valign="absmiddle" id="Introimg" :src="require(`@/assets/test.jpg`)"></b-img>
    <b-button class="overlay" pill variant="light" id="button">가입하기</b-button>
  <div
      align="center"
      style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
    >
    <div id="listbackground">
      <div id="title">기본 정보</div>
      <b-row class="mb-3" id="menu">
        <b-col id="subtitle">카테고리</b-col>
        <div class="w-100" ></div>
        <b-col id="categorytext">{{category_data1}} > {{category_data2}}</b-col>
      </b-row>
      <b-row class="mb-3" id="menu">
        <b-col id="subtitle">활동지역</b-col>
        <div class="w-100" ></div>
        <b-col id="categorytext">{{region}}</b-col>
      </b-row>
      <b-row class="mb-3" id="menu">
        <b-col id="subtitle">정기 모임</b-col>
        <div class="w-100" ></div>
        <b-col id="categorytext">{{regular}}</b-col>
      </b-row>
      <b-row class="mb-3" id="menu">
        <b-col id="subtitle">정원 및 가입자 수</b-col>
        <div class="w-100" ></div>
        <b-col id="categorytext">{{maximum}}, {{register}}</b-col>
      </b-row>
    </div>
    <div id="listbackground">
      <div id="title">소개글</div>
      <div>{{introduction}}</div>
    </div>
    <div id="listbackground">
      <div id="title">분석 리스트</div>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      category_data1:"아웃도어/여행",
      category_data2:"등산",
      region: "경기도 수원시 영통구 우만동",
      regular: "등록된 정기 모임이 없습니다.",
      maximum: "정원: 30명",
      register: "가입자 수:10명",
      introduction: "우리 모임은 1970년 영국에서 만들어진",
    };
  },
  methods:{
    
  }
}
</script>
<style>
#Introimg{
  width:100%;
}
#button{
  padding: 2px 5px 2px 5px;
}
#title{
  font-size: 22px;
}
#subtitle{
  font-size: 17px;
}
#menu{
  margin: 0 10px 0 10px;
}
#categorytext{
  background-color: white !important;
  border-radius: 20px !important;
  font-size: 15px;
  max-width: 45em;
  padding: 5px 0 5px 0;
}
#listbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 20px 30px 30px 30px;
  margin: 10px 0 10px 0;
  max-width: 1050px;
}
</style>