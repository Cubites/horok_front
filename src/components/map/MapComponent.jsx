import { useState, useEffect } from 'react';
import './mapComponent.css';

const MapComponent = ({IsMapFirstLoad, setIsMapFirstLoad}) => {
  const { naver } = window;
  
  /* 테스트 데이터 */
  const testdata = [
    {
      "folder_id": 1,
      "folder_name": "홍대 음식점",
      "folder_color": "#FFBEBE",
      "reviews": [
        {
          "reviews_id": "1",
          "store_name": "한상",
          "address": "서울 마포구 동교로25길 26 1층 한상",
          "user_nickname": '졸린몰랑이',
          "review_score": 5,
          "review_content": "맛있네요~",
          "pay_date" : "2024-01-15",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.9213406,
          "latitude": 37.5581666,
          "review_category": "음식점"
        },
        {
          "reviews_id": "2",
          "store_name": "파쿠모리 홍대2호점",
          "address": "서울 마포구 어울마당로 132-1",
          "user_nickname": '즐거운망곰이',
          "review_score": 4,
          "review_content": "먹을만해요^^",
          "pay_date" : "2023-12-13",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.924787,
          "latitude": 37.5557729,
          "review_category": "음식점"
        }
      ]
    },
    {
      "folder_id": "2",
      "folder_name": "카페 추천",
      "folder_color": "#FFDDBE",
      "reviews": [
        {
          "reviews_id": "3",
          "store_name": "카페게이트 동교점",
          "address": "서울 마포구 동교로 203 1층",
          "user_nickname": '졸린몰랑이',
          "review_score": 3,
          "review_content": "인생 디저트 맛집을 찾았습니다ㅠㅠ 친구랑 지나가다가 보이길래 마카롱 하나 사고 매장 나가면서 한 입 먹었는데.. 바로 다시 들어가서 까눌레랑 휘낭시에랑 더 샀어요. 진짜 하나도 빠짐없이 너무너무 맛있어요 ㄷㄷ 퀄리티 좋고 정성들인 미친 맛.. 앞으로 연남동 갈 때마다 갈 거예요!!!!",
          "pay_date" : "2024-02-12",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.923047,
          "latitude": 37.5582736,
          "review_category": "카페"
        },
        {
          "reviews_id": "4",
          "store_name": "피에스타7",
          "address": "서울 마포구 동교로 235-1 1층",
          "user_nickname": '졸린몰랑이',
          "review_score": 5,
          "review_content": "맛있어요~",
          "pay_date" : "2023-12-23",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.9238853,
          "latitude": 37.555935,
          "review_category": "카페"
        }
      ]
    },
    {
      "folder_id": "3",
      "folder_name": "무난한 밥집",
      "folder_color": "#FFFCBE",
      "reviews": [
        {
          "reviews_id": "5",
          "store_name": "감나무집기사식당",
          "address": "서울 마포구 연남로 25",
          "user_nickname": '즐거운망곰이',
          "review_score": 4,
          "review_content": "가성비 좋아요",
          "pay_date" : "2023-01-11",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.9218703,
          "latitude": 37.5618562,
          "review_category": "음식점"
        },
        {
          "reviews_id": "6",
          "store_name": "홍대최대포",
          "address": "서울 마포구 양화로19길 10",
          "user_nickname": '졸린몰랑이',
          "review_score": 4.5,
          "review_content": "가성비 굳~",
          "pay_date" : "2023-12-11",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.9243477,
          "latitude": 37.5581413,
          "review_category": "음식점"
        },
        {
          "reviews_id": "1",
          "store_name": "한상",
          "address": "서울 마포구 동교로25길 26 1층 한상",
          "user_nickname": '졸린몰랑이',
          "review_score": 5,
          "review_content": "맛있네요~",
          "pay_date" : "2024-01-15",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.9213406,
          "latitude": 37.5581666,
          "review_category": "음식점"
        },
        {
          "reviews_id": "10",
          "store_name": "한상",
          "address": "서울 마포구 동교로25길 26 1층 한상",
          "user_nickname": '졸린몰랑이',
          "review_score": 4.5,
          "review_content": "꽤 맛있어요. 좋습니다.",
          "pay_date" : "2024-01-15",
          "image1": "/images/review_image_sample.jpg",
          "image2": "/images/review_image_sample.jpg",
          "image3": "/images/review_image_sample.jpg",
          "longitude": 126.9213406,
          "latitude": 37.5581666,
          "review_category": "음식점"
        },
      ]
    }
  ];
  const markerColor = ['#9997ff'];

  const [CenterLatLon, setCenterLatLon] = useState([37.55936730016966, 126.92245453461447])
  const [TestData, setTestData] = useState(testdata);
  const [ShowFolderId, setShowFolderId] = useState(0);

  const mapLoad = (folderId, inputTag) => {
    /* 지도 생성 */
    let map = new naver.maps.Map(inputTag, {
      center: new naver.maps.LatLng(CenterLatLon[0], CenterLatLon[1]),
      zoom: 16
    });
    let markers = [];
    let reviewList = [];

    /* 마커 생성 */
    for(let folder of testdata){
      if(folderId === 0 || folderId === folder.folder_id) {
        for(let review of folder.reviews){
          /** 마커 커스텀 옵션 지정 **/
          let markerOptions = {
            position: new naver.maps.LatLng(review.latitude, review.longitude),
            map: map,
            clickable: true,
            draggable: false,
            icon: {
              content: [ // 마커 디자인(HTML 태그)
                  `
                  <div 
                    class='folderPin folderPin${folderId}'
                    style='
                      width: 36px; 
                      height: 36px; 
                      border-radius: 50%; 
                      background-color: ${folder.folder_color}; 
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
                      background-color: ${folder.folder_color}; 
                      display: flex; 
                      justify-content: center; 
                      align-items: center; 
                      font-weight: bold;
                    '>
                      ${folder.folder_name.substring(0, 1)}
                      <div id="reviewId" style="display: none">${review.reviews_id}</div>
                      <div id="storeName" style="display: none">${review.store_name}</div>
                      <div id="address" style="display: none">${review.address}</div>
                    </div>
                  </div>`
              ].join(''),
              size: new naver.maps.Size(40, 40),
              anchor: new naver.maps.Point(18, 18), // 마커 위치
            }
          };
          /** 지도에 마커 추가 **/
          markers.push(new naver.maps.Marker(markerOptions));
        }
      }
    }

    /** 마커에 이벤트 추가 - 리뷰 창 열고 닫기 **/
    markers.forEach(marker => {
      naver.maps.Event.addListener(marker, 'click', (e) => {
        let reviewBox = document.getElementById('reviewBox');
        const storeVal = e.domEvent.target.querySelectorAll('div');
        let storeName = '';
        let reviewSet = '';
        // 누른 마커 위치로 이동(누른 마커가 화면 정중앙보다 조금 위에 오게 이동)
        map.panTo(new naver.maps.LatLng(e.coord._lat - 0.002, e.coord._lng));
        // 리뷰 팝업 창에 가게 리뷰 표시
        for(let folder of testdata){
          for(let review of folder.reviews){
            if(storeVal[0].innerHTML != review.reviews_id && storeVal[1].innerHTML == review.store_name && storeVal[2].innerHTML == review.address) {
              // 가게 이름
              if(!storeName){
                storeName = review.store_name;
              }
              // 평점 표시 추가
              let starText = '';
              if(Math.floor(review.review_score) == Math.round(review.review_score)) {
                for(let i=0; i<Math.floor(review.review_score); i++) {
                  starText += '<i class="icon-star"></i>';
                }
              } else {
                for(let i=0; i<Math.floor(review.review_score); i++) {
                  starText += '<i class="icon-star"></i>';
                }
                starText += '<i class="icon-star-half-empty"></i>';
              }
              for(let i=0; i<(5-Math.round(review.review_score)); i++){
                starText += '<i class="icon-star-empty"></i>';
              }
              // 리뷰 디자인
              reviewSet += `
                <div class='reviewOne'>
                  <img src=${review.image1} alt="review_image" />
                  <div class='reviewOneRight'>
                    <div class='paydateArea'>
                      ${review.pay_date}
                    </div>
                    <div class='starAndName'>
                      <div class='starArea'>${starText}</div>
                      <div class='nameArea'>${review.user_nickname}</div>
                    </div>
                    <div class='reviewContentArea'>
                      ${review.review_content}
                    </div>
                  </div>
                </div>
              `;
            }
          }
        }
        // 드래그로 생성된 style.height 값 삭제
        reviewBox.style = '';
        if(reviewBox.classList.contains('upAndDown')){
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
      if(reviewBox.classList.contains('upAndDown')) {
        reviewBox.classList.add('downAnimation');
      }
      reviewBox.classList.remove('upAndDown');
      // reviewBox.classList.remove('downAnimation');
    });
    return true;
  }

  /* 지도 재로딩 시, 동기처리를 위한 Promise 객체 */
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
  const ReviewPopupDragEnd = (e) => {
    const reviewBox = document.getElementById("reviewBox")
    let currentHeight = e.changedTouches[0].clientY;
    let wholeHeight = document.getElementById("mapContainer").offsetHeight;
    if(wholeHeight * 0.5 < currentHeight) {
      reviewBox.style = '';
    } else if(wholeHeight * 0.5 > currentHeight) {
      reviewBox.style.height = '100%';
    } else {
      reviewBox.style.height = '50%';
    }
  }

  useEffect(() => {
    // function getLocation() {
    //   if (navigator.geolocation) { // GPS를 지원하면
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       alert(position.coords.latitude + ' ' + position.coords.longitude);
    //     }, function(error) {
    //       console.error(error);
    //     }, {
    //       enableHighAccuracy: false,
    //       maximumAge: 0,
    //       timeout: Infinity
    //     });
    //   } else {
    //     alert('GPS를 지원하지 않습니다');
    //   }
    // }
    // getLocation();

    mapLoadPromise()
      .then(() => {
        mapLoad(ShowFolderId, 'mapAreaFirst');
      })
      .then(() => {
        if(document.getElementById('mapAreaSecond')){
          document.getElementById('mapAreaSecond').remove();
        }
        document.getElementById('mapAreaFirst').id = 'mapAreaSecond';
      });

    
  }, [ShowFolderId]);

  return (
    <div id='mapContainer'>
      <div id="mapBox">

      </div>
      <div id="folderBox">
        
      </div>
      <div id="folderListBox">
        <div 
          className='folderIconOuterStyle'
          style={{backgroundColor: '#999'}}
          onClick={() => setShowFolderId(0)}
        >
          <div className='folderIconInnerStyle' style={{backgroundColor: '#999', fontSize: '10px'}}>
            전체
          </div>
        </div>
        {
          TestData.map((folder, index) => (
            <div key={'folder' + index} 
              className='folderIconOuterStyle' 
              style={{backgroundColor: folder.folder_color}}
              onClick={() => {
                if(ShowFolderId === folder.folder_id) {
                  setShowFolderId(0);
                } else {
                  setShowFolderId(folder.folder_id)
                }
              }}
            >
              <div className='folderIconInnerStyle' style={{backgroundColor: folder.folder_color}}>
                {folder.folder_name.substring(0, 1)}
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

export default MapComponent