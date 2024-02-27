import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./reviewList.css";
import FolderModal from "./FolderModal";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ReviewListComponent = ({ filter, setFilter, folderName }) => {
  const { folderId } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [user, setUser] = useState({});
  const folderShare = async () => {
    try {
      const token = await getToken();
      if (navigator.share) {
        await navigator.share({
          title: "호록",
          url: `https://horok.link/invite/${token}`,
          text: `\'${user.userNickname}\' 님이 \"${location.state.folderName}\" 폴더에 초대하셨어요. 참가해주세요!`.trim(),
        });
      } else {
        console.log("Web Share API를 지원하지 않는 브라우저입니다.");
      }
    } catch (error) {
      console.error("공유 실패", error);
    }
  };
  const sortReviews = (reviews) => {
    return reviews.slice().sort((a, b) => {
      switch (filter) {
        case "0":
          return compareDates(b.reviewDate, a.reviewDate);
        case "1":
          return compareDates(a.reviewDate, b.reviewDate);
        case "2":
          return b.reviewScore - a.reviewScore;
        case "3":
          return a.reviewScore - b.reviewScore;
        default:
          return 0;
      }
    });
  };

  // 날짜 비교 함수
  const compareDates = (date1Array, date2Array) => {
    const date1 = new Date(
      date1Array[0],
      date1Array[1] - 1,
      date1Array[2],
      date1Array[3],
      date1Array[4],
      date1Array[5]
    );
    const date2 = new Date(
      date2Array[0],
      date2Array[1] - 1,
      date2Array[2],
      date2Array[3],
      date2Array[4],
      date2Array[5]
    );
    return date1 - date2;
  };

  const handleViewReview = (reviewId) => {
    navigate(`/folder/${folderId}/${reviewId}`, {
      state: { reviewId: reviewId, reviews: sortReviews(data) },
    });
  };

  const getReview = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/reviews/${folderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  };

  const handleGoFolderList = () => {
    navigate("/folder/list");
  };

  //modal 조작
  const handleOpenModal = (folderId) => {
    setSelectedFolderId(folderId);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedFolderId(null);
    setIsOpen(false);
  };

  const folderEdit = (folderId) => {
    navigate("/folder/edit", { state: { folderId } });
  };

  const getToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEV_URL}/api/folders/invite/${folderId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("토큰 가져오기 실패", error);
      navigate("/login");
    }
  };

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/users/info`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        navigate("/login");
      });
  };

  const folderDelete = (folderId) => {
    axios
      .delete(`${process.env.REACT_APP_DEV_URL}/api/folders/${folderId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data === true) {
          alert("폴더가 삭제 되었습니다.");
        } else {
          alert("다시 시도해주세요");
        }
        navigate("/folder/list");
      })
      .catch((error) => {
        console.log("error: ", error);
        navigate("/login");
      });

    setIsOpen(false);
  };

  useEffect(() => {
    if (location.state && location.state.filter) {
      setFilter(location.state.filter);
    }
    getReview();
  }, [folderId, filter, location.state]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div id="reviewListContainer">
      <div className="inFolderHeader">
        <div className="wrapper">
          <div className="backBtn cursorToPointer">
            <img
              src="/images/backArrow.png"
              alt="backArrow"
              height="50"
              onClick={handleGoFolderList}
            />
          </div>
          <div className="headerTxt">{folderName}</div>
        </div>
        <div
          className="settingBtn cursorToPointer"
          onClick={() => handleOpenModal(folderId)}
        >
          <img
            src="/images/menudots.png"
            className="reviewThumbnail"
            alt="menuBtn"
            height="40"
          />
        </div>
        {isOpen && (
          <FolderModal
            isOpen={handleOpenModal} //isOpen
            onClose={handleCloseModal}
            onEdit={() => folderEdit(folderId)}
            onDelete={() => folderDelete(folderId)}
            onShare={() => folderShare(folderId)}
          />
        )}
      </div>
      <div className="filterArea cursorToPointer">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="0">최신순</option>
          <option value="1">오래된순</option>
          <option value="2">평점 높은순</option>
          <option value="3">평점 낮은순</option>
        </select>
      </div>
      <div className="reviewsArea">
        <div className="reviewsWrapper">
          {data &&
            sortReviews(data).map((review, index) => (
              <div className="reviewItem cursorToPointer" key={index}>
                {review.image1 && review.image1.length > 0 ? (
                  <img
                    src={`${process.env.REACT_APP_DEV_URL}/show/image?imageName=${review.image1}`}
                    className="reviewThumbnail"
                    alt="thumbnail"
                    width="130"
                    height="127"
                    onClick={() => handleViewReview(review.reviewId)}
                  />
                ) : (
                  <img
                    src="/images/sh_symbol.png"
                    className="reviewThumbnail"
                    alt="thumbnail"
                    width="130"
                    height="130"
                    onClick={() => handleViewReview(review.reviewId)}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ReviewListComponent;
