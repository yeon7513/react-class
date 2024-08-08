import cn from 'classnames';
import React from 'react';
import styles from './CategoryTab.module.scss';

function CategoryTab({ text, categoryName }) {
  const category = '';
  return (
    <button
      className={cn(styles.btn, categoryName === category ? styles.active : '')}
    >
      {text}
    </button>
  );
}

export default CategoryTab;
