import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './reviewList.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MyReviewComponent = ({ filter, setFilter }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  //리뷰 정렬 함수
  const sortReviews = (reviews) => {
    return reviews.slice().sort((a, b) => {
      switch (filter) {
        case '0':
          return compareDates(b.reviewDate, a.reviewDate);
        case '1':
          return compareDates(a.reviewDate, b.reviewDate);
        case '2':
          return b.reviewScore - a.reviewScore;
        case '3':
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

  //썸네일 클릭 시 피드로 이동 -> 클릭한 리뷰가 먼저 보이도록
  const handleViewReview = (reviewId) => {
    navigate(`/myreview/${reviewId}`, {
      state: { reviewId: reviewId, reviews: sortReviews(data) },
    });
  };

  //리뷰 가져오는 함수
  const getMyReview = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/reviews/myreview`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log('error: ', error);
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };

  const handleGoFolderList = () => {
    navigate('/folder/list');
  };

  useEffect(() => {
    if (location.state && location.state.filter) {
      setFilter(location.state.filter);
    }
    getMyReview();
  }, [filter, location.state]);

  return (
    <div id='reviewListContainer'>
      <div className='inFolderHeader'>
        <div className='wrapper'>
          <div className='backBtn cursorToPointer'>
            <img
              src='/images/backArrow.png'
              alt='backArrow'
              height='50'
              onClick={handleGoFolderList}
            />
          </div>
          <div className='headerTxt'>내 리뷰</div>
        </div>
        <div className='settingBtn'></div>
      </div>
      <div className='filterArea cursorToPointer'>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value='0'>최신순</option>
          <option value='1'>오래된순</option>
          <option value='2'>평점 높은순</option>
          <option value='3'>평점 낮은순</option>
        </select>
      </div>
      <div className='reviewsArea'>
        <div className='reviewsWrapper'>
          {data &&
            sortReviews(data).map((review, index) => (
              <div className='reviewItem cursorToPointer' key={index}>
                {review.image1 && review.image1.length > 0 ? (
                  <img
                    src={`${process.env.REACT_APP_DEV_URL}/show/image?imageName=${review.image1}`}
                    className='reviewThumbnail'
                    alt='thumbnail'
                    width='130'
                    height='127'
                    onClick={() => handleViewReview(review.reviewId)}
                  />
                ) : (
                  <img
                    src='/images/sh_symbol.png'
                    className='reviewThumbnail'
                    alt='thumbnail'
                    width='130'
                    height='130'
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
export default MyReviewComponent;
