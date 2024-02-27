import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./reviewDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faVolumeXmark,
  // faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import ImageSwiper from "./ImageSwiper";
import ReviewModal from "./ReviewModal";

const ReviewComponent = ({ filter, folderName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const { folderId, reviewId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  // const [favors, setFavors] = useState([]);

  useEffect(() => {
    if (location.state && location.state.reviews) {
      setReviewList(location.state.reviews);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state && location.state.reviewId) {
      scrollToReview(location.state.reviewId);
    }
  }, [reviewList]);

  const scrollToReview = (reviewId) => {
    const element = document.getElementById(`review-${reviewId}`);
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const dateArrayToDateString = (dateArray) => {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const hour = dateArray[3];
    const minute = dateArray[4];

    const date = new Date(year, month - 1, day, hour, minute);

    // 날짜를 원하는 형식으로 포맷팅합니다. 예: "2024년 2월 20일 19:34"
    const formattedDate = `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;

    return formattedDate;
  };

  const scoreToStar = (reviewScore) => {
    const starIcon = [];
    const fullStars = Math.floor(reviewScore);
    const halfStar = reviewScore % 1 !== 0;

    //full star
    for (let i = 0; i < fullStars; i++) {
      starIcon.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "yellow" }} />
      );
    }

    //half star
    if (halfStar) {
      starIcon.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          style={{ color: "yellow" }}
        />
      );
    }

    // // Empty Stars
    // const emptyStar = 5 - Math.ceil(reviewScore);
    // for (let i = 0; i < emptyStar; i++) {
    //   starIcon.push(
    //     <FontAwesomeIcon key={`empty-${i}`} icon={["far", "star"]} />
    //   );
    // }

    return starIcon;
  };

  const getReview = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/reviews/myreview`)
      .then((res) => {
        setReviewList(res.data);
      });
  };

  const handleClickMapIcon = (latitude, longitude) => {
    // navigate("/map", {
    //   state: { latitude: latitude, longitude: longitude },
    // });
  };

  const handleClickBackBtn = () => {
    navigate(`/myreview`);
  };

  //modal 조작
  const handleOpenModal = (clickedReviewId) => {
    setSelectedReviewId(clickedReviewId);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedReviewId(null);
    setIsOpen(false);
  };

  //review 삭제 기능
  const reviewDelete = (selectedReviewId) => {
    // confirm 창으로 수정
    // confirm(
    //   "리뷰를 삭제하면 해당 결제 내역에 대해서는 다시 리뷰를 작성할 수 없습니다. 정말 삭제하시겠습니까?"
    // );
    axios
      .delete(
        `${process.env.REACT_APP_DEV_URL}/api/reviews/${selectedReviewId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        getReview(folderId);
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    setIsOpen(false);
  };

  //review 수정 기능
  const reviewEdit = (selectedReviewId) => {
    navigate("/review/edit", {
      state: { reviewId: selectedReviewId },
    });
  };

  return (
    <div id="reviewFeedContainer">
      <div clsaaName="modalBackdrop"></div>
      <div className="inFolderHeader">
        <div className="wrapper">
          <div className="backBtn cursorToPointer">
            <img
              src="/images/backArrow.png"
              alt="backArrow"
              height="50"
              onClick={handleClickBackBtn}
            />
          </div>
          <div className="headerTxt">내 리뷰</div>
        </div>
      </div>
      <div className="feedArea">
        {/*반복*/}
        {reviewList &&
          reviewList.map((review, index) => (
            <div
              className="viewReview"
              key={index}
              id={`review-${review.reviewId}`}
            >
              {/* review header */}
              <div className="reviewHeader">
                <div className="reviewTitleArea">
                  <div className="storeName">{review.storeName}</div>
                  <div className="storeCategory">{review.storeCategory}</div>
                </div>
                <div
                  className="settingBtn cursorToPointer"
                  onClick={() => handleOpenModal(review.reviewId)}
                >
                  <img
                    src="/images/menudots.png"
                    className="reviewThumbnail"
                    alt="menuBtn"
                    height="30"
                  />
                </div>
                {isOpen && (
                  <ReviewModal
                    isOpen={handleOpenModal} //isOpen
                    onClose={handleCloseModal}
                    onEdit={() => reviewEdit(selectedReviewId)}
                    onDelete={() => reviewDelete(selectedReviewId)}
                  />
                )}
              </div>
              {/* review body */}
              <div className="reviewContentArea">
                <div className="top">
                  <div className="reviewImgArea">
                    {
                      <ImageSwiper
                        images={[review.image1, review.image2, review.image3]}
                      />
                    }
                  </div>
                </div>
                <div className="middle">
                  <div className="left">
                    <div className="reviewScore">
                      {scoreToStar(review.reviewScore)}
                    </div>
                    <div className="reviewDate">
                      {dateArrayToDateString(review.reviewDate)}
                    </div>
                  </div>
                  <div className="right">
                    <div className="locationBtn"></div>
                    <div className="replyBtn"></div>
                    <div className="favorBtn"></div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="reviewContent">{review.reviewContent}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ReviewComponent;
