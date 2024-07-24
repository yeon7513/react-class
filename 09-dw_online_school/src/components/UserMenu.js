import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import personImg from '../assets/person.png';
import styles from '../css/UserMenu.module.css';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const isLogined = JSON.parse(localStorage.getItem('member'));

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.addEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleClick}>
        <img src={personImg} alt="" />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <li>
            <Link to="/wishlist">위시리스트</Link>
          </li>
          <li className={styles.disabled}>회원가입</li>
          {!isLogined ? (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          ) : (
            <li>
              <Link to="/logout">로그아웃</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
