const express = require("express");

const app = express();

const { connectToDatabase } = require("./utils/db");

const journeysRouter = require("./controllers/journeys");

app.use(express.json());

app.use("/api/journeys", journeysRouter);

const start = async () => {
  await connectToDatabase();
};

start();

module.exports = app;
