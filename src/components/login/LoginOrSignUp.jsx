import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function LoginOrSignUp() {
  // 페이지가 로드될 때 실행되는 useEffect
  useEffect(() => {
    // 쿼리 파라미터를 읽어오는 함수를 실행
    readQueryParam();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // 쿼리 파라미터를 읽어오는 함수
  const readQueryParam = () => {
    const query = new URLSearchParams(window.location.search);
    const email = query.get('email');
    const provider = query.get('provider');
    if (email === null) {
      window.location.href = '/';
    } else {
      const param = new URLSearchParams(email, provider).toString();
      console.log(param);
      window.location.href =
        'signup/agreement?email=' + email + '&' + 'provider=' + provider;
    }
  };

  return <div>LoginOrSignUp</div>;
}

export default LoginOrSignUp;
