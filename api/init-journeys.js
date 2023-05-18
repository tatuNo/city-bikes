const csv = require("fast-csv");
const axios = require("axios");

const { validateLine } = require("./utils/validation");
const { connectToDatabase } = require("./utils/db");
const { Journey } = require("./models");

const BATCH_SIZE = 1000;

const processJourneyFile = async (url) => {
  const { data } = await axios.get(url, {
    responseType: "stream",
  });

  let validData = [];

  const stream = data
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
    .transform((item) => ({
      departureDate: new Date(item.departureDate),
      returnDate: new Date(item.returnDate),
      departureStationId: Number(item.departureStationId),
      returnStationId: Number(item.returnStationId),
      distance: Number(item.distance),
      duration: Number(item.duration),
    }))
    .validate((line) => validateLine(line))
    .on("error", (error) => console.log(error))
    .on("data", (valid) => {
      validData.push(valid);
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
        console.log(`Finished ${url}`);
      });
    });
};

const start = async () => {
  await connectToDatabase();

  const urls = [
    "https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv",
    "https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv",
    "https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv",
  ];

  urls.forEach((url) => {
    processJourneyFile(url);
  });
};

start();
