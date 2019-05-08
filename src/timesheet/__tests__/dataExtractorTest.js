import DataExtractor from "../utils/DataExtractor";
import responseData from "../userData";
import assert from "assert";

describe("Data Extractor Tests", () => {
  let dataExtractor;
  beforeEach(() => {
    dataExtractor = new DataExtractor();
  });

  it("getsInitialField returns assignee from first event", () => {
    const initialAssigned = dataExtractor.getInitialField(
      [
        {
          items: [{ field: "assignee", from: "person" }]
        }
      ],
      "assignee"
    );

    assert.strictEqual(initialAssigned, "person");
  });

  it("getsInitialField returns assignee from other event", () => {
    const initialAssigned = dataExtractor.getInitialField(
      [
        {
          items: [{ field: "otherField", from: "other thing" }]
        },
        {
          items: [{ field: "assignee", from: "person" }]
        }
      ],
      "assignee"
    );

    assert.strictEqual(initialAssigned, "person");
  });

  it("getsInitialField returns null if no initial assignee", () => {
    const initialAssigned = dataExtractor.getInitialField(
      [
        {
          items: [{ field: "assignee", from: null }]
        }
      ],
      "assignee"
    );

    assert.strictEqual(initialAssigned, null);
  });

  it("addRowNewAssignee doens't add if user isn't current User", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(rows, "blah", "other");

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewAssignee doesn't add if current status isn't tracked", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(
      rows,
      "blah",
      "blah",
      "2019-03-12T16:30:22.000+0000",
      "rubbish"
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewAssignee doesn't add if new assignee time less than 5 minutes assignee time greater", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:30:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:20:22.000+0000"),
      "otherUser",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewAssignee doesn't add if new assignee time less than 5 minutes status time greater", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:30:22.000+0000"),
      "otherUser",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewAssignee doesn't add if newAssignee is user", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:20:22.000+0000"),
      "blah",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.strictEqual(rows.length, 0);
  });

  it("sets data correctly for new row if adding assignee time bigger", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:21:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:20:22.000+0000"),
      "other User",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.deepStrictEqual(rows, [
      {
        status: "In Progress: Development",
        startTime: new Date("2019-03-12T16:21:22.000+0000"),
        endTime: new Date("2019-03-12T16:34:22.000+0000")
      }
    ]);
  });

  it("sets data correctly for new row if adding status time bigger", () => {
    const rows = [];
    dataExtractor.addRowNewAssignee(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:21:22.000+0000"),
      "other User",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.deepStrictEqual(rows, [
      {
        status: "In Progress: Development",
        startTime: new Date("2019-03-12T16:21:22.000+0000"),
        endTime: new Date("2019-03-12T16:34:22.000+0000")
      }
    ]);
  });

  it("addRowNewStatus doesn't add if current Assignee is not user", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(rows, "blah", "wrong");

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewStatus doesn't add if current status isn't tracked", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(
      rows,
      "blah",
      "blah",
      "2019-03-12T16:30:22.000+0000",
      "rubbish"
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewStatus doesn't add if new status time less than 5 minutes assignee time greater", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:30:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:20:22.000+0000"),
      "otherUser",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewStatus doesn't add if new status time less than 5 minutes status time greater", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:30:22.000+0000"),
      "otherUser",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewStatus doesn't add if newStatus hasn't changed", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.strictEqual(rows.length, 0);
  });

  it("addRowNewStatus sets data correctly for new row if adding assignee time bigger", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:21:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:20:22.000+0000"),
      "other User",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.deepStrictEqual(rows, [
      {
        status: "In Progress: Development",
        startTime: new Date("2019-03-12T16:21:22.000+0000"),
        endTime: new Date("2019-03-12T16:34:22.000+0000")
      }
    ]);
  });

  it("addRowNewStatus sets data correctly for new row if adding status time bigger", () => {
    const rows = [];
    dataExtractor.addRowNewStatus(
      rows,
      "blah",
      "blah",
      new Date("2019-03-12T16:20:22.000+0000"),
      "In Progress: Development",
      new Date("2019-03-12T16:21:22.000+0000"),
      "other User",
      new Date("2019-03-12T16:34:22.000+0000")
    );

    assert.deepStrictEqual(rows, [
      {
        status: "In Progress: Development",
        startTime: new Date("2019-03-12T16:21:22.000+0000"),
        endTime: new Date("2019-03-12T16:34:22.000+0000")
      }
    ]);
  });

  it("processJira works for generic data", () => {
    const data = responseData;
    const events = dataExtractor.processJira(responseData[0], "jacobm");

    assert.deepStrictEqual(events, [
      {
        status: "In Progress: QA/Test",
        startTime: new Date("2019-03-15T09:24:45.000+0000"),
        endTime: new Date("2019-03-15T14:49:21.000+0000"),
        jira: {
          summary: "Order Fill window fails to open in Danish locale",
          timesheetCode: null
        }
      }
    ]);
  });

  it("adds up times where assignee field was set to the same as before", () => {});

  it("extract data works for generic data", () => {
    const events = dataExtractor.extractData(responseData, "jacobm");

    debugger;
  });

  it("process Jira returns empty when it's empty", () => {
    const events = dataExtractor.processJira(
      {
        changelog: {
          histories: [
            {
              items: [{ field: "assignee", from: null }]
            }
          ]
        },
        fields: {}
      },
      "assignee"
    );

    assert.deepStrictEqual(events, []);
  });

  // it("Handy debugger", () => {
  //   const userData = responseData;
  //   debugger;
  // });
});
