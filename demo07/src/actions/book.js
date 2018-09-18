import request from '../common/request';

export const getBookList = (id) => dispatch => {
  const data = {};
  if (id) {
    data.id = id;
  }
  request({
    url: 'bookList.json',
    type: 'GET',
    dataType: 'json',
    data,
    success: (res = {}) => {
      const { data, info } = res;
      if (id) {
        dispatch({type: `CHANGE_BOOK_STATE`, payload: {editTarget: info}});
      } else {
        dispatch({type: `CHANGE_BOOK_STATE`, payload: {bookList: data}});
      }
    }
  })
}

export const bookDel = id => dispatch => {
  request({
    url: 'bookDel.json',
    type: 'POST',
    data: {
      id,
    },
    dataType: 'json',
    success: (res = {}) => {
      const { data } = res;
      dispatch({type: `CHANGE_BOOK_STATE`, payload: {bookList: data}});
    }
  })
}

export const getRecommend = data => dispatch => {
  request({
    url: 'suggest.json',
    type: "POST",
    data,
    dataType: 'json',
    success: (res = {}) => {
      const { recommend = [] } = res;
      // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
      if (recommend.length === 1 && recommend[0].value === Number(value)) {
        return;
      }
      dispatch({type: `CHANGE_BOOK_STATE`, payload: {recommendUsers: recommend}});
    }
  })
}

export const bookAddOrEdit = (values, editTarget, cb) => dispatch => {
  let url = 'bookAdd.json';
  let desc = '添加图书';

  if (editTarget) {
    url = 'bookEdit.json';
    values.id = editTarget.id;
    desc = '修改图书信息';
  }
  request({
    url,
    data: values,
    type: "POST",
    dataType: 'json',
    success:(data) => {
      if (data.id) {
        console.log(`${desc}成功`, data);
        cb()
      } else {
        console.log(`${desc}失败`, data)
      }
    },
    error: (data) => {
      console.log(`${desc}失败`, data)
    }
  })
}