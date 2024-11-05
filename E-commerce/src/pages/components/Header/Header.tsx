import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from 'components/Logo/Logo';
import Text from 'components/Text/Text';
import Cart from 'components/icons/CartIcon/Cart';
import User from 'components/icons/User/User';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} _container`}>
        <div className={styles.header__logo}>
          <Link to="/"> 
            <Logo />
          </Link>
        </div>

        <nav className={styles.header__menu}>
          <ul className={styles.menu__list}>
            <li className={`${styles.menu__item} ${styles.active}`}>
              <Text tag="p" view="p-18" weight="600">
                Product
              </Text>
            </li>
            <li className={styles.menu__item}>
              <Text tag="p" view="p-18">
                Categories
              </Text>
            </li>
            <li className={styles.menu__item}>
              <Text tag="p" view="p-18">
                About us
              </Text>
            </li>
          </ul>
        </nav>

        <div className={styles.header__icons}>
          <Cart />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
