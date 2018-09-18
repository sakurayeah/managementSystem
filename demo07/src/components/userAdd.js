import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../actions/index';
import UserEditor from './userEditor';

class UserAdd extends React.Component {
  componentWillMount() {
    this.props.action.changeState({editTarget: null}, 'USER');
  }
  render() {
    return <UserEditor />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);