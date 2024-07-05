import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import random from '../assets/repeat.svg';
import cancel from '../assets/x.svg';
import '../css/new.css';
import { addDatas } from '../firebase';

const mbtiArr = [
  { char: 'E', desc: '외향형' },
  { char: 'I', desc: '내향형' },
  { char: 'S', desc: '감각형' },
  { char: 'N', desc: '직관형' },
  { char: 'T', desc: '사고형' },
  { char: 'F', desc: '감정형' },
  { char: 'J', desc: '판단형' },
  { char: 'P', desc: '인식형' },
];

function NewColor(props) {
  const [selectedMbti, setSelectedMbti] = useState([]);

  const handleColorRegistration = async (e) => {
    e.preventDefault();

    const result = await addDatas('mbtiColor');

    if (result) {
      alert('MBTI 컬러 등록에 성공했습니다.');
    } else {
      alert('MBTI 컬러 등록에 실패했습니다.');
    }
  };

  return (
    <div id="new-wrapper">
      <div className="new-container">
        <div className="new-header">
          <h1>새 컬러 등록하기</h1>
          <Link to="/" className="cancel">
            <img src={cancel} alt="" />
          </Link>
        </div>
        <div className="section">
          <h2 className="section-heading">MBTI</h2>
          <div className="mbti-options">
            {mbtiArr.map((option) => (
              <div className="mbti-option" key={option.char}>
                <span className="mbti-char">{option.char}</span>
                {option.desc}
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h2 className="section-heading">
            컬러
            <button className="random-btn">
              <img src={random} alt="" />
            </button>
          </h2>
          <div className="color-input-container">
            <input className="color-input" type="text" />
            <span className="color-input-chip"></span>
          </div>
        </div>
        <button className="reg-btn" onClick={handleColorRegistration}>
          컬러 등록
        </button>
      </div>
    </div>
  );
}

export default NewColor;
