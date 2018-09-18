import React from 'react';
import { withRouter } from 'react-router-dom' ;
import { Table, Button, Popconfirm } from 'antd';
import request from '../common/request';

class BookList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  componentDidMount () {
    const self = this;
    request({
      url: 'bookList.json',
      type: 'GET',
      dataType: 'json',
      success: (res = {}) => {
        const { data } = res;
        self.setState({
          bookList: data
        });
      }
    })
  }

  delClick(book) {
    const self = this;

    request({
      url: 'bookDel.json',
      type: 'POST',
      data: {
        id: book.id
      },
      dataType: 'json',
      success: (res = {}) => {
        const { data } = res;
        self.setState({
          bookList: data
        });
      }
    })
  }

  editClick(book) {
    this.props.history.push(`/book/edit/${book.id}`);
  }

  render () {
    const { bookList = [] } = this.state;

    const columns = [{
      title: '书名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '拥有者',
      dataIndex: 'ownerId',
      key: 'ownerId',
    }, {
      title: '操作',
      render: (text, record, index) => (
        <Button.Group>
          <Button onClick={() => this.editClick(record)}>编辑</Button>
          <Popconfirm title="确定删除吗？" onConfirm={() => this.delClick(record)}>
            <Button>删除</Button>
          </Popconfirm>
        </Button.Group>
      )
    }];

    return (
      <Table dataSource={bookList} columns={columns} rowKey={record => record.id} />
    )
  }
}

export default withRouter(BookList);
