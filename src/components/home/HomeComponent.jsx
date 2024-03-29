import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import axios from 'axios';
import React, { Fragment } from 'react';

const HomeComponent = ({ folderName, setFolderName }) => {
  const [user, setUser] = useState({});
  const [favor, setFavor] = useState({});
  const [folder, setFolder] = useState({});
  const [checkedList, setCheckedList] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  let is_favor = true;
  const createFolderList = () => {
    const folderList = [];
    for (let a = 0; a < 9; a++) {
      folderList.push(a);
    }
    return folderList;
  };

  const initializeCheckedList = (data) => {
    const initialCheckedList = {};
    data.forEach((list) => {
      initialCheckedList[list.folderParticipantsId] = list.folderFavor || false;
    });
    setCheckedList(initialCheckedList);
  };

  const [folderList, setfolderList] = useState(createFolderList());

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/users/info`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };
  const getFolderFavor = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/folders/${is_favor}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFavor(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };

  const getFolder = () => {
    is_favor = false;
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/folders/${is_favor}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFolder(res.data);
        initializeCheckedList(res.data); // 초기화
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };

  const getFolderFavorUpdate = () => {
    axios
      .patch(
        `${process.env.REACT_APP_DEV_URL}/api/folders/favor/edit`,
        checkedList,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkedList),
          withCredentials: true,
        }
      )
      .then((res) => {
        getFolderFavor();
        Modal();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    getUser();
    getFolderFavor();
    getFolder();
  }, []);

  //Modal
  const Modal = () => {
    document.getElementById('modal').classList.toggle('noshow');
    document.getElementById('modalScroll').classList.toggle('hidden');
  };

  const save = () => {
    const favorCnt = Object.values(checkedList).filter(
      (value) => value === true
    ).length;
    if (favorCnt > 9) {
      if (window.confirm('최대 9개까지 선택 가능합니다')) {
      }
    } else {
      getFolderFavorUpdate();
    }
  };

  const checkedItemHandler = (value, isChecked) => {
    setCheckedList((prev) => {
      return { ...prev, [value.folderParticipantsId]: isChecked };
    });
  };

  const checkHandler = (e, value) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    checkedItemHandler(value, isChecked);
  };
  return (
    <div className='homeContainer' id='modalScroll'>
      <div className='modalContainer'>
        <div className='modalSubContainer noshow' id='modal' onClick={Modal}>
          <div className='moadlView' onClick={Modal}>
            <div className='modalContent'>
              <div className='modalHead'>
                <div className='modalName'>
                  <h1>즐겨찾기 폴더</h1>
                </div>
                <div className='moadlClose'>
                  <img
                    src='/images/main-close.png'
                    rel=''
                    style={{ width: '20%' }}
                    onClick={Modal}
                    alt='test'
                  ></img>
                  <div style={{ fontSize: '10px' }}>
                    최대 9개 선택 가능해요.
                  </div>
                </div>
              </div>
              <div className='modalBody scrollBar'>
                <div style={{ width: '85%' }}>
                  {folder &&
                    folder.length > 0 &&
                    folder.map((list, i) => (
                      <li key={i} className='check'>
                        <label htmlFor={list.folderParticipantsId}>
                          <div style={{ textAlign: 'left' }}>
                            {list.folderName}
                          </div>
                        </label>
                        <input
                          type='checkbox'
                          checked={checkedList[list.folderParticipantsId]}
                          //defaultChecked={list.folderFavor}
                          id={list.folderParticipantsId}
                          name={list.folderParticipantsId}
                          onChange={(e) => checkHandler(e, list)}
                        />
                      </li>
                    ))}
                </div>
              </div>
              <div className='favorEdit'>
                <button id='favorEditBtn' onClick={save}>
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='homeSubContainer'>
        <div className='userInfoBox'>
          <div className='userImg'>
            <img
              src={`${process.env.REACT_APP_DEV_URL}/show/image?imageName=${user.userProfile}`}
              alt=''
              className='userImgContainer'
            />
          </div>
          <div className='userInfo'>
            <div>{user.userNickname}</div>
            <div className='cntInfo' style={{}}>
              <div>
                리뷰
                <span style={{ fontWeight: '600' }}>
                  {' '}
                  {user.userReviewCnt}
                  {'     '}
                </span>
              </div>
              <div>
                폴더
                <span style={{ fontWeight: '600' }}>
                  {' '}
                  {user.userFolderCnt}{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='favorName'>
            <div>
              즐겨찾기{' '}
              <img
                src='/images/setting.png'
                rel=''
                onClick={Modal}
                style={{ width: '9%' }}
                alt='test'
              />
            </div>
            <Link to={'/folder/list'} style={{ fontSize: '15px' }}>
              더보기
            </Link>
          </div>
          <div className='favorBox'>
            {folderList.map((list, l) => (
              <div key={l} className='testBox'>
                {favor && favor.length > l && (
                  <React.Fragment>
                    <Link
                      to={`/folder/${favor[l].folderId}`}
                      onClick={() => {
                        setFolderName(favor[l].folderName);
                      }}
                    >
                      <img
                        src={'/images/' + favor[l].folderImg + '-f.png'}
                        style={{ width: '80%' }}
                        alt='test'
                      />
                    </Link>
                    <Link to={'/folder/list'}>
                      <div
                        style={{
                          lineHeight: '28px',
                          whiteSpace: 'noWrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {favor[l].folderName}
                      </div>
                    </Link>
                    <div className='partiText'>
                      {favor[l].folderParticipants}
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

export default HomeComponent;
