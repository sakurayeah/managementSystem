import React from 'react';
import { connect } from 'dva';
import UserEditor from '../components/userEditor';

class UserEdit extends React.Component {
  componentDidMount () {
    const { 
      dispatch, 
      location: { query = {} } 
    } = this.props;
    dispatch({
      type: 'user/changeUserState',
      payload: {
        editTarget: null
      }
    })

    dispatch({
      type: 'user/getUserInfo',
      payload: {
        id: query.id
      }
    })
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

export default connect(mapStateToProps)(UserEdit);