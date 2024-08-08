import cn from 'classnames';
import React from 'react';
import styles from '../css/EmotionItem.module.css';

function EmotionItem({
  emotion_img,
  emotion_id,
  emotion_description,
  name,
  onChange,
  isSelected,
}) {
  const handleClick = () => {
    onChange(name, emotion_id);
  };
  const emotionClass = isSelected ? styles[`on${emotion_id}`] : styles.off;
  return (
    <div className={cn(styles.emotionItem, emotionClass)} onClick={handleClick}>
      <img src={emotion_img} alt="" />
      <span>{emotion_description}</span>
    </div>
  );
}

export default EmotionItem;
