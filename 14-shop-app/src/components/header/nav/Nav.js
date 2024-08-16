import { signOut } from 'firebase/auth';
import React from 'react';
import { FiLogIn, FiLogOut, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserAuth } from '../../../api/firebase';
import { removeUser } from '../../../store/user/userSlice';
import styles from './Nav.module.scss';
import NavCartBlock from './nav-cart-block/NavCartBlock';

function Nav() {
  const { products } = useSelector((state) => state.cartSlice);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const auth = getUserAuth();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.error('로그아웃 에러: ', error);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link to="/cart">
              <FiShoppingCart />
            </Link>
            {products.length > 0 && <b>{products.length}</b>}
            {products.length > 0 && (
              <div className={styles.hoverCart}>
                <NavCartBlock />
              </div>
            )}
          </div>
        </li>
        <li>
          <div>
            <Link to="/order">
              <FiUser />
            </Link>
          </div>
        </li>
        <li>
          {isAuthenticated ? (
            <div className={styles.signOut}>
              <FiLogOut title="로그아웃" onClick={handleSignOut} />
            </div>
          ) : (
            <div>
              <Link to={'/login'}>
                <FiLogIn title="로그인" />
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
