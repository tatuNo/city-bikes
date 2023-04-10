const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const fg = require("fast-glob");

const { connectToDatabase } = require("./utils/db");
const { Station } = require("./models");

const BATCH_SIZE = 1000;

const processStationFile = (filePath) => {
  let validData = [];
  const stream = fs
    .createReadStream(filePath)
    .pipe(
      csv.parse({
        headers: (headers) => headers.map((h) => h?.toLowerCase()),
      })
    )
    .transform((data) => ({
      id: Number(data.id),
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
        Station.bulkCreate(validData)
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
      Station.bulkCreate(validData).then(() => {
        validData = [];
        console.log(`Finished ${filePath}`);
      });
    });
};

const start = async () => {
  await connectToDatabase();

  const stationFiles = await fg(
    path.resolve(__dirname, "data/stations/", "*.csv")
  );

  for (const stationFile of stationFiles) {
    processStationFile(stationFile);
  }
};

start();
