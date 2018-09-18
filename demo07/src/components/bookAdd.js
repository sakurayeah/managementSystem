import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookEditor from './bookEditor';
import Actions from '../actions/index';

class BookAdd extends React.Component {
  componentWillMount () {
    this.props.action.changeState({editTarget: null}, 'BOOK');
  }
  render() {
    return (
      <BookEditor />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookAdd);
