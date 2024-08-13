import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTotalPrice } from '../../../store/cart/cartSlice';
import styles from './Checkout.module.scss';

function Checkout() {
  const { products, totalPrice } = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [products, dispatch]);

  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span>합계: $ {totalPrice.toFixed(2)}</span>
        </p>
        {/* <button className={styles.btn}>계산하기</button> */}
        <button className={styles.btn} onClick={() => navigate('/login')}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Checkout;
