import cn from 'classnames';
import React from 'react';
import styles from '../css/CourseIcon.module.css';

function CourseIcon({ className, photoUrl }) {
  return (
    <img
      className={cn(styles.courseIcon, className)}
      src={require(`../assets/icon--${photoUrl}.svg`)}
      alt=""
    />
  );
}

export default CourseIcon;
