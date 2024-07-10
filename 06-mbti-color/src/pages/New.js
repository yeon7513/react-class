import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorInput from '../components/ColorInput';
import MBTISelect from '../components/MBTISelect';
import styles from '../css/New.module.css';

function New() {
  const [formValue, setFormValue] = useState({
    mbti: '',
    colorCode: '#9441FF',
  });

  const handleChange = (name, value) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomColor = () => {
    const colorArr = [];
    for (let i = 0; i < 3; i++) {
      colorArr.push(parseInt(Math.random() * 256));
    }
    const hex = `#${colorArr
      .map((code) => code.toString(16).padStart(2, 0))
      .join('')}`;

    handleChange('colorCode', hex.toUpperCase());
  };

  return (
    <div id={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles['header-heading']}>새 컬러 등록하기</h1>
          <Link className={styles.cancel} to="/">
            <img
              className={styles['cancel-icon']}
              src="./images/x.svg"
              alt=""
            />
          </Link>
        </header>
        <section className={styles.section}>
          <h2 className={styles['section-heading']}>MBTI</h2>
          <MBTISelect
            value={formValue.mbti}
            handleChange={(newMbti) => handleChange('mbti', newMbti)}
          />
        </section>
        <section className={styles.section}>
          <h2 className={styles['section-heading']}>
            컬러
            <button
              className={`${styles.btn} ${styles['random-btn']}`}
              onClick={handleRandomColor}
            >
              <img
                className={styles['repeat-icon']}
                src="./images/repeat.svg"
                alt=""
              />
            </button>
          </h2>
          <ColorInput
            value={formValue.colorCode}
            handleChange={(newColorCode) =>
              handleChange('colorCode', newColorCode)
            }
          />
        </section>
        <button className={`${styles.btn} ${styles['reg-btn']}`}>
          컬러 등록
        </button>
      </div>
    </div>
  );
}

export default New;
