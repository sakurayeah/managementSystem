import React from 'react';
import { withRouter } from 'react-router-dom' ;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Popconfirm } from 'antd';
import Actions from '../actions/index';

class BookList extends React.Component {
  componentDidMount () {
    this.props.action.getBookList();
  }

  delClick(book) {
    this.props.action.bookDel(book.id);
  }

  editClick(book) {
    this.props.history.push(`/book/edit/${book.id}`);
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

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));
