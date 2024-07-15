import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorSurvey from '../components/ColorSurvey';
import styles from '../css/Home.module.css';
import { getDatas } from '../lib/firebase.js';

function Home() {
  const [items, setItems] = useState([]);
  const nextPageRef = useRef(null);

  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const { resultData, lastQuery } = await getDatas('mbtiColor', 'id');

    // items state에 셋팅
    setItems(resultData);
    nextPageRef.current = lastQuery;
  };

  const handleLoadNext = async () => {
    const { resultData, lastQuery } = await getDatas(
      'mbtiColor',
      'id',
      nextPageRef.current
    );

    if (resultData.length !== 0) {
      setItems((prev) => [...prev, ...resultData]);
      nextPageRef.current = lastQuery;
    } else {
      nextPageRef.current = null;
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!nextPageRef.current) {
        return false;
      }
      // scrollHeight : 문서 전체의 높이
      // scrollTop : 문서의 처음부터 화면에 보이기 전까지의 높이(내려온 스크롤 높이)
      // clientHeight : 화면에 보여지는 높이
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      // scrollTop과 clientHeight를 더한 값이 scrollHeight이다.
      if (scrollTop + clientHeight >= scrollHeight) {
        handleLoadNext();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <h1>
            MBTI 별<br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <span>MBTI</span>
              <img
                className={styles['remove-icon']}
                src="./images/x.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </header>
      <main className={styles.content}>
        <Link to="new" className={styles['add-item']}>
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {items.map((item, idx) => (
            <ColorSurvey key={idx} item={item} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
