import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardSkeleton.module.scss';

function CardSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Skeleton height={350} />
      </div>
      <div className={styles.card}>
        <Skeleton height={350} />
      </div>
      <div className={styles.card}>
        <Skeleton height={350} />
      </div>
      <div className={styles.card}>
        <Skeleton height={350} />
      </div>
    </div>
  );
}

export default CardSkeleton;
