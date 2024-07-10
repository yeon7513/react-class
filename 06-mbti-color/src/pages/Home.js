import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorSurvey from '../components/ColorSurvey';
import styles from '../css/Home.module.css';
import { getAllDatas } from '../firebase';

function Home() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const resultData = await getAllDatas('mbtiColor', 'id');

    // items state에 셋팅
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
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
          {items.map((item) => (
            <ColorSurvey key={item.docId} item={item} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
