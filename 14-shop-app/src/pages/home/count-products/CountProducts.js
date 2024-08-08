import React from 'react';
import styles from './CountProducts.module.scss';

function CountProducts({ count }) {
  return (
    <div className={styles.count}>
      <p>
        Showing: <span>{count} items</span>
      </p>
    </div>
  );
}

export default CountProducts;
