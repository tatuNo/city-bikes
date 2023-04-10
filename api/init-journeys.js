const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const fg = require("fast-glob");

const { validateLine } = require("./utils/validation");
const { connectToDatabase } = require("./utils/db");
const { Journey } = require("./models");

const BATCH_SIZE = 1000;

const processJourneyFile = (filePath) => {
  let validData = [];
  const stream = fs
    .createReadStream(filePath)
    .pipe(
      csv.parse({
        renameHeaders: true,
        headers: [
          "departureDate",
          "returnDate",
          "departureStationId",
          "departureStation",
          "returnStationId",
          "returnStation",
          "distance",
          "duration",
        ],
      })
    )
    .transform((data) => ({
      departureDate: new Date(data.departureDate),
      returnDate: new Date(data.returnDate),
      departureStationId: Number(data.departureStationId),
      returnStationId: Number(data.returnStationId),
      distance: Number(data.distance),
      duration: Number(data.duration),
    }))
    .validate((data) => validateLine(data))
    .on("error", (error) => console.log(error))
    .on("data", (data) => {
      validData.push(data);
      if (validData.length > BATCH_SIZE) {
        stream.pause();
        Journey.bulkCreate(validData)
          .then(() => {
            validData = [];
            stream.resume();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    })
    .on("end", () => {
      Journey.bulkCreate(validData).then(() => {
        validData = [];
        console.log(`Finished ${filePath}`);
      });
    });
};

const start = async () => {
  await connectToDatabase();

  const journeyFiles = await fg(
    path.resolve(__dirname, "data/journeys", "*.csv")
  );

  for (const journeyFile of journeyFiles) {
    processJourneyFile(journeyFile);
  }

};

start();
