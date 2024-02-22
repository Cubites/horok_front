import { useState, useEffect } from 'react';

const MapViewComponent = ({ ShowFolderId, setShowFolderId, ReviewListByStore, FolderList, ReviewNumMax, CenterLatLon }) => {
  const { naver } = window;

  const markerColor = [[234, 30, 57], [234, 100, 57]];

  /* 지도 생성 함수 */
  const mapLoad = (ReviewListByStore, inputTag) => {
    /** 지도 생성 **/
    let map = new naver.maps.Map(inputTag, {
      center: new naver.maps.LatLng(CenterLatLon[0], CenterLatLon[1]),
      zoom: 16
    });
    let markers = [];

    /** 마커 생성 **/
    for (let store in ReviewListByStore) {
      /*** 마커 커스텀 옵션 지정 ***/
      let markerOptions = {
        position: new naver.maps.LatLng(ReviewListByStore[store].latitude, ReviewListByStore[store].longitude),
        map: map,
        clickable: true,
        draggable: false,
        icon: {
          content: [ // 마커 디자인(HTML 태그)
            `
              <div class="storeMarker">
                <div 
                  class='storePin storePin${ReviewListByStore[store].storeId}'
                  style='
                    width: 36px; 
                    height: 36px; 
                    border-radius: 50%; 
                    background-color: hsl(234, 
                      ${20 + (80 / (ReviewNumMax - 1) * (ReviewListByStore[store].reviews.length - 1))}%, 
                      ${70 - (50 / (ReviewNumMax - 1) * (ReviewListByStore[store].reviews.length - 1))}%); 
                    display: flex; 
                    justify-content: center; 
                    align-items: center;
                    z-index: 10000
                  '
                >
                  <div style='
                    width: 28px; 
                    height: 28px; 
                    border: 2px solid #fff; 
                    border-radius: 50%; 
                    background-color: hsl(234, 
                      ${20 + (80 / ReviewNumMax * ReviewListByStore[store].reviews.length)}%, 
                      ${70 - (50 / (ReviewNumMax - 1) * (ReviewListByStore[store].reviews.length - 1))}%);
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    font-weight: bold;
                    color: #fff;
                  '>
                    ${ReviewListByStore[store].reviews.length}
                    <div class="storeVal" style="display: none">${ReviewListByStore[store].storeId}</div>
                    <div class="storeVal" style="display: none">${ReviewListByStore[store].storeName}</div>
                    <div class="storeVal" style="display: none">${ReviewListByStore[store].storeCategory}</div>
                    <div class="storeVal" style="display: none">${ReviewListByStore[store].storeAddr}</div>
                  </div>
                </div>
              </div>`
          ].join(''),
          size: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(18, 18), // 마커 위치
        }
      };
      /*** 지도에 마커 추가 ***/
      markers.push(new naver.maps.Marker(markerOptions));
    }

    /** 마커에 이벤트 추가 - 리뷰 창 열고 닫기 **/
    markers.forEach(marker => {
      naver.maps.Event.addListener(marker, 'click', (e) => {
        let reviewBox = document.getElementById('reviewBox');
        let storeVal = e.domEvent.target.closest('.storeMarker').getElementsByClassName('storeVal');
        let storeName = '';
        let reviewSet = '';
        /*** 누른 마커 위치로 이동(누른 마커가 화면 정중앙보다 조금 위에 오게 이동) ***/
        map.panTo(new naver.maps.LatLng(e.coord._lat - 0.002, e.coord._lng));
        /*** 리뷰 팝업 창에 가게 리뷰 표시 ***/
        for (let review of ReviewListByStore[`store${storeVal[0].innerHTML}`].reviews) {
          // 가게 이름
          storeName = `${storeVal[1].innerHTML}<span>${storeVal[2].innerHTML}</span>`;
          // 평점 표시
          let starText = '';
          for (let i = 0; i < Math.floor(review.reviewScore); i++) {
            starText += '<i class="icon-star"></i>';
          }
          if (Math.floor(review.reviewScore) !== Math.round(review.reviewScore)) {
            starText += '<i class="icon-star-half-empty"></i>';
          }
          for (let i = 0; i < (5 - Math.round(review.reviewScore)); i++) {
            starText += '<i class="icon-star-empty"></i>';
          }
          // 리뷰 박스
          reviewSet += `
            <div class='reviewOne'>
              <img src=${review.image1} alt="review_image" />
              <div class='reviewOneRight'>
                <div class='paydateArea'>
                  ${review.payDate}
                </div>
                <div class='starAndName'>
                  <div class='starArea'>${starText}</div>
                  <div class='nameArea'>${review.userNickname}</div>
                </div>
                <div class='reviewContentArea'>
                  ${review.reviewContent}
                </div>
              </div>
            </div>
          `;
        }
        // 드래그로 생성된 style.height 값 삭제
        reviewBox.style = '';
        if (reviewBox.classList.contains('upAndDown')) {
          reviewBox.classList.toggle('upAndDown');
        }
        reviewBox.classList.toggle('upAndDown');
        document.getElementById("reviewStoreName").innerHTML = storeName;
        document.getElementById("reviewDetailsArea").innerHTML = reviewSet;
      });
    })

    /** 지도에 이벤트 추가 - 리뷰 창 닫기 **/
    naver.maps.Event.addListener(map, 'click', (e) => {
      let reviewBox = document.getElementById('reviewBox');
      reviewBox.style = '';
      if (reviewBox.classList.contains('upAndDown')) {
        reviewBox.classList.add('downAnimation');
      }
      reviewBox.classList.remove('upAndDown');
      // reviewBox.classList.remove('downAnimation');
    });
    return true;
  }

  /* 지도 재로딩 시, "새 지도 로드 => 기존 지도 삭제" 작업의 동기처리를 위한 Promise 객체 */
  const mapLoadPromise = () => {
    return new Promise((resolve, reject) => {
      document.getElementById('mapBox').innerHTML += `
        <div id="mapAreaFirst"></div>
      `;
      resolve();
    });
  }

  /* 리뷰 팝업 창 드래그 애니메이션 */
  const ReviewPopupDrag = (e) => {
    const reviewBox = document.getElementById("reviewBox");
    reviewBox.classList.remove('upAndDown');
    reviewBox.style.height = `${document.getElementById("mapContainer").offsetHeight - e.touches[0].clientY}px`;
  }

  /* 리뷰 팝업창 최대화, 최소화 애니메이션 */
  const ReviewPopupDragEnd = (e) => {
    const reviewBox = document.getElementById("reviewBox")
    let currentHeight = e.changedTouches[0].clientY;
    let wholeHeight = document.getElementById("mapContainer").offsetHeight;
    if (wholeHeight * 0.5 < currentHeight) {
      reviewBox.style = '';
    } else if (wholeHeight * 0.5 > currentHeight) {
      reviewBox.style.height = '100%';
    } else {
      reviewBox.style.height = '50%';
    }
  }

  /* 화면에 지도 표시 - 데이터가 달라지면 동작 */
  useEffect(() => {
    mapLoadPromise()
      .then(() => {
        mapLoad(ReviewListByStore, 'mapAreaFirst');
      })
      .then(() => {
        if (document.getElementById('mapAreaSecond')) {
          document.getElementById('mapAreaSecond').remove();
        }
        document.getElementById('mapAreaFirst').id = 'mapAreaSecond';
      });
  }, [ShowFolderId, ReviewListByStore, CenterLatLon]);

  return (
    <div id='mapViewContainer'>
      <div id="mapBox">

      </div>
      <div id="folderBox">

      </div>
      <div id="folderListBox">
        <div
          className='folderIconOuterStyle'
          style={{ backgroundColor: '#999' }}
          onClick={() => setShowFolderId(0)}
        >
          <div
            className='folderIconInnerStyle'
            style={{ backgroundColor: '#999', fontSize: '10px' }}
            onClick={() => setShowFolderId(0)}
          >
            전체
          </div>
        </div>
        {
          FolderList.length &&
          FolderList.map((folder, index) => (
            <div key={'folder' + index}
              className='folderIconOuterStyle'
              style={{ backgroundColor: folder?.folderColor }}
              onClick={() => {
                if (ShowFolderId === folder.folderId) {
                  setShowFolderId(0);
                } else {
                  setShowFolderId(folder.folderId)
                }
              }}
            >
              <div className='folderIconInnerStyle' style={{ backgroundColor: folder.folderColor }}>
                {folder.folderName.substring(0, 1)}
              </div>
            </div>
          ))
        }
      </div>
      <div id="reviewBox">
        <div id="dragBar"
          onTouchMove={(e) => ReviewPopupDrag(e)}
          onTouchEnd={(e) => ReviewPopupDragEnd(e)}
        >
          <div id="barImg"></div>
        </div>
        <div id="reviewArea">
          <div id="reviewStoreName">

          </div>
          <div id="reviewDetailsArea">

          </div>
        </div>
      </div>
    </div>
  )
}

export default MapViewComponent