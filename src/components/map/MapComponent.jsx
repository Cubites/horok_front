import { useState, useEffect } from 'react';
import './mapComponent.css';
import axios from 'axios';
import MapViewComponent from './MapViewComponent';

const MapComponent = ({latLon, setLatLon}) => {

  const [ShowFolderId, setShowFolderId] = useState(0); // 화면에 표시할 폴더의 id
  const [ReviewList, setReviewList] = useState([]); // 모든 리뷰 목록
  const [ReviewListByStore, setReviewListByStore] = useState({}); // (선택한 폴더의) 가게별 리뷰 목록
  const [FolderList, setFolderList] = useState([]); // 폴더 목록
  const [ReviewNumMax, setReviewNumMax] = useState(0);
  const [CenterLatLon, setCenterLatLon] = useState(latLon);

  /* 선택한 폴더 리뷰만 가게별로 묶기 */
  const collectReviewsByStore = (reviews, selectFolder) => {
    let reviewsByStore = {};
    for (let review of reviews) {
      if (selectFolder === 0 || review.folderId === selectFolder) {
        if (reviewsByStore[`store${review.storeId}`]) {
          reviewsByStore[`store${review.storeId}`].reviews.push(review);
        } else {
          reviewsByStore[`store${review.storeId}`] = {
            storeId: review.storeId,
            storeName: review.storeName,
            storeCategory: review.storeCategory,
            latitude: review.latitude,
            longitude: review.longitude,
            reviews: [review]
          };
        }
      }
    }
    return reviewsByStore;
  }

  /* 리뷰 데이터 요청 */
  async function searchReviews() {
    try{
      let reviews = await axios.post(`${process.env.REACT_APP_DEV_URL}/api/users/reviews`);
      let reviewsAll = reviews.data;

      // 가게별 리뷰
      let reviewsByStore = collectReviewsByStore(reviews.data, 0);

      let mostReviewNum = 0;
      for (let store of Object.keys(reviewsByStore)) {
        if (mostReviewNum < reviewsByStore[store].reviews.length) {
          mostReviewNum = reviewsByStore[store].reviews.length;
        }
      }

      // 폴더 목록
      let reviewsByFolderObject = {};
      for (let review of reviews.data) {
        if (reviewsByFolderObject[`folder${review.folderId}`] !== null) {
          reviewsByFolderObject[`folder${review.folderId}`] = {
            folderId: review.folderId,
            folderName: review.folderName,
            folderColor: `#${review.folderImg.split("-")[1]}`
          };
        }
      }
      let reviewsByFolder = [];
      for (let folderKey in reviewsByFolderObject) {
        reviewsByFolder.push(reviewsByFolderObject[folderKey]);
      }

      console.log("reviewsAll: ", reviewsAll);
      console.log("reviewsByStore: ", reviewsByStore)
      console.log('reviewsByFolderObject: ', reviewsByFolderObject);
      return { reviewsAll, reviewsByStore, reviewsByFolder, mostReviewNum };
    } catch (error) {
      console.error("Error that get review data.", error);
    }
  }

  /* 현재 위치의 위도, 경도 값 반환 */
  const getLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenterLatLon([position.coords.latitude, position.coords.longitude]);
      }, function (error) {
        console.error("Error that get geoLocation values(latitude, longitude).", error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('현재 위치를 표시하려면 위치 설정을 켜주세요.');
    }
  }

  /* 리뷰 데이터 요청 */
  useEffect(() => {
    if(ReviewList.length === 0) {
      searchReviews()
        .then(data => {
          if(CenterLatLon[0] === 0 && CenterLatLon[1] === 0) {
            getLocation();
          }
          if(data) {
            setReviewList(data.reviewsAll);
            setReviewListByStore(data.reviewsByStore);
            setFolderList(data.reviewsByFolder);
            setReviewNumMax(data.mostReviewNum);
          }
        });
    } else {
      setReviewListByStore(collectReviewsByStore(ReviewList, ShowFolderId));
    }
  }, [ShowFolderId]);
  
  return (
    <div id="mapContainer">
      <MapViewComponent
        ShowFolderId={ShowFolderId} setShowFolderId={setShowFolderId}
        ReviewListByStore={ReviewListByStore}
        FolderList={FolderList}
        ReviewNumMax={ReviewNumMax}
        CenterLatLon={CenterLatLon}
        setLatLon={setLatLon}
      />
    </div>
  )
}

export default MapComponent