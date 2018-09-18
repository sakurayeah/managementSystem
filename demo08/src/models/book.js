import * as bookService from '../services/book';

export default {

  namespace: 'book',

  // 初始化的 state
  state: {
    bookList: [],
    editTarget: null,
  },

  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },

  // action
  effects: {
    *getBookList(action, { call, put }) {
      console.log(88888888)
      const res = yield call(bookService.getBookList);
      
      if (res.bookData) {
        yield put({
          type: 'changeBookState',
          payload: {
            bookList: res.bookData
          }
        })
      }
    },
  },

  // reducer
  reducers: {
    changeBookState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};