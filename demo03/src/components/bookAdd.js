import React from 'react';
import $ from 'jquery';
import HomeLayout from './homeLayout';
import BookEditor from './bookEditor';

class BookAdd extends React.Component {
  render() {
    return (
      <HomeLayout title="添加图书">
        <BookEditor />
      </HomeLayout>
    )
  }
}

export default BookAdd;