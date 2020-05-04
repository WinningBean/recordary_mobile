import {connect} from 'react-redux';
import Calendar from 'Components/Tab/ProfileTab/Calendar';

const mapStateToProps = (state) => {
  return {
    scList: state.scList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveScList: (data) => {
      dispatch({type: 'SET_SCLIST', scList: data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
