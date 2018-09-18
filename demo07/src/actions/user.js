import request from '../common/request';

export const getUserList = (id) => dispatch => {
  const data = {};
  if (id) {
    data.id = id;
  }
  request({
    url: 'userList.json',
    type: 'GET',
    dataType: 'json',
    data,
    success: (res = {}) => {
      const { data, info } = res;
      if (id) {
        dispatch({type: `CHANGE_USER_STATE`, payload: {editTarget: info}});
      } else {
        dispatch({type: `CHANGE_USER_STATE`, payload: {userList: data}});
      }
    }
  })
}

export const userDel = id => dispatch => {
  request({
    url: 'userDel.json',
    type: 'POST',
    data: {
      id,
    },
    dataType: 'json',
    success: (res = {}) => {
      const { data } = res;
      dispatch({type: `CHANGE_USER_STATE`, payload: {userList: data}});
    }
  })
}

export const userAddOrEdit = (values, editTarget, cb) => dispatch => {
  let url = 'userAdd.json';
  let params = values;
  let desc = '添加用户';

  if (editTarget) {
    url = 'userEdit.json';
    params.id = editTarget.id;
    desc = '修改用户信息';
  }

  request({
    url,
    data: params,
    type: "POST",
    dataType: 'json',
    success:(data) => {
      if (data.id) {
        console.log(`${desc}成功`, data);
        cb();
      } else {
        console.log(`${desc}失败`, data)
      }
    },
    error: (data) => {
      console.log(`${desc}失败`, data)
    }
  })
}