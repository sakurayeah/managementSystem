import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserEditor from './userEditor';
import Actions from '../actions/index';

class UserEdit extends React.Component {
  componentDidMount () {
    this.props.action.changeState({editTarget: null}, 'USER');

    const userId = this.props.match.params.id;

    this.props.action.getUserList(userId);
  }
  render () {
    const {
      user: { editTarget = null }
    } = this.props;
    return editTarget ? <UserEditor editTarget={editTarget}/> : <span>加载中...</span>;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);