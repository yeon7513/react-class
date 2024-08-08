import React from 'react';
import logoText from '../assets/logo-text.png';
import Container from '../components/Container';
import LocaleSelect from '../components/LocaleSelect';
import styles from '../css/Layout.module.css';
import useTranslate from '../hooks/useTranslate';

function Footer() {
  const t = useTranslate();

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.content}>
          <img src={logoText} alt="" />
          <LocaleSelect />
        </div>
        <div>
          {t('terms of service')} | {t('privacy policy')}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
