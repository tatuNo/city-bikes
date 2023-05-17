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

  for (const url of urls) {
    processJourneyFile(url);
  }
};

start();
