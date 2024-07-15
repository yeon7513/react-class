import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import styles from '../css/Nav.module.css';
import Container from './Container';

function Nav({ className }) {
  const [themeMode] = useTheme();
  const menuClass = `${styles.menu} ${themeMode === 'dark' ? styles.dark : ''}`;

  return (
    <div className={cn(styles.nav, className)}>
      <Container className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">
            <span>DW</span>OS
          </Link>
        </h1>
        <ul className={menuClass}>
          <li>
            <Link to="about">ABOUT</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
