import React from 'react';
import { useSelector } from 'react-redux';
import styles from './CountProducts.module.scss';

function CountProducts() {
  const { products } = useSelector((state) => state.productsSlice);

  return (
    <div className={styles.count}>
      <p>
        Showing: <span>{products.length} items</span>
      </p>
    </div>
  );
}

export default CountProducts;
