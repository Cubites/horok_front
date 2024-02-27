import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef, ReactDOM } from "react";
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

const ReviewComponent = ({ filter, folderName, setLatLon }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const { folderId, reviewId } = useParams();
  const [favors, setFavors] = useState([]);

  //좋아요 정보 가져오기 <- 리뷰 정보가 업데이트 되면
  useEffect(() => {
    if (location.state && location.state.reviews) {
      getFavors(folderId);
    }
  }, [location.state]);

  //리뷰 정보 업데이트 <- 좋아요 add,remove 이벤트 발생시
  useEffect(() => {
    updateReviewList(favors);
  }, [favors]);

  //좋아요 정보 불러와 리뷰정보에 추가
  const getFavors = (folderId) => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/favors/${folderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFavors(res.data);
        updateReviewList(res.data);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  //리뷰 정보에 좋아요 정보 추가
  const updateReviewList = (favors) => {
    if (location.state && location.state.reviews) {
      const updatedReviewList = location.state.reviews.map((review) => {
        const favor = favors[review.folderReviewId];
        // 찾은 favors 정보를 리뷰에 추가합니다.
        return {
          ...review,
          favor: favor || null, // 해당하는 favors 정보가 없으면 null로 설정합니다.
        };
      });
      setReviewList(updatedReviewList);
    } else if (reviewList !== null) {
      const updatedReviewList = reviewList.map((review) => {
        const favor = favors[review.folderReviewId];
        // 찾은 favors 정보를 리뷰에 추가합니다.
        return {
          ...review,
          favor: favor || null, // 해당하는 favors 정보가 없으면 null로 설정합니다.
        };
      });
      setReviewList(updatedReviewList);
    }
  };

  useEffect(() => {
    if (location.state && location.state.reviewId) {
      scrollToReview(location.state.reviewId);
    }
  }, [reviewList]);

  //클릭한 리뷰 위취에 스크롤 위치
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
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#263CFF", }} />
      );
    }

    //half star
    if (halfStar) {
      starIcon.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          style={{ color: "#263CFF" }}
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
    setLatLon([latitude, longitude]);
    navigate("/map");
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
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === true) {
          //좋아요 성공
          navigate(`/folder/${folderId}/${reviewId}`);
          getFavors(folderId);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        navigate("/login");
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
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data === true) {
          //좋아요 취소 성공
          navigate(`/folder/${folderId}/${reviewId}`);
          getFavors(folderId);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        navigate("/login");
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
          <div className="headerTxt">{folderName}</div>
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
                        onClick={() => {
                          navigate(
                            `/review/reply/${folderId}/${review.reviewId}`,
                            {
                              state: { folderReviewId: review.folderReviewId },
                            }
                          );
                        }}
                      />
                      {review.replyCnt}개
                    </div>
                    <div className="favorBtn cursorToPointer">
                      {review.favor && review.favor.isFavor ? (
                        <img
                          src="/images/favorBtn_fill.png"
                          className="favorBtn fill"
                          alt="test"
                          height="25"
                          onClick={() => {
                            handleRemoveFavor(
                              review.folderReviewId,
                              review.reviewId
                            );
                          }}
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
                      {review.favor && review.favor.favorCnt > 0
                        ? review.favor.favorCnt
                        : 0}
                      개
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
