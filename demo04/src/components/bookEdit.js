import React from 'react';
import request from '../common/request';
import HomeLayout from './homeLayout';
import BookEditor from './bookEditor';

class BookEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: null
    };
  }
  componentDidMount () {
    const self = this;
    const userId = this.props.match.params.id;

    request({
      url: 'bookList.json',
      type: 'GET',
      dataType: 'json',
      data: {
        id: userId
      },
      success: (res = {}) => {
        self.setState({
          book: res.info
        })
      }
    })
  }
  render () {
    const { book } = this.state;
    return (
      <HomeLayout title="编辑用户">
        {book && <BookEditor editTarget={book}/>}
      </HomeLayout>
    );
  }
}

export default BookEdit;