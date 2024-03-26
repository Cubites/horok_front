import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InviteComponent = () => {
  // useParams를 사용하여 URL 파라미터를 가져옵니다.
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const { inviteToken } = useParams();

  const getFolderId = () => {
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/api/folders/invite`,
        {
          // 전달할 데이터를 객체로 정의
          inviteToken: inviteToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === 'expiration') {
          if (
            window.confirm(
              '만료된 초대링크 입니다. 초대링크를 다시 공유 받으세요!'
            )
          ) {
            navigate('/');
          }
        } else if (res.data === 'notExpiration') {
          if (window.confirm('이미 초대된 폴더입니다.')) {
            navigate('/');
          }
        } else if (res.data === 'invited') {
          if (window.confirm('초대에 실패하였습니다. 다시 시도해주세요')) {
            navigate('/');
          }
        } else if (res.data === 'invite success') {
          if (window.confirm('초대가 완료되었습니다. 폴더를 구경해보세요!')) {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };

  useEffect(() => {
    getFolderId();
  }, []);

  return <></>;
};

export default InviteComponent;
