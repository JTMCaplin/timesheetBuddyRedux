export const LOGIN_TO_JIRA = "LOGIN_TO_JIRA";
export const PROCESS_DATA = "PROCESS_DATA";
export const LOGIN_PRESSED = "LOGIN_PRESSED";

export const loginPressed = (url, username, password, projects, user) => {
  return { type: LOGIN_PRESSED, url, username, password, projects, user};
};

export const changeStateToLoggedIn = (url, username, password, projects, user) => {
  return { type: LOGIN_TO_JIRA, url, username, password, projects, user};
};

export const ProcessData = data => {
  return { type: PROCESS_DATA , data };
};