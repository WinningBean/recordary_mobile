import {connect} from 'react-redux';
import ProfileTab from 'Components/Tab/ProfileTab/ProfileTab';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfileTab);
