const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const { validateLine } = require("./utils/validation");
const { connectToDatabase } = require("./utils/db");

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

const start = async () => {
  await connectToDatabase();
};

start();
