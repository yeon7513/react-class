import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from '../../components/cart-empty/CartEmpty';
import CartList from './cart-list/CartList';
import styles from './CartPage.module.scss';
import Checkout from './check-out/Checkout';

function CartPage() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className="page">
      {products.length === 0 ? (
        <CartEmpty title={'장바구니'} />
      ) : (
        <div className="container">
          <h1 className={styles.cartTitle}>장바구니</h1>
          <CartList />
          <Checkout />
        </div>
      )}
    </div>
  );
}

export default CartPage;
