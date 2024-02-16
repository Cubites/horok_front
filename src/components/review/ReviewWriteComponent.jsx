import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./writeReview.css";
import MultiSelectComponent from "./MultiSelectComponent";
import FileUploadComponent from "./FileUploadComponent";

const ReviewWriteComponent = () => {
  const movePage = useNavigate();
  const { payId } = useParams();

  const [data, setData] = useState({});

  const goBack = () => {
    //이전 페이지로 이동
    movePage(-1);
  };

  const fileUpload = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file".img);
  };
  const getPayInfo = () => {
    axios
      .get(`http://192.168.0.24:8080/api/pays/${payId}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("error!!! : ", error);
      });
  };

  useEffect(() => {
    // getPayInfo();
  }, [payId]);

  return (
    <>
      <div className="backBtnArea">
        <img
          src="/images/backArrow.png"
          className="backArrow"
          alt="backArrow"
          onClick={goBack}
          width="50"
        />
        <div className="backTxt">이전</div>
      </div>
      <div className="writeReviewArea">
        <form>
          <div className="payInfoArea card">
            <div className="storeName">{/*data.storeName*/}</div>
            <div className="payDate">{/*data.payDate*/}</div>
            <hr></hr>
            <div className="priceArea">
              <div className="priceHeader">총 금액</div>
              <div className="priceVal">{/*data.credit*/}원</div>
            </div>
          </div>
          <div className="reviewImgArea card">
            <FileUploadComponent className="fileUploader" />
          </div>
          <div className="scoreArea card">
            <div className="scoreTxt">평점</div>
            <fieldset class="rating">
              <input type="radio" id="star5" name="rating" value="5" />
              <label class="full" for="star5" title="Awesome - 5 stars"></label>
              <input type="radio" id="star4half" name="rating" value="4.5" />
              <label
                class="half"
                for="star4half"
                title="Pretty good - 4.5 stars"
              ></label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label
                class="full"
                for="star4"
                title="Pretty good - 4 stars"
              ></label>
              <input type="radio" id="star3half" name="rating" value="3.5" />
              <label
                class="half"
                for="star3half"
                title="Meh - 3.5 stars"
              ></label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label class="full" for="star3" title="Meh - 3 stars"></label>
              <input type="radio" id="star2half" name="rating" value="2.5" />
              <label
                class="half"
                for="star2half"
                title="Kinda bad - 2.5 stars"
              ></label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label
                class="full"
                for="star2"
                title="Kinda bad - 2 stars"
              ></label>
              <input type="radio" id="star1half" name="rating" value="1.5" />
              <label
                class="half"
                for="star1half"
                title="Meh - 1.5 stars"
              ></label>
              <input type="radio" id="star1" name="rating" value="1" />
              <label
                class="full"
                for="star1"
                title="Sucks big time - 1 star"
              ></label>
              <input type="radio" id="starhalf" name="rating" value="0.5" />
              <label
                class="half"
                for="starhalf"
                title="Sucks big time - 0.5 stars"
              ></label>
            </fieldset>
          </div>
          <div className="reviewTxtArea card">
            <div className="txtAreaHeader">
              <img
                src="/images/noteIcon.png"
                className="noteIcon"
                alt="noteIcon"
                width="20"
              />
              리뷰를 작성해 주세요
            </div>
            <textarea
              cols="30"
              rows="7"
              placeholder={`리뷰는 신중하게 작성해주세요. 
타인에게 불쾌감을 주는 리뷰는 통보없이 삭제될 수 있습니다.`}
            ></textarea>
          </div>
          <div className="selectBoxHeader">공유폴더 선택</div>
          <div className="selectFoldersArea card">
            <MultiSelectComponent />
          </div>
          <input className="submitBtn" type="submit" value="작성완료" />
        </form>
      </div>
    </>
  );
};
export default ReviewWriteComponent;
