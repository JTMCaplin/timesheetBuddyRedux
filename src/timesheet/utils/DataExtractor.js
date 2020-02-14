const inQa = "In Progress: QA/Test";
const inDev = "In Progress: Development";
const inDev2 = "In Development";
const inProg = "In Progress";
const codeReview = "Code Review";

const trackedStatuses = [inQa, inDev, inDev2, inProg, codeReview];

// export default class DataExtractor {
export default class DataExtractor {
  constructor(currentTime) {
    this.currentTime = currentTime;
  }

  getUserData(responseData, user) {
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

  extractData(data, user, stories, epics) {
    // const userData = this.getUserData(data, user);
    return data.map(jira => {
      return this.processJira(jira, user, stories, epics);
    });
  }

  getInitialField(histories, fieldName) {
    for (let i = 0; i < histories.length; i++) {
      const items = histories[i].items;

      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        if (item.field === fieldName) {
          return item.from;
        }
      }
    }
  }

  addRowGeneralChecks(
    user,
    currentAssignee,
    currentStatus,
    latestStartTime,
    newStart
  ) {
    if (currentAssignee != user) {
      return false;
    }

    if (!trackedStatuses.includes(currentStatus)) {
      return false;
    }
    const timeInMinutesForEvent = (newStart - latestStartTime) / 60000;

    if (timeInMinutesForEvent <= 5) {
      return false;
    }

    return true;
  }

  addRowNewAssignee(
    rows,
    user,
    currentAssignee,
    currentAssigneeStart,
    currentStatus,
    currentStatusStart,
    newAssignee,
    newAssigneeStart
  ) {
    const latestStartTime =
      currentAssigneeStart - currentStatusStart > 0
        ? currentAssigneeStart
        : currentStatusStart;

    if (
      !this.addRowGeneralChecks(
        user,
        currentAssignee,
        currentStatus,
        latestStartTime,
        newAssigneeStart
      )
    ) {
      return;
    }

    if (newAssignee == user) {
      return;
    }

    rows.push({
      status: currentStatus,
      startTime: latestStartTime,
      endTime: newAssigneeStart
    });
  }

  addRowNewStatus(
    rows,
    user,
    currentAssignee,
    currentAssigneeStart,
    currentStatus,
    currentStatusStart,
    newStatus,
    newStatusStart
  ) {
    const latestStartTime =
      currentAssigneeStart - currentStatusStart > 0
        ? currentAssigneeStart
        : currentStatusStart;

    if (
      !this.addRowGeneralChecks(
        user,
        currentAssignee,
        currentStatus,
        latestStartTime,
        newStatusStart
      )
    ) {
      return;
    }

    if (currentStatus == newStatus) {
      return;
    }

    rows.push({
      status: currentStatus,
      startTime: latestStartTime,
      endTime: newStatusStart
    });
  }

  processJira(jira, user, stories, epics) {
    const histories = jira.changelog.histories;
    let currentStatus = this.getInitialField(histories, "status");
    let currentStatusStart = new Date(histories[0].created);
    let currentAssignee = this.getInitialField(histories, "assignee");
    let currentAssigneeStart = new Date(histories[0].created);

    let newStatus, newStatusStart, newAssignee, newAssigneeStart;

    let epicCode, storyCode, storyEpicCode;

    if ( jira.fields.customfield_10870) {
      const epic = epics[jira.fields.customfield_10870];
      if ( epic){
        epicCode = epic.fields.customfield_11670;
      }
    }

    if ( jira.fields.issuetype.subtask){
      const story = stories[jira.fields.parent.key];
      if ( story){
        storyCode = story.fields.customfield_11670;
      }
      if ( story && story.fields.customfield_10870){
        const storyEpic = epics[story.fields.customfield_10870];
        storyEpicCode = storyEpic.fields.customfield_11670;
      }
    }

    const jiraSum = {
      timesheetCode: jira.fields.customfield_11670,
      summary: jira.fields.summary,
      id: jira.key,
      epic: jira.fields.customfield_10870,
      epicCode,
      storyCode,
      storyEpicCode
    };
    const rows = [];

    for (let i = 0; i < histories.length; i++) {
      const items = histories[i].items;

      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        switch (items[j].field) {
          case "status":
            newStatusStart = new Date(histories[i].created);
            newStatus = item.toString;
            this.addRowNewStatus(
              rows,
              user,
              currentAssignee,
              currentAssigneeStart,
              currentStatus,
              currentStatusStart,
              newStatus,
              newStatusStart
            );
            currentStatusStart = newStatusStart;
            currentStatus = newStatus;
            break;
          case "assignee":
            newAssignee = item.to;
            newAssigneeStart = new Date(histories[i].created);
            this.addRowNewAssignee(
              rows,
              user,
              currentAssignee,
              currentAssigneeStart,
              currentStatus,
              currentStatusStart,
              newAssignee,
              newAssigneeStart
            );
            currentAssignee = newAssignee;
            currentAssigneeStart = newAssigneeStart;
            break;
        }
      }
    }

    this.addRowNewAssignee(
      rows,
      user,
      currentAssignee,
      currentAssigneeStart,
      currentStatus,
      currentStatusStart,
      null,
      this.currentTime
    );

    return rows.map(row => {
      return {
        ...row,
        jira: jiraSum
      };
    });
  }
}
