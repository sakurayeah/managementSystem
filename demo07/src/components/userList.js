import React from 'react';
import { withRouter } from 'react-router-dom' ;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message, Table, Button, Popconfirm } from 'antd';
import Actions from '../actions/index';

class UserList extends React.Component {
  componentDidMount () {
    this.props.action.getUserList();
  }

  delClick(user) {
    this.props.action.userDel(user.id);
  }

  editClick(user) {
    this.props.history.push(`/user/edit/${user.id}`);
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

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));