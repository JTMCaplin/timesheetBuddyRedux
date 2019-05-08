import DataConverter from "../utils/DataConverter";
import assert from "assert";

describe("data converter tests", () => {
  let dataConverter;

  beforeEach(() => {
    dataConverter = new DataConverter();
  });

  it("returns 0 for range before day", () => {
    const hours = dataConverter.hoursOnDay(
      new Date(2019, 5, 3),
      new Date(2019, 4, 28),
      new Date(2019, 5, 2, 23, 59, 59)
    );

    assert.strictEqual(hours, 0);
  });

  it("returns 0 for range after day", () => {
    const hours = dataConverter.hoursOnDay(
      new Date(2019, 5, 3),
      new Date(2019, 5, 4),
      new Date(2019, 5, 6, 23, 59, 59)
    );

    assert.strictEqual(hours, 0);
  });

  it("returns time in middle of day", () => {
    const hours = dataConverter.hoursOnDay(
      new Date(2019, 5, 3),
      new Date(2019, 5, 3, 10),
      new Date(2019, 5, 3, 13)
    );

    assert.strictEqual(hours, 3);
  });

  it("returns time that start before day", () => {
    const hours = dataConverter.hoursOnDay(
      new Date(2019, 5, 3),
      new Date(2019, 5, 3, 8),
      new Date(2019, 5, 3, 13)
    );

    assert.strictEqual(hours, 4);
  });

  it("returns time that ends after day", () => {
    const hours = dataConverter.hoursOnDay(
      new Date(2019, 5, 3),
      new Date(2019, 5, 3, 10),
      new Date(2019, 5, 3, 18)
    );

    assert.strictEqual(hours, 7.5);
  });

  it("returns time that starts before and ends after day", () => {
    const hours = dataConverter.hoursOnDay(
      new Date(2019, 5, 3),
      new Date(2019, 5, 3, 8),
      new Date(2019, 5, 3, 18)
    );

    assert.strictEqual(hours, 8.5);
  });
});
