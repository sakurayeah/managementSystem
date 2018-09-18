import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';
import Actions from '../actions/index';
import './login.less';

class Login extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.action.getLogin(values, () => {
          message.success('登录成功',1 , () => this.props.history.push('/'))
        }, () => {
          message.error('登录失败，账号或密码错误');
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

function mapStateToProps(state) {
  return {
    states: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
