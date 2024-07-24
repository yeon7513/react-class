import cn from 'classnames';
import React from 'react';
import warnImg from '../assets/warn.svg';
import styles from '../css/Warn.module.css';

function Warn({ className, variant = '', title = '', description = '' }) {
  return (
    <div className={cn(styles.warn, className)}>
      <img className={styles.icon} src={warnImg} alt="" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Warn;
