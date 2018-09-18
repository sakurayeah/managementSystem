import React from 'react';
import {withRouter} from 'react-router-dom' ;
import request from '../common/request';
import formProvider from './formProvider';
import FormItem from './formItem';
import HomeLayout from './homeLayout';
import AutoComplete from './autoComplete';
import './userEditor.less';

class BookEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recommendUsers: []
    }
    this.timer = 0;
  }
  componentDidMount () {
    const { editTarget, setFormValues } = this.props;
    if (editTarget) {
      setFormValues(editTarget);
    }
  }
  submitBtn() {
    const self = this;
    const {formData: {name, price, ownerId}, formValid, editTarget} = this.props;
    if (formValid) {
      alert('请填写正确的信息后重试');
      console.log('添加图书 填写信息有误', {name, price, ownerId})
      return;
    }

    let url = 'bookAdd.json';
    let params = {
      name: name.val,
      price: price.val,
      ownerId: ownerId.val
    };
    let desc = '添加图书';

    if (editTarget) {
      url = 'bookEdit.json';
      params.id = editTarget.id;
      desc = '修改图书信息';
    }

    request({
      url,
      data: params,
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
  getRecommendUsers(value) {
    request({
      url: 'suggest.json',
      type: "POST",
      data: { val: value },
      dataType: 'json',
      success: (res = {}) => {
        const { recommend = [] } = res;
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
  handleOwnerIdChange (value) {
    this.props.onFormChange('ownerId', value);
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
  render() {
    const {formData: {name, price, ownerId}, onFormChange} = this.props;
    const { recommendUsers } = this.state;
    return (
      <div className="user-editor-wrap">
        <FormItem label="书名：" error={name.error} className="form-item-wrap">
          <label></label>
          <input value={name.val || ''} type="text" onChange={(e) => onFormChange('name', e.target.value)}/>
        </FormItem>
        <FormItem label="价格：" error={price.error} className="form-item-wrap">
          <input value={price.val} type="number" onChange={(e) => onFormChange('price', e.target.value)}/>
        </FormItem>
        <FormItem label="所有者：" error={ownerId.error} className="form-item-wrap">
          <AutoComplete 
            value={ownerId.val ? ownerId.val : ''}
            options={recommendUsers}
            onValueChange={val => this.handleOwnerIdChange(val)}
            iptType="number"
          />
        </FormItem>
        <button onClick={() => this.submitBtn()}>提交</button>
      </div>
    )
  }
}

const types = {
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入用户名'
      }
    ]
  },
  price: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return Number(value) > 0;
        },
        error: '请输入大于0的数字'
      }
    ]
  },
  ownerId: {
    defaultValue: '',
    rules: [{
      pattern: function (value) {
        return !!value;
      },
      error: '请输入id'
    }]
  }
}

export default withRouter(formProvider(types)(BookEditor));