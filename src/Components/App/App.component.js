import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import styles from './App.scss';
import Header from '../Header';
import UserForm from '../UserForm';
import Timeline from '../Timeline';

const LoggedInBlock = () => (
  <div className={styles.contentWrapper}>
    <Header />
    <Timeline />
  </div>
);

const logInErrorBlock = logInError => (
  <Alert
    className={styles.loginError}
    message={logInError}
    type="error"
  />
);

class App extends React.Component {
  componentDidMount() {
    const { checkToken } = this.props;
    checkToken();
  }

  render() {
    const { loggedIn, logInError, logInLoading } = this.props;
    const displayLoader = !logInError && logInLoading;
    const displayLoggedInContent = !logInError && !logInLoading && loggedIn;
    return (
      <div className={styles.mainApp}>
        {logInError && (logInErrorBlock(logInError)) }
        {displayLoader && (
          <h1>
            Signing in...
          </h1>
        )}
        {displayLoggedInContent && (LoggedInBlock())}
        {!loggedIn && <UserForm />}
      </div>
    );
  }
}

App.propTypes = {
  checkToken: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logInError: PropTypes.string.isRequired,
  logInLoading: PropTypes.bool.isRequired,
};

export default App;
