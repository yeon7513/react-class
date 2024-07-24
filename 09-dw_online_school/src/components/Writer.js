import cn from 'classnames';
import React from 'react';
import styles from '../css/Writer.module.css';
import Avatar from './Avatar';

function Writer({ className, writer }) {
  const {
    name,
    level,
    profile: { photo },
  } = writer;

  return (
    <div className={cn(styles.writer, className)}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>{level}</div>
      </div>
      <Avatar photo={photo} name={name} />
    </div>
  );
}

export default Writer;
