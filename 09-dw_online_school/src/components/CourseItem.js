import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/CourseItem.module.css';
import { getCourseColor } from '../utils/getCourseColor';
import Card from './Card';
import CourseIcon from './CourseIcon';

function CourseItem({ courses }) {
  const { code, title, language, photoUrl, summary, difficulty } = courses;

  const DIFFICULTY = ['입문', '초급', '중급', '고급'];

  // 나중에 스타일이 더 추가될 수 있기 때문에
  // 변수에 넣어서 사용하는 방법을 권장한다.
  const courseColor = getCourseColor(code);
  const thumbStyle = {
    borderColor: courseColor,
  };

  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb} style={thumbStyle}>
        <CourseIcon photoUrl={photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>{title}</Link>
        </h2>
        <p className={styles.description}>{summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{language}</li>
            <li>{DIFFICULTY[difficulty]}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
