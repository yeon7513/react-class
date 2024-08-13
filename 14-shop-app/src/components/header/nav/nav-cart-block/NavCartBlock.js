import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice } from '../../../../store/cart/cartSlice';
import styles from './NavCartBlock.module.scss';
import NavCartList from './nav-cart-list/NavCartList';

function NavCartBlock() {
  const { products, totalPrice } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [products, dispatch]);

  return (
    <div className={styles.block}>
      <NavCartList />
      <div className={styles.price}>
        <p>합계 : $ {totalPrice.toFixed(2)}</p>
      </div>
      <div className={styles.link}>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </div>
  );
}

export default NavCartBlock;
