import React from 'react';
import { connect } from 'dva';
import UserEditor from '../components/userEditor';

class UserAdd extends React.Component {
  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/changeUserState',
      payload: {
        editTarget: null
      }
    })
  }
  render() {
    return <UserEditor />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(UserAdd);