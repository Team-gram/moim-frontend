const kakaoHeader = {
    'Authorization': '5c0e6f65ea3343ffb30b5c3732ca46ad',
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
};
const getKakaoToken = async (code) => {
    try {
        const data = {
            grant_type: 'authorization_code',
            client_id: '27769c331d08ceb2033e090a83e1e212',
            redirect_uri: 'http://localhost:8080/kakaologin',
            code: code,
        };
        const queryString = Object.keys(data)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
             .join('&');
        await fetch("https://kauth.kakao.com/oauth/token",{
                method : "POST",
                headers : kakaoHeader,
                body : queryString})
            .then(response => response.json())
            .then((request)=>
            {
                window.Kakao.Auth.setAccessToken(request.access_token); //인가 코드를 통해 실제 접근 토큰을 가져옴
            })
        }catch (error) {
        console.error(error);
    }
};
const getUserInfo = async() => {
  let userinfo = '';
  await window.Kakao.API.request({
    url: '/v2/user/me',
    success: function(res) {
      userinfo = res;
    },
    fail: function(error) {
      console.log(error);
    },
  });
  return userinfo;
}

export {
    getKakaoToken,
    getUserInfo,
};