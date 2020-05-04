import {createStore} from 'redux';

const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isLogin: false,
      user: {},
      postList: [],
      scList: [],
    };
  }
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.user};
    case 'SET_POSTLIST':
      return {...state, postList: action.postList};
    case 'SET_SCLIST':
      return {...state, scList: action.scList};
  }
  return state;
};

const Store = createStore(reducer);

export default Store;
