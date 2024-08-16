import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartEmpty from '../../../components/cart-empty/CartEmpty';
import { fetchOrder } from '../../../store/order/orderSlice';
import { getISODate } from '../../../utils/getFormattedDate';
import OrderItem from './order-item/OrderItem';
import styles from './OrdersList.module.scss';

function OrdersList() {
  const { order } = useSelector((state) => state.orderSlice);
  const { uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchOrder({
        collectionName: ['users', uid, 'orders'],
        queryOptions: {},
      })
    );
  }, [uid]);

  if (order.length === 0) {
    return <CartEmpty title="주문 내역" />;
  }

  return (
    <div className={styles.orders}>
      {order.map((order, idx) => (
        <div key={idx}>
          <div className={styles.order_header}>
            <h3>주문 번호_{order.createdAt}</h3>
            <h3>
              주문 날짜_{getISODate(order.createdAt).yyyyMMdd}{' '}
              {getISODate(order.createdAt).hhmmss}
            </h3>
            <p>합계: $ {order.totalPrice.toFixed(2)}</p>
          </div>
          <ul className={styles.orders_list}>
            {order.products.map((product) => (
              <OrderItem key={product.id} {...product} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
