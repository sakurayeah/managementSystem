import fetch from 'dva/fetch';
import request from '../utils/request';

export const userAddOrEdit = ({values, editTarget}) => {
  let url = 'userAdd.json';
  let params = values;
  let desc = '添加用户';

  if (editTarget) {
    url = 'userEdit.json';
    params.id = editTarget.id;
    desc = '修改用户信息';
  }
  return request(url, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const getUserList = () => {
  return request(`userList.json`, {
    method: 'GET',
  })
}

export const userDel = ({ id }) => {
  return request('userDel.json', {
    method: 'POST',
    body: JSON.stringify(id),
  })
}