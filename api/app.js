const express = require("express");

const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

app.use(express.json());

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
