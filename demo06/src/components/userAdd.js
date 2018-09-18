import React from 'react';
import UserEditor from './userEditor';
import './userAdd.less';

if (process.env.NODE_ENV === 'mock') {
  require('../../mock/mock.js');
}

class UserAdd extends React.Component {
  render() {
    return (
      <div className="user-add-wrap">
        <UserEditor />
      </div>
    )
  }
}

export default UserAdd;