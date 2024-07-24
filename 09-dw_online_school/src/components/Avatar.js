import React from 'react';
import tempImg from '../assets/person.png';
import styles from '../css/Avatar.module.css';

function Avatar({ photo = tempImg, name }) {
  return <img className={styles.avatar} src={photo} title={name} alt="" />;
}

export default Avatar;
