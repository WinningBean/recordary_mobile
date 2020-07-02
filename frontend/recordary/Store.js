import {createStore} from 'redux';

const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isLogin: false,
      user: {},
      scList: [],
      friendList: undefined,
      groupList: undefined,
    };
  }
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.user};
    case 'SET_SCLIST':
      return {...state, scList: action.scList};
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
