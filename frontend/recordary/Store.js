import {createStore} from 'redux';

const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isLogin: false,
      user: {},
      friendList: undefined,
      groupList: undefined,
    };
  }
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.user};
    case 'SET_LOGIN':
      return {...state, isLogin: action.isLogin};
    case 'SAVE_FRIENDLIST':
      return {
        ...state,
        friendList: action.friendList,
      };
    case 'SAVE_GROUPLIST':
      return {
        ...state,
        groupList: action.groupList,
      };
  }
  return state;
};

const Store = createStore(reducer);

export default Store;
