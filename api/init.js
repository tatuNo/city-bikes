const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const fastGlob = require("fast-glob");

const { validateLine } = require("./utils/validation");
const { connectToDatabase } = require("./utils/db");
const { Journey } = require("./models");

const BATCH_SIZE = 1000;

const processFile = (filePath) => {
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
    .on("error", (error) => reject(error))
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

const processFiles = async (pattern) => {
  const filePaths = await fastGlob(pattern);
  for (const filePath of filePaths) {
    console.log(`Processing ${filePath}`);
    processFile(filePath);
  }
};

const start = async () => {
  await connectToDatabase();
  await processFiles(path.resolve(__dirname, "data", "*.csv"));
};

start();
