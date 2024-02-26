import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./reply.css";
import axios from "axios";

const ReviewReplyComponent = ({ folderName }) => {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const [replyList, setreplyList] = useState({});
  const [replyInputValue, setReplyInputValue] = useState("");
  const { folderId, reviewId } = useParams();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };
  const formatReplyDate = (replyDate) => {
    const dateObject = new Date(...replyDate);
    const formattedDate = `${dateObject.getFullYear()}-${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  };
  const getReplies = () => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/api/reviews/replies/${folderId}/${reviewId}`, {withCredential: true}
      )
      .then((res) => {
        setreplyList(res.data);
      });
  };

  const handleButtonClick = () => {
    if (!replyInputValue.trim()) {
      // 입력값이 비어있으면 아무 작업도 하지 않음
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/api/replies/write`,
        null, // body는 null로 설정
        {
          params: {
            folderReviewId: location.state.folderReviewId, //replyList[0].folderReviewId,
            replyContent: replyInputValue,
          },
          withCredentials: true
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data === true) {
          window.alert("댓글이 등록되었습니다");
          getReplies();
        }
      });

    // 입력값 초기화
    setReplyInputValue("");
  };

  const deleteReplyClick = (e) => {
    const rId = e.target.getAttribute("data");
    axios
      .delete(`${process.env.REACT_APP_DEV_URL}/api/replies/${rId}`, {withCredential: true})

      .then((res) => {
        if (res.data === true) {
          window.alert("댓글이 삭제되었습니다");
          getReplies();
        }
      });
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <>
      <div id="replyContainer">
        <div className="replyHeader">
          <div className="wrapper">
            <div className="backBtn cursorToPointer">
              <img
                src="/images/backArrow.png"
                alt="backArrow"
                height="50"
                onClick={handleGoBack}
              />
            </div>
            <div className="headerTxt">{folderName}</div>
          </div>
        </div>
        <div className="replyBody scrollBar">
          <div
            style={{
              width: "82%",
              fontWeight: "bold",
              fontSize: "21px",
              marginTop: "15px",
              marginBottom: "5px",
            }}
          >
            <p>댓글</p>
          </div>
          <div style={{ width: "85%" }}>
            {replyList &&
              replyList.length > 0 &&
              replyList.map((list, i) => (
                <li key={i} className="replyList">
                  <div className="replyImg">
                    <img
                      src={`${process.env.REACT_APP_DEV_URL}/show/image?imageName=${list.userProfile}`}
                      alt=""
                      className="replyImgContainer"
                    />
                  </div>
                  <div className="replyContent">
                    <div className="replyInfo">
                      <p
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {list.userNickname}
                      </p>
                      <p style={{ fontSize: "10px" }}>
                        {formatReplyDate(list.replyDate)}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ fontSize: "12px" }}>{list.replyContent}</p>
                      {list.loginId === list.userId && (
                        <div
                          style={{ fontSize: "10px", color: "#808080" }}
                          onClick={deleteReplyClick}
                          data={list.replyId}
                        >
                          삭제
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </div>
        </div>
        <div className="replyBottom">
          <input
            type="text"
            className="replyInput"
            value={replyInputValue}
            onChange={(e) => setReplyInputValue(e.target.value)}
          />
          <button className="replyBtn" onClick={handleButtonClick}>
            작성
          </button>
        </div>
      </div>
    </>
  );
};
export default ReviewReplyComponent;
