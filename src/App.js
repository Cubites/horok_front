import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import HomeComponent from "./components/home/HomeComponent";
import PayComponent from "./components/pay/PayComponent";
import FolderAddComponenet from "./components/folder/FolderAddComponent";
import FolderListComponent from "./components/folder/FolderListComponent";
import MapComponent from "./components/map/MapComponent";
import MypageComponent from "./components/mypage/MypageComponent";
import FolderShareComponent from "./components/folder/FolderShareComponent";
import ReviewWriteComponent from "./components/review/ReviewWriteComponent";
import ReviewCompleteComponent from "./components/review/ReviewCompleteComponent";
import LoginSNS from "./components/login/LoginSNS";
import SnsSignUp from "./components/login/SnsSignUp";
import LoginOrSignUp from "./components/login/LoginOrSignUp";
import Test from "./components/login/Test";
import AgreeMent from "./components/login/AgreeMent";
import ReviewListComponent from "./components/review/ReviewListComponent";
import ReviewDetailComponent from "./components/review/ReviewDetailComponent";
import ReviewReplyComponent from "./components/review/ReviewReplyComponent";
import InviteComponent from "./components/invite/InviteComponent";

function App() {
  const [filter, setFilter] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [latitude, setLatitude] = useState("0");
  const showCenterBtns = (e) => {
    e.preventDefault();

    document.getElementById("footerCenterBtnBox").classList.toggle("active");
    document.getElementById("shadowBox").classList.toggle("displayBlock");
  };
  useEffect(() => {}, []);

  return (
    <div id="container">
      <div id="mainContainer">
        <Routes>
          <Route path="/paylist" element={<PayComponent />} />
          <Route path="/folder/add" element={<FolderAddComponenet />} />
          <Route path="/folder/list" element={<FolderListComponent />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/mypage" element={<MypageComponent />} />
          <Route path="/folder/share" element={<FolderShareComponent />} />
          <Route path="/write/:payId" element={<ReviewWriteComponent />} />
          <Route
            path="/complete/:payId"
            element={<ReviewCompleteComponent />}
          />
          <Route
            path="/folder/:folderId"
            element={
              <ReviewListComponent filter={filter} setFilter={setFilter} />
            }
          />
          <Route
            path="/folder/:folderId/:reviewId"
            element={<ReviewDetailComponent filter={filter} />}
          />
          <Route path="/login" element={<LoginSNS />} />
          <Route path="/signup" element={<SnsSignUp />} />
          <Route path="/signup/agreement" element={<AgreeMent />} />
          <Route path="/loginorsignup" element={<LoginOrSignUp />} />
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<HomeComponent />} />
          <Route
            path="/review/reply/:folderId/:reviewId"
            element={<ReviewReplyComponent />}
          />
          <Route path="/invite/:inviteToken" element={<InviteComponent />} />
        </Routes>
      </div>
      <div id="footer">
        <div>
          <Link to={"/"}>
            <img src="/images/home_icon.png" alt="home_icon" />
            <span>홈</span>
          </Link>
        </div>
        <div>
          <Link to={"/paylist"}>
            <img src="/images/receipt_icon.png" alt="receipt_icon" />
            <span>결제내역</span>
          </Link>
        </div>
        <div id="footerCenter">
          <div id="footerCenterTitle" onClick={showCenterBtns}>
            <img src="/images/folder_icon.png" alt="folder_icon" />
          </div>
          <div id="footerCenterBtnBox">
            <Link
              to={"/folder/add"}
              className="folderBtn"
              onMouseUp={showCenterBtns}
            >
              <img src="/images/folder_add_icon.png" alt="folder_add_icon" />
              <span>폴더 추가</span>
            </Link>
            <Link
              to={"/folder/list"}
              className="folderBtn"
              onMouseUp={showCenterBtns}
            >
              <img src="/images/folder_list_icon.png" alt="folder_list_icon" />
              <span>폴더 목록</span>
            </Link>
          </div>
        </div>
        <div>
          <Link to={"/map"}>
            <img src="/images/map_icon.png" alt="map_icon" />
            <span>지도</span>
          </Link>
        </div>
        <div>
          <Link to={"/mypage"}>
            <img
              src="/images/personal_menu_icon.png"
              alt="personal_menu_icon"
            />
            <span>내 정보</span>
          </Link>
        </div>
        <div id="shadowBox" onMouseUp={showCenterBtns}></div>
      </div>
    </div>
  );
}

export default App;
