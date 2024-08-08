import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import Header from '../components/Header';
import { changeTitle } from '../util/changeTitle';

function HomePage({ isLogin }) {
  // const { auth } = useContext(DiaryStateContext);

  const diaryList = useSelector((state) => state.diary.items);

  const [curDate, setCurDate] = useState(new Date());
  const [sortedItem, setSortedItem] = useState([]);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  useEffect(() => {
    // 1. curDate를 활용하여 firstDay와 LastDay를 만들어준다.
    // new Date(2024, 8, 1, 시, 분, 초);
    const year = curDate.getFullYear();
    const month = curDate.getMonth();
    const date = new Date(year, month, 0).getDate();

    // 2. firstDay와 LastDay를 밀리세컨즈 형태로 변환
    const firstDay = new Date(year, month, 1, 0, 0, 0).getTime();
    const lastDay = new Date(year, month, date, 23, 59, 59).getTime();

    // 3. diaryList 에서 date 필드가 firstDay와 LastDay 사이에 있는 원소들만 모아서 새로운 배열로 만든다.
    const newItem = diaryList.filter(
      (diary) => diary.date >= firstDay && diary.date <= lastDay
    );

    // 4. setSortedItem 함수 사용
    setSortedItem(newItem);
  }, [curDate, diaryList]);

  useEffect(() => {
    changeTitle('감정 일기장');
  }, []);

  return (
    <>
      <Header
        headText={headText}
        leftChild={<Button text={'<'} onClick={decreaseMonth} />}
        rightChild={<Button text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={sortedItem} />
    </>
  );
}

export default HomePage;
