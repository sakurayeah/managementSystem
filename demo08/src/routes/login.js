import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Icon, Input, Button } from 'antd';
import './login.less';

class Login extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log('登录成功')
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

export default connect()(Form.create()(Login));
