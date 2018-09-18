import * as userService from '../services/user';

export default {

  namespace: 'user',

  // 初始化的 state
  state: {
    userList: [],
    editTarget: null,
  },

  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },

  // action
  effects: {
    *userAddOrEdit({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(userService.userAddOrEdit, payload);
      if (res && res.id) {
        console.log('成功')
        payload.cb()
      } else {
        console.log('失败')
      }
    },
    *getUserList(action, { call, put }) {
      const res = yield call(userService.getUserList);
      if (res.userData) {
        yield put({
          type: 'changeUserState',
          payload: {
            userList: res.userData
          }
        })
      }
    },
    *userDel({payload}, {call, put}) {
      const res = yield call(userService.userDel, payload);
      if (res.id) {
        yield put({
          type: 'delUserState',
          payload,
        })
      }
    },
    *getUserInfo({payload}, {call, put}) {
      const res = yield call(userService.getUserList);
      if (res.userData) {
        const editTarget = res.userData.filter(function(item){
          return item.id === Number(payload.id)
        });
        yield put({
          type: 'changeUserState',
          payload: {
            editTarget: editTarget[0],
          },
        })
      }
    }
  },

  // reducer
  reducers: {
    changeUserState(state, action) {
      return { ...state, ...action.payload };
    },
    delUserState(state, {payload}) {
      const { userList } = state;
      const { id } = payload;
      userList.map((item, index) => {
        if (item.id === Number(id)) {
          userList.splice(index, 1);
        }
      })
      return {
        ...state,
        userList,
      }
    }
  },
};