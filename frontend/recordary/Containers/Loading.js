import {connect} from 'react-redux';
import Loading from 'Components/Loading';

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveInitData: (user) => {
      dispatch({type: 'SET_USER', user: user});
    },
  };
};

export default connect(null, mapDispatchToProps)(Loading);
