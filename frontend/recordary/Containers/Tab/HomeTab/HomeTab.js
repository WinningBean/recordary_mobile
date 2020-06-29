import {connect} from 'react-redux';
import HomeTab from 'Components/Tab/HomeTab/HomeTab';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
  };
};

export default connect(mapStateToProps)(HomeTab);
