import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  decrementProduct,
  incrementProduct,
} from '../../../../store/cart/cartSlice';
import styles from './CartItem.module.scss';

function CartItem({ product }) {
  const { id, image, category, title, price, quantity, total } = product;
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch(incrementProduct(id));
  };
  const decrementCount = () => {
    dispatch(decrementProduct(id));
  };

  return (
    <div className={styles.item}>
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div className={styles.desc}>
        <h3>{category}</h3>
        <h2>{title.length > 25 ? `${title.slice(0, 25)}...` : title}</h2>
        <span>
          $ {price.toFixed(2)} X {quantity} = $ {total.toFixed(2)}
        </span>
      </div>
      <div className={styles.count}>
        <div>
          <button disabled={quantity === 1} onClick={decrementCount}>
            -
          </button>
          <span>{quantity}</span>
          <button disabled={quantity === 10} onClick={incrementCount}>
            +
          </button>
        </div>
      </div>
      <button className={styles.delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;
