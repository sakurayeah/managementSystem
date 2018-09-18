import React from 'react';
import HomeLayout from './homeLayout';
import UserEditor from './userEditor';
import './userAdd.less';

if (process.env.NODE_ENV === 'mock') {
  require('../../mock/mock.js');
}

class UserAdd extends React.Component {
  render() {
    return (
      <HomeLayout className="user-add-wrap" title="添加用户">
        <UserEditor />
      </HomeLayout>
    )
  }
}

export default UserAdd;