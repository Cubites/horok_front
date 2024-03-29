import { useEffect, useState } from 'react';
import axios from 'axios';
import './multiSelect.css';
import { useNavigate } from 'react-router-dom';

const MultiSelectComponent = ({ onChange, reviewId }) => {
  // const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  // 다중 선택된 항목들을 관리하기 위한 상태
  const [selectedOptions, setSelectedOptions] = useState(['0']);
  const navigate = useNavigate();

  const getFolderList = (reviewId) => {
    if (reviewId === -1) {
      axios
        .get(`${process.env.REACT_APP_DEV_URL}/api/folders/user`, {
          withCredentials: true,
        })
        .then((res) => {
          const folderData = res.data.map((folder) => ({
            value: folder.folderId.toString(),
            label: folder.folderName,
          }));
          setOptions(folderData);
        })
        .catch((error) => {
          console.error('error!!! : ', error);
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    } else if (reviewId && reviewId !== -1) {
      axios
        .get(
          `${process.env.REACT_APP_DEV_URL}/api/folders/notshared/${reviewId}`,
          { withCredentials: true }
        )
        .then((res) => {
          const folderData = res.data.map((folder) => ({
            value: folder.folderId.toString(),
            label: folder.folderName,
          }));
          setOptions(folderData);
        })
        .catch((error) => {
          console.error('error!!! : ', error);
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    }
  };

  useEffect(() => {
    getFolderList(reviewId);
  }, [reviewId]);

  //const options = [
  //{ value: "1", label: "Option 1" },
  //{ value: "2", label: "Option 2" },
  //{ value: "3", label: "Option 3" },
  //{ value: "4", label: "Option 4" },
  // 추가적인 옵션들...
  //];

  // 선택된 항목들이 변경될 때 실행될 함수
  const handleChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    onChange(selectedValues);

    //선택하지 않음 선택시 다른 항목 선택 취소
    if (selectedValues.includes('0')) {
      setSelectedOptions(['0']);
    } else {
      setSelectedOptions(selectedValues);
    }
  };

  return (
    <select
      multiple
      value={selectedOptions}
      onChange={handleChange}
      className='multiSelectBox'
    >
      <option value='0'>선택하지 않음</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default MultiSelectComponent;
