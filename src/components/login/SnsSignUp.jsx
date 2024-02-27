import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './snsSignUp.css';
const SnsSignUp = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id='signUpContainer'>
      <div id='signUpTop'>
        <img
          className='backImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/backArrow.png'}
          onClick={() => {
            exPage();
          }}
        />
        <img
          className='mainImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/LoginPoint.png'}
        />
        <div id='horok'>호록</div>
        <div id='oneAndTwoImgBox'>
          <img
            className='oneAndtwo'
            alt='profile'
            src={process.env.PUBLIC_URL + '/images/oneGray.png'}
          />
          <img
            className='grayLine'
            alt='profile'
            src={process.env.PUBLIC_URL + '/images/lineGray.png'}
          />
          <img
            className='oneAndtwo'
            alt='profile'
            src={process.env.PUBLIC_URL + '/images/twoBlue.png'}
          />
        </div>
      </div>
      <div id='imgAndtext'>
        <img
          id='profileImg'
          alt='profile'
          src={
            previewImage
              ? previewImage
              : process.env.PUBLIC_URL + '/images/Ellipse11.png'
          }
          onClick={fileInputClick}
        />
        <div id='profileAddText'>프로필 사진 추가</div>
        <input
          id='profileImgInput'
          type='file'
          accept='image/png, image/jpeg'
          onChange={handleFileChange}
        ></input>
        <div id='nickName'>닉네임</div>
        <input id='nickInput' type='text' maxLength={15} />
        <button id='signupSuccess' onClick={SignupProcess}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
};

async function SignupProcess() {
  const nick = document.getElementById('nickInput').value;
  const applyFile = document.getElementById('profileImgInput');
  console.log(applyFile);
  if (nick === '') {
    alert('닉네임을 입력해주세요');
  } else {
    const query = new URLSearchParams(window.location.search);
    const email = query.get('email');
    const provider = query.get('provider');
    const agreement = query.get('push') === '0' ? false : true;
    const formData = new FormData();

    formData.append('email', email);
    formData.append('provider', provider);
    formData.append('nick', nick);
    formData.append('agreement', agreement);
    let profileImg = applyFile.files[0];
    if (profileImg !== undefined) {
      formData.append('profile', applyFile.files[0]);
    }
    const response = await axios
      .post(process.env.REACT_APP_DEV_URL + '/login/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })
      .then(function (response) {
        //location.href = '/login';
        console.log(response);
        if (response.status == 200) {
          window.location.href = '/login';
        }
      })
      .catch(function (error) {});
  }
}

function exPage() {
  window.history.back();
}

function fileInputClick() {
  document.getElementById('profileImgInput').click();
}

export default SnsSignUp;
