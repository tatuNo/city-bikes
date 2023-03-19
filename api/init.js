const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !Number.isNaN(date);
};

const validateLine = (line) => {
  const {
    depatureDate,
    returnDate,
    depatureStationId,
    returnStationId,
    distance,
    duration,
  } = line;

  if (!isValidDate(depatureDate) || !isValidDate(returnDate)) {
    return false;
  }

  if (depatureStationId <= 0 || returnStationId <= 0) {
    return false;
  }

  if (distance <= 10 || duration <= 10) {
    return false;
  }

  return true;
};

fs.createReadStream(path.resolve(__dirname, "data", "2021-05.csv"))
  .pipe(
    csv.parse({
      renameHeaders: true,
      headers: [
        "depatureDate",
        "returnDate",
        "depatureStationId",
        "depatureStation",
        "returnStationId",
        "returnStation",
        "distance",
        "duration",
      ],
    })
  )
  .validate((data) => validateLine(data))
  .on("error", (error) => console.error(error))
  .on("data-invalid", (row, rowNumber) => console.dir(row));
