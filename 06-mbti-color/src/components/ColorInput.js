import React from 'react';
import styles from '../css/ColorInput.module.css';

function ColorInput({ value, handleChange }) {
  const handleCodeChange = (e) => {
    const code = e.target.value;
    handleChange(code);
  };
  const isValidColorCode = (value) => {
    const regxp = /^#[a-fA-F0-9]{6}$/;
    return regxp.test(value);
  };
  const handleBlur = () => {
    if (!isValidColorCode(value)) {
      alert(
        "컬러코드는 '#'과 함께 영소문자 a-f, 영대문자 A-F, 숫자 0-9를 조합한 일곱자리를 입력하세요."
      );
      handleChange('#000000');
    }
  };

  return (
    <div className={styles['color-input-container']}>
      <input
        className={styles['color-input']}
        type="text"
        value={value}
        maxLength={7}
        onChange={handleCodeChange}
        onBlur={handleBlur}
      />
      <span
        className={styles['color-input-chip']}
        style={{ backgroundColor: value }}
      ></span>
    </div>
  );
}

export default ColorInput;
