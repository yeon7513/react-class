import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../../../store/categories/categoriesSlice';
import styles from './CategoryTab.module.scss';

function CategoryTab({ text, categoryName }) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categoriesSlice);

  return (
    <button
      className={cn(styles.btn, categoryName === category ? styles.active : '')}
      onClick={() => dispatch(setActiveCategory(categoryName))}
    >
      {text}
    </button>
  );
}

export default CategoryTab;
