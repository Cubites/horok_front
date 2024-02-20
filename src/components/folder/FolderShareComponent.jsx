import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./folderShare.css";

const FolderShareComponent = (props) => {
  let location = useLocation();
  console.log(location.state.folderName);
  useEffect(() => {}, []);

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

          <div className="completeBox" style={{ backgroundColor: "#BECCFF" }}>
            <img src="/images/folder-share.png" style={{ width: "25%" }} />
            <h2>초대링크 공유</h2>
          </div>
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
