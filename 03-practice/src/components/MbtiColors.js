import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/arrow.svg';
import '../css/home.css';
import { getDatas } from '../firebase.js';

function MbtiColors(props) {
  const [mbtis, setMbtis] = useState([]);

  const handleLoad = async () => {
    const snapshot = await getDatas('mbtiColor');
    const mbtiList = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      mbtiList.push(data);
    });

    setMbtis(mbtiList);
  };

  // console.log(new Date().toLocaleString());

  useEffect(() => {
    console.log(mbtis);
    handleLoad();
  }, []);

  return (
    <div id="home-wrapper">
      <div className="container">
        <div className="header-container">
          <div className="header">
            <h1>
              MBTI 별<br />
              <span className="accent">좋아하는 컬러</span>
            </h1>
          </div>
        </div>
        <div className="content">
          <Link to="/newColor" className="add-item">
            + 새 컬러 등록하기
          </Link>
          <ul className="items">
            {mbtis.map((item, idx) => {
              return (
                <li key={idx} className="item">
                  <div className="item-id">{idx + 1}</div>
                  <div className="item-mbti">{item.mbti}</div>
                  <div className="item-arrow">
                    <img className="item-arrow-icon" src={arrow} alt="" />
                  </div>
                  <div
                    className="item-color-chip"
                    style={{ backgroundColor: item.code }}
                  ></div>
                  <div className="item-color-code">{item.code}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MbtiColors;
