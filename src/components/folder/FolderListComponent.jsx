import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./folderList.css";
import axios from "axios";
import React, { Fragment } from "react";

const FolderListComponent = () => {
  const [folder, setFolder] = useState({});
  let is_favor = true;
  const getFolder = () => {
    is_favor = false;
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/folders/${is_favor}`)
      .then((res) => {
        setFolder(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <div className="folderListContainer">
      <div className="addFolder">
        <div className="folderlistText">
          <h2
            style={{ fontWeight: "bold", fontSize: "28px", lineHeight: "38px" }}
          >
            폴더 추가하기
          </h2>
          <p style={{ fontSize: "15px", color: "#808080" }}>
            새로운 폴더를 추가해보세요.
          </p>
        </div>
        <div>
          <Link to={"/folder/add"}>
            <img src="/images/folderAdd.png" />
          </Link>
        </div>
      </div>
      <div className="folderListsubContainer">
        <div>
          <div className="folderListName">
            <div>
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "21px",
                  lineHeight: "38px",
                }}
              >
                내 리뷰
              </h2>
              <p style={{ fontSize: "12px", color: "#808080" }}>
                {" "}
                내가 작성한 리뷰{" "}
              </p>
            </div>
          </div>
          <div className="folderListBox">
            <div className="folderBox">
              <Link to={"/myreview"}>
                <img src={"/images/myFolder.png"} style={{ width: "80%" }} />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="folderListName">
            <div>
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "21px",
                  lineHeight: "38px",
                }}
              >
                폴더
              </h2>
              <p style={{ fontSize: "12px", color: "#808080" }}> 폴더 목록</p>
            </div>
          </div>
          <div className="folderListBox">
            {folder &&
              folder.length > 0 &&
              folder.map((list, l) => (
                <div key={l} className="folderBox">
                  {folder && folder.length > l && (
                    <React.Fragment>
                      <Link to={`/folder/${folder[l].folderId}`}>
                        {folder[l].folderFavor && (
                          <img
                            src={"/images/" + folder[l].folderImg + "-f.png"}
                            style={{ width: "80%" }}
                            alt={`Folder ${folder[l].folderName}`}
                          />
                        )}
                        {folder[l].folderFavor === false && (
                          <img
                            src={"/images/" + folder[l].folderImg + ".png"}
                            style={{ width: "80%" }}
                            alt={`Folder ${folder[l].folderName}`}
                          />
                        )}
                      </Link>
                      <Link to={"/folder/list"}>
                        <div
                          style={{
                            lineHeight: "28px",
                            whiteSpace: "noWrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {folder[l].folderName}
                        </div>
                      </Link>
                      <div className="partiText">
                        {folder[l].folderParticipants}
                      </div>
                    </React.Fragment>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderListComponent;
