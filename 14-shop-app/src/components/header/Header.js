import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Nav from './nav/Nav';

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.logo}>
            <Link to="/">Shop</Link>
          </h1>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
