import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import styles from './Header.scss';

const Header = ({ logOut }) => (
  <div className={styles.header}>
    <h1 className={styles.appName}>
      Myapp
    </h1>
    <Button type="primary" onClick={logOut}>
      Log out
    </Button>
  </div>
);

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default Header;
