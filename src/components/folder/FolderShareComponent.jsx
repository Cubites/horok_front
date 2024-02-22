import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./folderShare.css";

const FolderShareComponent = (props) => {
  let location = useLocation();
  console.log(location.state.folderName);
  useEffect(() => {}, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "핸디의 개발 블로그",
          text: "이 글은 SNS 공유하기에 대한 글입니다.",
          url: "https://all-dev-kang.tistory.com/",
        });
        console.log("공유 성공");
      } else {
        console.log("Web Share API를 지원하지 않는 브라우저입니다.");
      }
    } catch (error) {
      console.error("공유 실패", error);
    }
  };

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
