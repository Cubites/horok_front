import { useEffect } from 'react';
import './loginSNS.css';

let NAVER_AUTH_URL = '';
let KAKAO_AUTH_URL = '';
let GOOGLE_AUTH_URL = '';

// export const BASE_IP = process.env.REACT_APP_FRONT_URL.split(':')[0];

//서버로 인증을 요청할 uri (서버의 webSecurityConfig의 base uri와 일치해야 한다)
export const API_BASE_URL = process.env.REACT_APP_DEV_URL;

//서버에서 인증을 완료한 후에 프론트엔드로 돌아올 redirect uri (app.oauth2.authorized-redirect-uri와 일치해야 한다)
let OAUTH2_REDIRECT_URI = process.env.REACT_APP_FRONT_URL + '/loginorsignup';

function readQueryParam() {
  const query = new URLSearchParams(window.location.search);
  const uri = query.get('redirect_uri');
  if (uri !== null) {
    OAUTH2_REDIRECT_URI = process.env.REACT_APP_FRONT_URL + uri;
  }
  NAVER_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorization/naver?redirect_uri=' +
    OAUTH2_REDIRECT_URI;

  KAKAO_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorization/kakao?redirect_uri=' +
    OAUTH2_REDIRECT_URI;

  GOOGLE_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorization/google?redirect_uri=' +
    OAUTH2_REDIRECT_URI;
}
function locationOAuth2(path) {
  window.location.href = path;
}

const LoginSNS = () => {
  useEffect(() => {
    // 쿼리 파라미터를 읽어오는 함수를 실행
    readQueryParam();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함
  return (
    <div id='loginContainer'>
      <div id='imgBox'>
        <img
          className='mainImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/horokLoginMain.png'}
        />
        <img
          className='mainImg'
          id='point'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/LoginPoint.png'}
        />
      </div>
      <div id='logintextBox'>
        <span className='loginText' id='textTop'>
          내가 좋아하는 것만 호록!
        </span>
        <span className='loginText' id='textBottom'>
          소셜 아이디로 간편하게 시작해보세요!
        </span>
      </div>
      <div id='loginImgBox'>
        <img
          className='socialImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/naverLoginIng.jpg'}
          onClick={() => locationOAuth2(NAVER_AUTH_URL)}
        />

        <img
          className='socialImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/kakaoLogin.png'}
          onClick={() => locationOAuth2(KAKAO_AUTH_URL)}
        />

        <img
          className='socialImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/googleLogin.png'}
          onClick={() => locationOAuth2(GOOGLE_AUTH_URL)}
        />
      </div>
    </div>
  );
};

export default LoginSNS;
