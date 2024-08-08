import cn from 'classnames';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';
import styles from '../css/DiaryEditor.module.css';
import { emotionList } from '../util/emotion';
import Button from './Button';
import EmotionItem from './EmotionItem';
import Header from './Header';

const INITIAL_VALUES = {
  date: '',
  content: '',
  emotion: 3,
};

function DiaryEditor({ title, originData = INITIAL_VALUES, isEdit }) {
  const { onCreate, onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const [values, setValues] = useState(originData);
  const contentRef = useRef();

  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = () => {
    if (values.content.trim().length < 1) {
      handleChange('content', '');
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 저장하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        onCreate(values);
      } else {
        onUpdate(values);
      }
      navigate('/', { replace: true });
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDelete(originData.docId);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.diaryEditor}>
      <Header
        headText={title}
        leftChild={<Button text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <Button
              text={'삭제하기'}
              type={'negative'}
              onClick={handleDelete}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className={styles.inputBox}>
            <input
              type="date"
              className={styles.date}
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className={cn(styles.inputBox, styles.emotionWrapper)}>
            {emotionList.map((emotion) => {
              return (
                <EmotionItem
                  key={emotion.emotion_id}
                  {...emotion}
                  // emotion 안에 있는 키값들을 props로 전달
                  // EmotionItem에서 props를 사용할 때는 객체 구조 분해로 사용한다.
                  // => 객체 안에 있는 키값들을 한 번에 전달한다.
                  name="emotion"
                  onChange={handleChange}
                  isSelected={emotion.emotion_id === values.emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className={cn(styles.inputBox, styles.textWrapper)}>
            <textarea
              placeholder="오늘은 어땠나요"
              name="content"
              value={values.content}
              onChange={handleInputChange}
              ref={contentRef}
            />
          </div>
        </section>
        <section>
          <div className={styles.controlBox}>
            <Button text={'취소하기'} onClick={() => navigate(-1)} />
            <Button
              text={isEdit ? '수정완료' : '작성완료'}
              type={'positive'}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
