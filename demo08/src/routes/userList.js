import React from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router' ;
import { message, Table, Button, Popconfirm } from 'antd';

class UserList extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getUserList',
    })
  }

  delClick(user) {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/userDel',
      payload: {
        id: user.id
      }
    })
  }

  editClick(user) {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/user/edit',
      query: { id: user.id },
    }))
  }

  render () {
    const { 
      user: { userList = [] }
    } = this.props;

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
    ];
    
    return (
      <Table columns={columns} dataSource={userList} rowKey={record => record.id}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(UserList));