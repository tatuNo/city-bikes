const express = require("express");
require("express-async-errors");
const app = express();

const { connectToDatabase } = require("./utils/db");
const middleware = require("./utils/middleware");
const journeysRouter = require("./controllers/journeys");
const stationRouter = require("./controllers/stations");

app.use(express.json());

app.use("/api/journeys", journeysRouter);
app.use("/api/stations", stationRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
};

start();

module.exports = app;
