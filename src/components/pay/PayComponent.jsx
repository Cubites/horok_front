import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./payList.css";

const PayComponent = () => {
  const movePage = useNavigate();

  const [data, setData] = useState(null);
  const [totalCnt, setTotalCnt] = useState(0);

  const writeReview = (payId) => {
    //리뷰 작성 페이지로 이동
    movePage("/write");
  };

  const dateFormatting = (milliseconds) => {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    //const hours = String(date.getHours()).padStart(2, "0");
    //const minutes = String(date.getMinutes()).padStart(2, "0");
    //const seconds = String(date.getSeconds()).padStart(2, "0");

    // YYYY-MM-DD HH:mm:ss 형식으로 반환
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
  };

  const maskingCardNum = (cardNumber) => {
    return cardNumber.substring(0, 5) + "****" + cardNumber.substring(14, 19);
  };

  const getList = () => {
    axios
      .get("http://192.168.0.19:8080/api/pays/171") //{params:param} userid?
      .then((res) => {
        setData(res.data);
        setTotalCnt(res.data.length);
      });
  };

  useEffect(() => {
    getList();
  }, [totalCnt]);
  //var cnt = data.length;

  return (
    <>
      <div className="payContainer">
        <div id="headerArea">
          <div id="pageTitle">나의 결제 내역</div>
          <div id="pageInfo">결제 내역은 최근 7일 내 기록만 보여집니다.</div>
          <div id="cntArea">총 {totalCnt}건</div>
        </div>
        <div id="contentArea">
          {/*이부분이 반복*/}
          {data &&
            data.map((pay, index) => (
              <div className="payContent">
                <div className="payDate">{dateFormatting(pay.payDate)}</div>
                <div className="payContentCard">
                  <div className="left">
                    <div className="cardInfo">
                      <img
                        src={pay.cardLogo}
                        className="cardLogo"
                        alt="cardLogo"
                        width="20"
                      />
                      <div className="cardNumber">
                        {maskingCardNum(pay.cardNumber)}
                      </div>
                    </div>
                    <div className="storeName">{pay.storeName}</div>
                    <div className="storeCategory">{pay.storeCategory}</div>
                  </div>
                  <div className="right">
                    <button
                      className={
                        pay.isWritten
                          ? "reviewBtn isWritten"
                          : "reviewBtn isNotWritten"
                      }
                      onClick={writeReview}
                    >
                      {pay.isWritten ? "리뷰 작성 완료" : "리뷰 작성하기"}
                    </button>
                    <div className="payVal">{pay.credit}원</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PayComponent;
