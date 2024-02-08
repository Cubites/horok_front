import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import HomeComponent from './components/home/HomeComponent';
import PayComponent from './components/pay/PayComponent';
import FolderAddComponenet from './components/folder/FolderAddComponent';
import FolderListComponent from './components/folder/FolderAddComponent';
import MapComponent from './components/map/MapComponent';
import MypageComponent from './components/mypage/MypageComponent';

function App() {
  const showCenterBtns = (e) => {
    e.preventDefault();
    let btnDisplay = document.getElementById("footerCenterBtnBox").style.display;
    if(btnDisplay === "" || btnDisplay === "none") {
      document.getElementById("footerCenterBtnBox").style.display = "flex";
    } else {
      document.getElementById("footerCenterBtnBox").style.display = "none";
    }
  }
  useEffect(() => {
    document.getElementById("footerCenterTitle").addEventListener("focusout", () => {
      document.getElementById("footerCenterBtnBox").style.display = "none";
    });
    document.querySelectorAll("#footerCenterBtnBox>.folderBtn").forEach((tag) => {
      tag.addEventListener("click", () => {
        document.getElementById("footerCenterBtnBox").style.display = "none";
      });
    });
  }, []);
  return (
    <div id="container">
      <div id="mainContainer">
        <Routes>
          <Route path="/paylist" element={<PayComponent />} />
          <Route path="/folder/add" element={<FolderAddComponenet />} />
          <Route path="/folder/list" element={<FolderListComponent />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/mypage" element={<MypageComponent />} />
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </div>
      <div id="footer">
        <div><Link to={"/"}>홈</Link></div>
        <div><Link to={"/paylist"}>결제내역</Link></div>
        <div id="footerCenter">
          <div id="footerCenterTitle" onClick={showCenterBtns}>폴더</div>
          <div id="footerCenterBtnBox">
            <Link to={"/folder/add"} className='folderBtn'>폴더 추가</Link>
            <Link to={"/folder/list"} className='folderBtn'>폴더 목록</Link>
          </div>
        </div>
        <div><Link to={"/map"}>지도</Link></div>
        <div><Link to={"/mypage"}>내 정보</Link></div>
      </div>
    </div>
  );
}

export default App;
