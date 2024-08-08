import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardItem.module.scss';

function CardItem({ product }) {
  const { title, image, price } = product;

  return (
    <li className={styles.item}>
      <Link>
        <img className={styles.thumb} src={image} alt="" />
      </Link>
      <h5>{title.length > 15 ? `${title.slice(0, 15)}...` : title}</h5>
      <div className={styles.info}>
        <button>장바구니에 담기</button>
        <p>$ {price}</p>
      </div>
    </li>
  );
}

export default CardItem;
