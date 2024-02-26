import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./complete.css";

const ReviewCompleteComponent = () => {
  const movePage = useNavigate();
  const { payId } = useParams();

  function goList() {
    movePage("/paylist");
  }

  const updateWrittenInfo = () => {
    axios
      .patch(`${process.env.REACT_APP_DEV_URL}/api/pays/${payId}`)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("error!!! : ", error);
      });
  };

  useEffect(() => {
    updateWrittenInfo();
  }, [payId]);

  return (
    <>
      <div className="container">
        <div id="textArea">리뷰작성 완료</div>
        <div id="imgArea">
          <img
            src="/images/complete.png"
            className="complete-img"
            alt="complete"
            width="150"
          />
        </div>
        <div id="buttonArea">
          <button id="completeBtn" onClick={goList}>
            확인
          </button>
        </div>
      </div>
    </>
  );
};
export default ReviewCompleteComponent;
