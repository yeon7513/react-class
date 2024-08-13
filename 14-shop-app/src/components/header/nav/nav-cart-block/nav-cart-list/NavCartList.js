import React from 'react';
import { useSelector } from 'react-redux';
import styles from './NavCartList.module.scss';
import NavCartItem from './nav-cart-item/NavCartItem';

function NavCartList() {
  const { products } = useSelector((state) => state.cartSlice);

  return (
    <div className={styles.list}>
      {products.length > 0 ? (
        products.map((product) => (
          <NavCartItem key={product.id} product={product} />
        ))
      ) : (
        <span className={styles.noCart}>장바구니에 담긴 상품이 없습니다.</span>
      )}
    </div>
  );
}

export default NavCartList;
