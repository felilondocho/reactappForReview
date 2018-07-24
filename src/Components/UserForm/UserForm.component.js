import React from 'react';
import { Form, Input } from 'antd';
import { Button } from 'antd';

import styles from './UserForm.scss';

const FormItem = Form.Item;

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    const { logIn } = this.props;
    e.preventDefault();
    logIn({ username: this.state.username, password: this.state.password });
  }

  render() {
    return (
      <div className={styles.formWrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <FormItem>
            <Input
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              required
            />
          </FormItem>
          <FormItem>
            <Input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
          </FormItem>
          <Button className={styles.loginButton} type="primary" htmlType="submit" >
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}

export default UserForm;