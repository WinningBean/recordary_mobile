import {connect} from 'react-redux';
import AddPostTab from 'Components/Tab/AddPostTab/AddPostTab';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
    groupList: state.groupList === undefined ? undefined : state.groupList,
  };
};

export default connect(mapStateToProps)(AddPostTab);
