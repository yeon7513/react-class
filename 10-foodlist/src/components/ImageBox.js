import cn from 'classnames';
import React from 'react';
import styles from '../css/ImageBox.module.css';

function ImageBox({ imgUrl, isSelected }) {
  return (
    <img
      className={cn(styles.imgBox, isSelected ? styles.selected : '')}
      src={imgUrl}
      alt=""
    />
  );
}

export default ImageBox;
