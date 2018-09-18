import React from 'react';
import request from '../common/request';
import UserEditor from './userEditor';

class UserEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount () {
    const self = this;
    const userId = this.props.match.params.id;

    request({
      url: 'userList.json',
      type: 'GET',
      dataType: 'json',
      data: {
        id: userId
      },
      success: (res = {}) => {
        self.setState({
          user: res.info
        })
      }
    })
  }
  render () {
    const { user } = this.state;
    return user ? <UserEditor editTarget={user}/> : <span>加载中...</span>;
  }
}

export default UserEdit;