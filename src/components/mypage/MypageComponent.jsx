import React, { useRef, useState } from "react";
import "./mypage.css";

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
  };

  //닉네임 수정 모달창(화면 불투명 +  닉네임 수정 모달창 뜸 )
  const Modal = () => {
    document.getElementById("modal").classList.toggle("noshow");
  };
  //등록한 카드 리스트 확인하기(더보기 누르고, 닫기 누르면 상태에 맞게 동작)
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mypage">
      {/*프로필 수정*/}
      <div onClick={UploadImage}>
        {uploadedImage ? (
          <img className="profile" src={uploadedImage} alt="프로필 없을때" />
        ) : (
          <img
            className="profile"
            src="./images/profile.png"
            alt="프로필사진"
          />
        )}
        <input type="file" onChange={onChangeImage} id="uploadProfile" />
        <div id="ProfileUploadText" onChange={onChangeImage}>
          프로필 수정{" "}
        </div>
      </div>

      {/* 닉네임 수정 => 닉네임 관련 div 선택시 modal 작동하도록 */}
      <div id="nick" onClick={Modal}>
        <div className="nickname_box" id="nick_title">
          닉네임
        </div>
        <div className="nickname_box">nickname</div>
        <div>
          <img className="pencilImg" src="./images/nickwrite.png"></img>
        </div>
      </div>

      {/* 모달(배경 불투명 + 모달창 띄우기 + 내부 내용 ) */}
      <div className="aaaa noshow" id="modal" onClick={Modal}>
        <div className="bbbb">
          <div className="cccc">
            <h1>닉네임 변경하기</h1>
            <input
              type="text"
              size="18"
              id="writeNick"
              placeholder="변경할 닉네임을 입력하세요"
            />
            <button id="nickChangeBtn"> 확인 </button>
          </div>
        </div>
      </div>

      {/* 등록한 카드 리스트(+토글) */}
      <div id="card">
        <div id="card_title">카드</div>
        <div className="card_list">
          <div>
            <img className="slog" src="./images/slog.png" />
          </div>
          <div class="card_name" align="left">
            신한카드 핏(최고심)
          </div>
          <div class="card_num" align="left">
            1234 4321 4567 8987
          </div>
        </div>
        <div className="card_list">
          <div>
            <img className="slog" src="./images/slog.png" />
          </div>
          <div class="card_name" align="left">
            신한카드 Deep Oil
          </div>
          <div class="card_num" align="left">
            1234 1234 1234 1234
          </div>
        </div>

        {/* 리스트 추가 */}
        {!isOpen && (
          <>
            <div className="card_list">
              <div>
                <img className="slog" src="./images/slog.png" />
              </div>
              <div class="card_name" align="left">
                신한카드 핏(최고심)
              </div>
              <div class="card_num" align="left">
                1234 4321 4567 8987
              </div>
            </div>

            <div className="card_list">
              <div>
                <img className="slog" src="./images/slog.png" />
              </div>
              <div class="card_name" align="left">
                신한카드 핏(최고심)
              </div>
              <div class="card_num" align="left">
                1234 4321 4567 8987
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
  );
};
export default MypageComponent;
