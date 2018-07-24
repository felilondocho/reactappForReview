import React from 'react';
import { Button } from 'antd';

import styles from './Header.scss';

const Header = ({ logOut }) => (
  <div className={styles.header}>
    <h1 className={styles.appName}>Myapp</h1>
    <Button type='primary' onClick={logOut}>Log out</Button>
  </div>
);

export default Header;