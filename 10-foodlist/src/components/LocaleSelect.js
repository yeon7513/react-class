import React, { useState } from 'react';
import { useLocale, useSetLocale } from '../contexts/LocaleContext';
import styles from '../css/LocaleSelect.module.css';
import useTranslate from '../hooks/useTranslate';

function LocaleSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useTranslate();

  const handleChange = (lang) => {
    setLocale(lang);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.localeSelect}>
      <button className={styles.openBtn} onClick={handleClick}>
        {locale === 'ko' ? '한국어' : 'English'}
      </button>
      {isOpen && (
        <ul className={styles.selectLangs}>
          <li onClick={() => handleChange('ko')}>{t('langs-ko')}</li>
          <li onClick={() => handleChange('en')}>{t('langs-en')}</li>
        </ul>
      )}
    </div>
  );
}

export default LocaleSelect;
