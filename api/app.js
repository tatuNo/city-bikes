const express = require("express");

const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const journeysRouter = require("./controllers/journeys");

app.use(express.json());

app.use("/api/journeys", journeysRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
