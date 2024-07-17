import React from 'react';
import styles from '../css/Button.module.css';

function Button({ children }) {
  return <button className={styles.button} children={children} />;
}

export default Button;
