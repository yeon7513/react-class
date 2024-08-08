import React from 'react';
import styles from '../css/Header.module.css';

function Header({ headText, leftChild, rightChild }) {
  return (
    <header>
      <div className={styles.leftBtn}>{leftChild}</div>
      <div className={styles.text}>{headText}</div>
      <div className={styles.rightBtn}>{rightChild}</div>
    </header>
  );
}

export default Header;
