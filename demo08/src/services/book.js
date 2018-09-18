import request from '../utils/request';

export const getBookList = () => {
  return request(`bookList.json`, {
    method: 'GET',
  })
}