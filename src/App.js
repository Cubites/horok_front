import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import HomeComponent from './components/home/HomeComponent';
import PayComponent from './components/pay/PayComponent';
import FolderAddComponenet from './components/folder/FolderAddComponent';
import FolderListComponent from './components/folder/FolderListComponent';
import MapComponent from './components/map/MapComponent';
import MypageComponent from './components/mypage/MypageComponent';

function App() {
  const [IsMapFirstLoad, setIsMapFirstLoad] = useState(true);
  const showCenterBtns = (e) => {
    e.preventDefault();
    document.getElementById("footerCenterBtnBox").classList.toggle('active');
  }
  useEffect(() => {
    // initMapsAPIScript();
  }, []);
  return (
    <div id="container">
      <div id="mainContainer">
        <Routes>
          <Route path="/paylist" element={<PayComponent />} />
          <Route path="/folder/add" element={<FolderAddComponenet />} />
          <Route path="/folder/list" element={<FolderListComponent />} />
          <Route path="/map" element={<MapComponent IsMapFirstLoad={IsMapFirstLoad} setIsMapFirstLoad={setIsMapFirstLoad} />} />
          <Route path="/mypage" element={<MypageComponent />} />
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </div>
      <div id="footer">
        <div>
          <Link to={"/"}>
            <img src='/images/home_icon.png' alt='home_icon' />
            <span>홈</span>
          </Link>
        </div>
        <div>
          <Link to={"/paylist"}>
            <img src='/images/receipt_icon.png' alt='receipt_icon' />
            <span>결제내역</span>
          </Link>
        </div>
        <div id="footerCenter">
          <div id="footerCenterTitle" onClick={showCenterBtns}>
            <img src='/images/folder_icon.png' alt='folder_icon' />
          </div>
          <div id="footerCenterBtnBox">
            <Link to={"/folder/add"} className='folderBtn' onMouseUp={showCenterBtns}>
              <img src='/images/folder_add_icon.png' alt='folder_add_icon' />
              <span>폴더 추가</span>
            </Link>
            <Link to={"/folder/list"} className='folderBtn' onMouseUp={showCenterBtns}>
              <img src='/images/folder_list_icon.png' alt='folder_list_icon' />
              <span>폴더 목록</span>
            </Link>
          </div>
        </div>
        <div>
          <Link to={"/map"}>
            <img src='/images/map_icon.png' alt='map_icon' />
            <span>지도</span>
          </Link>
        </div>
        <div>
          <Link to={"/mypage"}>
            <img src='/images/personal_menu_icon.png' alt='personal_menu_icon' />
            <span>내 정보</span>
          </Link>
        </div>
      </div>
    </div>
  );

  // function load(url, cb, err) {
  //   var element = document.createElement('script');
  //   var parent = 'body';
  //   var attr = 'src';

  //   element.async = true;
  //   element.onload = function () {
  //     cb();
  //   };
  //   element.onerror = function () {
  //     err();
  //   };
  //   element[attr] = url;
  //   document[parent].appendChild(element);
  // }

  // function initMapsAPIScript() {
  //   var clientId = process.env.REACT_APP_NAVER_MAP_API_CLIENT_ID;
  //   var url = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + clientId;
  //   load(url, () => {
  //     console.log('init API script success');
  //   });
  // }
}

export default App;
