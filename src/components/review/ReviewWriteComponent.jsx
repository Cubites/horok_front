import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./writeReview.css";
import MultiSelectComponent from "./MultiSelectComponent";
import FileUploadComponent from "./FileUploadComponent";

const ReviewWriteComponent = () => {
  const movePage = useNavigate();
  const location = useLocation();
  const { payId } = useParams();
  const { storeId } = location.state;

  const [data, setData] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const goBack = () => {
    //이전 페이지로 이동
    movePage(-1);
  };

  // const fileUpload = (e) => {
  //   const img = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file".img);
  // };
  const getPayInfo = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/pays/${payId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("error!!! : ", error);
      });
  };

  const handleFileUpload = (images) => {
    //파일 정보 받아와 상태 설정
    setUploadedImages(images);
  };
  const submitForm = (formData) => {
    uploadedImages.forEach((image, index) => {
      formData.append("images", image);
    });

    formData.append("storeId", storeId);
    axios
      .post(`/api/reviews/write`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        withCredentials: true,
        baseURL: process.env.REACT_APP_DEV_URL,
      })
      .then((response) => {
        // 리뷰 작성 성공
        movePage(`/complete/${payId}`);
      })
      .catch((error) => {
        console.log("error: ", error);
        movePage("/login");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    submitForm(formData);
  };

  useEffect(() => {
    getPayInfo();
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
        <form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          {/*결제 정보*/}
          <input type="hidden" value={data.storeName} name="storeName" />
          <input type="hidden" value={data.payDate} name="payDate" />
          <input type="hidden" value={data.credit} name="credit" />
          <input type="hidden" value={storeId} name="storeId" />
          {/*결제 정보*/}
          <div className="payInfoArea card">
            <div className="storeName">{data.storeName}</div>
            <div className="payDate" name="payDate">
              {data.payDate}
            </div>
            <hr></hr>
            <div className="priceArea">
              <div className="priceHeader">총 금액</div>
              <div className="priceVal" name="credit">
                {data.credit}원
              </div>
            </div>
          </div>
          <div className="reviewImgArea card">
            <FileUploadComponent
              reviewId={-1}
              className="fileUploader"
              onFileUpload={handleFileUpload}
            />
          </div>
          <div className="scoreArea card">
            <div className="scoreTxt">평점</div>
            <fieldset className="rating">
              <input type="radio" id="star5" name="reviewScore" value="5" />
              <label
                className="full"
                htmlFor="star5"
                title="Awesome - 5 stars"
              ></label>
              <input
                type="radio"
                id="star4half"
                name="reviewScore"
                value="4.5"
              />
              <label
                className="half"
                htmlFor="star4half"
                title="Pretty good - 4.5 stars"
              ></label>
              <input type="radio" id="star4" name="reviewScore" value="4" />
              <label
                className="full"
                htmlFor="star4"
                title="Pretty good - 4 stars"
              ></label>
              <input
                type="radio"
                id="star3half"
                name="reviewScore"
                value="3.5"
              />
              <label
                className="half"
                htmlFor="star3half"
                title="Meh - 3.5 stars"
              ></label>
              <input type="radio" id="star3" name="reviewScore" value="3" />
              <label
                className="full"
                htmlFor="star3"
                title="Meh - 3 stars"
              ></label>
              <input
                type="radio"
                id="star2half"
                name="reviewScore"
                value="2.5"
              />
              <label
                className="half"
                htmlFor="star2half"
                title="Kinda bad - 2.5 stars"
              ></label>
              <input type="radio" id="star2" name="reviewScore" value="2" />
              <label
                className="full"
                htmlFor="star2"
                title="Kinda bad - 2 stars"
              ></label>
              <input
                type="radio"
                id="star1half"
                name="reviewScore"
                value="1.5"
              />
              <label
                className="half"
                htmlFor="star1half"
                title="Meh - 1.5 stars"
              ></label>
              <input type="radio" id="star1" name="reviewScore" value="1" />
              <label
                className="full"
                htmlFor="star1"
                title="Sucks big time - 1 star"
              ></label>
              <input
                type="radio"
                id="starhalf"
                name="reviewScore"
                value="0.5"
              />
              <label
                className="half"
                htmlFor="starhalf"
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
              name="reviewContent"
              cols="30"
              rows="7"
              placeholder={`리뷰는 신중하게 작성해주세요. 
타인에게 불쾌감을 주는 리뷰는 통보없이 삭제될 수 있습니다.`}
            ></textarea>
          </div>
          <div className="selectBoxHeader">공유폴더 선택</div>
          <div className="selectFoldersArea card">
            <MultiSelectComponent
              reviewId={-1}
              onChange={handleMultiSelectChange}
            />
            <input
              type="hidden"
              name="folders"
              value={selectedOptions.join(",")}
            />
          </div>
          <input className="submitBtn" type="submit" value="작성완료" />
        </form>
      </div>
    </>
  );
};
export default ReviewWriteComponent;
