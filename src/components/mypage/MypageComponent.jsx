import React, { useRef, useState, useEffect } from "react";
import "./mypage.css";
import axios from "axios";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const MypageComponent = () => {
  const [user, setUser] = useState({});
  //이미지 업로드
  const [uploadedImage, setUploadedImage] = useState(null); //uploadImage 상태 초기화
  const [userProfile, setUserProfile] = useState(null);
  //프로필 수정
  const [newProfile, setNewProfile] = useState("");
  //닉네임 수정
  const [newNickname, setNewNickname] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  //전체 선택 체크박스가 클릭될 때 호출되는 함수 ( 모든 체크 박스의 상태를 전체 선택 체크박스와 동일하게 처리)
  const [allChecked, setAllChecked] = useState(false);
  const [cardChecked, setCardChecked] = useState([false, false, false]);
  //카드 리스트
  const [cardList, setCardList] = useState([]);

  // 더 많은 카드 보기 토글
  const [showAllCards, setShowAllCards] = useState(false);
  // 차트 표시 여부 상태
  const [showChart, setShowChart] = useState(false);
  const [cardUsageStats, setCardUsageStats] = useState([]);

  //이미지 수정
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    //const imageUrl = newProfile.imageUrl.file;
    //setUploadedImage(imageUrl);
    //setNewProfile(imageUrl);
    updateProfile(user.userId, file);
  };

  //사진 선택하면 프로필 변경되도록 onclick 이벤트 걸어줌
  const UploadImage = () => {
    document.getElementById("uploadProfile").click();
  };

  //닉네임 수정 모달창(화면 불투명 +  닉네임 수정 모달창 뜸 )
  const Modal = () => {
    document.getElementById("modal").classList.toggle("noshow");
    document.getElementById("modalScroll").classList.toggle("hidden");
  };

  const handleCardCheck = (event) => {
    const { checked } = event.target;
    const value = event.target.value;

    let cardChecked2 = cardChecked.map((v, i) => {
      if (i === Number(value)) {
        cardChecked[i] = checked;
      }
      return cardChecked[i];
    });
    setCardChecked([...cardChecked2]);
  };

  // 토글 버튼 클릭 핸들러
  const handleToggleCards = () => {
    setShowAllCards(!showAllCards);
  };

  // 모든 체크박스 핸들러
  const handleAllCheck = (event) => {
    const { checked } = event.target;
    setAllChecked(checked);

    // 전체 선택 체크박스가 선택되면 차트 보이도록 설정
    setShowChart(checked);

    // 카드 체크박스 상태 업데이트
    if (cardList.length > 0) {
      setCardChecked(Array(cardList.length).fill(checked));
    }
  };

  // 리액트랑 스프링부트 연동하는거니까
  const getUser = () => {
    axios
      .get(`http://192.168.0.141:8080/api/users`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setCardList(res.data.cardsList);
        setUserProfile(res.data.userProfile);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  //프로필 업로드 axios
  const updateProfile = (userId, file) => {
    var formData = new FormData();
    formData.append("userId", userId);
    formData.append("userProfile", file);
    console.log(Array.from(formData));
    axios
      .post(`http://192.168.0.141:8080/api/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
          charset: "utf-8",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log("사진 수정 성공함");
          setUpdateSuccess(true);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("사진 수정 실패:", error);
      });
  };

  //닉네임 업로드 axios
  const updateNickname = (userId, newNickname) => {
    axios
      .post(`http://192.168.0.141:8080/api/users/nickname`, {
        userId: userId,
        userNickname: newNickname,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log("닉네임 수정 성공함");
          setUpdateSuccess(true);
          window.location.reload(); //이거는 정상작동하고 통계까지 완성하고 다시 수정해보기
        }
      })
      .catch((error) => {
        console.log("수정 실패:", error);
      });
  };
  //=========================통계=========================
  useEffect(() => {
    //cardChecked 상태가 변경될 때마다 실행되는 함수
    const fetchData = async () => {
      let cardNumberParam = "";
      cardChecked.forEach((v, i) => {
        if (v == true) {
          if (cardNumberParam != "") {
            cardNumberParam += ",";
          }
          cardNumberParam += cardList[i].cardNumber;
        }
      });
      console.log(cardNumberParam);
      // 서버에서 카드 사용 통계 데이터를 가져오는 역할
      try {
        const response = await axios.get(
          "http://192.168.0.141:8080/api/users/cards/status",
          {
            params: {
              cardNumber: cardNumberParam,
            },
          }
        );
        setCardUsageStats(response.data); //가져온 카드 사용 통계 데이터를 상태로 설정
        renderChart(response.data); // 차트를 렌더링
      } catch (error) {
        console.error("카드 사용 통계를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, [cardChecked]);
  const renderChart = (data) => {
    const ctx = document.getElementById("monthChart");
    let chart = Chart.getChart("monthChart");
    if (chart != undefined) {
      chart.destroy();
    }
    chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((stats) => stats[0]), // 카테고리 레이블
        datasets: [
          {
            label: "Dataset 1",
            data: data.map((stats) => stats[1]), // 결제금액 데이터
            backgroundColor: [
              "#FFBEBE",
              "#FFDDBE",
              "#D6F4B0",
              "#BEE4FF",
              "#D7BEFF",
              "#FFFCBE",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "이번달 카테고리별 소비내역",
          },
        },
      },
    });
  };

  //=========================통계=========================

  useEffect(() => {
    //cardChecked 상태가 변경될 때마다 실행되는 함수
    const fetchData = async () => {
      let cardNumberParam = "";
      cardChecked.forEach((v, i) => {
        if (v == true) {
          if (cardNumberParam != "") {
            cardNumberParam += ",";
          }
          cardNumberParam += cardList[i].cardNumber;
        }
      });
      console.log(cardNumberParam);
      // 서버에서 카드 사용 통계 데이터를 가져오는 역할
      try {
        const response = await axios.get(
          "http://192.168.0.141:8080/api/users/cards/status2",
          {
            params: {
              cardNumber: cardNumberParam,
            },
          }
        );
        setCardUsageStats(response.data); //가져온 카드 사용 통계 데이터를 상태로 설정
        renderChart2(response.data); // 차트를 렌더링
      } catch (error) {
        console.error("카드 사용 통계를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, [cardChecked]);

  const renderChart2 = (data) => {
    const ctx = document.getElementById("yearChart");
    let chart = Chart.getChart("yearChart");
    if (chart != undefined) {
      chart.destroy();
    }
    chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((stats) => stats[0]), // 카테고리 레이블
        datasets: [
          {
            label: "Dataset 1",
            data: data.map((stats) => stats[1]), // 결제금액 데이터
            backgroundColor: [
              "#FFBEBE",
              "#FFDDBE",
              "#D6F4B0",
              "#BEE4FF",
              "#D7BEFF",
              "#FFFCBE",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "이번연도 카테고리별 소비내역",
          },
        },
      },
    });
  };
  //=====>>>>>>>>>>>>>>>>>  return 화면
  return (
    <div className="mypage" id="modalScroll">
      {/* ===========================모달_닉네임 수정 (배경 불투명 + 모달창 띄우기 + 내부 내용 )======================= */}
      <div className="aaaa noshow" id="modal" onClick={Modal}>
        <div className="bbbb" onClick={Modal}>
          <div className="cccc">
            <h1 id="nickT">닉네임 변경하기</h1>
            <input
              type="text"
              size="18"
              value={newNickname}
              id="writeNick"
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder={user.userNickname}
            />
            <div></div>
            <button
              id="nickChangeBtn"
              onClick={() => updateNickname(user.userId, newNickname)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      {/* =======================마이페이지 div 시작========================== */}
      <div id="mypageMain">
        {/*=============프로필 이미지 수정==========================*/}
        <div id="profileBox" onClick={UploadImage}>
          {uploadedImage ? (
            <img className="profile" src={uploadedImage} alt="프로필 없을때" />
          ) : (
            <img
              className="profile"
              src={`${process.env.REACT_APP_DEV_URL}/show/image?imageName=${user.userProfile}`}
              alt="프로필사진"
            />
          )}
          {/* 프로필 사진 파일 선택 input */}
          <input type="file" onChange={onChangeImage} id="uploadProfile" />
        </div>
        {/* 프로필 수정( 텍스트 ) */}
        <div id="ProfileUploadText" onClick={UploadImage}>
          프로필 수정하기
        </div>
        {/* 닉네임 수정 => 닉네임 관련 div 선택시 modal 작동하도록 */}
        <div id="nick" onClick={Modal}>
          <div className="nickname_box" id="nick_title">
            닉네임
          </div>
          <div className="nickname_box">{user.userNickname}</div>
          <div>
            <img className="pencilImg" src="./images/nickwrite.png"></img>
          </div>
        </div>

        {/* 등록한 카드 리스트(+토글) */}
        <div id="card">
          <div id="card_title">
            카드
            {/* 모든 카드를 선택/해제하는 체크박스 */}
            <input
              id="allCheck"
              type="checkbox"
              name="allCheck"
              checked={allChecked}
              onChange={handleAllCheck}
            />
          </div>

          {/* 카드 리스트 동적 생성 */}
          {cardList
            .slice(0, showAllCards ? cardList.length : 2)
            .map((card, index) => (
              <div key={index} className="cardList">
                {/* 카드 선택 체크박스 */}
                <input
                  type="checkbox"
                  className="cardCheckbox"
                  checked={cardChecked[index]}
                  onChange={(event) => handleCardCheck(event, index)}
                  value={index}
                />
                {/* 카드 이미지 */}
                <div className="cardImage">
                  <img src={card.cardImg} alt="카드 이미지" />
                </div>
                {/* 카드 정보 */}
                <div>
                  <div className="cardText">{card.cardName}</div>
                  <div className="cardText">{card.cardNumber}</div>
                </div>
              </div>
            ))}
          {/* 더보기 버튼 */}
          {cardList.length > 2 && (
            <div>
              <button className="card_button" onClick={handleToggleCards}>
                {showAllCards ? (
                  <img src="./images/close.png" alt="더보기 닫기" />
                ) : (
                  <img src="./images/open.png" alt="더보기 열기" />
                )}
              </button>
              <div className="marginBox"></div>
            </div>
          )}
        </div>
        {/* 카드별 사용 통계 */}
        <div id="status">
          <div id="statusText">소비 통계 (월간/연간)</div>
          <div className="statusEx">
            위의 카드 리스트에서 통계를 보고 싶은 카드를 선택하세요.
          </div>
          {/* 통계영역 */}
          <div>
            <div>
              <canvas id="monthChart" width="400" height="400"></canvas>
            </div>
            <div>
              <canvas id="yearChart" width="400" height="400"></canvas>
            </div>
          </div>
          {/* 통계영역 */}
        </div>
        <div className="marginBox"></div>
      </div>
    </div>
  );
};

export default MypageComponent;
