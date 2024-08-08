import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import Button from '../components/Button';
import Header from '../components/Header';
import styles from '../css/DiaryPage.module.css';
import { changeTitle } from '../util/changeTitle';
import { emotionList } from '../util/emotion';

function DiaryPage() {
  const { id } = useParams();
  // const { diaryList } = useContext(DiaryStateContext);

  const diaryList = useSelector((state) => state.diary.items);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [data, setData] = useState();
  const navigate = useNavigate();

  const formatDate = (date) => {
    const newDate = new Date(date);

    return !date ? '0000-00-00' : newDate.toISOString().split('T')[0];
  };

  const emotions = (num) => {
    const result = emotionList.find((emotion) => emotion.emotion_id === num);
    return !num ? '오늘의 기분' : result.emotion_description;
  };

  const handleEdit = () => {
    if (isLogin) {
      navigate(`/edit/${id}`, { state: data });
    } else {
      alert('해당 일기의 작성자만 수정할 수 있습니다.');
      return;
    }
  };

  useEffect(() => {
    changeTitle(`감정 일기장 - ${id}번 일기`);
  }, [id]);

  useEffect(() => {
    if (diaryList.length > 0) {
      // ** targetDiary를 찾는 방법 **
      // 전체 다이어리 리스트를 확인해서 useParams로 가져온 id 와 같은 diary데이터를 뽑아서
      // data state에 set 해준다.
      // filter, findIndex, find << 다 쓸 수 있다.
      // filter는 결과가 배열, findIndex는 인덱스번호를 찾아주는 것이기 때문에
      // 접근을 2번 해야한다. <<< 번거롭다!!!!!!!!!!!
      // 따라서, 객체 자체로만 뽑아 내기위해 find를 사용한다.
      const target = Number(id);
      const targetDiary = diaryList.find((diary) => diary.id === target);

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [diaryList, id, navigate]);

  if (!data) {
    return (
      <div className={styles.loading}>
        <DotLoader color="#ececec" size={50} />
      </div>
    );
  } else {
    return (
      <div className={styles.diaryPage}>
        <Header
          headText={`${formatDate(data.date)} 기록`}
          leftChild={
            <Button text={'< 뒤로가기'} onClick={() => navigate(-1)} />
          }
          rightChild={
            isLogin && <Button text={'수정하기'} onClick={handleEdit} />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={cn(styles.emotion, styles[`img${data.emotion}`])}>
              <img src={`/assets/emotion${data?.emotion}.png`} alt="" />
              <div className={styles.description}>{emotions(data.emotion)}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className={styles.content}>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default DiaryPage;
