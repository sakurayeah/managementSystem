const initialState = {
  userList: [],
  editTarget: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USER_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};