const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const { validateLine } = require("./utils/validation");
const { connectToDatabase } = require("./utils/db");

const validData = [];

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
  .transform((data) => ({
    ...data,
    depatureDate: new Date(data.depatureDate),
    returnDate: new Date(data.returnDate),
    depatureStationId: Number(data.depatureStationId),
    returnStationId: Number(data.returnStationId),
    distance: Number(data.distance),
    duration: Number(data.duration),
  }))
  .validate((data) => validateLine(data))
  .on("error", (error) => console.error(error))
  .on("data", (data) => validData.push(data))
  .on("data-invalid", (row, rowNumber) => {
    console.log("RIVI", rowNumber);
    console.dir(row);
  });

const start = async () => {
  await connectToDatabase();
};

start();