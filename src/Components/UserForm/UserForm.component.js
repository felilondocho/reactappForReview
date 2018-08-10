import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import styles from './UserForm.scss';

const FormItem = Form.Item;

class UserForm extends React.Component {
  handleSubmit = (e) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { logIn } = this.props;
        const { username, password } = values;
        logIn({ username, password });
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldError, isFieldTouched, getFieldDecorator } = form;
    const userNameError = isFieldTouched('username') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className={styles.formWrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <FormItem validateStatus={userNameError ? 'error' : ''}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input placeholder="Username" />,
            )}
          </FormItem>
          <FormItem validateStatus={passwordError ? 'error' : ''}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input type="password" placeholder="Password" />,
            )}
          </FormItem>
          <Button className={styles.loginButton} type="primary" htmlType="submit">
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}

UserForm.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default Form.create()(UserForm);
