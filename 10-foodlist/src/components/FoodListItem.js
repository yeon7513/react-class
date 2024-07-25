import React from 'react';
import styles from '../css/FoodListItem.module.css';
import useTranslate from '../hooks/useTranslate';
import ImageBox from './ImageBox';

function FoodListItem({ food, handleDelete, handleEdit }) {
  const { calorie, content, imgUrl, title, docId, id, createdAt } = food;
  const t = useTranslate();

  function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  }

  const handleDeleteClick = () => {
    handleDelete(docId, imgUrl);
  };

  const handleEditClick = () => {
    handleEdit(id);
  };

  return (
    <li className={styles.listItem}>
      <ImageBox imgUrl={imgUrl} />
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title}
          <span className={styles.calorie}>{calorie}kcal</span>
        </h1>
        <p className={styles.content}>{content}</p>
        <div className={styles.info}>
          <span>{formatDate(createdAt)}</span>
          <div className={styles.btns}>
            <button onClick={handleEditClick}>{t('edit button')}</button>
            <button onClick={handleDeleteClick}>{t('delete button')}</button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default FoodListItem;
