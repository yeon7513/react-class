import React from 'react';
import CartList from './cart-list/CartList';
import styles from './CartPage.module.scss';
import Checkout from './check-out/Checkout';

function CartPage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className={styles.cartTitle}>장바구니</h1>
        <CartList />
        <Checkout />
      </div>
    </div>
  );
}

export default CartPage;
