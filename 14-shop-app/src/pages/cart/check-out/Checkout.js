import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice, postOrder } from '../../../store/cart/cartSlice';
import styles from './Checkout.module.scss';

function Checkout() {
  const { products, totalPrice } = useSelector((state) => state.cartSlice);
  const { isAuthenticated, uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  // const sendOrder = () => {
  //   const orderObj = {
  //     totalPrice,
  //     products,
  //   };
  //   dispatch(postOrder({ uid, cart: orderObj }));
  // };

  const sendOrder = () => {
    const orderObj = {
      totalPrice,
      products,
    };

    dispatch(postOrder({ uid, cart: orderObj }));
  };

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [products, dispatch]);

  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span>합계: $ {totalPrice.toFixed(2)}</span>
        </p>
        {isAuthenticated ? (
          <button className={styles.checkout_button} onClick={sendOrder}>
            계산하기
          </button>
        ) : (
          <Link className={styles.checkout_button} to={'/login'}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}

export default Checkout;
