const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const fg = require("fast-glob");

const { validateLine } = require("./utils/validation");
const { connectToDatabase } = require("./utils/db");
const { Journey, Station } = require("./models");

const BATCH_SIZE = 1000;

const processJourneyFile = (filePath) => {
  let validData = [];
  const stream = fs
    .createReadStream(filePath)
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
    .on("error", (error) => console.log(error))
    .on("data", (data) => {
      validData.push(data);
      if (validData.length > BATCH_SIZE) {
        stream.pause();
        Journey.bulkCreate(validData).then(() => {
          validData = [];
          stream.resume();
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

const processStationFile = (filePath) => {
  let validData = [];
  const stream = fs
    .createReadStream(filePath)
    .pipe(csv.parse({
      headers: headers => headers.map(h => h?.toLowerCase()),
    }))
    .transform((data) => ({
      stationId: Number(data.id),
      name: data.nimi,
      address: data.osoite,
      xCoordinate: data.x,
      yCoordinate: data.y,
    }))
    .on("error", (error) => console.log(error))
    .on("data", (data) => {
      validData.push(data);
      if (validData.length > BATCH_SIZE) {
        stream.pause();
        Station.bulkCreate(validData).then(() => {
          validData = [];
          stream.resume();
        });
      }
    })
    .on("end", () => {
      Station.bulkCreate(validData).then(() => {
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
  const stationFiles = await fg(
    path.resolve(__dirname, "data/stations/", "*.csv")
  );

  for (const journeyFile of journeyFiles) {
    processJourneyFile(journeyFile);
  }

  for (const stationFile of stationFiles) {
    processStationFile(stationFile);
  }
};

start();
