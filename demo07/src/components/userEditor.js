import React from 'react';
import { withRouter } from 'react-router-dom' ;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import Actions from '../actions/index';

class UserEditor extends React.Component {
  componentDidMount () {
    const {
      form,
      user: { editTarget = null }
    } = this.props;
    const data = {
      ...editTarget
    }
    if (data.id) {
      delete(data.id)
    }
    if (editTarget) {
      form.setFieldsValue(data);
    }
  }
  submitBtn(e) {
    const {
      form,
      user: { editTarget = null }
    } = this.props;
    
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!errors) {
        this.props.action.userAddOrEdit(values, editTarget, () => {
          this.props.history.push('/user/list');
        })
      }
    })
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    return (
      <div style={{width: '400px'}}>
        <Form onSubmit={(e) => this.submitBtn(e)}>
          <Form.Item label="用户名" {...formItemLayout}>
            {
              getFieldDecorator('name', {
                rules:[{
                  required: true,
                  message: '请输入用户名'
                }, {
                  pattern: /^.{1,4}$/,
                  message: '用户名最多4个字符'
                }]
              })(
                <Input type="text" />
              )
            }
          </Form.Item>
          <Form.Item label="年龄" {...formItemLayout}>
            {
              getFieldDecorator('age', {
                rules:[{
                  required: true,
                  message: '请输入用户名'
                }, {
                  pattern: /^[1-9]+/,
                  message: '请输入大于0的数字'
                }]
              })(
                <Input type="text" type="number" />
              )
            }
          </Form.Item>
          <Form.Item label="性别" {...formItemLayout}>
            {
              getFieldDecorator('gender', {
                rules:[{
                  required: true,
                  message: '请选择性别'
                }]
              })(
                <Select placeholder="请选择">
                  <Select.Option value="male">男</Select.Option>
                  <Select.Option value="female">女</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item wrapperCol={{span: 2, offset: 11}}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserEditor)));