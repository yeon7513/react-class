import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from '../css/App.module.css';

function App() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Hello, Styled Components!!</Link>
        </h1>
      </header>
      <div className={styles.container}>
        <nav>
          <ul>
            <li>
              <Link to="01">01. Styled Components Basic</Link>
            </li>
            <li>
              <Link to="02">02. Nesting 문법</Link>
            </li>
            <li>
              <Link to="03">03. Practice #1</Link>
            </li>
            <li>
              <Link to="04">04. Dynamic Styling</Link>
            </li>
            <li>
              <Link to="05">05. Practice #2</Link>
            </li>
            <li>
              <Link to="06">06. 스타일 재사용: 상속</Link>
            </li>
            <li>
              <Link to="07">07. 스타일 재사용: CSS 함수</Link>
            </li>
            <li>
              <Link to="08">08. Practice #3</Link>
            </li>
            <li>
              <Link to="09">09. 로그인 화면 구현</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
