import {connect} from 'react-redux';
import Loading from 'Components/Loading';

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveInitData: (user, postList, scList) => {
      dispatch({type: 'SET_USER', user: user});
      dispatch({type: 'SET_SCLIST', scList: scList});
    },
  };
};

export default connect(null, mapDispatchToProps)(Loading);
