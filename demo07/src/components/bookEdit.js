import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookEditor from './bookEditor';
import Actions from '../actions/index';

class BookEdit extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.action.changeState({editTarget: null}, 'BOOK');
    const bookId = this.props.match.params.id;
    this.props.action.getBookList(bookId);
  }
  render () {
    return this.props.book.editTarget ? <BookEditor /> : <span>加载中...</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookEdit);