import initialState from "./initialState"
import {timesheetReducers} from "./containers/timesheetPage/reducers";
import { handleActions } from "redux-actions"

export default handleActions(
  timesheetReducers,
  initialState
)