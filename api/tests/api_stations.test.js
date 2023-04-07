const supertest = require("supertest");

const { sequelize } = require("../utils/db");
const app = require("../app");
const { Station } = require("../models");
const { initialStations } = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await Station.destroy({ where: {} });
  await Station.bulkCreate(initialStations);
});

afterAll(async () => {
  await Station.destroy({ where: {} });
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
    const res = await api.get("/api/stations?limit=5&offset=5").expect(200);
    expect(res.body.rows[0].name).toBe("Station 6");
  });

  test("should return stations whose name or address matches search parameter", async () => {
    const res = await api.get("/api/stations?search=place").expect(200);
    expect(res.body.rows.length).toBe(2);
    const stations = res.body.rows;
    for (const station of stations) {
      expect(station.address).toBe("Place");
    }
  });

  test("should return all stations with Station search parameter", async () => {
    const res = await api.get("/api/stations?search=station").expect(200);
    expect(res.body.rows.length).toBe(initialStations.length);
  });
});
