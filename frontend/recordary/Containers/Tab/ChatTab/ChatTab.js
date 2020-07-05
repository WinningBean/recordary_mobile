import {connect} from 'react-redux';
import ChatTab from 'Components/Tab/ChatTab/ChatTab';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatTab);
