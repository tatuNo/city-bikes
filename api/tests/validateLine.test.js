const { validateLine } = require("../utils/validation");

describe("validateLine", () => {
  test("should return true when all values are valid", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 20,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(true);
  });

  test("should return false when depature date is invalid", () => {
    const lineObject = {
      depatureDate: new Date("invalid date string"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 20,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when return date is invalid", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("invalid"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 20,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when depature station id is less than 0", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: -1,
      returnStationId: 2,
      distance: 20,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when return station id is less than 0", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: -1,
      distance: 20,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when distance is less than 10", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 9,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when duration is less than 10", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 100,
      duration: 9,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when duration is decimal number", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 100,
      duration: 100.1,
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when distance is decimal number", () => {
    const lineObject = {
      depatureDate: new Date("2021-05-31T23:49:59"),
      returnDate: new Date("2021-05-31T23:55:38"),
      depatureStationId: 1,
      returnStationId: 2,
      distance: 100.1,
      duration: 100,
    };
    expect(validateLine(lineObject)).toBe(false);
  });
});
