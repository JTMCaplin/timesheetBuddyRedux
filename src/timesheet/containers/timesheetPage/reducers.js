import {LOGIN_TO_JIRA} from "./actions";

export const login = (state, {url, username, password, projects, user }) => {
  let newState = {...state};

  const loginDetails = {
    url,
    username,
    password,
  };

  newState.loginDetails = loginDetails;

  this.selectProject(projects, user);

  return newState

};

export const timesheetReducers = {
  [LOGIN_TO_JIRA]: login
};


