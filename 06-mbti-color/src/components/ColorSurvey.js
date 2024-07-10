import React from 'react';
import styles from '../css/ColorSurvey.module.css';

function ColorSurvey({ item }) {
  const { id, colorCode, mbti } = item;

  return (
    <li className={styles.colorSurvey}>
      <div className={styles.id}>{id}</div>
      <div className={styles.mbti}>{mbti}</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" alt="" />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: colorCode }}
      ></div>
      <div className={styles.colorCode}>{colorCode}</div>
    </li>
  );
}

export default ColorSurvey;
