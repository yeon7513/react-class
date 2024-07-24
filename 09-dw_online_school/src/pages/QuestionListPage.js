import React, { useEffect, useState } from 'react';
import { getDatas } from '../api/firebase';
import searchImg from '../assets/search.svg';
import ListPage from '../components/ListPage';
import QuestionItem from '../components/QuestionItem';
import styles from '../css/QuestionListPage.module.css';

let listItems;

function QuestionListPage() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas('questions');
    listItems = resultData; // 검색용으로 사용할 전체 데이터를 가지고 있어야한다.
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant="community">
      <form className={styles.form}>
        <input
          type="text"
          placeholder="검색으로 게시글 찾기"
          autoComplete="off"
        />
        <button>
          <img src={searchImg} alt="" />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 게시글</p>
      <div className={styles.questionList}>
        {items.map((question) => (
          <QuestionItem key={question.docId} question={question} />
        ))}
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
