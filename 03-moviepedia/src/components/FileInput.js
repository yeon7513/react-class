import React from 'react';
import resetImg from '../assets/ic-reset.png';
import placeholderImg from '../assets/preview-placeholder.png';
import '../css/fileInput.css';

function FileInput({ name, setFile }) {
  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    // e.target.files
    // -> fileList 라는 유사 객체
    setFile(name, nextFile);
  };
  return (
    <div className="file-input">
      <img className="preview" src={placeholderImg} alt="preview images" />
      <input
        className="hidden-overlay"
        type="file"
        accept="image/*" // 이미지 형식의 파일만!
        onChange={handleFileChange}
      />
      <button className="clear-btn">
        <img src={resetImg} alt="초기화" />
      </button>
    </div>
  );
}

export default FileInput;
