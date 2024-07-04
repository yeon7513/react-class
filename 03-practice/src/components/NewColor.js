import React from 'react';
import { Link } from 'react-router-dom';
import random from '../assets/repeat.svg';
import cancel from '../assets/x.svg';
import '../css/new.css';

function NewColor(props) {
  return (
    <div className="new-container">
      <div className="new-header">
        <h1>새 컬러 등록하기</h1>
        <Link to="/" className="cancel">
          <img src={cancel} alt="" />
        </Link>
      </div>
      <div className="section">
        <h2 className="section-heading">MBTI</h2>
        <div className="mbti-options"></div>
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
      <button className="reg-btn">컬러 등록</button>
    </div>
  );
}

export default NewColor;
