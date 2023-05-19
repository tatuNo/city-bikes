const supertest = require("supertest");

const { sequelize } = require("../utils/db");
const { app, start } = require("../app");
const { Station } = require("../models");
const { initialStations } = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await start();
  await Station.destroy({ where: {} });
  await Station.bulkCreate(initialStations);
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /station", () => {
  test("stations are returned as json", async () => {
    await api
      .get("/api/stations/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should return 404 if station is not found", async () => {
    await api.get("/api/stations/50000").expect(404);
  });

  test("should return 400 if id is string", async () => {
    await api.get("/api/stations/string").expect(400);
  });
});
