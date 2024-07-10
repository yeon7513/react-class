import React from 'react';
import styles from '../css/ColorInput.module.css';

function ColorInput({ value, handleChange }) {
  const handleCodeChange = (e) => {
    const code = e.target.value;
    handleChange(code);
  };

  return (
    <div className={styles['color-input-container']}>
      <input
        className={styles['color-input']}
        type="text"
        value={value}
        onChange={handleCodeChange}
      />
      <span
        className={styles['color-input-chip']}
        style={{ backgroundColor: value }}
      ></span>
    </div>
  );
}

export default ColorInput;
