import React from 'react';
import {withRouter} from 'react-router-dom' ;
import $ from 'jquery';
import formProvider from './formProvider';
import FormItem from './formItem';
import HomeLayout from './homeLayout';
import './userEditor.less';

if (process.env.NODE_ENV === 'mock') {
  require('../../mock/mock.js');
}

class UserEditor extends React.Component {
  componentDidMount () {
    const { editTarget, setFormValues } = this.props;
    if (editTarget) {
      setFormValues(editTarget);
      console.log(1111111)
    }
    console.log('editTarget', editTarget)
  }
  submitBtn() {
    const self = this;
    const {formData: {name, age, gender}, formValid, editTarget} = this.props;
    if (formValid) {
      alert('请填写正确的信息后重试');
      console.log('添加用户 填写信息有误', {name, age, gender})
      return;
    }

    let url = 'userAdd.json';
    let params = {
      name: name.val,
      age: age.val,
      gender: gender.val
    };
    let desc = '添加用户';

    if (editTarget) {
      url = 'userEdit.json';
      params.id = editTarget.id;
      desc = '修改用户信息';
    }

    $.ajax({
      url,
      data: params,
      type: "POST",
      dataType: 'json',
      success:(data) => {
        if (data.success && data.id) {
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
  render() {
    const {formData: {name, age, gender}, onFormChange} = this.props;
    console.log(this.props,8888888)
    return (
      <div className="user-editor-wrap">
        <FormItem label="用户名：" error={name.error} className="form-item-wrap">
          <label></label>
          <input value={name.val || ''} type="text" onChange={(e) => onFormChange('name', e.target.value)}/>
        </FormItem>
        <FormItem label="年龄：" error={age.error} className="form-item-wrap">
          <input value={age.val} type="number" onChange={(e) => onFormChange('age', e.target.value)}/>
        </FormItem>
        <FormItem label="性别：" error={gender.error} className="form-item-wrap">
          <select value={gender.val} onChange={(e) => onFormChange('gender', e.target.value)}>
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
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
      },
      {
        pattern: /^.{1,4}$/,
        error: '用户名最多4个字符'
      }
    ]
  },
  age: {
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
  gender: {
    defaultValue: '',
    rules: [{
      pattern: function (value) {
        return !!value;
      },
      error: '请选择性别'
    }]
  }
}

export default withRouter(formProvider(types)(UserEditor));