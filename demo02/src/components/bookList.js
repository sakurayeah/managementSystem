import React from 'react';
import { withRouter } from 'react-router-dom' ;
import $ from 'jquery';
import HomeLayout from './homeLayout';

class BookList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  componentDidMount () {
    const self = this;
    $.ajax({
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
    const confirmed = confirm(`确定要删除用户 ${book.name} 吗？`);

    if (confirmed) {
      $.ajax({
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
  }

  editClick(book) {
    this.props.history.push(`/book/edit/${book.id}`);
  }

  render () {
    const { bookList = [] } = this.state;
    return (
      <HomeLayout title="图书列表" className="user-list-wrap">
        <ul>
          {
            bookList.map(user => (
              <li key={user.id}>
                {user.id} , {user.name} , {user.price} , {user.ownerId}
                <br/>
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

export default withRouter(BookList);