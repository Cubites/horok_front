import { useNavigate } from "react-router-dom";

const ReviewCompleteComponent = () => {
  const movePage = useNavigate();

  function goList() {
    movePage("/paylist");
  }
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
