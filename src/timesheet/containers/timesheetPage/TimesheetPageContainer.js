import { connect } from "react-redux";
import {loginPressed} from "./actions";
import TimeSheetSinglePage from "../../components/TimeSheetSinglePage";

export function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (url, username, password, projects, user) => dispatch(loginPressed(url, username, password, projects, user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeSheetSinglePage)