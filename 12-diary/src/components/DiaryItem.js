import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../css/DiaryItem.module.css';
import Button from './Button';

function DiaryItem({ list }) {
  const { id, content, emotion, date } = list;
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`diary/${id}`);
  };
  const goEdit = () => {
    if (isLogin) {
      navigate(`edit/${id}`, { state: list });
    } else {
      alert('해당 일기의 작성자만 수정할 수 있습니다.');
      return;
    }
  };

  return (
    <div className={styles.diaryItem}>
      <div
        className={cn(styles.imgWrapper, styles[`img${emotion}`])}
        onClick={goDetail}
      >
        <img src={`assets/emotion${emotion}.png`} alt="" />
      </div>
      <div className={styles.infoWrapper} onClick={goDetail}>
        <div className={styles.date}>{new Date(date).toLocaleDateString()}</div>
        <div className={styles.preview}>
          {content.length > 25 ? `${content.slice(0, 25)} .....` : content}
        </div>
      </div>
      {isLogin && (
        <div className={styles.btnWrapper}>
          <Button text={'수정하기'} onClick={goEdit} />
        </div>
      )}
    </div>
  );
}

export default DiaryItem;
