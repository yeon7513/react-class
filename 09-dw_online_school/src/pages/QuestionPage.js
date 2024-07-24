import DOMPurify from 'dompurify';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Answer from '../components/Answer';
import Container from '../components/Container';
import DateText from '../components/DateText';
import Lined from '../components/Lined';
import Warn from '../components/Warn';
import Writer from '../components/Writer';
import styles from '../css/QuestionPage.module.css';

function QuestionPage(props) {
  const { state } = useLocation();
  const { content, createdAt, title, writer, answers } = state.question;

  // 악성코드가 들어있는(불확실한? 데이터나 이벤트가 있을 경우) 데이터를
  // 미연에 방지해주는 함수
  const sanitizedData = (data) => {
    return { __html: DOMPurify.sanitize(data) };
  };

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>
                  {title}
                  <span className={styles.count}>[{answers.length}]</span>
                </div>
                <div className={styles.date}>
                  <DateText value={createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={writer} />
            </div>
            <p
              className={styles.content}
              // dangerouslySetInnerHTML
              // => DOM에서 innerHTML을 사용하기 위한 React의 대체 방법
              // ** 사용방법
              // dangerouslySetInnerHTML={{ __html: content }}
              // !!!!!!!! 주의 !!!!!!!!!!!
              // 단, 악성코드나 무한루프 등 악의적인 코드에 취약하다.
              // DOMPurify로 데이터나 코드를 검사하는? 처리를 해줘야함.
              // => html태그나 핸들러 등을 없애줌
              dangerouslySetInnerHTML={sanitizedData(content)}
            />
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>
          <Lined>{answers.length}개 답변</Lined>
        </h2>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <Answer
              className={styles.answerItem}
              key={answer.id}
              answer={answer}
            />
          ))
        ) : (
          <Warn
            title="답변을 기다리고 있어요."
            description="이 질문의 첫 번째 답변을 달아주시겠어요?"
          />
        )}
      </Container>
    </>
  );
}

export default QuestionPage;
