import { LOGIN_PRESSED } from "./actions";
import { getDataWithJSON } from "../../utils/connectionUtils";
import responseData from "../../userData";

function getUserData(responseData, user) {
  return responseData.issues.filter(function(issue) {
    for (var j = 0; j < issue.changelog.histories.length; j++) {
      var change = issue.changelog.histories[j];
      for (var i = 0; i < change.items.length; i++) {
        if (change.items[i].field == "assignee") {
          if (change.items[i].from == user) return true;
          if (change.items[i].to == user) return true;
        }
      }
    }
    return false;
  });
}

const middleware = store => next => action => {
  if (action.type === LOGIN_PRESSED) {
    const { url, username, password, projects, user } = action;
    processResponse()

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

  userData.map(jira => {
    return processJira(jira, user)
  });

  debugger;
}

function getInitialAssigned(jira) {
  for(let i = 0 ; i < histories.length; i++ ){
    const items = histories[i].items;

    for(let j =0; j< items.length; j++ ){
      const item = items[j];
        if(item.field === "assignee"){
          return item.from;
      }
    }
  }
}

function processJira(jira, user){
  const histories = jira.changelog.histories;
  let currentStatus;
  let currentAssignee = getInitialAssigned(jira);

  for(let i = 0 ; i < histories.length; i++ ){
    const items = histories[i].items;

    for(let j =0; j< items.length; j++ ){
        const item = items[j];
        switch(items[j].field){
          case "status":
            currentStatus = item.toString;
          case "assignee":
            currentAssignee = item.to;
        }
    }
  }
}
export default middleware;
