import { useState, useEffect } from 'react';
import './mapComponent.css';
import axios from 'axios';
import MapViewComponent from './MapViewComponent';

const MapComponent = () => {

  const [ShowFolderId, setShowFolderId] = useState(0); // 화면에 표시할 폴더의 id

  const [ReviewList, setReviewList] = useState([]); // 모든 리뷰 목록
  const [ReviewListByStore, setReviewListByStore] = useState({}); // (선택한 폴더의) 가게별 리뷰 목록
  const [FolderList, setFolderList] = useState({}); // 폴더 목록
  const [ReviewNumMax, setReviewNumMax] = useState(0);

  /* 선택한 폴더 리뷰만 가게별로 묶기 */
  const collectReviewsByStore = (reviews, selectFolder) => {
    let reviewsByStore = {};
    for(let review of reviews) {
      if(selectFolder === 0 || review.folderId === selectFolder) {
        if(reviewsByStore[`store${review.storeId}`]) {
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
      let reviews = await axios.post(`${process.env.REACT_APP_DEV_URL}/api/users/reviews`, {
        folderId: ShowFolderId === 0 ? null : ShowFolderId
      });

      let reviewsAll = reviews.data;

      // 가게별 리뷰
      let reviewsByStore = collectReviewsByStore(reviews.data, 0);
      
      let mostReviewNum = 0;
      for(let store of Object.keys(reviewsByStore)) {
        if(mostReviewNum < reviewsByStore[store].reviews.length) {
          mostReviewNum = reviewsByStore[store].reviews.length;
        }
      }

      // 폴더 목록
      let reviewsByFolderObject = {};
      for(let review of reviews.data) {
        if(reviewsByFolderObject[`folder${review.folderId}`] !== null) {
          reviewsByFolderObject[`folder${review.folderId}`] = {
            folderId: review.folderId,
            folderName: review.folderName,
            folderColor: `#${review.folderImg.split("_")[1].split(".")[0]}`
          };
        }
      }
      let reviewsByFolder = [];
      for(let folderKey in reviewsByFolderObject) {
        reviewsByFolder.push(reviewsByFolderObject[folderKey]);
      }

      return {reviewsAll, reviewsByStore, reviewsByFolder, mostReviewNum};
    } catch(error) {
      console.log(error);
    }
  }

  /* 리뷰 데이터 요청 */
  useEffect(() => {
    console.log("ReviewList.length: " + ReviewList.length);
    if(ReviewList.length === 0) {
      searchReviews()
        .then(data => {
          setReviewList(data.reviewsAll);
          setReviewListByStore(data.reviewsByStore);
          setFolderList(data.reviewsByFolder);
          setReviewNumMax(data.mostReviewNum);
        });
    } else {
      setReviewListByStore(collectReviewsByStore(ReviewList, ShowFolderId));
    }
  }, [ShowFolderId]);
  return (
    <div id="mapContainer">
      <MapViewComponent 
        ShowFolderId={ShowFolderId} setShowFolderId = {setShowFolderId}
        ReviewListByStore={ReviewListByStore}
        FolderList={FolderList}
        ReviewNumMax={ReviewNumMax}
      />
    </div>
  )
}

export default MapComponent