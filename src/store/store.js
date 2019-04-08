import { compose, createStore, applyMiddleware} from "redux";
import timesheetReducers from "../timesheet/reducers"
import ReduxThunk from "redux-thunk";
import { combineReducers } from "redux-immutable";
import Immutable from "immutable"
import timesheetMiddleware from "../timesheet/middleware"

const rootReducer = combineReducers({
  timesheetReducers
});

const middleware = applyMiddleware(
  ReduxThunk,
  ...timesheetMiddleware
);

function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    compose(
      middleware,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

const store = configureStore(Immutable.Map());

export default store