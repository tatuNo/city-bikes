const express = require("express");

const app = express();

const { connectToDatabase } = require("./utils/db");

const journeysRouter = require("./controllers/journeys");
const stationRouter = require("./controllers/stations");

app.use(express.json());

app.use("/api/journeys", journeysRouter);
app.use("/api/stations", stationRouter);

const start = async () => {
  await connectToDatabase();
};

start();

module.exports = app;
