const initialState = {
  bookList: [],
  editTarget: null,
  recommendUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_BOOK_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};