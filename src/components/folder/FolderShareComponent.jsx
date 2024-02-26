import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./folderShare.css";

const FolderShareComponent = (props) => {
  let location = useLocation();
  const shareFolderId = location.state.folderId;
  const [user, setUser] = useState({});

  const handleShare = async () => {
    try {
      const token = await getToken();
      if (navigator.share) {
        await navigator.share({
          title: "호록",
          url: `https://horok.link/invite/${token}`,
          text: `\'${user.userNickname}\' 님이 \"${location.state.folderName}\" 폴더에 초대하셨어요. <br><br> 참가해주세요!`.trim(),
        });
      } else {
        console.log("Web Share API를 지원하지 않는 브라우저입니다.");
      }
    } catch (error) {
      console.error("공유 실패", error);
    }
  };

  const getToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEV_URL}/api/folders/invite/${shareFolderId}`, {withCredential: true}
      );
      return response.data;
    } catch (error) {
      console.error("토큰 가져오기 실패", error);
    }
  };

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/users/info`, {withCredential: true})
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="shareContainer">
      <div className="shareSubContainer">
        <div>
          <h1>폴더 생성 완료</h1>
        </div>
        <div
          className="completeBox"
          style={{
            boxShadow:
              "0px 5px 5px rgba(0, 0, 0, 0.01), 0px 5px 5px rgba(0, 0, 0, 0.01), 0px 5px 5px rgba(0, 0, 0, 0.01), 0px 5px 5px rgba(0, 0, 0, 0.01)",
          }}
        >
          <img src="/images/folder-complete.png" style={{ width: "20%" }} />
          <h2> {location.state.folderName}</h2>
        </div>
        <div style={{ width: "100%" }}>
          <p> 초대링크를 공유해보세요!</p>

          <button
            className="completeBox"
            style={{ backgroundColor: "#BECCFF" }}
            onClick={handleShare}
          >
            <img src="/images/folder-share.png" style={{ width: "25%" }} />
            <h2>초대링크 공유</h2>
          </button>
        </div>

        <Link to={"/"} style={{ width: "100%" }}>
          <div
            className="completeBox"
            style={{
              backgroundColor: "#969696",
              color: "#fff",
              height: "60px",
            }}
          >
            <h2 style={{ color: "#fff" }}>나중에 공유하기</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FolderShareComponent;
