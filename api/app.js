const express = require("express");
const history = require("connect-history-api-fallback");
require("express-async-errors");

const app = express();

const { connectToDatabase } = require("./utils/db");
const middleware = require("./utils/middleware");
const journeysRouter = require("./controllers/journeys");
const stationRouter = require("./controllers/stations");

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(
    history({
      rewrites: [
        {
          from: /^\/api\/.*$/,
          to: (context) => context.parsedUrl.path,
        },
      ],
    })
  );
  app.use(express.static("dist"));
}

app.use("/api/journeys", journeysRouter);
app.use("/api/stations", stationRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
};

module.exports = { app, start };
