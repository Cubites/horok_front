import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./reviewDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  // faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";

const ReviewComponent = ({ filter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const { folderId, reviewId } = useParams();
  const [favors, setFavors] = useState([]);

  useEffect(() => {
    if (location.state && location.state.reviews) {
      setReviewList(location.state.reviews);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state && location.state.reviewId) {
      console.log("scrollToReview 호출");
      scrollToReview(location.state.reviewId);
    }
  }, [reviewList]);

  useEffect(() => {
    // 리뷰 목록과 favors 정보가 모두 준비되면 각 리뷰에 favors 정보를 추가합니다.
    if (reviewList && reviewList.length > 0 && favors.length > 0) {
      const updatedReviewList = reviewList.map((review) => {
        // 리뷰의 folderReviewId를 기준으로 favors에서 해당 정보를 찾습니다.
        const favor = favors.find(
          (favor) => favor.folderReviewId === review.folderReviewId
        );
        // 찾은 favors 정보를 리뷰에 추가합니다.
        return {
          ...review,
          favor: favor || null, // 해당하는 favors 정보가 없으면 null로 설정합니다.
        };
      });
      setReviewList(updatedReviewList);
    }
  }, [favors]);

  const getFavors = (folderId) => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/favors/${folderId}`)
      .then((res) => {
        setFavors(res.data);
        // getReviews(folderId);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  const getReviews = (folderId) => {
    // 리뷰 목록을 서버에서 가져옴
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/reviews/${folderId}`)
      .then((res) => {
        setReviewList(res.data);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  const scrollToReview = (reviewId) => {
    console.log("reviewId: ", reviewId);
    const element = document.getElementById(`review-${reviewId}`);
    console.log(element);
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

  const handleClickMapIcon = (latitude, longitude) => {
    // navigate("/map", {
    //   state: { latitude: latitude, longitude: longitude },
    // });
  };

  const handleClickBackBtn = () => {
    navigate(`/folder/${folderId}`);
  };

  const handleAddFavor = (folderReviewId, reviewId) => {
    axios
      .post(`${process.env.REACT_APP_DEV_URL}/api/reviews/favors`, null, {
        params: { folderReviewId: folderReviewId },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data === true) {
          console.log("좋아요 성공");
          // getFavors(folderId);
          //setReviewList([...reviewList]);
          const updatedReviewList = reviewList.map((review) =>
            review.reviewId === reviewId
              ? { ...review, favor: [{ folderReviewId }] }
              : review
          );
          setReviewList(updatedReviewList);

          navigate(`/folder/${folderId}/${reviewId}`);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleRemoveFavor = (folderReviewId, reviewId) => {
    axios
      .delete(
        `${process.env.REACT_APP_DEV_URL}/api/reviews/favors/${folderReviewId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data === true) {
          console.log("좋아요 취소 성공");
          // 리뷰 목록에서 해당 리뷰의 favor 정보 제거
          const updatedReviewList = reviewList.map((review) =>
            review.reviewId === reviewId ? { ...review, favor: null } : review
          );
          setReviewList(updatedReviewList);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <div id="reviewFeedContainer">
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
          <div className="headerTxt">폴폴폴</div>
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
                <div className="settingBtn cursorToPointer">
                  <img
                    src="/images/menudots.png"
                    className="reviewThumbnail"
                    alt="menuBtn"
                    height="30"
                  />
                </div>
              </div>
              {/* review body */}
              <div className="reviewContentArea">
                <div className="top">
                  <div className="reviewImgArea">
                    <img
                      src="\images\review_image_sample.jpg"
                      className="reviewImg"
                      alt="reviewImg"
                    />
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
                    <div className="locationBtn cursorToPointer">
                      <img
                        src="/images/horokpin.png"
                        className="reviewImg"
                        alt="test"
                        height="30"
                        onClick={() =>
                          handleClickMapIcon(review.latitude, review.longitude)
                        }
                      />
                    </div>
                    <div className="replyBtn cursorToPointer">
                      <img
                        src="/images/replyBtn.png"
                        className="replyBtn"
                        alt="test"
                        height="25"
                      />
                      {review.replyCnt}개
                    </div>
                    <div className="favorBtn cursorToPointer">
                      {review.favor ? (
                        <img
                          src="/images/favorBtn_fill.png"
                          className="favorBtn fill"
                          alt="test"
                          height="25"
                          onClick={() =>
                            handleRemoveFavor(
                              review.folderReviewId,
                              review.reviewId
                            )
                          }
                        />
                      ) : (
                        <img
                          src="/images/favorBtn.png"
                          className="favorBtn"
                          alt="test"
                          height="25"
                          onClick={() =>
                            handleAddFavor(
                              review.folderReviewId,
                              review.reviewId
                            )
                          }
                        />
                      )}
                      {review.favor ? review.favor.length : 0}개
                    </div>
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
