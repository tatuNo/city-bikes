const csv = require("fast-csv");
const axios = require("axios");

const { connectToDatabase } = require("./utils/db");
const { Station } = require("./models");

const BATCH_SIZE = 1000;

const processStationFile = async (url) => {
  const { data } = await axios.get(url, {
    responseType: "stream",
  });

  let validData = [];

  const stream = data
    .pipe(
      csv.parse({
        headers: (headers) => headers.map((h) => h.toLowerCase()),
      })
    )
    .transform((item) => ({
      id: Number(item.id),
      name: item.nimi,
      address: item.osoite,
      xCoordinate: item.x,
      yCoordinate: item.y,
    }))
    .on("error", (error) => console.log(error))
    .on("data", (valid) => {
      validData.push(valid);
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
        console.log(`Finished ${url}`);
      });
    });
};

const start = async () => {
  await connectToDatabase();

  const url =
    "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv";

  processStationFile(url);
};

start();
