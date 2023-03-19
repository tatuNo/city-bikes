const { validateLine } = require("../utils/validation");

describe("validateLine", () => {
  test("should return true when all values are valid", () => {
    const lineObject = {
      depatureDate: "2021-05-31T23:49:59",
      returnDate: "2021-05-31T23:55:38",
      depatureStationId: "001",
      returnStationId: "002",
      distance: "20",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(true);
  });

  test("should return false when depature date is invalid", () => {
    const lineObject = {
      depatureDate: "invalid date string",
      returnDate: "2021-05-31T23:55:38",
      depatureStationId: "001",
      returnStationId: "002",
      distance: "20",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when return date is invalid", () => {
    const lineObject = {
      depatureDate: "2021-05-31T23:49:59",
      returnDate: "invalid",
      depatureStationId: "001",
      returnStationId: "002",
      distance: "20",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when depature station id is less than 0", () => {
    const lineObject = {
      depatureDate: "2021-05-31T23:49:59",
      returnDate: "2021-05-31T23:55:38",
      depatureStationId: "-1",
      returnStationId: "002",
      distance: "20",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when return station id is less than 0", () => {
    const lineObject = {
      depatureDate: "123",
      returnDate: "2021-05-31T23:55:38",
      depatureStationId: "001",
      returnStationId: "-1",
      distance: "20",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when distance is less than 10", () => {
    const lineObject = {
      depatureDate: "2021-05-31T23:49:59",
      returnDate: "2021-05-31T23:55:38",
      depatureStationId: "001",
      returnStationId: "002",
      distance: "9",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(false);
  });

  test("should return false when duration is less than 10", () => {
    const lineObject = {
      depatureDate: "2021-05-31T23:49:59",
      returnDate: "2021-05-31T23:55:38",
      depatureStationId: "001",
      returnStationId: "002",
      distance: "9",
      duration: "100",
    };
    expect(validateLine(lineObject)).toBe(false);
  });
});
