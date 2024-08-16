import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteCartItem,
  deleteFromCart,
} from '../../../../../../store/cart/cartSlice';
import styles from './NavCartItem.module.scss';

function NavCartItem({ product }) {
  const { id, image, category, title, price, quantity, total, docId } = product;
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const deleteProduct = () => {
    if (isAuthenticated) {
      dispatch(
        deleteCartItem({
          collectionName: `/users/${uid}/cart/${id}`,
          productId: id,
        })
      );
    } else {
      dispatch(deleteFromCart(id));
    }
  };

  return (
    <div className={styles.item}>
      <Link to={`/product/${docId}`}>
        <img src={image} alt="" />
      </Link>
      <div className={styles.desc}>
        <h3>{category}</h3>
        <h2>{title.length > 25 ? `${title.slice(0, 25)}...` : title}</h2>
        <span>
          $ {price.toFixed(2)} X {quantity} = $ {total.toFixed(2)}
        </span>
      </div>
      <button className={styles.delete} onClick={deleteProduct}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default NavCartItem;
