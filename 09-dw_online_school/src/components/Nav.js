import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Nav.module.css';
import Container from './Container';
import UserMenu from './UserMenu';

function Nav({ className }) {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <span>DW</span>
            OS
          </div>
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to="/courses">카탈로그</Link>
          </li>
          <li>
            <Link to="/questions">커뮤니티</Link>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
