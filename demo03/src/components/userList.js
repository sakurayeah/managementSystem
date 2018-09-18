import React from 'react';
import { withRouter } from 'react-router-dom' ;
import $ from 'jquery';
import HomeLayout from './homeLayout';
import './userList.less';

class UserList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentDidMount () {
    const self = this;
    $.ajax({
      url: 'userList.json',
      type: 'GET',
      dataType: 'json',
      success: (res = {}) => {
        const { data } = res;
        self.setState({
          userList: data
        });
      }
    })
  }

  delClick(user) {
    const self = this;
    const confirmed = confirm(`确定要删除用户 ${user.name} 吗？`);

    if (confirmed) {
      $.ajax({
        url: 'userDel.json',
        type: 'POST',
        data: {
          id: user.id
        },
        dataType: 'json',
        success: (res = {}) => {
          const { data } = res;
          self.setState({
            userList: data
          });
        }
      })
    }
  }

  editClick(user) {
    this.props.history.push(`/user/edit/${user.id}`);
  }

  render () {
    const { userList = [] } = this.state;
    return (
      <HomeLayout title="用户列表" className="user-list-wrap">
        <ul>
          {
            userList.map(user => (
              <li key={user.id}>
                {user.id} , {user.name} , {user.gender} , {user.age}
                <span className="user-handle-btn" onClick={() => this.delClick(user)}>删除</span>
                <span className="user-handle-btn" onClick={() => this.editClick(user)}>编辑</span>
              </li>
            ))
          }
        </ul>
      </HomeLayout>
    )
  }
}

export default withRouter(UserList);