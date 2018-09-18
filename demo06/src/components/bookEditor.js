import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, AutoComplete } from 'antd';
import request from '../common/request';


function renderOption(item) {
  return (
    <AutoComplete.Option key={item.value} value={item.value + ''}>
      {item.text}
    </AutoComplete.Option>
  );
}

class BookEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recommendUsers: []
    }
    this.timer = 0;
  }
  componentDidMount () {
    const { editTarget, form: { setFieldsValue } } = this.props;
    if (editTarget) {
      const data = {
        ...editTarget
      }
      if (data.id) {
        delete(data.id)
      }
      // input 的值为字符串，否则报错: Failed prop type: Invalid prop `inputValue` of type `number` supplied to `SelectTrigger`, expected `string`
      if (data.ownerId) {
        data.ownerId = `${data.ownerId}`
      }
      // 如果直接放入 editTarget， 报错： You cannot set field before registering it.
      // 报错原因，editTarget 的 id, 没有经过 getFieldDecorator 处理过
      setFieldsValue(data);
    }
  }
  submitBtn(e) {
    e.preventDefault();
    const self = this;

    const { form: { validateFields }, editTarget } = this.props;

    validateFields((errors, values) => {
      if (errors) {

      } else {
        let url = 'bookAdd.json';
        let desc = '添加图书';

        if (editTarget) {
          url = 'bookEdit.json';
          values.id = editTarget.id;
          desc = '修改图书信息';
        }
        request({
          url,
          data: values,
          type: "POST",
          dataType: 'json',
          success:(data) => {
            if (data.id) {
              console.log(`${desc}成功`, data);
              self.props.history.push('/book/list');
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
  getRecommendUsers(value) {
    request({
      url: 'suggest.json',
      type: "POST",
      data: { val: value },
      dataType: 'json',
      success: (res = {}) => {
        const { recommend = [] } = res;
        console.log(recommend,111111)
        // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
        if (recommend.length === 1 && recommend[0].value === Number(value)) {
          return;
        }
        this.setState({
          recommendUsers: recommend
        });
      }
    })
  }
  handleSearch (value) {
    this.setState({recommendUsers: []});

    // 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (value) {
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
        // 真正的请求方法
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }
  onSelect(value) {
    // const { getFieldsValue, setFieldsValue } = this.props.form;
    // setFieldsValue(getFieldsValue())
    // {name: "白雪公主", price: 9990, ownerId: 10000}
    console.log('onSelect', value);
  }
  keyDownBtn(e) {
    if(e.keyCode==13){ // enter 键
      e.preventDefault();
    }
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { recommendUsers = [] } = this.state;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };
    return (
      <div style={{width: '400px'}}>
        <Form onSubmit={(e) => this.submitBtn(e)} onKeyDown={(e) => this.keyDownBtn(e)}>
          <Form.Item label="书名" {...formItemLayout}>
            {
              getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名'
                  }
                ]
              })(
                <Input type="text" />
              )
            }
          </Form.Item>
          <Form.Item label="价格" {...formItemLayout}>
            {
              getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: '请输入价格',
                  },
                  {
                    pattern: /^[1-9]+\d*\.*/,
                    message: '请输入大于0的数字'
                  }
                ]
              })(
                <Input type="number" />
              )
            }
          </Form.Item>
          <Form.Item label="所有者" {...formItemLayout}>
            {
              getFieldDecorator('ownerId', {
                rules: [
                  {
                    required: true,
                    message: '请输入id'
                  },
                  {
                    pattern: /^\d*$/,
                    message: '请输入正确的ID'
                  }
                ]
              })(
                <AutoComplete
                  dataSource={recommendUsers}
                  onSelect={(value) => this.onSelect(value)}
                  onSearch={(value) => this.handleSearch(value)}
                  optionLabelProp="value"
                />
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

export default withRouter(Form.create()(BookEditor));