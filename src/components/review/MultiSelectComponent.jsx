import React, { useState } from "react";
import "./multiSelect.css";

const MultiSelectComponent = () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    // 추가적인 옵션들...
  ];

  // 다중 선택된 항목들을 관리하기 위한 상태
  const [selectedOptions, setSelectedOptions] = useState([]);

  // 선택된 항목들이 변경될 때 실행될 함수
  const handleChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  return (
    <select
      multiple
      value={selectedOptions}
      onChange={handleChange}
      className="multiSelectBox"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default MultiSelectComponent;
