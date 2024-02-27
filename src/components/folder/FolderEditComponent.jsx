import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./folderEdit.css";
import axios from "axios";

const FolderAddComponent = () => {
  // 입력된 텍스트를 저장할 state
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [folder, setfolder] = useState({ folderName: "", folderImg: "" });
  // 선택된 라디오 버튼의 값을 저장하는 상태
  const [selectedValue, setSelectedValue] = useState("");

  // 텍스트 입력이 변경될 때 호출되는 핸들러 함수
  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setfolder((prevFolder) => ({
      ...prevFolder,
      folderName: event.target.value,
    }));
  };

  // 라디오 버튼이 변경될 때 호출되는 함수
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setfolder((prevFolder) => ({
      ...prevFolder,
      folderImg: event.target.value,
    }));
  };

  const folderUpdate = () => {
    axios
      .patch(
        `${process.env.REACT_APP_DEV_URL}/api/folders/update`,
        {
          // 전달할 데이터를 객체로 정의
          folderName: inputText,
          folderImg: selectedValue,
          folderId: location.state.folderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          navigate("/folder/list");
        } else {
          if (
            window.confirm("폴더 생성에 실패하였습니다. 다시 시도해주세요.")
          ) {
          }
        }
      })
      .catch((error) => {
        navigate("/login");
      });
  };

  const folderEdit = () => {
    if (inputText !== "") {
      if (selectedValue !== "") {
        folderUpdate();
      } else {
        if (window.confirm("폴더 색상을 선택해주세요")) {
        }
      }
    } else {
      if (window.confirm("폴더명을 입력해주세요")) {
      }
    }
  };

  const getfolderInfo = () => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/api/folders/edit/${location.state.folderId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setfolder(res.data);
        setInputText(res.data.folderName);
        setSelectedValue(res.data.folderImg);
        console.log(res.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    getfolderInfo();
  }, []);

  return (
    <div className="folderAddContainer">
      <div className="folderAddSubContainer">
        <div className="folderAddHead">
          <h2>폴더 수정하기</h2>
        </div>
        <div className="folderName">
          <p>폴더 이름</p>
          <input
            className="nameInput"
            type="text"
            value={folder.folderName}
            onChange={handleInputChange}
            placeholder="폴더명을 입력하세요"
          />
          {/* </div> */}
        </div>
        <div className="folderColor">
          <div>
            <p>폴더 색상</p>
          </div>
          <div className="folerColorPalette">
            {/* red */}
            <div className="folerColorSelect">
              <label htmlFor="folderColorFFBEBE">
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-FFBEBE"
                  checked={folder.folderImg === "folder-FFBEBE"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorFFBEBE"></div>
            </div>
            {/* orange */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-FFDDBE"
                  checked={folder.folderImg === "folder-FFDDBE"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorFFDDBE"></div>
            </div>
            {/* yellow */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-FFFCBE"
                  checked={folder.folderImg === "folder-FFFCBE"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorFFFCBE"></div>
            </div>

            {/* green */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-D6F4B0"
                  checked={folder.folderImg === "folder-D6F4B0"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorD6F4B0"></div>
            </div>
            {/* blue */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-BEE4FF"
                  checked={folder.folderImg === "folder-BEE4FF"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorBEE4FF"></div>
            </div>
            {/* navy */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-BECCFF"
                  checked={folder.folderImg === "folder-BECCFF"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorBECCFF"></div>
            </div>
            {/* purple */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-D7BEFF"
                  checked={folder.folderImg === "folder-D7BEFF"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorD7BEFF"></div>
            </div>
            {/* gray */}
            <div className="folerColorSelect">
              <label>
                <input
                  type="radio"
                  name="folderColor"
                  value="folder-C9C9C9"
                  checked={folder.folderImg === "folder-C9C9C9"}
                  onChange={handleRadioChange}
                />
              </label>
              <div className="folderColorC9C9C9"></div>
            </div>
          </div>
        </div>

        <div className="folderCreate">
          <button id="folderCreateBnt" onClick={folderEdit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderAddComponent;
