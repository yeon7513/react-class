import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getData } from '../api/firebase';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from '../css/CoursePage.module.css';
import { getCourseColor } from '../utils/getCourseColor';

function CoursePage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  // useLocation 으로는 간단한 정보만 불러오는 용도로 사용할 것.
  // 민감한 정보는 안됨!!

  // ** useParams
  // 현재 URL에서 경로 매개변수를 추출하는 데 사용
  // => Route에서 ':courseSlug'는 동적 경로 매개변수를 정의하여
  //    특정 코스 페이지로 이동할 수 있게 한다.
  // => 즉, 밑에 선언된 변수는 현재 URL에서 courseSlug를 추출하여
  //    하위 경로로 이동하기 위해 사용된다.
  const { courseSlug } = useParams();

  // 데이터를 새로 불러오기 위한 state
  const [course, setCourse] = useState();

  // ** ? 붙이는 이유
  // => 옵셔널 체이닝(optional chaining) 연산자
  // 옵셔널 체이닝 연산자는 객체 속성이 존재하지 않더라도 오류를 발생시키지 않고
  // undefined를 반환하게 해준다.
  // 현재 course는 비동기 통신으로 데이터가 로드되기 때문에 컴포넌트가 처음 렌더링될 때 'null'인 상태임.
  // => 즉, 객체가 존재하지 않을 가능성을 염두에 두고 코드가 안전하게 실행되도록 하기 위함이다.
  const courseColor = getCourseColor(course?.code);

  const headerStyle = {
    borderColor: courseColor,
  };

  const handleLoad = async () => {
    const resultData = await getData('courses', {
      field: 'slug',
      condition: '==',
      value: courseSlug,
    });

    setCourse(resultData);
  };

  const handleAddWishClick = () => {
    const member = JSON.parse(localStorage.getItem('member'));

    if (member) {
      // 로그인이 되어있을 때 위시리스트 페이지로 이동
      navigate('/wishlist');
    } else {
      // 로그인이 안되어있을 때 로그인 페이지로 이동
      alert('로그인을 해주세요.');
      // '코스 담기'버튼을 눌렀을 경우 로그인 페이지로 이동하는데,
      // pathname(경로)을 state로 같이 넘겨준다.
      // => 로그인 한 후, 담을 코스의 페이지로 바로 이동하기 위해서
      navigate('/login', { state: pathname });
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => (
          <Card key={topic.slug} className={styles.topic}>
            <h3 className={styles.title}>{topic.title}</h3>
            <p className={styles.summary}>{topic.summary}</p>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default CoursePage;
