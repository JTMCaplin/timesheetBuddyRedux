import React, { Component } from 'react';
import './App.css';
import { Provider } from "react-redux"
import store from "./store/store";
import TimesheetPageContainer from "./timesheet/containers/timesheetPage/TimesheetPageContainer";

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <TimesheetPageContainer/>
      </Provider>
    );
  }
}

export default App;
