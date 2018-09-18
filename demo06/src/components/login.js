import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import request from '../common/request';
import './login.less';

class Login extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    const self = this;
    this.props.form.validateFields((errors,values) => {
      if (errors) {
        // 如果有报错
      } else {
        console.log()
        request({
          url: 'login.json',
          data: values,
          type: "POST",
          dataType: 'json',
          success: (res = {}) => {
            message.success('登录成功',1 , () => {
              self.props.history.push('/')
            });
          },
          error: () => {
            message.error('登录失败，账号或密码错误');
          }
        })
      }
    })
  }

  render () {
    const { form: {getFieldDecorator} } = this.props;
    return (
      <div className="login-wrap">
        <div className="login-inner">
          <header>ReactManager</header>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="form">
            <Form.Item>
              {
                getFieldDecorator('account', {
                  rules:[{
                    required: true,
                    message: '请输入账号'
                  }]
                })(
                  <Input type="text" addonBefore={<Icon type="user"/>} />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules:[{
                    required: true,
                    message: '请输入密码'
                  }]
                })(
                  <Input type="password" addonBefore={<Icon type="lock"/>} />
                )
              }
            </Form.Item>
            <Button className="btn" type="primary" htmlType="submit">Sign In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);