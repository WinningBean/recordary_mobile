import {createStore} from 'redux';

const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isLogin: false,
      user: {},
      friendList: undefined,
      groupList: undefined,
      chatData: [],
    };
  }
  var copyList = undefined;
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
    case 'SET_CHATDATA':
      return {
        ...state,
        chatData: action.chatData,
      };
    case 'SAVE_NEWCHAT':
      copyList = state.chatData.slice();
      if (copyList[action.newChatIndex].chatList !== null) {
        copyList[action.newChatIndex].chatList.push(action.newChat);
      }
      copyList[action.newChatIndex].lastChat = action.newChat.content;
      ++copyList[action.newChatIndex].count;
      return {
        ...state,
        chatData: copyList,
      };
    case 'SET_CHATZEROCOUNT':
      copyList = state.chatData.slice();
      copyList[action.chatIndex].count = 0;
      return {
        ...state,
        chatData: copyList,
      };
  }
  return state;
};

const Store = createStore(reducer);

export default Store;
