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

describe("GET /stations", () => {
  test("stations are returned as json", async () => {
    await api
      .get("/api/stations")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should return 5 stations with a limit of 5", async () => {
    const res = await api.get("/api/stations?limit=5").expect(200);
    expect(res.body.rows.length).toBe(5);
  });

  test("should return the second page of stations with a limit of 5 offset 5", async () => {
    const res1 = await api.get("/api/stations?limit=10").expect(200);
    const res2 = await api.get("/api/stations?limit=5&offset=5").expect(200);

    const expected = res1.body.rows.slice(5, 10);

    expect(expected).toMatchObject(res2.body.rows);
  });

  test("should return stations whose name or address matches search parameter", async () => {
    const target = "lo";
    const res = await api.get(`/api/stations?search=${target}`).expect(200);

    const stations = res.body.rows;
    stations.forEach((station) => {
      const nameContainsTarget = station.name.includes(target);
      const addressContainsTarget = station.address.includes(target);
      expect(nameContainsTarget || addressContainsTarget).toBeTruthy();
    });
  });
});
