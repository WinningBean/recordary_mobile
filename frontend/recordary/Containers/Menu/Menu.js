import {connect} from 'react-redux';
import Menu from 'Components/Menu/Menu';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    friendList: state.friendList === undefined ? undefined : state.friendList,
    groupList: state.groupList === undefined ? undefined : state.groupList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveFriendList: (data) => {
      dispatch({type: 'SAVE_FRIENDLIST', friendList: data});
    },
    onSaveGroupList: (data) => {
      dispatch({type: 'SAVE_GROUPLIST', groupList: data});
    },
    onLogout: () => {
      dispatch({type: 'SET_LOGIN', isLogin: false});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
