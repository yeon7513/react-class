import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorInput from '../components/ColorInput';
import MBTISelect from '../components/MBTISelect';
import styles from '../css/New.module.css';
import { addDatas } from '../lib/firebase';
import generateColorCode from '../lib/generateColorCode';

const INITIAL_VAULES = {
  mbti: '',
  colorCode: '',
};

function New() {
  const [formValue, setFormValue] = useState(INITIAL_VAULES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomClick = () => {
    const nextColorCode = generateColorCode();
    handleChange('colorCode', nextColorCode);
  };

  const handleSave = async () => {
    const { mbti, colorCode } = formValue;
    if (mbti.length < 4) {
      alert('mbti를 선택해주세요.');
      return false;
    }
    if (colorCode === '') {
      alert('컬러 코드를 입력해주세요.');
      return false;
    }

    setIsSubmitting(true);
    const result = await addDatas('mbtiColor', formValue);
    if (result) {
      alert('MBTI Color 등록을 성공했습니다.');
      setFormValue(INITIAL_VAULES);
    } else {
      alert('MBTI Color 등록을 실패했습니다. \n관리자에게 문의하세요.');
    }
    setIsSubmitting(false);
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
              onClick={handleRandomClick}
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
        <button
          className={`${styles.btn} ${styles['reg-btn']}`}
          onClick={handleSave}
          disabled={isSubmitting}
        >
          컬러 등록
        </button>
      </div>
    </div>
  );
}

export default New;
