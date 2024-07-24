import cn from 'classnames';
import React from 'react';
import styles from '../css/Answer.module.css';
import Card from './Card';
import DateText from './DateText';
import Writer from './Writer';

function Answer({ className, answer }) {
  const { content, createdAt, writer } = answer;

  return (
    <Card className={cn(styles.answer, className)}>
      <p>{content}</p>
      <div className={styles.answerInfo}>
        <div className={styles.date}>
          <DateText value={createdAt} />
        </div>
        <Writer writer={writer} />
      </div>
    </Card>
  );
}

export default Answer;
