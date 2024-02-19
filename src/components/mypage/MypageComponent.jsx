import React, { useRef, useState, useEffect } from "react";
import "./mypage.css";
import axios from "axios";

const MypageComponent = () => {
  //이미지 업로드
  const [uploadedImage, setUploadedImage] = useState(null); //uploadImage 상태 초기화

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  //사진 선택하면 프로필 변경되도록 onclick 이벤트 걸어줌
  const UploadImage = () => {
    document.getElementById("uploadProfile").click();
    document.getElementById("ProfileUploadText").click();
  };

  //닉네임 수정 모달창(화면 불투명 +  닉네임 수정 모달창 뜸 )
  const Modal = () => {
    document.getElementById("modal").classList.toggle("noshow");
    document.getElementById("modalScroll").classList.toggle("hidden");
  };

  //전체 선택 체크박스가 클릭될 때 호출되는 함수 ( 모든 체크 박스의 상태를 전체 선택 체크박스와 동일하게 처리)
  const [allChecked, setAllChecked] = useState(false);
  const [cardChecked, setCardChecked] = useState([false, false, false]);

  const handleAllCheck = (event) => {
    const { checked } = event.target;
    setAllChecked(checked);
    if (checked) {
      setCardChecked([true, true, true]);
    } else {
      setCardChecked([false, false, false]);
    }
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
  //등록한 카드 리스트 확인하기(더보기 누르고, 닫기 누르면 상태에 맞게 동작)
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const [user, setUser] = useState({});

  // 리액트랑 스프링부트 연동하는거니까
  const getUser = () => {
    const userIdTest = 173;
    axios
      .get(`http://192.168.0.141:8080/api/users?userId=${userIdTest}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="mypage" id="modalScroll">
      {/* 모달(배경 불투명 + 모달창 띄우기 + 내부 내용 ) */}
      <div className="aaaa noshow" id="modal" onClick={Modal}>
        <div className="bbbb" onClick={Modal}>
          <div className="cccc">
            <h1 id="nickT">닉네임 변경하기</h1>
            <input
              type="text"
              size="18"
              id="writeNick"
              placeholder={user.userNickname}
            />
            <div></div>
            <button id="nickChangeBtn"> 확인 </button>
          </div>
        </div>
      </div>

      <div id="mypageMain">
        {/*프로필 수정*/}
        <div id="profileBox" onClick={UploadImage}>
          {uploadedImage ? (
            <img className="profile" src={uploadedImage} alt="프로필 없을때" />
          ) : (
            <img
              className="profile"
              // src="./images/profile.png"
              src={user.userProfile}
              alt="프로필사진"
            />
          )}
          {/* 프로필 사진 파일 선택 input */}
          <input type="file" onChange={onChangeImage} id="uploadProfile" />
        </div>
        {/* <div id="ProfileUploadText" onChange={onChangeImage}>
          프로필 수정하기{""}
        </div> */}

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
            <input
              id="allCheck"
              type="checkbox"
              name="allCheck"
              checked={allChecked}
              onChange={handleAllCheck}
            />
          </div>
          <div className="cardList">
            <input
              type="checkbox"
              className="cardCheckbox"
              checked={cardChecked[0]}
              onChange={handleCardCheck}
              value="0"
            />
            {/* 카드 체크박스 */}
            <div className="cardImage">
              <img src="./images/spring.png" />
            </div>
            <div>
              <div className="cardText">신한 봄</div>
              <div className="cardText">1234 4321 4567 8987</div>
            </div>
          </div>

          <div className="cardList">
            <input
              type="checkbox"
              className="cardCheckbox"
              checked={cardChecked[1]}
              onChange={handleCardCheck}
              value="1"
            />
            <div className="cardImage">
              <img src="./images/spring.png" />
            </div>
            <div>
              <div className="cardText">신한 deep dream</div>
              <div className="cardText">1234 4321 4567 8987</div>
            </div>
          </div>

          {/* 리스트 추가 해서 넣어두기 */}
          {!isOpen && (
            <>
              <div className="cardList">
                <input
                  type="checkbox"
                  className="cardCheckbox"
                  checked={cardChecked[2]}
                  onChange={handleCardCheck}
                  value="2"
                />
                <div className="cardImage">
                  <img src="./images/spring.png" />
                </div>
                <div>
                  <div className="cardText">신한카드 핏(최고심)</div>
                  <div className="cardText">1234 4321 4567 8987</div>
                </div>
              </div>
            </>
          )}
          {/* 끝 */}

          {/* 리스트 2개 이외 더 있는 경우 더보기 버튼으로 리스트 전체 확인 가능 */}
          <div>
            <button className="card_button" onClick={handleClick}>
              {isOpen ? (
                <img src="./images/open.png" />
              ) : (
                <img src="./images/close.png" />
              )}
            </button>
          </div>
        </div>

        {/* 카드별 사용 통계 */}
        <div id="status">통계</div>
      </div>
    </div>
  );
};

export default MypageComponent;
