import { deflateSync } from "zlib";

export default class DataConverter {
  constructor() {}

  hoursOnDay(day, startTime, endTime) {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const nineOclock = day.getTime() + 9 * 60 * 60 * 1000;
    const five30 = day.getTime() + 17.5 * 60 * 60 * 1000;
    let end = endTime.getTime();
    let start = startTime.getTime();

    if (day >= endTime) {
      return 0;
    }
    if (day.getTime() + oneDay <= startTime.getTime()) {
      return 0;
    }

    if (nineOclock > start) {
      start = nineOclock;
    }

    if (five30 < end) {
      end = five30;
    }

    return (end - start) / oneHour;
  }
}
