import React from 'react';
import { FiLogIn, FiLogOut, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

function Nav() {
  const isLogin = false;

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div>
            <Link>
              <FiShoppingCart />
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link>
              <FiUser />
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link>{isLogin ? <FiLogOut /> : <FiLogIn />}</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
