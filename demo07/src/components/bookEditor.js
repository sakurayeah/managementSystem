import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Button, Input, AutoComplete } from 'antd';
import Actions from '../actions/index';

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
    this.timer = 0;
  }
  componentDidMount () {
    const { 
      book: { editTarget = null }, 
      form: { setFieldsValue }
    } = this.props;

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
    const {
      form: { validateFields },
      book: { editTarget = null }, 
    } = this.props;

    validateFields((errors, values) => {
      if (!errors) {
        this.props.action.bookAddOrEdit(values, editTarget, () => {
          this.props.history.push('/book/list');
        })
      }
    })
  }
  getRecommendUsers(value) {
    this.props.action.getRecommend({ val: value })
  }
  handleSearch (value) {
    this.props.action.changeState({recommendUsers: []}, 'BOOK')

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
    console.log('onSelect', value);
  }
  keyDownBtn(e) {
    if(e.keyCode==13){ // enter 键
      e.preventDefault();
    }
  }
  render() {
    const { 
      form: { getFieldDecorator }, 
      book: { recommendUsers = [] }
    } = this.props;

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


function mapStateToProps(state) {
  return {
    book: state.book,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(BookEditor)));