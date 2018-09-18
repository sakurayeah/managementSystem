import React from 'react';
import { withRouter } from 'react-router-dom' ;
import { message, Table, Button, Popconfirm } from 'antd';
import request from '../common/request';
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
    request({
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

    request({
      url: 'userDel.json',
      type: 'POST',
      data: {
        id: user.id
      },
      dataType: 'json',
      success: (res = {}) => {
        message.success('删除用户成功');
        const { data } = res;
        self.setState({
          userList: data
        });
      }
    })
  }

  editClick(user) {
    this.props.history.push(`/user/edit/${user.id}`);
  }

  render () {
    const { userList = [] } = this.state;
    const columns = [
      {
        title: '姓名',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
      },
      {
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <Button.Group>
            <Button onClick={() => this.editClick(record)}>编辑</Button>
            <Popconfirm title={`确定要删除用户 ${record.name} 吗？`} onConfirm={() => this.delClick(record)}>
              <Button>删除</Button>
            </Popconfirm>
          </Button.Group>
        )
      }
    ]
    return (
      <Table columns={columns} dataSource={userList} rowKey={record => record.id}/>
    )
  }
}

export default withRouter(UserList);