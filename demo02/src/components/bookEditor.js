import React from 'react';
import {withRouter} from 'react-router-dom' ;
import $ from 'jquery';
import formProvider from './formProvider';
import FormItem from './formItem';
import HomeLayout from './homeLayout';
import './userEditor.less';

class BookEditor extends React.Component {
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

    $.ajax({
      url,
      data: params,
      type: "POST",
      dataType: 'json',
      success:(data) => {
        if (data.success && data.id) {
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
  render() {
    const {formData: {name, price, ownerId}, onFormChange} = this.props;
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
          <input value={ownerId.val} type="number" onChange={(e) => onFormChange('ownerId', e.target.value)}/>
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