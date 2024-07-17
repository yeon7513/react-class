import React, { useEffect, useState } from 'react';
import { getDatas } from '../api/firebase';
import searchImg from '../assets/search.svg';
import CourseItem from '../components/CourseItem';
import ListPage from '../components/ListPage';
import styles from '../css/CourseListPage.module.css';

let listItems;

function CourseListPage() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState();

  const handleLoad = async () => {
    const data = await getDatas('courses');
    // 전체 데이터 변수에 저장
    listItems = data;
    setItems(data);
  };

  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는 listItems를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 요소로 가지는 배열을 만든다.

    // const searchItems = listItems.filter((item) =>
    //   item.title.includes(keyword)
    // );

    // 만든 배열을 items state에 set 해준다.

    // setItems(searchItems);

    // 짧게 쓰기~!
    setItems(listItems.filter(({ title }) => title.includes(keyword)));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant="catalog">
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="검색으로 코스 찾기"
          autoComplete="off"
          onChange={handleKeywordChange}
        />
        <button>
          <img src={searchImg} alt="" />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem key={course.docId} courses={course} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
