import React from 'react';
import { Alert } from 'antd';

import styles from './App.scss';
import Header from '../Header';
import UserForm from '../UserForm';
import Timeline from '../Timeline/Timeline';

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
  constructor(props) {
    super(props);
  }

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
        {displayLoader && (<h1>Signing in...</h1>) }
        {displayLoggedInContent && (LoggedInBlock())}
        {!loggedIn && <UserForm/>}
      </div>
    );
  }
}

export default App;