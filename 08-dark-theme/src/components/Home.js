import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import styles from '../css/Home.module.css';
import Nav from './Nav';
import ThemeToggleButton from './ThemeToggleButton';

function Home() {
  const [themeMode, toggleTheme] = useTheme();

  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <ThemeToggleButton mode={themeMode} toggleTheme={toggleTheme} />
    </>
  );
}

export default Home;
