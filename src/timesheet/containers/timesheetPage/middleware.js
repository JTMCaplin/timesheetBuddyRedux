import { LOGIN_PRESSED } from "./actions";
import { getDataWithJSON } from "../../utils/connectionUtils";
import responseData from "../../userData";

const middleware = store => next => action => {
  if (action.type === LOGIN_PRESSED) {
    const { url, username, password, projects, user } = action;
    processResponse();

    // getDataWithJSON(
    //   response => {
    //     processResponse(response, user);
    //   },
    //   username,
    //   password,
    //   url +
    //     "/rest/api/latest/search?jql=" +
    //     "updatedDate > -10d AND (" +
    //     projects
    //       .map(function(e) {
    //         return "project = " + e;
    //       })
    //       .join(" OR ") +
    //     ") &maxResults=1000&expand=changelog"
    // );
  }
};

function processResponse(response, user) {
  // const responseData = JSON.parse(response.target.responseText);
  // const userData = getUserData(responseData, user);
  const userData = responseData;

  debugger;
}

export default middleware;
