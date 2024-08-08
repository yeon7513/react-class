import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../css/DiaryList.module.css';
import Button from './Button';
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { name: '최신순', value: 'latest' },
  { name: '오래된 순', value: 'oldest' },
];
const filterOptionList = [
  { name: '전부다', value: 'all' },
  { name: '좋은 감정만', value: 'good' },
  { name: '안좋은 감정만', value: 'bad' },
];

function ControlMenu({ optionList, value, onChange }) {
  return (
    <select
      className={styles.controlMenu}
      name="sort"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const [order, setOrder] = useState('latest');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.isLogin);

  const checkLogin = () => {
    if (!isLogin) {
      alert('로그인을 해주세요.');
      navigate('/login');
    } else {
      navigate('/new');
    }
  };

  const getSortedDiaryList = () => {
    // 필터링 함수 (all, good, bad)
    const getFilteredList = (diary) => {
      // filter state가 good이면? -> emotion의 값이 3보다 작거나 같을 때
      // filter state가 good이 아니면? -> emotion의 값이 3보다 크다.

      return filter === 'good' ? diary.emotion <= 3 : diary.emotion > 3;
    };

    // 정렬 함수 (latest, oldest)
    const getOrderedList = (prev, next) => {
      // order state 가 latest 이면 b - a
      // order state 가 latest 아니면 a - b

      return order === 'latest' ? next.date - prev.date : prev.date - next.date;
    };

    const filteredList =
      filter === 'all'
        ? diaryList
        : diaryList.filter((diary) => getFilteredList(diary));
    const sortedList = filteredList.sort(getOrderedList);

    return sortedList;
  };

  useEffect(() => {
    getSortedDiaryList();
  }, [filter, order]);

  return (
    <div className={styles.diaryList}>
      <div className={styles.menuWrapper}>
        <div className={styles.controlMenus}>
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className={styles.newBtn}>
          <Button text={'새 일기쓰기'} type={'positive'} onClick={checkLogin} />
        </div>
      </div>
      {getSortedDiaryList().map((list) => (
        <DiaryItem key={list.id} list={list} />
      ))}
    </div>
  );
}

export default DiaryList;
