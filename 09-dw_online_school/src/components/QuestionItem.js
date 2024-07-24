import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/QuestionItem.module.css';
import Avatar from './Avatar';
import Card from './Card';
import DateText from './DateText';

function QuestionItem({ question }) {
  const { title, answers, createdAt, writer, docId } = question;

  return (
    <Card className={styles.questionItem}>
      <div className={styles.info}>
        <p className={styles.title}>
          <Link to={`/questions/${docId}`} state={{ question }}>
            {title}
          </Link>
          <span className={styles.count}>[{answers.length}]</span>
        </p>
        <p className={styles.date}>
          <DateText value={createdAt} />
        </p>
      </div>
      <div className={styles.writer}>
        <Avatar photo={writer.profile.photo} name={writer.name} />
      </div>
    </Card>
  );
}

export default QuestionItem;
