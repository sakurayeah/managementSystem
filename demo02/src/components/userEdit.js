import React from 'react';
import $ from 'jquery';
import HomeLayout from './homeLayout';
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

    $.ajax({
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
    return (
      <HomeLayout title="编辑用户">
        {user && <UserEditor editTarget={user}/>}
      </HomeLayout>
    );
  }
}

export default UserEdit;