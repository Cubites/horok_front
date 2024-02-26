import React, { useState } from 'react';
import './agreeMent.css';
import ArticleDetail1 from './ArticleDetail1';
import ArticleDetail2 from './ArticleDetail2';
import ArticleDetail3 from './ArticleDetail3';
import ArticleDetail4 from './ArticleDetail4';

const AgreeMent = () => {
  let imgstatus = true;
  function agreeAllArticles() {
    let srcImg = '';
    if (imgstatus === true) {
      srcImg = process.env.PUBLIC_URL + '/images/ok_circle.png';
      imgstatus = false;
      setAllagreeValue('1');
    } else {
      srcImg = process.env.PUBLIC_URL + '/images/check_circle.png';
      imgstatus = true;
      setAllagreeValue('0');
    }
    let lists = document.getElementsByClassName('agreecircle');
    for (let li = 0; li < lists.length; li++) {
      lists[li].src = srcImg;
    }
  }

  function setAllagreeValue(val) {
    let lists = document.getElementsByClassName('agreeValue');
    for (let li = 0; li < lists.length; li++) {
      lists[li].value = val;
    }
  }

  return (
    <div id='agreeMentContainer'>
      <div id='agreementTop'>
        <img
          className='backImg'
          alt='profile'
          src={process.env.PUBLIC_URL + '/images/backArrow.png'}
          onClick={() => {
            goToLogin();
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
            src={process.env.PUBLIC_URL + '/images/oneBlue.png'}
          />
          <img
            className='grayLine'
            alt='profile'
            src={process.env.PUBLIC_URL + '/images/lineGray.png'}
          />
          <img
            className='oneAndtwo'
            alt='profile'
            src={process.env.PUBLIC_URL + '/images/twoGray.png'}
          />
        </div>
      </div>
      <div id='agreementBoxs'>
        <div id='agreementText'>
          호록에 오신 것을 진심으로 환영합니다.
          <br /> 원활한 서비스 이용을 위하여
          <br /> 아래 약관 동의 및 회원가입이 필요합니다.
        </div>

        <div id='articleBox'>
          {/* <div id='articleTitle'>추가 동의 항목</div> */}
          <div className='horokArticle' id='agreeAll'>
            <img
              id='agreeAllImg'
              className='agreecircle'
              alt='profile'
              src={process.env.PUBLIC_URL + '/images/check_circle.png'}
            />
            <div className='agreeText' onClick={agreeAllArticles}>
              전체 동의하기
            </div>
          </div>
          <div id='line'></div>
          <div className='horokArticle'>
            <img
              id='a1profile'
              className='agreecircle'
              alt='profile'
              src={process.env.PUBLIC_URL + '/images/check_circle.png'}
            />
            <div
              className='agreeText'
              onClick={() => agreeClick('a1', 'a1profile')}
            >
              [필수] 호록 이용 약관
            </div>
            <div className='lookArticle' onClick={() => showDetail('ac1')}>
              <img
                className='rightArrows'
                src={process.env.PUBLIC_URL + '/images/rightArrow.png'}
                alt=''
              />
            </div>
            <input
              type='hidden'
              className='agreeValue'
              name='a1'
              id='a1'
              value='0'
            />
          </div>
          <div className='horokArticle'>
            <img
              id='a2profile'
              className='agreecircle'
              alt='profile'
              src={process.env.PUBLIC_URL + '/images/check_circle.png'}
            />
            <div
              className='agreeText'
              onClick={() => agreeClick('a2', 'a2profile')}
            >
              [필수] 위치기반 서비스 이용 약관
            </div>
            <div className='lookArticle' onClick={() => showDetail('ac2')}>
              <img
                className='rightArrows'
                src={process.env.PUBLIC_URL + '/images/rightArrow.png'}
                alt=''
              />
            </div>
            <input
              type='hidden'
              className='agreeValue'
              name='a2'
              id='a2'
              value='0'
            />
          </div>
          <div className='horokArticle'>
            <img
              id='a3profile'
              className='agreecircle'
              alt='profile'
              src={process.env.PUBLIC_URL + '/images/check_circle.png'}
            />
            <div
              className='agreeText'
              onClick={() => agreeClick('a3', 'a3profile')}
            >
              [필수] 오픈뱅킹공동업무 금융정보 조회 약관
            </div>
            <div className='lookArticle' onClick={() => showDetail('ac3')}>
              <img
                className='rightArrows'
                src={process.env.PUBLIC_URL + '/images/rightArrow.png'}
                alt=''
              />
            </div>
            <input
              type='hidden'
              className='agreeValue'
              name='a3'
              id='a3'
              value='0'
            />
          </div>
          <div className='horokArticle'>
            <img
              id='a4profile'
              className='agreecircle'
              alt='profile'
              src={process.env.PUBLIC_URL + '/images/check_circle.png'}
            />
            <div
              className='agreeText'
              onClick={() => agreeClick('a4', 'a4profile')}
            >
              [선택] 푸시 알림 서비스 수신
            </div>
            <div className='lookArticle' onClick={() => showDetail('ac4')}>
              <img
                className='rightArrows'
                src={process.env.PUBLIC_URL + '/images/rightArrow.png'}
                alt=''
              />
            </div>
            <input
              type='hidden'
              className='agreeValue'
              name='a4'
              id='a4'
              value='0'
            />
          </div>
        </div>
      </div>
      <button id='agreeButton' onClick={agree}>
        동의하고 계속하기
      </button>
      <div id='ac1' className='articleModal'>
        <div className='blackBox' onClick={() => closeModal()}></div>
        <ArticleDetail1></ArticleDetail1>
        <div className='blackBoxBottom' onClick={() => closeModal()}></div>
      </div>
      <div id='ac2' className='articleModal'>
        <div className='blackBox' onClick={() => closeModal()}></div>
        <ArticleDetail2></ArticleDetail2>
        <div className='blackBoxBottom' onClick={() => closeModal()}></div>
      </div>
      <div id='ac3' className='articleModal'>
        <div className='blackBox' onClick={() => closeModal()}></div>
        <ArticleDetail3></ArticleDetail3>
        <div className='blackBoxBottom' onClick={() => closeModal()}></div>
      </div>
      <div id='ac4' className='articleModal'>
        <div className='blackBox' onClick={() => closeModal()}></div>
        <ArticleDetail4></ArticleDetail4>
        <div className='blackBoxBottom' onClick={() => closeModal()}></div>
      </div>
    </div>
  );
};

function goToLogin() {
  window.location.href = '/login';
}

function agreeClick(input, img) {
  let inputval = document.getElementById(input);
  let imgval = document.getElementById(img);

  if (inputval.value === '0') {
    inputval.value = '1';
    imgval.src = process.env.PUBLIC_URL + '/images/ok_circle.png';
  } else {
    inputval.value = '0';
    imgval.src = process.env.PUBLIC_URL + '/images/check_circle.png';
  }
}

function agree() {
  let a1 = document.getElementById('a1').value;
  let a2 = document.getElementById('a2').value;
  let a3 = document.getElementById('a3').value;
  let a4 = document.getElementById('a4').value;

  if (a1 === '0' || a2 === '0' || a3 === '0') {
    alert('필수 사항은 반드시 동의해주세요');
  } else {
    let url = '/signup' + window.location.search + '&push=' + a4;
    window.location.href = url;
  }
}

function agreeAllArticle() {
  window.location.href = '/signup' + window.location.search;
}

function closeModal() {
  let v = document.getElementsByClassName('articleModal');

  for (let i = 0; i < v.length; i++) {
    if (v[i].style.display !== 'none') {
      v[i].style.display = 'none';
    }
  }
}

function showDetail(modalId) {
  let divs = document.getElementById(modalId);

  divs.style.display = 'block';
}
export default AgreeMent;
