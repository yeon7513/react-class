import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartItem, addToCart } from '../../../../store/cart/cartSlice';
import styles from './CardItem.module.scss';

function CardItem({ product }) {
  const { title, image, price, id } = product;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cartSlice);
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);
  const productMatching = products.some((product) => product.id === id);

  const addItemToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addCartItem({
          collectionName: ['users', uid, 'cart'],
          product: product,
        })
      );
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <li className={styles.item}>
      <Link to={`product/${id}`}>
        <img className={styles.thumb} src={image} alt="" />
      </Link>
      <h5>{title.length > 15 ? `${title.slice(0, 15)}...` : title}</h5>
      <div className={styles.info}>
        <button disabled={productMatching} onClick={addItemToCart}>
          {productMatching ? '장바구니에 담긴 제품' : '장바구니에 담기'}
        </button>
        <p>$ {price}</p>
      </div>
    </li>
  );
}

export default CardItem;
