import request from '../common/request';
import * as user from './user';
import * as book from './book';

const changeState = (data, type) => (dispatch) => {
  dispatch({type: `CHANGE_${type}_STATE`, payload: data});
}

const getLogin = (data, ok, fail) => dispatch => {
  request({
    url: 'login.json',
    data,
    type: "POST",
    dataType: 'json',
    success: (res = {}) => {
      ok();
    },
    error: () => {
      fail();
    }
  })
}

export default {
  changeState,
  getLogin,
  ...user,
  ...book,
}