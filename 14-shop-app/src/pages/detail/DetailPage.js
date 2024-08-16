import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartItem, addToCart } from '../../store/cart/cartSlice';
import { fetchProduct } from '../../store/products/productSilce';
import styles from './DetailPage.module.scss';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.productSlice);
  const { products } = useSelector((state) => state.cartSlice);
  const productMatching = products.some((cartItem) => cartItem.docId === id);
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);

  const addItemToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addCartItem({
          collectionName: `/users/${uid}/cart/${id}`,
          product: product,
        })
      );
    } else {
      dispatch(addToCart(product));
    }
  };

  useEffect(() => {
    dispatch(fetchProduct({ collectionName: `/products/${id}` }));
  }, [id, dispatch]);

  return (
    <div className="page">
      {isLoading ? (
        'Loading...'
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <img src={product.image} alt="" />
          </div>
          <div className={styles.desc}>
            <h3>{product.category}</h3>
            <h1>{product.title}</h1>
            <h4>$ {product.price}</h4>
            <p>{product.description}</p>
            <div className={styles.btnWrap}>
              <button disabled={productMatching} onClick={addItemToCart}>
                {productMatching ? '장바구니에 담긴 제품' : '장바구니에 담기'}
              </button>
              <Link to="/cart">장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
