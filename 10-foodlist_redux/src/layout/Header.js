import React from 'react';
import logo from '../assets/logo.png';
import Container from '../components/Container';
import styles from '../css/Layout.module.css';

function Header(props) {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <img src={logo} alt="" />
      </Container>
    </header>
  );
}

export default Header;
