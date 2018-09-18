import React from 'react';
import request from '../common/request';
import HomeLayout from './homeLayout';
import FormItem from './formItem';
import formProvider from './formProvider';

class Login extends React.Component {
  handleSubmit () {
    const {formValid, formData: {account, password}} = this.props;
    if (formValid) {
      alert('请输入账号或密码');
      return;
    }
    const self = this;
    request({
      url: 'login.json',
      data: {
        account: account.val,
        password: password.val,
      },
      type: "POST",
      dataType: 'json',
      success: (res = {}) => {
        self.props.history.push('/')
      },
      error: () => {
        alert('登录失败，账号或密码错误');
      }
    })
  }

  render () {
    const {formData: {account, password}, onFormChange} = this.props;
    return (
      <HomeLayout title="请登录">
        <FormItem label="账号：" error={account.error}>
          <input type="text" value={account.val || ''} onChange={e => onFormChange('account', e.target.value)}/>
        </FormItem>
        <FormItem label="密码：" error={password.error}>
          <input type="password" value={password.val || ''} onChange={e => onFormChange('password', e.target.value)}/>
        </FormItem>
        <br/>
        <button onClick={() => this.handleSubmit()}>登录</button>
      </HomeLayout>
    );
  }
}

const types = {
  account: {
    defaultValue: '',
    rules: [
      {
        pattern (value) {
          return value.length > 0;
        },
        error: '请输入账号'
      }
    ]
  },
  password: {
    defaultValue: '',
    rules: [
      {
        pattern (value) {
          return value.length > 0;
        },
        error: '请输入密码'
      }
    ]
  }
}

export default formProvider(types)(Login);