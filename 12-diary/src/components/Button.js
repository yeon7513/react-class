import cn from 'classnames';
import React from 'react';
import styles from '../css/Button.module.css';

function Button({ text, onClick, type, className }) {
  const btnClass = ['positive', 'negative'].includes(type) ? type : 'default';
  return (
    <button
      className={cn(styles.btn, styles[btnClass], styles[className])}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
