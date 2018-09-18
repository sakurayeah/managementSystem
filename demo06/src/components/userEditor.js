import React from 'react';
import { withRouter } from 'react-router-dom' ;
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import request from '../common/request';

if (process.env.NODE_ENV === 'mock') {
  require('../../mock/mock.js');
}

class UserEditor extends React.Component {
  componentDidMount () {
    const { editTarget, form } = this.props;
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
    e.preventDefault();
    const { form, editTarget } = this.props;
    form.validateFields((errors, values) => {
      const self = this;
      if (errors) {
        // 报错时的处理
      } else {
        let url = 'userAdd.json';
        let params = values;
        let desc = '添加用户';

        if (editTarget) {
          url = 'userEdit.json';
          params.id = editTarget.id;
          desc = '修改用户信息';
        }

        request({
          url,
          data: params,
          type: "POST",
          dataType: 'json',
          success:(data) => {
            if (data.id) {
              console.log(`${desc}成功`, data);
              self.props.history.push('/user/list');
            } else {
              console.log(`${desc}失败`, data)
            }
          },
          error: (data) => {
            console.log(`${desc}失败`, data)
          }
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

export default withRouter(Form.create()(UserEditor));