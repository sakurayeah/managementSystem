import React from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router' ;
import { message, Table, Button, Popconfirm } from 'antd';

class BookList extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;
    console.log(this.props,3333333)
    dispatch({
      type: 'book/getBookList',
    })
  }

  delClick(book) {
    // this.props.action.bookDel(book.id);
  }

  editClick(book) {
    // this.props.history.push(`/book/edit/${book.id}`);
  }

  render () {
    const { book: { bookList = [] } } = this.props;

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

function mapStateToProps(state) {
  return {
    book: state.book,
  };
}

export default withRouter(connect(mapStateToProps)(BookList));
